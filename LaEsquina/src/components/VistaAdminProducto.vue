<template>
  <div>
    <AdminNav />
    <h1>Listado de Productos</h1>

    <p v-if="loading">Cargando productos...</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <table v-if="!loading && !error" border="1" cellpadding="8">
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
          <td>{{ producto.Precio }}</td>
          <td>{{ producto.Cantidad }}</td>
          <!-- OJO: si tu columna se llama 'Categoría' con tilde, usá corchetes -->
          <td>{{ producto.Categoria ?? producto['Categoría'] }}</td>
          <td>{{ producto.URL }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && !error && productos.length === 0">No hay productos cargados.</p>
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
    const resp = await axios.get("/api/productos"); // pasa por el proxy de Vite
    console.log("GET /api/productos ->", resp.data); // 👈 LOG
    if (resp.data?.success && Array.isArray(resp.data.data)) {
      productos.value = resp.data.data;
    } else {
      error.value = "Respuesta inesperada del servidor";
    }
  } catch (e: any) {
    console.error("Error cargando productos:", e);
    error.value = e?.message?.includes("Network") 
      ? "No se pudo conectar al backend"
      : "Error al cargar productos";
  } finally {
    loading.value = false;
  }
});
</script>
