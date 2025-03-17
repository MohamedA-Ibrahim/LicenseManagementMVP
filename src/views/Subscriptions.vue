<template>
  <div class="subscriptions-section">
    <div class="section-header">
      <h2>Subscription Management</h2>
      <button class="action-btn" @click="showAddSubscriptionModal = true">
        <i class="fas fa-plus"></i>
        Create New Subscription
      </button>
    </div>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>License</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Devices</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subscription in store.subscriptions" :key="subscription.id">
            <td>{{ subscription.user }}</td>
            <td>{{ subscription.license }}</td>
            <td><span :class="['status', subscription.status]">{{ subscription.status }}</span></td>
            <td>{{ formatDate(subscription.startDate) }}</td>
            <td>{{ formatDate(subscription.endDate) }}</td>
            <td>{{ subscription.devices }}</td>
            <td>{{ subscription.price }}</td>
            <td>
              <div class="action-icons">
                <i class="fas fa-edit" @click="editSubscription(subscription)"></i>
                <i class="fas fa-trash" @click="deleteSubscription(subscription.id)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showAddSubscriptionModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingSubscription ? 'Edit Subscription' : 'Create New Subscription' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>User</label>
            <select v-model="subscriptionForm.user" required>
              <option v-for="user in store.users" :key="user.id" :value="user.name">
                {{ user.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>License</label>
            <select v-model="subscriptionForm.license" required>
              <option v-for="license in store.licenses" :key="license.id" :value="license.name">
                {{ license.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Start Date</label>
            <input v-model="subscriptionForm.startDate" type="date" required>
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input v-model="subscriptionForm.endDate" type="date" required>
          </div>
          <div class="form-group">
            <label>Devices</label>
            <input v-model="subscriptionForm.devices" type="number" min="1" required>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="subscriptionForm.status" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-submit">
              {{ editingSubscription ? 'Update' : 'Create' }} Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const showAddSubscriptionModal = ref(false)
const editingSubscription = ref(null)

const subscriptionForm = reactive({
  user: '',
  license: '',
  startDate: '',
  endDate: '',
  devices: 1,
  status: 'active',
  price: ''
})

const editSubscription = (subscription) => {
  editingSubscription.value = subscription
  subscriptionForm.user = subscription.user
  subscriptionForm.license = subscription.license
  subscriptionForm.startDate = subscription.startDate
  subscriptionForm.endDate = subscription.endDate
  subscriptionForm.devices = subscription.devices
  subscriptionForm.status = subscription.status
  subscriptionForm.price = subscription.price
  showAddSubscriptionModal.value = true
}

const deleteSubscription = (id) => {
  if (confirm('Are you sure you want to delete this subscription?')) {
    store.deleteSubscription(id)
  }
}

const handleSubmit = () => {
  if (editingSubscription.value) {
    store.updateSubscription(editingSubscription.value.id, subscriptionForm)
  } else {
    const selectedLicense = store.licenses.find(l => l.name === subscriptionForm.license)
    store.addSubscription({
      id: store.subscriptions.length + 1,
      ...subscriptionForm,
      price: selectedLicense?.price || '$0.00'
    })
  }
  closeModal()
}

const closeModal = () => {
  showAddSubscriptionModal.value = false
  editingSubscription.value = null
  subscriptionForm.user = ''
  subscriptionForm.license = ''
  subscriptionForm.startDate = ''
  subscriptionForm.endDate = ''
  subscriptionForm.devices = 1
  subscriptionForm.status = 'active'
  subscriptionForm.price = ''
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
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
</style> 