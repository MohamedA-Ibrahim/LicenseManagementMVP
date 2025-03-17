<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSignUp" class="auth-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required
            placeholder="Enter your full name"
          >
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required
            placeholder="Enter your email"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            required
            placeholder="Enter your password"
          >
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            required
            placeholder="Confirm your password"
          >
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">Sign Up</button>
        </div>
        <p class="auth-link">
          Already have an account? <router-link to="/signin">Sign In</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const store = useAppStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSignUp = async () => {
  try {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // Check if email already exists
    if (store.users.some(u => u.email === form.email)) {
      alert('Email already registered')
      return
    }

    // Create new user
    const newUser = {
      id: String(store.users.length + 1),
      name: form.name,
      email: form.email,
      password: form.password, // In a real app, this would be hashed
      role: 'user',
      status: 'active',
      subscriptions: [],
      lastActive: new Date().toISOString()
    }

    store.addUser(newUser)
    store.setCurrentUser(newUser)
    router.push('/')
  } catch (error) {
    console.error('Sign up error:', error)
    alert('An error occurred during sign up')
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-50);
  padding: 1rem;
}

.auth-card {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-card h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--gray-900);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-actions {
  margin-top: 1rem;
}

.auth-link {
  text-align: center;
  color: var(--gray-600);
}

.auth-link a {
  color: var(--primary);
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>