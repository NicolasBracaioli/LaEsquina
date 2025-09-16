const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// Configuración de la base de datos
// =====================
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "testdb"
});




db.connect(err => {
  if (err) {
    console.error("❌ Error conectando a la BDD:", err.message);
  } else {
    console.log("✅ Conectado a la base de datos MySQL");
  }
});

// =====================
// Ruta de prueba
// =====================
app.get("/health", (req, res) => {
  console.log("GET /health");
  res.json({ ok: true, db: db.threadId ? true : false });
});

// =====================
// CRUD Productos
// =====================

// READ - obtener todos los productos
app.get("/productos", (req, res) => {
  console.log("GET /productos");
  const query = "SELECT * FROM productos";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener productos:", err.sqlMessage);
      return res.status(500).json({ success: false, message: err.sqlMessage });
    }
    console.log("✅ Productos obtenidos:", results.length);
    return res.json({ success: true, data: results });
  });
});

// CREATE - insertar producto
app.post("/productos", (req, res) => {
  console.log("POST /productos body:", req.body);
  const { Nombre, Precio, Cantidad, Categoria, URL } = req.body;
  const query =
    "INSERT INTO productos (Nombre, Precio, Cantidad, Categoria, URL) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [Nombre, Precio, Cantidad, Categoria, URL], (err, result) => {
    if (err) {
      console.error("❌ Error al insertar producto:", err.sqlMessage);
      return res
        .status(500)
        .json({ success: false, message: err.sqlMessage });
    }
    res.json({
      success: true,
      message: "Producto insertado correctamente",
      id: result.insertId,
    });
  });
});

// UPDATE - modificar producto
app.put("/productos/:id", (req, res) => {
  console.log("PUT /productos/:id params:", req.params, "body:", req.body);
  const { id } = req.params;
  const { Nombre, Precio, Cantidad, Categoria, URL } = req.body;
  const query =
    "UPDATE productos SET Nombre=?, Precio=?, Cantidad=?, Categoria=?, URL=? WHERE ID_Product=?";
  db.query(
    query,
    [Nombre, Precio, Cantidad, Categoria, URL, id],
    (err, result) => {
      if (err) {
        console.error("❌ Error al modificar producto:", err.sqlMessage);
        return res
          .status(500)
          .json({ success: false, message: err.sqlMessage });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el producto con ID ${id}`,
        });
      }
      res.json({
        success: true,
        message: "Producto actualizado correctamente",
      });
    }
  );
});

// DELETE - eliminar producto
app.delete("/productos/:id", (req, res) => {
  console.log("DELETE /productos/:id params:", req.params);
  const { id } = req.params;
  const query = "DELETE FROM productos WHERE ID_Product=?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Error al eliminar producto:", err.sqlMessage);
      return res
        .status(500)
        .json({ success: false, message: err.sqlMessage });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró el producto con ID ${id}`,
      });
    }
    console.log("✅ Producto eliminado ID:", id);
    res.json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  });
});

// =====================
// Login (Admin o Usuario)
// =====================
app.post("/login", (req, res) => {
  console.log("POST /login body:", req.body);
  const { Nombre, Contrasena } = req.body;

  const queryAdmin =
    "SELECT * FROM admin WHERE Nombre = ? AND Contrasena = ?";
  db.query(queryAdmin, [Nombre, Contrasena], (err, result) => {
    if (err) {
      console.error("❌ Error en consulta admin:", err.sqlMessage);
      return res
        .status(500)
        .json({ success: false, message: "Error en servidor" });
    }

    if (result.length > 0) {
      console.log("✅ Login admin:", Nombre);
      return res.json({ success: true, rol: "admin" });
    }

    const queryUsuario =
      "SELECT * FROM usuario WHERE Nombre = ? AND Contrasena = ?";
    db.query(queryUsuario, [Nombre, Contrasena], (err2, result2) => {
      if (err2) {
        console.error("❌ Error en consulta usuario:", err2.sqlMessage);
        return res
          .status(500)
          .json({ success: false, message: "Error en servidor" });
      }

      if (result2.length > 0) {
        console.log("✅ Login usuario:", Nombre);
        return res.json({ success: true, rol: "usuario" });
      }

      console.log("❌ Usuario/contraseña incorrectos");
      return res.json({
        success: false,
        message: "Usuario o contraseña incorrectos",
      });
    });
  });
});

// =====================
// Iniciar servidor
// =====================
const PORT = 3000;
const HOST = "0.0.0.0";  // 👈 cambio clave para Docker

app.listen(PORT, HOST, () =>
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`)
);
