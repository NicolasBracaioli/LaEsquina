<template>
  <div class="product-card">
    <img
      class="product-image"
      :src="product.URL && product.URL.trim() !== '' ? product.URL : defaultImage"
      alt="Producto"
    />
    <div class="product-info">
      <h3 class="product-name">{{ product.Nombre }}</h3>
      <p class="product-category">Categoría: <span>{{ product.Categoria }}</span></p>
      <p class="product-price">Precio: <span>${{ product.Precio }}</span></p>
      <p class="product-quantity">Cantidad: <span>{{ product.Cantidad }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultImage from "../assets/default-product.png";

defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.product-card {
  background: #ffffff;
  border-radius: 16px;
  width: 240px;
  padding: 18px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
  border: 1px solid #f5b82e22; /* borde sutil con color de la paleta */
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.15);
}

/* Imagen */
.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 2px solid #fdf6e3;
}

/* Info */
.product-info {
  margin-top: 6px;
  color: #5b2c1b;
}

/* Nombre */
.product-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #5b2c1b;
}

/* Datos */
.product-category,
.product-price,
.product-quantity {
  font-size: 14px;
  margin: 4px 0;
}

.product-category span,
.product-price span,
.product-quantity span {
  font-weight: 600;
  color: #e66a2c; /* resalta los valores */
}
</style>
