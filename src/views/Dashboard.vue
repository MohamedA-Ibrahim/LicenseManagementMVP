<template>
  <div class="dashboard-section">
    <div class="dashboard-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>Total Users</h3>
          <div class="stat-value">{{ store.totalUsers }}</div>
       
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-file-contract"></i>
        </div>
        <div class="stat-content">
          <h3>Active Subscriptions</h3>
          <div class="stat-value">{{ store.activeSubscriptions }}</div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const store = useAppStore()
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-icon i {
  color: white;
}

.stat-icon.users { background-color: var(--primary); }
.stat-icon.contract { background-color: var(--success); }

.stat-content h3 {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.stat-trend.positive {
  color: var(--success);
}

.stat-trend.negative {
  color: var(--danger);
}

.stat-trend.warning {
  color: var(--warning);
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style> 