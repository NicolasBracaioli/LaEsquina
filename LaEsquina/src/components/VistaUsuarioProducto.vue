<template>
  <div>
    <h1>Vista Usuario</h1>
    <p>Bienvenido al panel de usuario 🎉</p>
    <button @click="logout">Cerrar sesión</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  router.push("/");
};
</script>
