// Mock data for demonstration
const mockData = {
    recentActivity: [
        {
            id: 1,
            type: 'subscription',
            user: 'John Doe',
            action: 'purchased',
            license: 'Premium License',
            time: '2 minutes ago'
        },
        {
            id: 2,
            type: 'device',
            user: 'Jane Smith',
            action: 'registered',
            device: 'iPhone 13',
            time: '15 minutes ago'
        },
        {
            id: 3,
            type: 'subscription',
            user: 'Mike Johnson',
            action: 'renewed',
            license: 'Basic License',
            time: '1 hour ago'
        }
    ],
    userSubscriptions: [
        {
            id: 1,
            name: 'Premium License',
            status: 'active',
            expiryDate: '2024-12-31',
            devices: 2,
            price: '$99.99'
        },
        {
            id: 2,
            name: 'Basic License',
            status: 'active',
            expiryDate: '2024-10-15',
            devices: 1,
            price: '$49.99'
        }
    ],
    devices: [
        {
            id: 1,
            name: 'MacBook Pro',
            type: 'laptop',
            lastActive: '2024-03-15 14:30',
            status: 'active'
        },
        {
            id: 2,
            name: 'iPhone 13',
            type: 'mobile',
            lastActive: '2024-03-15 15:45',
            status: 'active'
        }
    ],
    upcomingRenewals: [
        {
            id: 1,
            license: 'Basic License',
            expiryDate: '2024-10-15',
            price: '$49.99',
            status: 'upcoming'
        }
    ],
    users: [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            status: 'active',
            subscriptions: 2,
            lastActive: '2024-03-15 14:30'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            status: 'active',
            subscriptions: 1,
            lastActive: '2024-03-15 15:45'
        }
    ],
    licenses: [
        {
            id: 1,
            name: 'Premium License',
            description: 'Full access to all features',
            price: '$99.99',
            duration: '1 year',
            activeSubscriptions: 150,
            status: 'active'
        },
        {
            id: 2,
            name: 'Basic License',
            description: 'Basic features access',
            price: '$49.99',
            duration: '1 year',
            activeSubscriptions: 300,
            status: 'active'
        }
    ],
    subscriptions: [
        {
            id: 1,
            user: 'John Doe',
            license: 'Premium License',
            status: 'active',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            devices: 2,
            price: '$99.99'
        },
        {
            id: 2,
            user: 'Jane Smith',
            license: 'Basic License',
            status: 'active',
            startDate: '2024-02-15',
            endDate: '2025-02-15',
            devices: 1,
            price: '$49.99'
        }
    ]
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initializeNavigation();
    initializeActivityList();
    initializeUserDashboard();
    initializeNotifications();
    initializeProfileDropdown();
    
    // Show dashboard by default
    showSection('dashboard');
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            // Add active class to clicked link
            link.parentElement.classList.add('active');
            
            // Handle navigation
            const section = link.getAttribute('href').substring(1);
            showSection(section);
        });
    });
}

function showSection(section) {
    const contentArea = document.querySelector('.content-area');
    let content = '';

    switch (section) {
        case 'dashboard':
            content = createDashboardContent();
            break;
        case 'users':
            content = createUsersContent();
            break;
        case 'licenses':
            content = createLicensesContent();
            break;
        case 'subscriptions':
            content = createSubscriptionsContent();
            break;
        case 'reports':
            content = createReportsContent();
            break;
    }

    contentArea.innerHTML = content;

    // Reinitialize any necessary components for the new section
    if (section === 'dashboard') {
        initializeActivityList();
    }
}

