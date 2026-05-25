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

  <div class="page">

    <h1>Alumnos</h1>

    <BaseCard titulo="Agregar alumno">

      <div class="d-flex flex-wrap gap-2">

        <input
          v-model="nombre"
          type="text"
          placeholder="Nombre"
          class="form-control"
        />

        <input
          v-model="carrera"
          type="text"
          placeholder="Carrera"
          class="form-control"
        />

        <button
          @click="agregarAlumno"
          class="btn btn-primary"
        >

          {{ alumnoEditando ? 'Guardar cambios' : 'Agregar' }}

        </button>

      </div>

    </BaseCard>

    <BaseCard titulo="Lista de alumnos">

      <ul class="list-group">

        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="alumno in alumnos"
          :key="alumno.id"
        >

          <span>
            {{ alumno.nombre }} - {{ alumno.carrera }}
          </span>

          <div>

            <button
              @click="editarAlumno(alumno)"
              class="btn btn-warning btn-sm me-2"
            >
              Editar
            </button>

            <button
              @click="eliminarAlumno(alumno.id)"
              class="btn btn-danger btn-sm"
            >
              Eliminar
            </button>

          </div>

        </li>

      </ul>

    </BaseCard>

  </div>

</template>