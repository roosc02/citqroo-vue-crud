<script setup>

defineProps({
  titulo: String
})

</script>

<template>
  <div class="card">

    <h2>{{ titulo }}</h2>

    <slot></slot>

  </div>
</template>

<style scoped>

.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
}

button {
  margin-top: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-top: 10px;
}

</style>