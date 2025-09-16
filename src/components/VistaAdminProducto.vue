<template>
  <div class="admin-page">
    <AdminNav />

    <h1 class="titulo">Productos</h1>

    <p v-if="loading" class="mensaje">Cargando productos...</p>
    <p v-if="error" class="mensaje error">{{ error }}</p>

    <div v-if="!loading && !error" class="tabla-container">
      <table class="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.ID_Product">
            <td>{{ producto.ID_Product }}</td>
            <td>{{ producto.Nombre }}</td>
            <td>${{ producto.Precio }}</td>
            <td>{{ producto.Cantidad }}</td>
            <td>{{ producto.Categoria ?? producto['Categoría'] }}</td>
            <td>
              <a :href="producto.URL" target="_blank" class="link">
                Ver Imagen
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!loading && !error && productos.length === 0" class="mensaje">
      No hay productos cargados.
    </p>

    <div class="footer-bar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import AdminNav from "./AdminNav.vue";

const productos = ref<any[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const resp = await axios.get("/api/productos"); 
    if (resp.data?.success && Array.isArray(resp.data.data)) {
      productos.value = resp.data.data;
    } else {
      error.value = "Respuesta inesperada del servidor";
    }
  } catch (e: any) {
    error.value = e?.message?.includes("Network") 
      ? "No se pudo conectar al backend"
      : "Error al cargar productos";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.admin-page {
  background-color: #fdf6e3;
  min-height: 100vh; /* 👈 asegura que ocupe toda la pantalla */
  display: flex;
  flex-direction: column;
}

.tabla-container {
  flex: 1; /* 👈 esto hace que la tabla ocupe el espacio disponible */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.footer-bar {
  width: 100%;
  height: 60px;
  background: #e66a2c;
  margin-top: auto; /* 👈 se pega al final siempre */
}

.admin-page {
  background-color: #fdf6e3;
  min-height: 100vh;
  padding: 20px;
}

.titulo {
  text-align: center;
  margin: 20px 0;
  color: #5b2c1b;
}

.tabla-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.tabla {
  border-collapse: collapse;
  width: 80%;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.tabla th,
.tabla td {
  border: 1px solid #5b2c1b;
  padding: 12px;
  text-align: center;
  color: #5b2c1b;
}

.tabla th {
  background: #f5b82e;
  color: #5b2c1b;
  font-weight: bold;
}

.tabla tr:nth-child(even) {
  background-color: #fdf6e3;
}

.link {
  color: #e66a2c;
  font-weight: bold;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.mensaje {
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
}

.error {
  color: red;
}

/* Footer naranja */
.footer-bar {
  margin-top: 40px;
  width: 100%;
  height: 60px;
  background: #e66a2c;
}
</style>
