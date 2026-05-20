<script setup>

defineProps({
  titulo: String
})

</script>

<template>

  <div class="card shadow border-0 mb-4 rounded-4">

    <div class="card-body p-4">

      <h3 class="card-title fw-bold mb-4">
        {{ titulo }}
      </h3>

      <slot></slot>

    </div>

  </div>

</template>