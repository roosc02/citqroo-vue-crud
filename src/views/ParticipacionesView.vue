<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import BaseCard from '../components/BaseCard.vue'

const alumnos = ref([])
const proyectos = ref([])
const participaciones = ref([])

const alumnoId = ref('')
const proyectoId = ref('')
const busqueda = ref('')

const participacionesFiltradas = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  if (!texto) {
    return participaciones.value
  }

  return participaciones.value.filter(participacion => {
    const nombreAlumno = obtenerNombreAlumno(participacion.alumnoId).toLowerCase()
    const nombreProyecto = obtenerNombreProyecto(participacion.proyectoId).toLowerCase()

    return (
      nombreAlumno.includes(texto) ||
      nombreProyecto.includes(texto)
    )
  })
})

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
    alert('Error al cargar los datos')
  }
}

async function agregarParticipacion() {
  if (!alumnoId.value || !proyectoId.value) {
    alert('Selecciona un alumno y un proyecto')
    return
  }

  const yaExiste = participaciones.value.some(participacion =>
    String(participacion.alumnoId) === String(alumnoId.value) &&
    String(participacion.proyectoId) === String(proyectoId.value)
  )

  if (yaExiste) {
    alert('Esta participación ya existe')
    return
  }

  try {
    const nuevaParticipacion = {
      alumnoId: alumnoId.value,
      proyectoId: proyectoId.value
    }

    await api.post('/participaciones', nuevaParticipacion)

    await obtenerDatos()

    alumnoId.value = ''
    proyectoId.value = ''
  } catch (error) {
    console.log(error)
    alert('Error al agregar la participación')
  }
}

async function eliminarParticipacion(id) {
  const confirmar = confirm('¿Seguro que deseas eliminar esta participación?')

  if (!confirmar) {
    return
  }

  try {
    await api.delete(`/participaciones/${id}`)

    await obtenerDatos()
  } catch (error) {
    console.log(error)
    alert('Error al eliminar la participación')
  }
}

function obtenerNombreAlumno(id) {
  const alumno = alumnos.value.find(a => String(a.id) === String(id))
  return alumno ? alumno.nombre : 'Alumno no encontrado'
}

function obtenerNombreProyecto(id) {
  const proyecto = proyectos.value.find(p => String(p.id) === String(id))
  return proyecto ? proyecto.nombre : 'Proyecto no encontrado'
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

    <BaseCard titulo="Buscar participaciones">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por alumno o proyecto"
        class="form-control"
      />
    </BaseCard>

    <BaseCard titulo="Lista de participaciones">
      <p
        v-if="participacionesFiltradas.length === 0"
        class="text-muted"
      >
        No hay participaciones registradas o no se encontraron coincidencias
      </p>

      <ul
        v-else
        class="list-group"
      >
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="participacion in participacionesFiltradas"
          :key="participacion.id"
        >
          <span>
            <strong>
              {{ obtenerNombreAlumno(participacion.alumnoId) }}
            </strong>

            participa en

            <strong>
              {{ obtenerNombreProyecto(participacion.proyectoId) }}
            </strong>
          </span>

          <button
            class="btn btn-danger btn-sm"
            @click="eliminarParticipacion(participacion.id)"
          >
            Eliminar
          </button>
        </li>
      </ul>
    </BaseCard>
  </div>
</template>