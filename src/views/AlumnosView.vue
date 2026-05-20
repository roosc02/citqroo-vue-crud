<script setup>

import { ref, onMounted } from 'vue'
import api from '../services/api'
import BaseCard from '../components/BaseCard.vue'

const alumnos = ref([])

const nombre = ref('')
const carrera = ref('')

const alumnoEditando = ref(null)

async function obtenerAlumnos() {

  try {

    const response = await api.get('/alumnos')

    alumnos.value = response.data

  } catch (error) {

    console.log(error)

  }

}

async function agregarAlumno() {

  if (!nombre.value || !carrera.value) {

    alert('Completa los campos')

    return

  }

  try {

    const nuevoAlumno = {
      nombre: nombre.value,
      carrera: carrera.value
    }

    if (alumnoEditando.value) {

      await api.put(
        `/alumnos/${alumnoEditando.value.id}`,
        nuevoAlumno
      )

      alumnoEditando.value = null

    } else {

      await api.post('/alumnos', nuevoAlumno)

    }

    obtenerAlumnos()

    nombre.value = ''
    carrera.value = ''

  } catch (error) {

    console.log(error)

  }

}

async function eliminarAlumno(id) {

  try {

    await api.delete(`/alumnos/${id}`)

    obtenerAlumnos()

  } catch (error) {

    console.log(error)

  }

}

function editarAlumno(alumno) {

  nombre.value = alumno.nombre
  carrera.value = alumno.carrera

  alumnoEditando.value = alumno

}

onMounted(() => {

  obtenerAlumnos()

})

</script>

<template>

  <div>

    <h1>Alumnos</h1>

    <BaseCard titulo="Agregar alumno">

      <input
        v-model="nombre"
        type="text"
        placeholder="Nombre"
      />

      <input
        v-model="carrera"
        type="text"
        placeholder="Carrera"
      />

      <button @click="agregarAlumno">

        {{ alumnoEditando ? 'Guardar cambios' : 'Agregar' }}

      </button>

    </BaseCard>

    <BaseCard titulo="Lista de alumnos">

      <ul>

        <li v-for="alumno in alumnos" :key="alumno.id">

          {{ alumno.nombre }} - {{ alumno.carrera }}

          <button @click="editarAlumno(alumno)">
            Editar
          </button>

          <button @click="eliminarAlumno(alumno.id)">
            Eliminar
          </button>

        </li>

      </ul>

    </BaseCard>

  </div>

</template>

<style scoped>

.page {
  max-width: 700px;
  margin: auto;
}

input {
  padding: 10px;
  margin-right: 10px;
  margin-top: 10px;
}

button {
  padding: 10px;
  margin-left: 5px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-top: 15px;
}

</style>