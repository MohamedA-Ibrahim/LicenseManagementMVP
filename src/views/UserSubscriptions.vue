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
              @click="subscribeToLicense(license.id)"
              class="btn-submit"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const userSubscriptions = computed(() => {
  return store.subscriptions.filter(sub => sub.userId === store.currentUser.id)
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

const subscribeToLicense = (licenseId) => {
  const license = store.licenses.find(l => l.id === licenseId)
  if (!license) return

  const newSubscription = {
    id: String(store.subscriptions.length + 1),
    userId: store.currentUser.id,
    licenseId: license.id,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    status: 'active',
    price: license.price
  }

  store.addSubscription(newSubscription)
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

.subscription-details .price {
  color: var(--gray-900);
  font-weight: 600;
  font-size: 1.25rem;
}

.subscription-details .duration {
  color: var(--gray-500);
  font-size: 0.875rem;
}

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

@media (max-width: 768px) {
  .subscriptions-grid {
    grid-template-columns: 1fr;
  }
}
</style> 