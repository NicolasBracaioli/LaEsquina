<template>
  <div class="login-container">
    <h1>Bienvenido</h1>
    <form @submit.prevent="enviar">
      <div>
        <label>Usuario</label>
        <input type="text" v-model="Nombre" required />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" v-model="Contrasena" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
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

        console.log("Respuesta del back:", response.data);

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
.login-container {
  width: 300px;
  margin: 100px auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 5px;
}
button {
  padding: 5px 10px;
}
</style>
