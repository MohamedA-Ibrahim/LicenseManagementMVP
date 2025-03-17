import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '../stores/app'

// Views
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Licenses from '../views/Licenses.vue'
import Subscriptions from '../views/Subscriptions.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import UserSubscriptions from '../views/UserSubscriptions.vue'

const routes = [
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/licenses',
    name: 'Licenses',
    component: Licenses,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    component: Subscriptions,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/my-subscriptions',
    name: 'UserSubscriptions',
    component: UserSubscriptions,
    meta: { requiresAuth: true, requiresAdmin: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useAppStore()
  const currentUser = store.currentUser

  if (to.meta.requiresAuth && !currentUser) {
    next('/signin')
  } else if (to.meta.requiresAdmin && currentUser?.role !== 'admin') {
    next('/my-subscriptions')
  } else if ((to.path === '/signin' || to.path === '/signup') && currentUser) {
    next(currentUser.role === 'admin' ? '/' : '/my-subscriptions')
  } else {
    next()
  }
})

export default router 