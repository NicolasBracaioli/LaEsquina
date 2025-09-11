<template>
  <div>
    <AdminNav />
    <h1>Añadir Producto</h1>

    <form @submit.prevent="agregarProducto">
      <input v-model="nombre" placeholder="Nombre" required />
      <input v-model="precio" type="number" placeholder="Precio" required />
      <input v-model="cantidad" type="number" placeholder="Cantidad" required />
      <input v-model="categoria" placeholder="Categoría" required />
      <input v-model="url" placeholder="URL imagen" />
      <button type="submit">Guardar</button>
    </form>

    <p v-if="mensaje" style="color: green">{{ mensaje }}</p>
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

const agregarProducto = async () => {
  try {
    const resp = await axios.post("/api/productos", {
      Nombre: nombre.value,
      Precio: precio.value,
      Cantidad: cantidad.value,
      Categoria: categoria.value,
      URL: url.value
    });
    mensaje.value = resp.data.message;
    nombre.value = "";
    precio.value = null;
    cantidad.value = null;
    categoria.value = "";
    url.value = "";
  } catch (e) {
    mensaje.value = "Error al insertar producto";
  }
};
</script>
