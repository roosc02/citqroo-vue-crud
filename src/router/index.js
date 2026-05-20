import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AlumnosView from "../views/AlumnosView.vue";
import ProyectosView from "../views/ProyectosView.vue";
import ParticipacionesView from "../views/ParticipacionesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/alumnos",
    name: "alumnos",
    component: AlumnosView,
  },
  {
    path: "/proyectos",
    name: "proyectos",
    component: ProyectosView,
  },
  {
    path: "/participaciones",
    name: "participaciones",
    component: ParticipacionesView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;