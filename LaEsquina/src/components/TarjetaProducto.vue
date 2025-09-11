<template>
  <div class="product-card">
    <img class="product-image" src="@/assets/default-product.png" alt="Producto" />
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-category">Categoría: {{ product.category }}</p>
      <p class="product-price">Precio: {{ product.price }}</p>
      <p class="product-quantity">Cantidad: {{ product.quantity }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  }
};
</script>

<style scoped>
.product-card {
  background-color: #FFFFFF; /* Blanco */
  border-radius: 10px;
  width: 200px;
  margin: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.product-info {
  margin-top: 10px;
}

.product-name {
  font-size: 18px;
  color: #5B2C1B; /* Marrón oscuro */
  font-weight: bold;
}

.product-category, .product-price, .product-quantity {
  font-size: 14px;
  color: #5B2C1B;
}
</style>