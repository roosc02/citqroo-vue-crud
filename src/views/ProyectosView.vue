<script setup>

import { ref, onMounted } from 'vue'
import api from '../services/api'
import BaseCard from '../components/BaseCard.vue'

const proyectos = ref([])

const nombre = ref('')
const descripcion = ref('')

const proyectoEditando = ref(null)

async function obtenerProyectos() {

  try {

    const response = await api.get('/proyectos')

    proyectos.value = response.data

  } catch (error) {

    console.log(error)

  }

}

async function agregarProyecto() {

  if (!nombre.value || !descripcion.value) {

    alert('Completa los campos')

    return

  }

  try {

    const nuevoProyecto = {
      nombre: nombre.value,
      descripcion: descripcion.value
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

    obtenerProyectos()

    nombre.value = ''
    descripcion.value = ''

  } catch (error) {

    console.log(error)

  }

}

async function eliminarProyecto(id) {

  try {

    await api.delete(`/proyectos/${id}`)

    obtenerProyectos()

  } catch (error) {

    console.log(error)

  }

}

function editarProyecto(proyecto) {

  nombre.value = proyecto.nombre
  descripcion.value = proyecto.descripcion

  proyectoEditando.value = proyecto

}

onMounted(() => {

  obtenerProyectos()

})

</script>

<template>

  <div class="page">

    <h1>Proyectos</h1>

    <BaseCard titulo="Agregar proyecto">

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

      </div>

    </BaseCard>

    <BaseCard titulo="Lista de proyectos">

      <ul class="list-group">

        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="proyecto in proyectos"
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