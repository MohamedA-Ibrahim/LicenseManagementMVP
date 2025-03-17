<template>
  <div class="app-container" v-if="currentUser">
    <nav class="sidebar">
      <div class="logo">
        <h1>LMS Admin</h1>
      </div>
      <ul class="nav-links">
        <li v-for="route in filteredRoutes" :key="route.path" :class="{ active: currentRoute === route.path }">
          <router-link :to="route.path">
            <i :class="route.icon"></i>
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </nav>
    <main class="main-content">
      <header class="top-header">
        <div class="user-menu">
          <span>{{ currentUser.name }}</span>
          <button @click="handleLogout" class="btn-logout">
            <i class="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </header>
      <div class="content-area">
        <router-view></router-view>
      </div>
    </main>
  </div>
  <router-view v-else></router-view>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from './stores/app'
import './assets/styles.css'

const route = useRoute()
const router = useRouter()
const store = useAppStore()

const currentRoute = computed(() => route.path)
const currentUser = computed(() => store.currentUser)

const allRoutes = [
  { path: '/', name: 'Dashboard', icon: 'fas fa-home', roles: ['admin'] },
  { path: '/users', name: 'Users', icon: 'fas fa-users', roles: ['admin'] },
  { path: '/licenses', name: 'Licenses', icon: 'fas fa-key', roles: ['admin'] },
  { path: '/subscriptions', name: 'Subscriptions', icon: 'fas fa-file-contract', roles: ['admin'] },
  { path: '/my-subscriptions', name: 'My Subscriptions', icon: 'fas fa-list', roles: ['user'] }
]

const filteredRoutes = computed(() => {
  if (!currentUser.value) return []
  return allRoutes.filter(route => route.roles.includes(currentUser.value.role))
})

const handleLogout = () => {
  store.logout()
  router.push('/signin')
}
</script> 