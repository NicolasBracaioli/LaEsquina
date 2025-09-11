<template>
  <div>
    <AdminNav />
    <h1>Modificar Producto</h1>

    <form @submit.prevent="modificarProducto">
      <input v-model="id" type="number" placeholder="ID del producto" required />
      <input v-model="nombre" placeholder="Nuevo nombre" />
      <input v-model="precio" type="number" placeholder="Nuevo precio" />
      <input v-model="cantidad" type="number" placeholder="Nuevo stock" />
      <input v-model="categoria" placeholder="Nueva categoría" />
      <input v-model="url" placeholder="Nueva URL" />
      <button type="submit">Actualizar</button>
    </form>

    <p v-if="mensaje" style="color: green">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import AdminNav from "./AdminNav.vue";

const id = ref<number | null>(null);
const nombre = ref("");
const precio = ref<number | null>(null);
const cantidad = ref<number | null>(null);
const categoria = ref("");
const url = ref("");
const mensaje = ref("");

const modificarProducto = async () => {
  try {
    const resp = await axios.put(`/api/productos/${id.value}`, {
      Nombre: nombre.value,
      Precio: precio.value,
      Cantidad: cantidad.value,
      Categoria: categoria.value,
      URL: url.value
    });
    mensaje.value = resp.data.message;
  } catch (e) {
    mensaje.value = "Error al actualizar producto";
  }
};
</script>
