// Dashboard JavaScript for Remmic Real Estate

// Global Variables
let currentUser = null;
let dashboardData = {
    savedProperties: [],
    searchHistory: [],
    inquiries: [],
    viewedProperties: [],
    userProfile: {}
};

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeDashboard();
});

// Authentication Check
function checkAuthentication() {
    const loggedInUser = Storage.get('remmic_logged_in_user');
    
    if (!loggedInUser) {
        // Redirect to login if not authenticated
        alert('Please login to access dashboard');
        window.location.href = 'index.html#login';
        return;
    }
    
    currentUser = loggedInUser;
    updateUserInfo();
}

// Update user information in the UI
function updateUserInfo() {
    if (!currentUser) return;
    
    // Update user name in various places
    document.getElementById('userName').textContent = currentUser.name || 'User';
    document.getElementById('welcomeUserName').textContent = currentUser.name || 'User';
    document.getElementById('welcomeUserNameUr').textContent = currentUser.name || 'صارف';
    document.getElementById('welcomeUserNameAr').textContent = currentUser.name || 'المستخدم';
    
    // Update user avatar
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        userAvatar.src = currentUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop';
        userAvatar.alt = currentUser.name || 'User';
    }
}

// Initialize Dashboard
function initializeDashboard() {
    loadDashboardData();
    updateStats();
    loadOverviewContent();
    setupEventListeners();
    
    // Apply saved language
    const savedLanguage = Storage.get('remmic_language') || 'en';
    changeLanguage(savedLanguage);
}

// Load dashboard data from localStorage
function loadDashboardData() {
    dashboardData.savedProperties = Storage.get('remmic_saved_properties') || [];
    dashboardData.searchHistory = Storage.get('remmic_search_history') || ['Villa in DHA', 'Apartment in Gulberg', 'Commercial Plot'];
    dashboardData.inquiries = Storage.get('remmic_inquiries') || [];
    dashboardData.viewedProperties = Storage.get('remmic_viewed_properties') || [];
    dashboardData.userProfile = Storage.get('remmic_user_profile') || {};

    // Add some demo data if arrays are empty
    if (dashboardData.savedProperties.length === 0) {
        dashboardData.savedProperties = ['prop_1', 'prop_2'];
        Storage.set('remmic_saved_properties', dashboardData.savedProperties);
    }

    if (dashboardData.inquiries.length === 0) {
        const demoInquiry = {
            id: 'demo_inquiry_1',
            name: currentUser?.name || 'Demo User',
            email: currentUser?.email || 'demo@example.com',
            phone: '+92 300 1234567',
            subject: 'Inquiry about Villa in DHA Phase 5',
            message: 'I am interested in the modern villa listed in DHA Phase 5. Can you provide more details about the property?',
            timestamp: new Date().toISOString()
        };
        dashboardData.inquiries = [demoInquiry];
        Storage.set('remmic_inquiries', dashboardData.inquiries);
    }
}

// Update dashboard statistics
function updateStats() {
    document.getElementById('statsPropertiesCount').textContent = dashboardData.savedProperties.length;
    document.getElementById('statsSearchesCount').textContent = dashboardData.searchHistory.length;
    document.getElementById('statsInquiriesCount').textContent = dashboardData.inquiries.length;
    document.getElementById('statsVisitedCount').textContent = dashboardData.viewedProperties.length;
    
    // Update sidebar badges
    document.getElementById('savedCount').textContent = dashboardData.savedProperties.length;
    document.getElementById('inquiriesCount').textContent = dashboardData.inquiries.length;
}

// Show specific dashboard section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.add('d-none');
    });
    
    // Remove active class from all sidebar links
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('d-none');
    }
    
    // Add active class to clicked sidebar item
    const activeItem = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    // Load section-specific content
    switch(sectionName) {
        case 'overview':
            loadOverviewContent();
            break;
        case 'saved-properties':
            loadSavedProperties();
            break;
        case 'search-history':
            loadSearchHistory();
            break;
        case 'inquiries':
            loadInquiries();
            break;
        case 'recommendations':
            loadRecommendations();
            break;
        case 'profile':
            loadProfileSettings();
            break;
    }
}

// Load overview content
function loadOverviewContent() {
    loadRecentActivity();
    loadQuickRecommendations();
}

