<template>
  <div class="user-subscriptions">
    <div class="section-header">
      <h2>My Subscriptions</h2>
    </div>

    <!-- Current Subscriptions -->
    <div class="subscriptions-section">
      <h3>Current Subscriptions</h3>
      <div class="subscriptions-grid" v-if="userSubscriptions.length">
        <div v-for="sub in userSubscriptions" :key="sub.id" class="subscription-card">
          <div class="subscription-header">
            <h4>{{ getLicenseName(sub.licenseId) }}</h4>
            <span :class="['status-badge', sub.status]">{{ sub.status }}</span>
          </div>
          <div class="subscription-details">
            <p class="price">${{ getLicensePrice(sub.licenseId) }}/month</p>
            <p class="dates">
              Start: {{ formatDate(sub.startDate) }}<br>
              End: {{ formatDate(sub.endDate) }}
            </p>
            <p class="device">Device: {{ sub.deviceName }}</p>
            <p class="device-id">Device ID: {{ sub.deviceId }}</p>
          </div>
          <div class="subscription-actions">
            <button 
              v-if="sub.status === 'active'"
              @click="cancelSubscription(sub.id)"
              class="btn-cancel"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
      <p v-else class="no-subscriptions">You don't have any active subscriptions.</p>
    </div>

    <!-- Available Licenses -->
    <div class="subscriptions-section">
      <h3>Available Licenses</h3>
      <div class="subscriptions-grid">
        <div v-for="license in availableLicenses" :key="license.id" class="subscription-card">
          <div class="subscription-header">
            <h4>{{ license.name }}</h4>
            <span :class="['status-badge', license.status]">{{ license.status }}</span>
          </div>
          <div class="subscription-details">
            <p class="description">{{ license.description }}</p>
            <p class="price">${{ license.price }}/month</p>
            <p class="duration">{{ license.duration }}</p>
          </div>
          <div class="subscription-actions">
            <button 
              @click="showSubscriptionModalPage(license)"
              class="btn-submit"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Subscription Modal -->
    <div v-if="showSubscriptionModal" class="modal">
      <div class="modal-content">
        <h3>Subscribe to {{ selectedLicense?.name }}</h3>
        <form @submit.prevent="handleSubscription" class="subscription-form">
          <div class="form-group">
            <label for="deviceName">Device Name</label>
            <input 
              type="text" 
              id="deviceName" 
              v-model="subscriptionForm.deviceName" 
              required
              placeholder="Enter device name"
            >
          </div>
          <div class="form-group">
            <label for="deviceId">Device ID</label>
            <input 
              type="text" 
              id="deviceId" 
              v-model="subscriptionForm.deviceId" 
              required
              placeholder="Enter device ID"
            >
          </div>
          <div class="modal-actions">
            <button type="button" @click="showSubscriptionModal = false" class="btn-cancel">
              Cancel
            </button>
            <button type="submit" class="btn-submit">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()

// Subscription management
const showSubscriptionModal = ref(false)
const selectedLicense = ref(null)
const subscriptionForm = ref({
  deviceName: '',
  deviceId: ''
})

const userSubscriptions = computed(() => {
  return store.userSubscriptions(store.currentUser.id)
})

const availableLicenses = computed(() => {
  return store.licenses.filter(license => license.status === 'active')
})

const getLicenseName = (licenseId) => {
  const license = store.licenses.find(l => l.id === licenseId)
  return license ? license.name : 'Unknown License'
}

const getLicensePrice = (licenseId) => {
  const license = store.licenses.find(l => l.id === licenseId)
  return license ? license.price : 0
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const showSubscriptionModalPage = (license) => {
  selectedLicense.value = license
  showSubscriptionModal.value = true
}

const handleSubscription = () => {
  try {
    const newSubscription = {
      id: String(store.subscriptions.length + 1),
      userId: store.currentUser.id,
      deviceId: subscriptionForm.value.deviceId,
      deviceName: subscriptionForm.value.deviceName,
      licenseId: selectedLicense.value.id,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      status: 'active',
      price: selectedLicense.value.price
    }

    store.addSubscription(newSubscription)
    showSubscriptionModal.value = false
    subscriptionForm.value = { deviceName: '', deviceId: '' }
  } catch (error) {
    alert(error.message)
  }
}

const cancelSubscription = (subscriptionId) => {
  if (confirm('Are you sure you want to cancel this subscription?')) {
    store.updateSubscription(subscriptionId, { status: 'cancelled' })
  }
}
</script>

<style scoped>
.user-subscriptions {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.subscriptions-section {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.subscriptions-section h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-900);
  font-size: 1.25rem;
}

.subscriptions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.subscription-card {
  background-color: var(--gray-50);
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subscription-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subscription-header h4 {
  color: var(--gray-900);
  font-size: 1.125rem;
}

.subscription-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.subscription-details .description {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.subscription-details .price,
.device-details .device-id {
  color: var(--gray-900);
  font-weight: 600;
  font-size: 1.25rem;
}

.subscription-details .duration,
.subscription-details .dates {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.subscription-actions {
  margin-top: auto;
}

.no-subscriptions {
  text-align: center;
  color: var(--gray-500);
  padding: 2rem;
}

.activation-form,
.subscription-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 768px) {
  .subscriptions-grid {
    grid-template-columns: 1fr;
  }
}
</style> 