function createDashboardContent() {
    return `
        <div class="dashboard" id="dashboardContent">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon users">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Users</h3>
                        <p class="stat-number">1,234</p>
                        <span class="trend positive">+12% from last month</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon subscriptions">
                        <i class="fas fa-file-contract"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Active Subscriptions</h3>
                        <p class="stat-number">856</p>
                        <span class="trend positive">+8% from last month</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon revenue">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Revenue</h3>
                        <p class="stat-number">$45,678</p>
                        <span class="trend positive">+15% from last month</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon expiring">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Expiring Soon</h3>
                        <p class="stat-number">23</p>
                        <span class="trend negative">-5% from last month</span>
                    </div>
                </div>
            </div>
            <div class="dashboard-grid">
                <div class="recent-activity">
                    <h2>Recent Activity</h2>
                    <div class="activity-list">
                        <!-- Activity items will be dynamically added here -->
                    </div>
                </div>
                <div class="quick-actions">
                    <h2>Quick Actions</h2>
                    <div class="action-buttons">
                        <button class="action-btn">
                            <i class="fas fa-plus"></i>
                            New License
                        </button>
                        <button class="action-btn">
                            <i class="fas fa-user-plus"></i>
                            Add User
                        </button>
                        <button class="action-btn">
                            <i class="fas fa-file-export"></i>
                            Export Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createUsersContent() {
    return `
        <div class="users-section">
            <div class="section-header">
                <h2>Users Management</h2>
                <button class="action-btn">
                    <i class="fas fa-user-plus"></i>
                    Add New User
                </button>
            </div>
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
                        ${mockData.users.map(user => `
                            <tr>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td><span class="status ${user.status}">${user.status}</span></td>
                                <td>${user.subscriptions}</td>
                                <td>${formatDateTime(user.lastActive)}</td>
                                <td>
                                    <div class="action-icons">
                                        <i class="fas fa-edit"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function createLicensesContent() {
    return `
        <div class="licenses-section">
            <div class="section-header">
                <h2>License Management</h2>
                <button class="action-btn">
                    <i class="fas fa-plus"></i>
                    Create New License
                </button>
            </div>
            <div class="license-cards">
                ${mockData.licenses.map(license => `
                    <div class="license-card">
                        <div class="license-header">
                            <h3>${license.name}</h3>
                            <span class="status ${license.status}">${license.status}</span>
                        </div>
                        <p class="license-description">${license.description}</p>
                        <div class="license-details">
                            <p><i class="fas fa-dollar-sign"></i> ${license.price}</p>
                            <p><i class="fas fa-clock"></i> ${license.duration}</p>
                            <p><i class="fas fa-users"></i> ${license.activeSubscriptions} active subscriptions</p>
                        </div>
                        <div class="license-actions">
                            <button class="btn-edit">Edit</button>
                            <button class="btn-deactivate">Deactivate</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function createSubscriptionsContent() {
    return `
        <div class="subscriptions-section">
            <div class="section-header">
                <h2>Subscription Management</h2>
                <button class="action-btn">
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
                        ${mockData.subscriptions.map(subscription => `
                            <tr>
                                <td>${subscription.user}</td>
                                <td>${subscription.license}</td>
                                <td><span class="status ${subscription.status}">${subscription.status}</span></td>
                                <td>${formatDate(subscription.startDate)}</td>
                                <td>${formatDate(subscription.endDate)}</td>
                                <td>${subscription.devices}</td>
                                <td>${subscription.price}</td>
                                <td>
                                    <div class="action-icons">
                                        <i class="fas fa-edit"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function createReportsContent() {
    return `
        <div class="reports-section">
            <div class="section-header">
                <h2>Reports & Analytics</h2>
                <div class="report-actions">
                    <button class="action-btn">
                        <i class="fas fa-download"></i>
                        Export Report
                    </button>
                    <button class="action-btn">
                        <i class="fas fa-calendar"></i>
                        Date Range
                    </button>
                </div>
            </div>
            <div class="reports-grid">
                <div class="report-card">
                    <h3>Revenue Overview</h3>
                    <div class="chart-placeholder">
                        <i class="fas fa-chart-line"></i>
                    </div>
                </div>
                <div class="report-card">
                    <h3>Subscription Growth</h3>
                    <div class="chart-placeholder">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                </div>
                <div class="report-card">
                    <h3>License Distribution</h3>
                    <div class="chart-placeholder">
                        <i class="fas fa-pie-chart"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Activity List
function initializeActivityList() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;

    mockData.recentActivity.forEach(activity => {
        const activityItem = createActivityItem(activity);
        activityList.appendChild(activityItem);
    });
}

function createActivityItem(activity) {
    const div = document.createElement('div');
    div.className = 'activity-item';
    div.innerHTML = `
        <div class="activity-icon">
            <i class="fas ${getActivityIcon(activity.type)}"></i>
        </div>
        <div class="activity-content">
            <p><strong>${activity.user}</strong> ${activity.action} ${activity.license || activity.device}</p>
            <span class="activity-time">${activity.time}</span>
        </div>
    `;
    return div;
}

function getActivityIcon(type) {
    switch (type) {
        case 'subscription':
            return 'fa-file-contract';
        case 'device':
            return 'fa-mobile-alt';
        default:
            return 'fa-info-circle';
    }
}

// User Dashboard
function initializeUserDashboard() {
    initializeSubscriptionCards();
    initializeDeviceList();
    initializeRenewalList();
}

function initializeSubscriptionCards() {
    const subscriptionCards = document.querySelector('.subscription-cards');
    if (!subscriptionCards) return;

    mockData.userSubscriptions.forEach(subscription => {
        const card = createSubscriptionCard(subscription);
        subscriptionCards.appendChild(card);
    });
}

function createSubscriptionCard(subscription) {
    const div = document.createElement('div');
    div.className = 'subscription-card';
    div.innerHTML = `
        <div class="subscription-header">
            <h3>${subscription.name}</h3>
            <span class="status ${subscription.status}">${subscription.status}</span>
        </div>
        <div class="subscription-details">
            <p><i class="fas fa-calendar"></i> Expires: ${formatDate(subscription.expiryDate)}</p>
            <p><i class="fas fa-mobile-alt"></i> Devices: ${subscription.devices}</p>
            <p><i class="fas fa-dollar-sign"></i> Price: ${subscription.price}</p>
        </div>
        <div class="subscription-actions">
            <button class="btn-renew">Renew</button>
            <button class="btn-manage">Manage</button>
        </div>
    `;
    return div;
}

function initializeDeviceList() {
    const deviceList = document.querySelector('.device-list');
    if (!deviceList) return;

    mockData.devices.forEach(device => {
        const deviceItem = createDeviceItem(device);
        deviceList.appendChild(deviceItem);
    });
}

function createDeviceItem(device) {
    const div = document.createElement('div');
    div.className = 'device-item';
    div.innerHTML = `
        <div class="device-icon">
            <i class="fas ${getDeviceIcon(device.type)}"></i>
        </div>
        <div class="device-info">
            <h3>${device.name}</h3>
            <p>Last active: ${formatDateTime(device.lastActive)}</p>
        </div>
        <div class="device-status ${device.status}">
            <i class="fas fa-circle"></i>
        </div>
    `;
    return div;
}

function getDeviceIcon(type) {
    switch (type) {
        case 'laptop':
            return 'fa-laptop';
        case 'mobile':
            return 'fa-mobile-alt';
        default:
            return 'fa-desktop';
    }
}

function initializeRenewalList() {
    const renewalList = document.querySelector('.renewal-list');
    if (!renewalList) return;

    mockData.upcomingRenewals.forEach(renewal => {
        const renewalItem = createRenewalItem(renewal);
        renewalList.appendChild(renewalItem);
    });
}

function createRenewalItem(renewal) {
    const div = document.createElement('div');
    div.className = 'renewal-item';
    div.innerHTML = `
        <div class="renewal-info">
            <h3>${renewal.license}</h3>
            <p>Expires: ${formatDate(renewal.expiryDate)}</p>
            <p>Price: ${renewal.price}</p>
        </div>
        <button class="btn-renew">Renew Now</button>
    `;
    return div;
}

// Notifications
function initializeNotifications() {
    const notificationIcon = document.querySelector('.notifications');
    if (!notificationIcon) return;

    notificationIcon.addEventListener('click', () => {
        // Toggle notifications panel (implementation would go here)
        console.log('Toggle notifications');
    });
}

// Profile Dropdown
function initializeProfileDropdown() {
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (!profileDropdown) return;

    profileDropdown.addEventListener('click', () => {
        // Toggle profile menu (implementation would go here)
        console.log('Toggle profile menu');
    });
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatDateTime(dateTimeString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
}

// Add some CSS for the dynamically created elements
const style = document.createElement('style');
style.textContent = `
    .activity-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid var(--gray-200);
    }

    .activity-icon {
        width: 40px;
        height: 40px;
        background-color: var(--gray-100);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
    }

    .activity-content {
        flex: 1;
    }

    .activity-time {
        font-size: 0.875rem;
        color: var(--gray-500);
    }

    .subscription-card {
        background-color: white;
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .subscription-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .status {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
    }

    .status.active {
        background-color: var(--success);
        color: white;
    }

    .subscription-details {
        margin-bottom: 1rem;
    }

    .subscription-details p {
        margin-bottom: 0.5rem;
        color: var(--gray-600);
    }

    .subscription-details i {
        width: 20px;
        margin-right: 0.5rem;
        color: var(--gray-400);
    }

    .subscription-actions {
        display: flex;
        gap: 1rem;
    }

    .btn-renew,
    .btn-manage {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
    }

    .btn-renew {
        background-color: var(--primary);
        color: white;
    }

    .btn-manage {
        background-color: var(--gray-100);
        color: var(--gray-700);
    }

    .device-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: white;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }

    .device-icon {
        width: 40px;
        height: 40px;
        background-color: var(--gray-100);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
    }

    .device-info {
        flex: 1;
    }

    .device-status {
        width: 12px;
        height: 12px;
    }

    .device-status.active i {
        color: var(--success);
    }

    .renewal-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: white;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }

    .renewal-info h3 {
        margin-bottom: 0.5rem;
    }

    .renewal-info p {
        color: var(--gray-600);
        font-size: 0.875rem;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .table-container {
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow-x: auto;
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
        background-color: var(--gray-100);
        font-weight: 600;
    }

    .action-icons {
        display: flex;
        gap: 1rem;
    }

    .action-icons i {
        cursor: pointer;
        color: var(--gray-600);
        transition: color 0.2s;
    }

    .action-icons i:hover {
        color: var(--primary);
    }

    .license-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .license-card {
        background-color: white;
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .license-description {
        color: var(--gray-600);
        margin: 1rem 0;
    }

    .license-details {
        margin: 1rem 0;
    }

    .license-details p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--gray-600);
        margin-bottom: 0.5rem;
    }

    .license-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .btn-edit,
    .btn-deactivate {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
    }

    .btn-edit {
        background-color: var(--primary);
        color: white;
    }

    .btn-deactivate {
        background-color: var(--gray-100);
        color: var(--gray-700);
    }

    .reports-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .report-card {
        background-color: white;
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .chart-placeholder {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--gray-100);
        border-radius: 0.5rem;
        margin-top: 1rem;
    }

    .chart-placeholder i {
        font-size: 2rem;
        color: var(--gray-400);
    }
`;
document.head.appendChild(style); 