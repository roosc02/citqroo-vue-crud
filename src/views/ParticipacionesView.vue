<script setup>

import { ref, onMounted } from 'vue'
import api from '../services/api'
import BaseCard from '../components/BaseCard.vue'

const alumnos = ref([])
const proyectos = ref([])
const participaciones = ref([])

const alumnoId = ref('')
const proyectoId = ref('')

async function obtenerDatos() {

  try {

    const alumnosResponse = await api.get('/alumnos')
    alumnos.value = alumnosResponse.data

    const proyectosResponse = await api.get('/proyectos')
    proyectos.value = proyectosResponse.data

    const participacionesResponse = await api.get('/participaciones')
    participaciones.value = participacionesResponse.data

  } catch (error) {

    console.log(error)

  }

}

async function agregarParticipacion() {

  if (alumnoId.value === '' || proyectoId.value === '') {

    alert('Selecciona alumno y proyecto')

    return

  }

  try {

    const nuevaParticipacion = {
      alumnoId: Number(alumnoId.value),
      proyectoId: Number(proyectoId.value)
    }

    await api.post('/participaciones', nuevaParticipacion)

    obtenerDatos()

    alumnoId.value = ''
    proyectoId.value = ''

  } catch (error) {

    console.log(error)

  }

}

function obtenerNombreAlumno(id) {

  const alumno = alumnos.value.find(
    a => Number(a.id) === Number(id)
  )

  return alumno ? alumno.nombre : 'Alumno'

}

function obtenerNombreProyecto(id) {

  const proyecto = proyectos.value.find(
    p => Number(p.id) === Number(id)
  )

  return proyecto ? proyecto.nombre : 'Proyecto'

}

onMounted(() => {

  obtenerDatos()

})

</script>

<template>

  <div class="page">

    <h1>Participaciones</h1>

    <BaseCard titulo="Agregar participación">

      <div class="d-flex flex-wrap gap-2">

        <select
          v-model="alumnoId"
          class="form-select"
        >

          <option disabled value="">
            Selecciona un alumno
          </option>

          <option
            v-for="alumno in alumnos"
            :key="alumno.id"
            :value="alumno.id"
          >
            {{ alumno.nombre }}
          </option>

        </select>

        <select
          v-model="proyectoId"
          class="form-select"
        >

          <option disabled value="">
            Selecciona un proyecto
          </option>

          <option
            v-for="proyecto in proyectos"
            :key="proyecto.id"
            :value="proyecto.id"
          >
            {{ proyecto.nombre }}
          </option>

        </select>

        <button
          @click="agregarParticipacion"
          class="btn btn-primary"
        >
          Agregar
        </button>

      </div>

    </BaseCard>

    <BaseCard titulo="Lista de participaciones">

      <ul class="list-group">

        <li
          class="list-group-item"
          v-for="participacion in participaciones"
          :key="participacion.id"
        >

          <strong>
            {{ obtenerNombreAlumno(participacion.alumnoId) }}
          </strong>

          participa en

          <strong>
            {{ obtenerNombreProyecto(participacion.proyectoId) }}
          </strong>

        </li>

      </ul>

    </BaseCard>

  </div>

</template>