// Load recent activity
function loadRecentActivity() {
    const activityList = document.getElementById('recentActivityList');
    if (!activityList) return;
    
    const activities = [];
    
    // Add recent saved properties
    if (dashboardData.savedProperties.length > 0) {
        activities.push({
            type: 'saved',
            text: {
                en: 'Saved a property',
                ur: 'پراپرٹی محفوظ کی',
                ar: 'حفظ عقار'
            },
            time: '2 hours ago',
            icon: 'bi-heart-fill text-danger'
        });
    }
    
    // Add recent searches
    if (dashboardData.searchHistory.length > 0) {
        activities.push({
            type: 'search',
            text: {
                en: 'Searched for properties',
                ur: 'پراپرٹیز کی تلاش کی',
                ar: 'بحث عن عقارات'
            },
            time: '1 day ago',
            icon: 'bi-search text-success'
        });
    }
    
    // Add recent inquiries
    if (dashboardData.inquiries.length > 0) {
        activities.push({
            type: 'inquiry',
            text: {
                en: 'Sent an inquiry',
                ur: 'انکوائری بھیجی',
                ar: 'أرسل استفسار'
            },
            time: '3 days ago',
            icon: 'bi-envelope-fill text-info'
        });
    }
    
    if (activities.length === 0) {
        activityList.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="bi bi-clock-history fs-1 mb-3 d-block"></i>
                <span class="no-activity-en">No recent activity</span>
                <span class="no-activity-ur d-none">کوئی حالیہ سرگرمی نہیں</span>
                <span class="no-activity-ar d-none">لا يوجد نشاط حديث</span>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = activities.map(activity => `
        <div class="list-group-item d-flex align-items-center">
            <i class="${activity.icon} me-3"></i>
            <div class="flex-grow-1">
                <span class="activity-text-en">${activity.text.en}</span>
                <span class="activity-text-ur d-none">${activity.text.ur}</span>
                <span class="activity-text-ar d-none">${activity.text.ar}</span>
                <small class="text-muted d-block">${activity.time}</small>
            </div>
        </div>
    `).join('');
}

// Load quick recommendations
function loadQuickRecommendations() {
    const recommendationsContainer = document.getElementById('quickRecommendations');
    if (!recommendationsContainer) return;
    
    // Simple recommendations based on user activity
    const recommendations = [
        {
            text: {
                en: 'Complete your profile for better recommendations',
                ur: 'بہتر تجاویز کے لیے اپنا پروفائل مکمل کریں',
                ar: 'أكمل ملفك الشخصي للحصول على توصيات أفضل'
            },
            action: () => showSection('profile'),
            icon: 'bi-person-check text-primary'
        },
        {
            text: {
                en: 'Explore new properties in your area',
                ur: 'اپنے علاقے میں نئی پراپرٹیز دیکھیں',
                ar: 'استكشف عقارات جديدة في منطقتك'
            },
            action: () => window.location.href = 'index.html#properties',
            icon: 'bi-house-door text-success'
        }
    ];
    
    recommendationsContainer.innerHTML = recommendations.map(rec => `
        <div class="d-flex align-items-center mb-3 p-3 bg-light rounded">
            <i class="${rec.icon} me-3 fs-5"></i>
            <div class="flex-grow-1">
                <span class="rec-text-en">${rec.text.en}</span>
                <span class="rec-text-ur d-none">${rec.text.ur}</span>
                <span class="rec-text-ar d-none">${rec.text.ar}</span>
            </div>
            <button class="btn btn-sm btn-outline-primary" onclick="(${rec.action})()">
                <i class="bi bi-arrow-right"></i>
            </button>
        </div>
    `).join('');
}

// Load saved properties
function loadSavedProperties() {
    const savedPropertiesGrid = document.getElementById('savedPropertiesGrid');
    if (!savedPropertiesGrid) return;
    
    if (dashboardData.savedProperties.length === 0) {
        savedPropertiesGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-heart fs-1 text-muted mb-3 d-block"></i>
                <h5 class="text-muted">
                    <span class="no-saved-en">No saved properties yet</span>
                    <span class="no-saved-ur d-none">ابھی تک کوئی پراپرٹی محفوظ نہیں</span>
                    <span class="no-saved-ar d-none">لا توجد عقارات محفوظة حتى الآن</span>
                </h5>
                <p class="text-muted">
                    <span class="save-hint-en">Start exploring properties and save your favorites!</span>
                    <span class="save-hint-ur d-none">پراپرٹیز دیکھنا شروع کریں اور اپنی پسندیدہ محفوظ کریں!</span>
                    <span class="save-hint-ar d-none">ابدأ في استكشاف العقارات واحفظ المفضلة لديك!</span>
                </p>
                <a href="index.html#properties" class="btn btn-primary">
                    <span class="browse-en">Browse Properties</span>
                    <span class="browse-ur d-none">پراپرٹیز دیکھیں</span>
                    <span class="browse-ar d-none">تصفح العقارات</span>
                </a>
            </div>
        `;
        return;
    }
    
    // Load property data and filter saved ones
    const savedPropertyCards = dashboardData.savedProperties.map(propertyId => {
        const property = propertyData.find(p => p.id === propertyId);
        if (!property) return '';
        
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="${property.image}" 
                             alt="${property.title[currentLanguage]}" 
                             class="card-img-top" 
                             style="height: 200px; object-fit: cover;">
                        <button class="btn btn-danger position-absolute" 
                                style="top: 10px; right: 10px; width: 35px; height: 35px; border-radius: 50%; padding: 0;"
                                onclick="removeSavedProperty('${property.id}')" 
                                title="Remove from saved">
                            <i class="bi bi-heart-fill"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title">${property.title[currentLanguage]}</h6>
                        <p class="text-muted small mb-2">
                            <i class="bi bi-geo-alt me-1"></i>
                            ${property.location[currentLanguage]}
                        </p>
                        <p class="text-primary fw-bold">${property.price}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    savedPropertiesGrid.innerHTML = savedPropertyCards;
}

// Load search history
function loadSearchHistory() {
    const searchHistoryList = document.getElementById('searchHistoryList');
    if (!searchHistoryList) return;
    
    const searchHistory = Storage.get('remmic_search_history') || [];
    
    if (searchHistory.length === 0) {
        searchHistoryList.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="bi bi-clock-history fs-1 mb-3 d-block"></i>
                <span class="no-history-en">No search history</span>
                <span class="no-history-ur d-none">کوئی تلاش کی تاریخ نہیں</span>
                <span class="no-history-ar d-none">لا يوجد تاريخ بحث</span>
            </div>
        `;
        return;
    }
    
    searchHistoryList.innerHTML = searchHistory.slice(0, 10).map((search, index) => `
        <div class="d-flex align-items-center justify-content-between p-3 border-bottom">
            <div class="d-flex align-items-center">
                <i class="bi bi-search me-3 text-muted"></i>
                <span>${search}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm" onclick="searchAgain('${search}')">
                <i class="bi bi-arrow-clockwise me-1"></i>
                <span class="search-again-en">Search Again</span>
                <span class="search-again-ur d-none">دوبارہ تلاش</span>
                <span class="search-again-ar d-none">البحث مرة أخرى</span>
            </button>
        </div>
    `).join('');
}

// Load inquiries
function loadInquiries() {
    const inquiriesList = document.getElementById('inquiriesList');
    if (!inquiriesList) return;
    
    if (dashboardData.inquiries.length === 0) {
        inquiriesList.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="bi bi-envelope fs-1 mb-3 d-block"></i>
                <span class="no-inquiries-en">No inquiries sent yet</span>
                <span class="no-inquiries-ur d-none">ابھی تک کوئی انکوائری نہیں بھیجی</span>
                <span class="no-inquiries-ar d-none">لم يتم إرسال استفسارات حتى الآن</span>
            </div>
        `;
        return;
    }
    
    inquiriesList.innerHTML = dashboardData.inquiries.map(inquiry => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="card-title mb-0">${inquiry.subject}</h6>
                    <span class="badge bg-info">
                        <span class="pending-en">Pending</span>
                        <span class="pending-ur d-none">زیر التواء</span>
                        <span class="pending-ar d-none">قيد الانتظار</span>
                    </span>
                </div>
                <p class="text-muted small mb-2">${new Date(inquiry.timestamp).toLocaleDateString()}</p>
                <p class="card-text">${inquiry.message}</p>
            </div>
        </div>
    `).join('');
}

// Load recommendations
function loadRecommendations() {
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    if (!recommendationsGrid) return;
    
    // Get some sample recommendations (in real app, this would be based on user preferences)
    const recommendations = propertyData.slice(0, 3);
    
    recommendationsGrid.innerHTML = recommendations.map(property => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${property.image}" 
                         alt="${property.title[currentLanguage]}" 
                         class="card-img-top" 
                         style="height: 200px; object-fit: cover;">
                    <span class="badge bg-warning position-absolute" style="top: 10px; left: 10px;">
                        <span class="recommended-en">Recommended</span>
                        <span class="recommended-ur d-none">تجویز کردہ</span>
                        <span class="recommended-ar d-none">موصى به</span>
                    </span>
                </div>
                <div class="card-body">
                    <h6 class="card-title">${property.title[currentLanguage]}</h6>
                    <p class="text-muted small mb-2">
                        <i class="bi bi-geo-alt me-1"></i>
                        ${property.location[currentLanguage]}
                    </p>
                    <p class="text-primary fw-bold mb-2">${property.price}</p>
                    <button class="btn btn-primary btn-sm w-100" onclick="viewProperty('${property.id}')">
                        <span class="view-details-en">View Details</span>
                        <span class="view-details-ur d-none">تفصیلات دیکھیں</span>
                        <span class="view-details-ar d-none">عرض التفاصيل</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load profile settings
function loadProfileSettings() {
    const profile = dashboardData.userProfile;
    
    if (profile) {
        document.getElementById('profileName').value = profile.name || '';
        document.getElementById('profileEmail').value = profile.email || '';
        document.getElementById('profilePhone').value = profile.phone || '';
        document.getElementById('profileCity').value = profile.city || '';
        document.getElementById('preferredType').value = profile.preferredType || '';
        document.getElementById('preferredBudget').value = profile.preferredBudget || '';
        document.getElementById('preferredBeds').value = profile.preferredBeds || '';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfile();
        });
    }
}

// Save profile
function saveProfile() {
    const profile = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        city: document.getElementById('profileCity').value,
        preferredType: document.getElementById('preferredType').value,
        preferredBudget: document.getElementById('preferredBudget').value,
        preferredBeds: document.getElementById('preferredBeds').value,
        lastUpdated: new Date().toISOString()
    };
    
    Storage.set('remmic_user_profile', profile);
    dashboardData.userProfile = profile;
    
    // Update current user info
    currentUser.name = profile.name;
    Storage.set('remmic_logged_in_user', currentUser);
    updateUserInfo();
    
    alert(currentLanguage === 'en' ? 'Profile saved successfully!' :
          currentLanguage === 'ur' ? 'پروفائل کامیابی سے محفوظ ہو گیا!' :
          'تم حفظ الملف الشخصي بنجاح!');
}

