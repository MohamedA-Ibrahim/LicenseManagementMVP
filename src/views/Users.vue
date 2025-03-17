<template>
  <div class="users-section">
    <div class="section-header">
      <h2>User Management</h2>
      <button class="action-btn" @click="showAddUserModal = true">
        <i class="fas fa-plus"></i>
        Add New User
      </button>
    </div>

    <!-- User Filters -->
    <div class="filters">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search users..."
          @input="filterUsers"
        >
      </div>
      <div class="filter-group">
        <label>Status</label>
        <select v-model="statusFilter" @change="filterUsers">
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Subscriptions</th>
            <th>Last Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="['status-badge', user.status]">
                {{ user.status }}
              </span>
            </td>
            <td>{{ user.subscriptions }}</td>
            <td>{{ formatDate(user.lastActive) }}</td>
            <td>
              <div class="action-icons">
                <i class="fas fa-edit" @click="editUser(user)"></i>
                <i class="fas fa-trash" @click="deleteUser(user.id)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit User Modal -->
    <div v-if="showAddUserModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingUser ? 'Edit User' : 'Add New User' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name</label>
            <input
              v-model="userForm.name"
              type="text"
              required
              placeholder="Enter user name"
            >
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="userForm.email"
              type="email"
              required
              placeholder="Enter user email"
            >
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="userForm.status" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-submit">
              {{ editingUser ? 'Update' : 'Add' }} User
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const showAddUserModal = ref(false)
const editingUser = ref(null)
const searchQuery = ref('')
const statusFilter = ref('')

const userForm = ref({
  name: '',
  email: '',
  status: 'active'
})

const filteredUsers = computed(() => {
  let users = store.users

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    users = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value) {
    users = users.filter(user => user.status === statusFilter.value)
  }

  return users
})

const editUser = (user) => {
  editingUser.value = user
  userForm.value = {
    name: user.name,
    email: user.email,
    status: user.status
  }
  showAddUserModal.value = true
}

const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    store.deleteUser(id)
  }
}

const handleSubmit = () => {
  if (editingUser.value) {
    store.updateUser(editingUser.value.id, userForm.value)
  } else {
    store.addUser(userForm.value)
  }
  closeModal()
}

const closeModal = () => {
  showAddUserModal.value = false
  editingUser.value = null
  userForm.value = {
    name: '',
    email: '',
    status: 'active'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const filterUsers = () => {
  // The filtering is handled by the computed property
}
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--gray-200);
  flex: 1;
  max-width: 300px;
}

.search-box input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.875rem;
}

.search-box i {
  color: var(--gray-400);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--gray-700);
}

.table-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--gray-200);
}

.data-table th {
  background-color: var(--gray-50);
  font-weight: 600;
  color: var(--gray-700);
}

.data-table tr:hover {
  background-color: var(--gray-50);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active {
  background-color: var(--success);
  color: white;
}

.status-badge.inactive {
  background-color: var(--gray-300);
  color: var(--gray-700);
}

.action-icons {
  display: flex;
  gap: 1rem;
}

.action-icons i {
  cursor: pointer;
  color: var(--gray-500);
  transition: color 0.2s;
}

.action-icons i:hover {
  color: var(--primary);
}

.action-icons i.fa-trash:hover {
  color: var(--danger);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
}

.modal-content h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-900);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--gray-700);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancel,
.btn-submit {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.btn-cancel {
  background-color: var(--gray-100);
  color: var(--gray-700);
  border: none;
}

.btn-submit {
  background-color: var(--primary);
  color: white;
  border: none;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .search-box {
    max-width: none;
  }

  .data-table {
    display: block;
    overflow-x: auto;
  }
}
</style> 