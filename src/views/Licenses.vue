<template>
  <div class="licenses-section">
    <div class="section-header">
      <h2>License Management</h2>
      <button class="action-btn" @click="showAddLicenseModal = true">
        <i class="fas fa-plus"></i>
        Create New License
      </button>
    </div>

    <!-- License Cards -->
    <div class="license-grid">
      <div v-for="license in store.licenses" :key="license.id" class="license-card">
        <div class="license-header">
          <h3>{{ license.name }}</h3>
          <span :class="['status-badge', license.status]">
            {{ license.status }}
          </span>
        </div>
        <p class="license-description">{{ license.description }}</p>
        <div class="license-details">
          <div class="detail-item">
            <i class="fas fa-tag"></i>
            <span>{{ license.price }}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>{{ license.duration }}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-users"></i>
            <span>{{ license.activeSubscriptions }} active subscriptions</span>
          </div>
        </div>
        <div class="license-actions">
          <button class="btn-edit" @click="editLicense(license)">
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button
            :class="['btn-toggle', license.status]"
            @click="toggleLicenseStatus(license)"
          >
            <i :class="license.status === 'active' ? 'fas fa-pause' : 'fas fa-play'"></i>
            {{ license.status === 'active' ? 'Deactivate' : 'Activate' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit License Modal -->
    <div v-if="showAddLicenseModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingLicense ? 'Edit License' : 'Create New License' }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name</label>
            <input
              v-model="licenseForm.name"
              type="text"
              required
              placeholder="Enter license name"
            >
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="licenseForm.description"
              required
              placeholder="Enter license description"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Price</label>
            <div class="price-input">
              <span class="currency">$</span>
              <input
                v-model="licenseForm.price"
                type="number"
                step="0.01"
                required
                placeholder="0.00"
              >
            </div>
          </div>
          <div class="form-group">
            <label>Duration</label>
            <select v-model="licenseForm.duration" required>
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-submit">
              {{ editingLicense ? 'Update' : 'Create' }} License
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const showAddLicenseModal = ref(false)
const editingLicense = ref(null)

const licenseForm = ref({
  name: '',
  description: '',
  price: '',
  duration: '1 month',
  status: 'active'
})

const editLicense = (license) => {
  editingLicense.value = license
  licenseForm.value = {
    name: license.name,
    description: license.description,
    price: license.price.replace('$', ''),
    duration: license.duration,
    status: license.status
  }
  showAddLicenseModal.value = true
}

const toggleLicenseStatus = (license) => {
  const newStatus = license.status === 'active' ? 'inactive' : 'active'
  store.updateLicense(license.id, { status: newStatus })
}

const handleSubmit = () => {
  const formattedPrice = `$${parseFloat(licenseForm.value.price).toFixed(2)}`
  const licenseData = {
    ...licenseForm.value,
    price: formattedPrice
  }

  if (editingLicense.value) {
    store.updateLicense(editingLicense.value.id, licenseData)
  } else {
    store.addLicense(licenseData)
  }
  closeModal()
}

const closeModal = () => {
  showAddLicenseModal.value = false
  editingLicense.value = null
  licenseForm.value = {
    name: '',
    description: '',
    price: '',
    duration: '1 month',
    status: 'active'
  }
}
</script>

<style scoped>
.license-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.license-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.license-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.license-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
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

.license-description {
  color: var(--gray-600);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.license-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gray-700);
}

.detail-item i {
  color: var(--gray-400);
  width: 1.25rem;
}

.license-actions {
  display: flex;
  gap: 1rem;
}

.btn-edit,
.btn-toggle {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit {
  background-color: var(--gray-100);
  color: var(--gray-700);
  border: none;
}

.btn-edit:hover {
  background-color: var(--gray-200);
}

.btn-toggle {
  border: none;
}

.btn-toggle.active {
  background-color: var(--danger);
  color: white;
}

.btn-toggle.inactive {
  background-color: var(--success);
  color: white;
}

.price-input {
  display: flex;
  align-items: center;
  border: 1px solid var(--gray-300);
  border-radius: 0.25rem;
  overflow: hidden;
}

.currency {
  padding: 0.5rem;
  background-color: var(--gray-100);
  color: var(--gray-700);
  border-right: 1px solid var(--gray-300);
}

.price-input input {
  border: none;
  padding: 0.5rem;
  width: 100%;
  outline: none;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.25rem;
  resize: vertical;
  font-family: inherit;
}

@media (max-width: 768px) {
  .license-grid {
    grid-template-columns: 1fr;
  }

  .license-actions {
    flex-direction: column;
  }
}
</style> 