// Helper functions
function removeSavedProperty(propertyId) {
    dashboardData.savedProperties = dashboardData.savedProperties.filter(id => id !== propertyId);
    Storage.set('remmic_saved_properties', dashboardData.savedProperties);
    updateStats();
    loadSavedProperties();
}

function clearAllSavedProperties() {
    if (confirm(currentLanguage === 'en' ? 'Are you sure you want to clear all saved properties?' :
                currentLanguage === 'ur' ? 'کیا آپ واقعی تمام محفوظ شدہ پراپرٹیز صاف کرنا چاہتے ہیں؟' :
                'هل أنت متأكد من ��نك تريد مسح جميع العقارات المحفوظة؟')) {
        dashboardData.savedProperties = [];
        Storage.set('remmic_saved_properties', []);
        updateStats();
        loadSavedProperties();
    }
}

function clearSearchHistory() {
    if (confirm(currentLanguage === 'en' ? 'Are you sure you want to clear search history?' :
                currentLanguage === 'ur' ? 'کیا آپ واقعی تلاش کی تاریخ صاف کرنا چاہتے ہیں؟' :
                'هل أنت متأكد من أنك تريد مسح تاريخ البحث؟')) {
        Storage.set('remmic_search_history', []);
        dashboardData.searchHistory = [];
        updateStats();
        loadSearchHistory();
    }
}

