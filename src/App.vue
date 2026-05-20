<script setup>
</script>

<template>

  <div class="app">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">

      <div class="container">

        <RouterLink class="navbar-brand fw-bold text-white" to="/">
          Sistema CITQROO
        </RouterLink>

        <div class="navbar-nav">

          <RouterLink class="nav-link text-white" to="/">
            Home
          </RouterLink>

          <RouterLink class="nav-link text-white" to="/alumnos">
            Alumnos
          </RouterLink>

          <RouterLink class="nav-link text-white" to="/proyectos">
            Proyectos
          </RouterLink>

          <RouterLink class="nav-link text-white" to="/participaciones">
            Participaciones
          </RouterLink>

        </div>

      </div>

    </nav>

    <div class="container mt-5">

      <RouterView />

    </div>

  </div>

</template>

<style scoped>

.app {
  min-height: 100vh;
  background-color: #f4f6f9;
}

</style>