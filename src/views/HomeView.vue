<script setup>

import { ref, onMounted } from 'vue'
import api from '../services/api'

const totalAlumnos = ref(0)
const totalProyectos = ref(0)
const totalParticipaciones = ref(0)

async function obtenerDatos() {

  try {

    const alumnos = await api.get('/alumnos')
    totalAlumnos.value = alumnos.data.length

    const proyectos = await api.get('/proyectos')
    totalProyectos.value = proyectos.data.length

    const participaciones = await api.get('/participaciones')
    totalParticipaciones.value = participaciones.data.length

  } catch (error) {

    console.log(error)

  }

}

onMounted(() => {

  obtenerDatos()

})

</script>

<template>

  <div class="page">

    <div class="text-center mb-5">

      <h1 class="fw-bold">
        Sistema CITQROO
      </h1>

      <p class="text-muted">
        Gestión de alumnos, proyectos y participaciones
      </p>

    </div>

    <div class="row g-4">

      <div class="col-md-4">

        <div class="card shadow border-0 rounded-4 text-center p-4">

          <h2 class="fw-bold text-primary">
            {{ totalAlumnos }}
          </h2>

          <p class="mb-0">
            Alumnos
          </p>

        </div>

      </div>

      <div class="col-md-4">

        <div class="card shadow border-0 rounded-4 text-center p-4">

          <h2 class="fw-bold text-success">
            {{ totalProyectos }}
          </h2>

          <p class="mb-0">
            Proyectos
          </p>

        </div>

      </div>

      <div class="col-md-4">

        <div class="card shadow border-0 rounded-4 text-center p-4">

          <h2 class="fw-bold text-danger">
            {{ totalParticipaciones }}
          </h2>

          <p class="mb-0">
            Participaciones
          </p>

        </div>

      </div>

    </div>

  </div>

</template>