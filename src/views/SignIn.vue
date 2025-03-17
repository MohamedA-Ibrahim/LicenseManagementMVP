<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Sign In</h1>
      <form @submit.prevent="handleSignIn" class="auth-form">
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
        <div class="form-actions">
          <button type="submit" class="btn-submit">Sign In</button>
        </div>
        <p class="auth-link">
          Don't have an account? <router-link to="/signup">Sign Up</router-link>
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
  email: '',
  password: ''
})

const handleSignIn = async () => {
  try {
    const user = store.users.find(u => u.email === form.email && u.password === form.password)
    
    if (user) {
      store.setCurrentUser(user)
      router.push('/')
    } else {
      alert('Invalid credentials')
    }
  } catch (error) {
    console.error('Sign in error:', error)
    alert('An error occurred during sign in')
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