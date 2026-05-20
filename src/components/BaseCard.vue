<script setup>

defineProps({
  titulo: String
})

const emit = defineEmits(['saludar'])

function enviarSaludo() {
  emit('saludar')
}

</script>

<template>
  <div class="card">

    <h2>{{ titulo }}</h2>

    <slot></slot>

    <button @click="enviarSaludo">
      Saludar
    </button>

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
</style>