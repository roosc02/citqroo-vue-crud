<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import BaseCard from '../components/BaseCard.vue'

const alumnos = ref([])

const nombre = ref('')
const carrera = ref('')
const busqueda = ref('')

const alumnoEditando = ref(null)

const alumnosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  if (!texto) {
    return alumnos.value
  }

  return alumnos.value.filter(alumno =>
    alumno.nombre.toLowerCase().includes(texto) ||
    alumno.carrera.toLowerCase().includes(texto)
  )
})

async function obtenerAlumnos() {
  try {
    const response = await api.get('/alumnos')
    alumnos.value = response.data
  } catch (error) {
    console.log(error)
    alert('Error al obtener alumnos')
  }
}

async function agregarAlumno() {
  if (!nombre.value.trim() || !carrera.value.trim()) {
    alert('Completa los campos')
    return
  }

  try {
    const nuevoAlumno = {
      nombre: nombre.value.trim(),
      carrera: carrera.value.trim()
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

    await obtenerAlumnos()

    nombre.value = ''
    carrera.value = ''
  } catch (error) {
    console.log(error)
    alert('Error al guardar alumno')
  }
}

async function eliminarAlumno(id) {
  const confirmar = confirm('¿Seguro que deseas eliminar este alumno?')

  if (!confirmar) {
    return
  }

  try {
    await api.delete(`/alumnos/${id}`)
    await obtenerAlumnos()
  } catch (error) {
    console.log(error)
    alert('Error al eliminar alumno')
  }
}

function editarAlumno(alumno) {
  nombre.value = alumno.nombre
  carrera.value = alumno.carrera
  alumnoEditando.value = alumno
}

function cancelarEdicion() {
  nombre.value = ''
  carrera.value = ''
  alumnoEditando.value = null
}

onMounted(() => {
  obtenerAlumnos()
})
</script>

<template>
  <div class="page">
    <h1>Alumnos</h1>

    <BaseCard :titulo="alumnoEditando ? 'Editar alumno' : 'Agregar alumno'">
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

        <button
          v-if="alumnoEditando"
          @click="cancelarEdicion"
          class="btn btn-secondary"
        >
          Cancelar
        </button>
      </div>
    </BaseCard>

    <BaseCard titulo="Buscar alumnos">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por nombre o carrera"
        class="form-control"
      />
    </BaseCard>

    <BaseCard titulo="Lista de alumnos">
      <p
        v-if="alumnosFiltrados.length === 0"
        class="text-muted"
      >
        No hay alumnos registrados o no se encontraron coincidencias
      </p>

      <ul
        v-else
        class="list-group"
      >
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="alumno in alumnosFiltrados"
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