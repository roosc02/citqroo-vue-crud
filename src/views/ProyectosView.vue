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

      <input
        v-model="nombre"
        type="text"
        placeholder="Nombre"
      />

      <input
        v-model="descripcion"
        type="text"
        placeholder="Descripción"
      />

      <button @click="agregarProyecto">

        {{ proyectoEditando ? 'Guardar cambios' : 'Agregar' }}

      </button>

    </BaseCard>

    <BaseCard titulo="Lista de proyectos">

      <ul>

        <li v-for="proyecto in proyectos" :key="proyecto.id">

          {{ proyecto.nombre }} - {{ proyecto.descripcion }}

          <button @click="editarProyecto(proyecto)">
            Editar
          </button>

          <button @click="eliminarProyecto(proyecto.id)">
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