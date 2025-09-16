<template>
  <div class="admin-page">
    <AdminNav />

    <div class="card">
      <div class="card-header">
        <h2>Insertando producto</h2>
        <button class="close" title="Volver" @click="$router.push('/admin')">×</button>
      </div>

      <form class="form" @submit.prevent="agregarProducto">
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="nombre" type="text" required />
        </div>

        <div class="form-group">
          <label>Cantidad <span class="req">*</span></label>
          <input v-model.number="cantidad" type="number" min="0" required />
        </div>

        <div class="form-group">
          <label>Categoría</label>
          <input v-model="categoria" type="text" required />
        </div>

        <div class="form-group">
          <label>Precio</label>
          <input v-model.number="precio" type="number" min="0" step="0.01" required />
        </div>

        <div class="form-group">
          <label>Imagen (Inserte URL)</label>
          <input v-model="url" type="url" />
        </div>

        <div class="actions">
          <button type="submit" :disabled="loading">
            {{ loading ? 'Guardando...' : 'Enviar' }}
          </button>
        </div>

        <p v-if="mensaje" :class="exito ? 'msg ok' : 'msg err'">{{ mensaje }}</p>
      </form>
    </div>

    <div class="footer-bar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import AdminNav from "./AdminNav.vue";

const nombre = ref("");
const precio = ref<number | null>(null);
const cantidad = ref<number | null>(null);
const categoria = ref("");
const url = ref("");
const mensaje = ref("");
const exito = ref(false);
const loading = ref(false);

const resetForm = () => {
  nombre.value = "";
  precio.value = null;
  cantidad.value = null;
  categoria.value = "";
  url.value = "";
};

const agregarProducto = async () => {
  mensaje.value = "";
  exito.value = false;
  loading.value = true;
  try {
    const resp = await axios.post("/api/productos", {
      Nombre: nombre.value,
      Precio: precio.value,
      Cantidad: cantidad.value,
      Categoria: categoria.value,
      URL: url.value,
    });
    exito.value = !!resp.data?.success;
    mensaje.value = resp.data?.message || "Producto insertado correctamente";
    if (exito.value) resetForm();
  } catch (e: any) {
    exito.value = false;
    mensaje.value =
      e?.response?.data?.message || "Error al insertar producto";
    console.error("Insertar producto:", e?.response?.data || e.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.admin-page {
  background-color: #fdf6e3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.card {
  background: #ffffff;
  width: 600px; /* 👈 más ancho */
  margin: 40px auto 0;
  padding: 28px 32px 20px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.card-header h2 {
  margin: 0 0 12px;
  color: #5b2c1b;
  font-size: 20px;
  font-weight: bold;
}
.close {
  position: absolute;
  right: 10px;
  top: 0;
  background: transparent;
  border: none;
  color: #5b2c1b;
  font-size: 20px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 6px;
}
.close:hover {
  background: rgba(91, 44, 27, 0.08);
}

.form {
  margin-top: 8px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
label {
  font-size: 14px;
  color: #5b2c1b;
  font-weight: 600;
}
.req {
  color: #e66a2c;
}
input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #c8b8a8;
  border-radius: 8px;
  background: #ffffff;
  color: #5b2c1b;
}
input:focus {
  border-color: #e66a2c;
  box-shadow: 0 0 0 2px rgba(230, 106, 44, 0.15);
  outline: none;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}
button[type="submit"] {
  background: #f5b82e;
  color: #5b2c1b;
  border: none;
  padding: 10px 22px;
  border-radius: 20px;
  min-width: 140px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.25s ease;
}
button[type="submit"]:hover {
  background: #e6a82c;
  transform: translateY(-1px);
}
button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.msg {
  text-align: center;
  margin: 12px 0 2px;
  font-size: 14px;
}
.ok {
  color: #1f8f3a;
}
.err {
  color: #c0392b;
}

.footer-bar {
  margin-top: auto;
  width: 100%;
  height: 60px;
  background: #e66a2c;
}
</style>