function searchAgain(searchTerm) {
    window.location.href = `index.html#properties?search=${encodeURIComponent(searchTerm)}`;
}

function viewProperty(propertyId) {
    // Add to viewed properties
    const viewedProperties = Storage.get('remmic_viewed_properties') || [];
    if (!viewedProperties.includes(propertyId)) {
        viewedProperties.push(propertyId);
        Storage.set('remmic_viewed_properties', viewedProperties);
    }
    
    // Navigate to property details (for now, go to properties section)
    window.location.href = 'index.html#properties';
}

function logout() {
    if (confirm(currentLanguage === 'en' ? 'Are you sure you want to logout?' :
                currentLanguage === 'ur' ? 'کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟' :
                'هل أنت متأكد من أنك تريد تسجيل الخروج؟')) {
        Storage.remove('remmic_logged_in_user');
        window.location.href = 'index.html';
    }
}

// Modal functions (these can be implemented later)
function showProfileModal() {
    showSection('profile');
}

function showSettingsModal() {
    showSection('profile');
}

// Make functions globally available
window.showSection = showSection;
window.removeSavedProperty = removeSavedProperty;
window.clearAllSavedProperties = clearAllSavedProperties;
window.clearSearchHistory = clearSearchHistory;
window.searchAgain = searchAgain;
window.viewProperty = viewProperty;
window.logout = logout;
window.showProfileModal = showProfileModal;
window.showSettingsModal = showSettingsModal;
