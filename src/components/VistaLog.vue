<template>
  <div class="login-page">
    <!-- Logo en esquina superior derecha -->
    <img src="@/assets/Logo.png" alt="La Esquina" class="logo" />

    <!-- Contenedor del formulario -->
    <div class="login-container">
      <img src="@/assets/Logo_Usuario.png" alt="Usuario" class="user-icon" />
      <h2>Bienvenido</h2>

      <form @submit.prevent="enviar">
        <div class="form-group">
          <label>Usuario</label>
          <input type="text" v-model="Nombre" required />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" v-model="Contrasena" required />
        </div>
        <button type="submit">Enviar</button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>

    <!-- Footer decorativo -->
    <div class="footer-bar"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const Nombre = ref("");
    const Contrasena = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    onMounted(() => {
      Nombre.value = "";
      Contrasena.value = "";
      errorMessage.value = "";
    });

    const enviar = async () => {
      errorMessage.value = "";
      try {
        const response = await axios.post("/api/login", {
          Nombre: Nombre.value,
          Contrasena: Contrasena.value,
        });

        if (response.data.success) {
          if (response.data.rol === "admin") {
            router.push("/admin");
          } else if (response.data.rol === "usuario") {
            router.push("/usuario");
          }
        } else {
          errorMessage.value = response.data.message || "Credenciales inválidas";
        }
      } catch (err: any) {
        errorMessage.value = "Error al conectarse al servidor";
        console.error("Error en login:", err);
      }
    };

    return { Nombre, Contrasena, enviar, errorMessage };
  },
});
</script>

<style scoped>
/* Fondo general */
.login-page {
  background-color: #fdf6e3;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Logo arriba a la derecha */
.logo {
  position: absolute;
  top: 20px;
  right: 20px;
  height: 70px;
}

/* Caja principal */
.login-container {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 320px;
}

.user-icon {
  width: 60px;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 20px;
  color: #5b2c1b;
}

/* Inputs */
.form-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  font-size: 14px;
  color: #5b2c1b;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

input:focus {
  border-color: #e66a2c;
}

/* Botón */
button {
  background-color: #f5b82e;
  color: #5b2c1b;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #e66a2c;
  color: #fff;
}

/* Error */
.error {
  margin-top: 10px;
  color: red;
}

/* Footer */
.footer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #e66a2c;
}
</style>
