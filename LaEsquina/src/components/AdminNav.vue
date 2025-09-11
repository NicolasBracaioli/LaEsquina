<template>
  <nav class="navbar">
    <div class="nav-left">
      <h2>Panel de Administrador</h2>
    </div>

    <div class="nav-right">
      <!-- Botones CRUD -->
      <button @click="$router.push('/admin')">Productos</button>
      <button @click="$router.push('/admin/insertar')">Insertar</button>
      <button @click="$router.push('/admin/modificar')">Modificar</button>
      <button @click="$router.push('/admin/eliminar')">Eliminar</button>

      <!-- Botón de cerrar sesión -->
      <button class="logout" @click="logout">Cerrar sesión</button>

      <!-- Logo -->
<!-- Logo -->
<div class="logo-wrap">
  <img src="@/assets/Logo.png" alt="Logo" class="logo" />
</div>


    </div>
  </nav>
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

<style scoped>
/* Barra superior */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #5b2c1b; /* Marrón oscuro */
  color: white;
}

/* Título izquierda */
.nav-left h2 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Contenedor botones */
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Botones generales */
.nav-right button {
  padding: 10px 20px;
  background: #f5b82e; /* Amarillo principal */
  color: #5b2c1b; /* Marrón texto */
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-right button:hover {
  background: #e6a82c;
  transform: scale(1.05);
}

/* Botón cerrar sesión */
.logout {
  background: #e66a2c !important;
  color: #fff !important;
  border-radius: 8px;
}

.logout:hover {
  background: #cc5520 !important;
}

/* ===================== */
/* Logo circular recortado */
/* ===================== */
/* Contenedor del logo */
.logo-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #f5b82e; /* aro amarillo */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #5b2c1b; /* mismo fondo que navbar */
}

/* Imagen del logo */
.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;   /* rellena sin deformar */
  display: block;
  border-radius: 50%;
}


</style>
