import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    currentUser: null,
    recentActivity: [
      {
        id: 1,
        type: 'user',
        description: 'New user registration',
        timestamp: '2024-02-20T10:00:00Z'
      },
      {
        id: 2,
        type: 'subscription',
        description: 'License subscription renewed',
        timestamp: '2024-02-19T15:30:00Z'
      },
      {
        id: 3,
        type: 'license',
        description: 'New license created',
        timestamp: '2024-02-18T09:15:00Z'
      }
    ],
    users: [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123', // In a real app, this would be hashed
        role: 'admin',
        status: 'active',
        subscriptions: [],
        lastActive: '2024-02-20T10:00:00Z'
      }
    ],
    licenses: [
      {
        id: '1',
        name: 'Basic License',
        description: 'Basic features for individual users',
        price: 29.99,
        duration: 'monthly',
        status: 'active',
        activeSubscriptions: 0
      },
      {
        id: '2',
        name: 'Pro License',
        description: 'Advanced features for professional users',
        price: 99.99,
        duration: 'monthly',
        status: 'active',
        activeSubscriptions: 0
      }
    ],
    subscriptions: []
  }),

  getters: {
    totalUsers: (state) => state.users.length,
    activeSubscriptions: (state) => state.subscriptions.filter(sub => sub.status === 'active').length,
    totalRevenue: (state) => {
      return state.subscriptions
        .filter(sub => sub.status === 'active')
        .reduce((total, sub) => total + sub.price, 0)
    },
    expiringSoon: (state) => {
      const now = new Date()
      const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      return state.subscriptions.filter(sub => {
        const endDate = new Date(sub.endDate)
        return sub.status === 'active' && endDate <= thirtyDaysFromNow && endDate > now
      })
    }
  },

  actions: {
    setCurrentUser(user) {
      this.currentUser = user
    },

    logout() {
      this.currentUser = null
    },

    addUser(user) {
      this.users.push(user)
    },

    updateUser(userId, updates) {
      const userIndex = this.users.findIndex(u => u.id === userId)
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...updates }
      }
    },

    deleteUser(userId) {
      this.users = this.users.filter(u => u.id !== userId)
    },

    addLicense(license) {
      this.licenses.push(license)
    },

    updateLicense(licenseId, updates) {
      const licenseIndex = this.licenses.findIndex(l => l.id === licenseId)
      if (licenseIndex !== -1) {
        this.licenses[licenseIndex] = { ...this.licenses[licenseIndex], ...updates }
      }
    },

    toggleLicenseStatus(licenseId) {
      const license = this.licenses.find(l => l.id === licenseId)
      if (license) {
        license.status = license.status === 'active' ? 'inactive' : 'active'
      }
    },

    addSubscription(subscription) {
      this.subscriptions.push(subscription)
      const license = this.licenses.find(l => l.id === subscription.licenseId)
      if (license) {
        license.activeSubscriptions++
      }
    },

    updateSubscription(subscriptionId, updates) {
      const subscriptionIndex = this.subscriptions.findIndex(s => s.id === subscriptionId)
      if (subscriptionIndex !== -1) {
        const oldSubscription = this.subscriptions[subscriptionIndex]
        this.subscriptions[subscriptionIndex] = { ...oldSubscription, ...updates }
        
        // Update license subscription count if status changed
        if (updates.status && updates.status !== oldSubscription.status) {
          const license = this.licenses.find(l => l.id === oldSubscription.licenseId)
          if (license) {
            if (updates.status === 'active') {
              license.activeSubscriptions++
            } else if (oldSubscription.status === 'active') {
              license.activeSubscriptions--
            }
          }
        }
      }
    },

    deleteSubscription(subscriptionId) {
      const subscription = this.subscriptions.find(s => s.id === subscriptionId)
      if (subscription) {
        const license = this.licenses.find(l => l.id === subscription.licenseId)
        if (license && subscription.status === 'active') {
          license.activeSubscriptions--
        }
        this.subscriptions = this.subscriptions.filter(s => s.id !== subscriptionId)
      }
    }
  }
}) 