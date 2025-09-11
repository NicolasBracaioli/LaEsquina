<template>
    <nav class="navbar">
      <div class="nav-left">
        <h2>Panel de Administrador</h2>
      </div>
      <div class="nav-right">
        <!-- Botones CRUD -->
        <button @click="$router.push('/admin')">Ver Productos</button>
        <button @click="$router.push('/admin/insertar')">Añadir</button>
        <button @click="$router.push('/admin/modificar')">Editar</button>
        <button @click="$router.push('/admin/eliminar')">Eliminar</button>
  
        <!-- Botón de cerrar sesión -->
        <button class="logout" @click="logout">Cerrar sesión</button>
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
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: #333;
    color: white;
  }
  
  .nav-left h2 {
    margin: 0;
    font-size: 18px;
  }
  
  .nav-right button {
    margin-left: 10px;
    padding: 8px 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .nav-right button:hover {
    background: #0056b3;
  }
  
  .logout {
    background: #d9534f !important;
  }
  
  .logout:hover {
    background: #c9302c !important;
  }
  </style>
  