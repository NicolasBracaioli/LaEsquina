<template>
  <div>
    <!-- Navbar -->
    <div class="navbar">
      <button @click="$router.push('/usuario')">Productos</button>

      <div class="nav-right">
        <button class="logout" @click="logout">Cerrar sesión</button>

        <!-- Logo arriba a la derecha -->
        <div class="logo-wrap" title="La Esquina">
          <img src="@/assets/Logo.jpg" alt="La Esquina" class="logo" />
        </div>
      </div>
    </div>

    <h1 class="titulo">Productos</h1>

    <!-- Filtro por categoría -->
    <div class="filtro">
      <label for="categoria"><strong>Categoría</strong></label> <br>
      <select v-model="categoriaSeleccionada" id="categoria">
        <option value="">Todas</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <!-- Mensajes -->
    <p v-if="loading">Cargando productos...</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <!-- Grid de tarjetas -->
    <div v-if="!loading && !error" class="grid">
      <TarjetaProducto
        v-for="p in productosFiltrados"
        :key="p.ID_Product"
        :product="p"
      />
    </div>

    <p v-if="!loading && !error && productosFiltrados.length === 0">
      No hay productos disponibles en esta categoría.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import TarjetaProducto from "./TarjetaProducto.vue";

const router = useRouter();

const productos = ref<any[]>([]);
const categorias = ref<string[]>([]);
const categoriaSeleccionada = ref<string>("");

const loading = ref(true);
const error = ref("");

// Fetch productos
onMounted(async () => {
  try {
    const resp = await axios.get("/api/productos");
    if (resp.data.success) {
      productos.value = resp.data.data;
      categorias.value = [...new Set(productos.value.map((p: any) => p.Categoria))];
    } else {
      error.value = resp.data.message || "Error cargando productos";
    }
  } catch (e: any) {
    error.value = e.message || "Error desconocido al cargar productos";
  } finally {
    loading.value = false;
  }
});

// Filtrar
const productosFiltrados = computed(() => {
  if (!categoriaSeleccionada.value) return productos.value;
  return productos.value.filter((p: any) => p.Categoria === categoriaSeleccionada.value);
});

// Logout
const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  router.push("/");
};
</script>

<style scoped>
/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #5b2c1b; /* marrón oscuro */
  color: #fff;
}

.navbar button {
  background: #f5b82e;     /* amarillo principal */
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #5b2c1b;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.navbar button:hover {
  background: #e6a82c;
  transform: translateY(-1px);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logout {
  background: #e66a2c !important;
  color: #fff !important;
  border-radius: 12px;
  padding: 12px 20px;
}

.logout:hover {
  background: #cc5520 !important;
}

/* LOGO – igual que en admin */
.logo-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid #f5b82e;   /* aro amarillo */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;            /* recorta cualquier borde blanco del JPG */
  background: #5b2c1b;         /* mismo fondo que el navbar */
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;           /* rellena sin deformar */
  display: block;
  border-radius: 50%;
}

/* TITULO */
.titulo {
  text-align: center;
  margin: 20px 0 10px;
  color: #5b2c1b;
  font-size: 32px;
  font-weight: 800;
}

/* FILTRO */
.filtro {
  text-align: center;
  margin-bottom: 18px;
}

.filtro select {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  outline: none;
}

/* GRID DE TARJETAS (más aire entre cards) */
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;          /* separación entre tarjetas */
  padding: 24px;
  max-width: 1280px;  /* evita que se estire infinito */
  margin: 0 auto;     /* centrado */
}

@media (min-width: 1400px) {
  .grid { gap: 36px; max-width: 1360px; }
}

@media (max-width: 640px) {
  .grid { gap: 20px; padding: 16px; }
}
</style>
