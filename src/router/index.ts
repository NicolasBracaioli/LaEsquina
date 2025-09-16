import { createRouter, createWebHistory } from "vue-router";
import VistaLog from "@/components/VistaLog.vue";
import VistaAdminProducto from "@/components/VistaAdminProducto.vue";
import VistaAdminInsertar from "@/components/VistaAdminInsertar.vue";
import VistaAdminModificar from "@/components/VistaAdminModificar.vue";
import VistaAdminEliminar from "@/components/VistaAdminEliminar.vue";
import VistaUsuarioProducto from "@/components/VistaUsuarioProducto.vue";

const routes = [
  { path: "/", name: "login", component: VistaLog },
  { path: "/admin", name: "adminProductos", component: VistaAdminProducto },
  { path: "/admin/insertar", name: "adminInsertar", component: VistaAdminInsertar },
  { path: "/admin/modificar", name: "adminModificar", component: VistaAdminModificar },
  { path: "/admin/eliminar", name: "adminEliminar", component: VistaAdminEliminar },
  { path: "/usuario", name: "usuario", component: VistaUsuarioProducto },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
