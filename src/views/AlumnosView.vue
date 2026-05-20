<script setup>

import { ref, onMounted } from 'vue'
import api from '../services/api'
import BaseCard from '../components/BaseCard.vue'

const alumnos = ref([])

async function obtenerAlumnos() {

  try {

    const response = await api.get('/alumnos')

    alumnos.value = response.data

  } catch (error) {

    console.log(error)

  }

}

onMounted(() => {

  obtenerAlumnos()

})

</script>

<template>

  <div>

    <h1>Alumnos</h1>

    <BaseCard titulo="Lista de alumnos">

      <ul>

        <li v-for="alumno in alumnos" :key="alumno.id">

          {{ alumno.nombre }} - {{ alumno.carrera }}

        </li>

      </ul>
      

    </BaseCard>

  </div>

</template>