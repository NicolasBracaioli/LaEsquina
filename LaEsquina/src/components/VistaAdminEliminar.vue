<template>
  <div>
    <AdminNav />
    <h1>Eliminar Producto</h1>

    <form @submit.prevent="eliminarProducto">
      <input v-model="id" type="number" placeholder="ID del producto" required />
      <button type="submit">Eliminar</button>
    </form>

    <p v-if="mensaje" :style="{ color: esError ? 'red' : 'green' }">
      {{ mensaje }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import AdminNav from "./AdminNav.vue";

const id = ref<number | null>(null);
const mensaje = ref("");
const esError = ref(false);

const eliminarProducto = async () => {
  try {
    const resp = await axios.delete(`/api/productos/${id.value}`);
    mensaje.value = resp.data.message;   // ✅ mensaje correcto del backend
    esError.value = !resp.data.success;
  } catch (e: any) {
    console.error("Error al eliminar:", e.response?.data || e.message);
    mensaje.value =
      e.response?.data?.message || e.message || "Error desconocido"; // ✅ mensaje real
    esError.value = true;
  }
};
</script>
