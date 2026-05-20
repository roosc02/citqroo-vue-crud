<template>
  <div>
    <h1>Sistema CITQROO</h1>

    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/alumnos">Alumnos</RouterLink> |
      <RouterLink to="/proyectos">Proyectos</RouterLink> |
      <RouterLink to="/participaciones">
        Participaciones
      </RouterLink>
    </nav>

    <hr>

    <RouterView />
  </div>
</template>