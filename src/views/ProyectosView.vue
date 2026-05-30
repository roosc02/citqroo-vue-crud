<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import BaseCard from '../components/BaseCard.vue'

const proyectos = ref([])

const nombre = ref('')
const descripcion = ref('')
const busqueda = ref('')

const proyectoEditando = ref(null)

const proyectosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  if (!texto) {
    return proyectos.value
  }

  return proyectos.value.filter(proyecto =>
    proyecto.nombre.toLowerCase().includes(texto) ||
    proyecto.descripcion.toLowerCase().includes(texto)
  )
})

async function obtenerProyectos() {
  try {
    const response = await api.get('/proyectos')
    proyectos.value = response.data
  } catch (error) {
    console.log(error)
    alert('Error al obtener proyectos')
  }
}

async function agregarProyecto() {
  if (!nombre.value.trim() || !descripcion.value.trim()) {
    alert('Completa los campos')
    return
  }

  try {
    const nuevoProyecto = {
      nombre: nombre.value.trim(),
      descripcion: descripcion.value.trim()
    }

    if (proyectoEditando.value) {
      await api.put(
        `/proyectos/${proyectoEditando.value.id}`,
        nuevoProyecto
      )

      proyectoEditando.value = null
    } else {
      await api.post('/proyectos', nuevoProyecto)
    }

    await obtenerProyectos()

    nombre.value = ''
    descripcion.value = ''
  } catch (error) {
    console.log(error)
    alert('Error al guardar proyecto')
  }
}

async function eliminarProyecto(id) {
  const confirmar = confirm('¿Seguro que deseas eliminar este proyecto?')

  if (!confirmar) {
    return
  }

  try {
    await api.delete(`/proyectos/${id}`)
    await obtenerProyectos()
  } catch (error) {
    console.log(error)
    alert('Error al eliminar proyecto')
  }
}

function editarProyecto(proyecto) {
  nombre.value = proyecto.nombre
  descripcion.value = proyecto.descripcion
  proyectoEditando.value = proyecto
}

function cancelarEdicion() {
  nombre.value = ''
  descripcion.value = ''
  proyectoEditando.value = null
}

onMounted(() => {
  obtenerProyectos()
})
</script>

<template>
  <div class="page">
    <h1>Proyectos</h1>

    <BaseCard :titulo="proyectoEditando ? 'Editar proyecto' : 'Agregar proyecto'">
      <div class="d-flex flex-wrap gap-2">
        <input
          v-model="nombre"
          type="text"
          placeholder="Nombre"
          class="form-control"
        />

        <input
          v-model="descripcion"
          type="text"
          placeholder="Descripción"
          class="form-control"
        />

        <button
          @click="agregarProyecto"
          class="btn btn-primary"
        >
          {{ proyectoEditando ? 'Guardar cambios' : 'Agregar' }}
        </button>

        <button
          v-if="proyectoEditando"
          @click="cancelarEdicion"
          class="btn btn-secondary"
        >
          Cancelar
        </button>
      </div>
    </BaseCard>

    <BaseCard titulo="Buscar proyectos">
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por nombre o descripción"
        class="form-control"
      />
    </BaseCard>

    <BaseCard titulo="Lista de proyectos">
      <p
        v-if="proyectosFiltrados.length === 0"
        class="text-muted"
      >
        No hay proyectos registrados o no se encontraron coincidencias
      </p>

      <ul
        v-else
        class="list-group"
      >
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="proyecto in proyectosFiltrados"
          :key="proyecto.id"
        >
          <span>
            {{ proyecto.nombre }} - {{ proyecto.descripcion }}
          </span>

          <div>
            <button
              @click="editarProyecto(proyecto)"
              class="btn btn-warning btn-sm me-2"
            >
              Editar
            </button>

            <button
              @click="eliminarProyecto(proyecto.id)"
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