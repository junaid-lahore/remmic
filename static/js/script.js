// Remmic Real Estate - Main JavaScript File

// Global Variables
let currentLanguage = 'en';
let savedProperties = [];
let allProperties = [];
let filteredProperties = [];

// Google Maps Variables
let map;
let markers = [];
let currentView = 'grid';

// Property Data - International Properties
const propertyData = [
    {
        id: 'prop_1',
        title: {
            en: 'Modern Villa in DHA Phase 5',
            ur: 'ڈی ایچ اے فیز 5 میں جدید ولا',
            ar: 'فيلا حديثة في DHA المرحلة 5'
        },
        price: 'PKR 2.5 Crore',
        location: {
            en: 'DHA Phase 5, Lahore, Pakistan',
            ur: 'ڈی ایچ اے فیز 5، لاہور، پاکستان',
            ar: 'DHA المرحلة 5، لاهور، باكستان'
        },
        city: 'Lahore',
        country: 'Pakistan',
        countryCode: 'PK',
        currency: 'PKR',
        coordinates: { lat: 31.4504, lng: 74.3587 },
        beds: 4,
        baths: 3,
        area: '10 Marla',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
        type: 'Villa',
        description: {
            en: 'Luxury modern villa with contemporary design and premium finishes.',
            ur: 'جدید ڈیزائن اور پریمیم ختم کے ساتھ لگژری جدید ولا۔',
            ar: 'فيلا حديثة فاخرة بتصميم معاصر ولمسات نهائية مميزة.'
        }
    },
    {
        id: 'prop_2',
        title: {
            en: 'Luxury Apartment in Gulberg',
            ur: 'گلبرگ میں لگژری اپارٹمنٹ',
            ar: 'شقة فاخرة في جلبرج'
        },
        price: 'PKR 1.8 Crore',
        location: {
            en: 'Gulberg III, Lahore, Pakistan',
            ur: 'گلبرگ III، لاہور، پاکستان',
            ar: 'جلبرج III، لاهور، باكستان'
        },
        city: 'Lahore',
        country: 'Pakistan',
        countryCode: 'PK',
        currency: 'PKR',
        coordinates: { lat: 31.5497, lng: 74.3436 },
        beds: 3,
        baths: 2,
        area: '1500 sq ft',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        type: 'Apartment',
        description: {
            en: 'Spacious luxury apartment in the heart of Gulberg.',
            ur: 'گلبرگ کے دل میں وسیع لگژری اپارٹمنٹ۔',
            ar: 'شقة فاخرة واسعة في قلب جلبرج.'
        }
    },
    {
        id: 'prop_3',
        title: {
            en: 'Luxury Penthouse in Dubai Marina',
            ur: 'دبئی مرینا میں لگژری پینٹ ہاؤس',
            ar: 'شقة علوية فاخرة في مرسى دبي'
        },
        price: 'AED 8.5 Million',
        location: {
            en: 'Dubai Marina, Dubai, UAE',
            ur: 'دبئی مرینا، دبئی، متحدہ عرب امارات',
            ar: 'مرسى دبي، دبي، الإمارات العربية المتحدة'
        },
        city: 'Dubai',
        country: 'UAE',
        countryCode: 'AE',
        currency: 'AED',
        coordinates: { lat: 25.0757, lng: 55.1395 },
        beds: 4,
        baths: 5,
        area: '3500 sq ft',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
        type: 'Penthouse',
        description: {
            en: 'Ultra-modern penthouse with panoramic marina and sea views.',
            ur: 'خوبصورت مرینا اور سمندری نظاروں کے ساتھ انتہائی جدید پینٹ ہاؤس۔',
            ar: 'شقة علوية فائقة الحداثة مع إطلالات بانورامية على المرسى والبحر.'
        }
    },
    {
        id: 'prop_4',
        title: {
            en: 'Victorian Townhouse in London',
            ur: 'لندن میں وکٹوریہ ٹاون ہاؤس',
            ar: 'منزل فيكتوري في لندن'
        },
        price: '£2.8 Million',
        location: {
            en: 'Kensington, London, UK',
            ur: 'کینسنگٹن، لندن، برطانیہ',
            ar: 'كنسينغتون، لندن، المملكة المتحدة'
        },
        city: 'London',
        country: 'United Kingdom',
        countryCode: 'GB',
        currency: 'GBP',
        coordinates: { lat: 51.4994, lng: -0.1707 },
        beds: 5,
        baths: 4,
        area: '2800 sq ft',
        image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&h=600&fit=crop',
        type: 'Townhouse',
        description: {
            en: 'Elegant Victorian townhouse in prestigious Kensington area.',
            ur: 'مشہور کینسنگٹن علاقے میں خوبصورت وکٹوریہ ٹاون ہاؤس۔',
            ar: 'منزل فيكتوري أنيق في منطقة كنسينغتون المرموقة.'
        }
    },
    {
        id: 'prop_5',
        title: {
            en: 'Modern Condo in Toronto',
            ur: 'ٹورنٹو میں جدید کنڈو',
            ar: 'شقة حديثة في تورونتو'
        },
        price: 'CAD 1.2 Million',
        location: {
            en: 'Downtown Toronto, Canada',
            ur: 'ڈاؤن ٹاؤن ٹورنٹو، کینیڈا',
            ar: 'وسط مدينة تورونتو، كندا'
        },
        city: 'Toronto',
        country: 'Canada',
        countryCode: 'CA',
        currency: 'CAD',
        coordinates: { lat: 43.6532, lng: -79.3832 },
        beds: 2,
        baths: 2,
        area: '1200 sq ft',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
        type: 'Condo',
        description: {
            en: 'Sleek modern condo in the heart of downtown Toronto.',
            ur: 'ڈاؤن ٹاؤن ٹورنٹو کے دل میں خوبصورت جدید کنڈو۔',
            ar: 'شقة حديثة أنيقة في قلب وسط مدينة تورونتو.'
        }
    },
    {
        id: 'prop_6',
        title: {
            en: 'Manhattan Loft in New York',
            ur: 'نیویارک میں میں ہٹن لوفٹ',
            ar: 'لوفت مانهاتن في نيويورك'
        },
        price: '$3.5 Million',
        location: {
            en: 'SoHo, Manhattan, New York, USA',
            ur: 'سوہو، میں ہٹن، نیویارک، امریکہ',
            ar: 'سوهو، مانهاتن، نيويورك، الولايات المتحدة'
        },
        city: 'New York',
        country: 'United States',
        countryCode: 'US',
        currency: 'USD',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        beds: 3,
        baths: 3,
        area: '2200 sq ft',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        type: 'Loft',
        description: {
            en: 'Stylish converted loft in trendy SoHo district.',
            ur: 'فیشن ایبل سوہو ضلع میں خوبصورت تبدیل شدہ لوفٹ۔',
            ar: 'لوفت محول أنيق في منطقة سوهو العصرية.'
        }
    },
    {
        id: 'prop_7',
        title: {
            en: 'Harbour View Apartment in Sydney',
            ur: 'سڈنی میں بندرگاہ کے نظارے والا اپارٹمنٹ',
            ar: 'شقة بإطلالة على الميناء في سيدني'
        },
        price: 'AUD 2.8 Million',
        location: {
            en: 'Circular Quay, Sydney, Australia',
            ur: 'سرکولر کوی، سڈنی، آسٹریلیا',
            ar: 'الرصيف الدائري، سيدني، أستراليا'
        },
        city: 'Sydney',
        country: 'Australia',
        countryCode: 'AU',
        currency: 'AUD',
        coordinates: { lat: -33.8688, lng: 151.2093 },
        beds: 3,
        baths: 2,
        area: '1800 sq ft',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        type: 'Apartment',
        description: {
            en: 'Premium apartment with stunning Sydney Harbour views.',
            ur: 'شاندار سڈنی بندرگاہ کے نظاروں کے ساتھ پریمیم اپارٹمنٹ۔',
            ar: 'شقة مميزة مع إطلالات خلابة على ميناء سيدني.'
        }
    },
    {
        id: 'prop_8',
        title: {
            en: 'Commercial Plaza in Karachi',
            ur: 'کراچی میں کمرشل پلازہ',
            ar: 'مجمع تجاري في كراتشي'
        },
        price: 'PKR 5.2 Crore',
        location: {
            en: 'Clifton Block 8, Karachi, Pakistan',
            ur: 'کلفٹن بلاک 8، کراچی، پاکستان',
            ar: 'كليفتون بلوك 8، كراتشي، باكستان'
        },
        city: 'Karachi',
        country: 'Pakistan',
        countryCode: 'PK',
        currency: 'PKR',
        coordinates: { lat: 24.8607, lng: 67.0011 },
        beds: 0,
        baths: 4,
        area: '5000 sq ft',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        type: 'Commercial',
        description: {
            en: 'Prime commercial space in prestigious Clifton area.',
            ur: 'مشہور کلفٹن علاقے میں بہترین کمرشل جگہ۔',
            ar: 'مساحة تجارية ممتازة في منطقة كليفتون المرموقة.'
        }
    },
    {
        id: 'prop_9',
        title: {
            en: 'Farmhouse in Islamabad',
            ur: 'اسلام آباد میں فارم ہاؤس',
            ar: 'بيت مزرعة في إسلام أباد'
        },
        price: 'PKR 4.5 Crore',
        location: {
            en: 'F-11 Markaz, Islamabad, Pakistan',
            ur: 'F-11 مرکز، اسلام آباد، پاکستان',
            ar: 'F-11 مركز، إسلام أباد، باكستان'
        },
        city: 'Islamabad',
        country: 'Pakistan',
        countryCode: 'PK',
        currency: 'PKR',
        coordinates: { lat: 33.6844, lng: 73.0479 },
        beds: 6,
        baths: 5,
        area: '2 Kanal',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
        type: 'Farmhouse',
        description: {
            en: 'Spacious farmhouse with garden and modern facilities.',
            ur: 'باغ اور جدید سہولات کے ساتھ وسیع فارم ہاؤس۔',
            ar: 'بيت مزرعة واسع مع حديقة ومرافق حديثة.'
        }
    }
];

// Country flags mapping
const countryFlags = {
    PK: '🇵🇰',
    AE: '🇦🇪',
    GB: '🇬🇧',
    CA: '🇨🇦',
    US: '🇺🇸',
    AU: '🇦🇺'
};

// Currency symbols
const currencySymbols = {
    PKR: 'PKR',
    AED: 'AED',
    GBP: '£',
    CAD: 'CAD',
    USD: '$',
    AUD: 'AUD'
};

// Customer Feedback Data
const feedbackData = [
    {
        name: 'Sarah Ahmed',
        location: {
            en: 'DHA Lahore',
            ur: 'ڈی ایچ اے لاہور',
            ar: 'DHA لاهور'
        },
        rating: 5,
        comment: {
            en: 'Remmic helped us find our dream home! Excellent service and professional team.',
            ur: 'ریمک نے ہمیں اپنا خوابوں کا گھر تلاش کرنے میں مدد کی! بہترین سروس اور پیشہ ور ٹیم۔',
            ar: 'ساعدتنا ريميك في العثور على منزل أحلامنا! خدمة ممتازة وفريق محترف.'
        },
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
        name: 'Ali Raza',
        location: {
            en: 'Gulberg, Lahore',
            ur: 'گلبرگ، لاہور',
            ar: 'جلبرج، لاهور'
        },
        rating: 5,
        comment: {
            en: 'Very transparent process and great support throughout. Highly recommended!',
            ur: 'بہت شفاف عمل اور پوری طرح بہترین سپورٹ۔ انتہائی تجویز کردہ!',
            ar: 'عملية شفافة جداً ودعم رائع طوال الوقت. أنصح بشدة!'
        },
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
        name: 'Zainab Sheikh',
        location: {
            en: 'Clifton, Karachi',
            ur: 'کلفٹن، کراچی',
            ar: 'كليفتون، كراتشي'
        },
        rating: 5,
        comment: {
            en: 'Professional service and found exactly what we were looking for.',
            ur: 'پیشہ ورانہ سروس اور بالکل وہی ملا جس کی ہم تلاش کر رہے تھے۔',
            ar: 'خدمة محترفة ووجدنا بالضبط ما كنا نبحث عنه.'
        },
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop'
    }
];

// Translation placeholders
const placeholders = {
    en: {
        searchPlaceholder: 'Search by location, property type...',
        namePlaceholder: 'Your Name',
        emailPlaceholder: 'Your Email',
        phonePlaceholder: 'Your Phone',
        subjectPlaceholder: 'Subject',
        messagePlaceholder: 'Your Message',
        passwordPlaceholder: 'Password',
        emailAddressPlaceholder: 'Email Address'
    },
    ur: {
        searchPlaceholder: 'مقام، پراپرٹی کی قسم سے تلاش کریں...',
        namePlaceholder: 'آپ کا نام',
        emailPlaceholder: 'آپ کا ای میل',
        phonePlaceholder: 'آپ کا فون',
        subjectPlaceholder: 'موضوع',
        messagePlaceholder: 'آپ کا پیغام',
        passwordPlaceholder: 'پاس ورڈ',
        emailAddressPlaceholder: 'ای میل ایڈریس'
    },
    ar: {
        searchPlaceholder: 'البحث حسب الموقع، نوع العقار...',
        namePlaceholder: 'اسمك',
        emailPlaceholder: 'بريدك الإلكتروني',
        phonePlaceholder: 'هاتفك',
        subjectPlaceholder: 'الموضوع',
        messagePlaceholder: 'رسالتك',
        passwordPlaceholder: 'كلمة المرور',
        emailAddressPlaceholder: 'عنوان البريد الإلكتروني'
    }
};

// Success messages
const successMessages = {
    en: "Thank you for your message! We'll get back to you soon.",
    ur: "آپ کے پیغام کا شکریہ! ہم جلد آپ سے رابطہ کریں گے۔",
    ar: "شكراً لرسالتك! سنتواصل معك قريباً."
};

// LocalStorage Management
const Storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return null;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting to localStorage:', error);
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
};

// Google Maps Functions
function initGoogleMaps() {
    console.log('Initializing Google Maps...');
    
    // Initialize map centered on world view
    map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 2,
        center: { lat: 20, lng: 0 },
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Load markers when map is ready
    google.maps.event.addListenerOnce(map, 'idle', function() {
        updateMapMarkers();
    });
}

function updateMapMarkers() {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    if (!map) return;
    
    // Add markers for filtered properties
    filteredProperties.forEach(property => {
        if (property.coordinates) {
            const marker = new google.maps.Marker({
                position: property.coordinates,
                map: map,
                title: property.title[currentLanguage],
                icon: {
                    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMiA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDQwQzE2IDQwIDMyIDI0LjgzNjYgMzIgMTZDMzIgNy4xNjM0NCAyNC44MzY2IDAgMTYgMEM3LjE2MzQ0IDAgMCA3LjE2MzQ0IDAgMTZDMCAyNC44MzY2IDE2IDQwIDE2IDQwWiIgZmlsbD0iIzAwNzBmMyIvPgo8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI4IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
                    scaledSize: new google.maps.Size(32, 40),
                    anchor: new google.maps.Point(16, 40)
                }
            });
            
            // Create info window
            const infoWindow = new google.maps.InfoWindow({
                content: createMapInfoWindowContent(property)
            });
            
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
            
            markers.push(marker);
        }
    });
    
    // Adjust map bounds to show all markers
    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
        
        // Don't zoom too close if only one marker
        if (markers.length === 1) {
            map.setZoom(Math.min(map.getZoom(), 15));
        }
    }
}

function createMapInfoWindowContent(property) {
    return `
        <div class="map-info-window">
            <img src="${property.image}" alt="${property.title[currentLanguage]}" class="map-property-image" onerror="this.src='https://via.placeholder.com/300x150/e9ecef/6c757d?text=Property+Image'">
            <h6 class="map-property-title">${property.title[currentLanguage]}</h6>
            <p class="map-property-location">
                <i class="bi bi-geo-alt me-1"></i>
                ${property.location[currentLanguage]}
            </p>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="map-property-price">${property.price}</span>
                <span class="badge bg-primary">${property.type}</span>
            </div>
            ${property.beds > 0 ? `
            <div class="d-flex gap-3 mb-2 text-muted small">
                <span><i class="bi bi-bed me-1"></i>${property.beds}</span>
                <span><i class="bi bi-bath me-1"></i>${property.baths}</span>
                <span><i class="bi bi-square me-1"></i>${property.area}</span>
            </div>` : ''}
            <button class="btn btn-primary btn-sm w-100" onclick="viewPropertyDetails('${property.id}')">
                ${currentLanguage === 'en' ? 'View Details' : currentLanguage === 'ur' ? 'تفصیلات دیکھیں' : 'عرض التفاصيل'}
            </button>
        </div>
    `;
}

function switchToGridView() {
    currentView = 'grid';
    document.getElementById('propertiesContainer').classList.remove('d-none');
    document.getElementById('mapContainer').classList.add('d-none');
    document.getElementById('gridViewBtn').classList.add('active');
    document.getElementById('mapViewBtn').classList.remove('active');
}

function switchToMapView() {
    currentView = 'map';
    document.getElementById('propertiesContainer').classList.add('d-none');
    document.getElementById('mapContainer').classList.remove('d-none');
    document.getElementById('gridViewBtn').classList.remove('active');
    document.getElementById('mapViewBtn').classList.add('active');
    
    // Trigger map resize and update markers
    setTimeout(() => {
        if (map) {
            google.maps.event.trigger(map, 'resize');
            updateMapMarkers();
        }
    }, 100);
}

function viewPropertyDetails(propertyId) {
    const property = allProperties.find(p => p.id === propertyId);
    if (property) {
        // In a real application, this would navigate to a property details page
        alert(`${currentLanguage === 'en' ? 'Property Details:' : currentLanguage === 'ur' ? 'پراپرٹی کی تفصیلات:' : 'تفاصيل العقار:'} ${property.title[currentLanguage]}`);
        scrollToSection('contact');
    }
}

// Language Management
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update document direction
    document.documentElement.dir = (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Hide all language elements
    document.querySelectorAll('[class*="-en"], [class*="-ur"], [class*="-ar"]').forEach(el => {
        el.classList.add('d-none');
    });
    
    // Show current language elements
    document.querySelectorAll(`[class*="-${lang}"]`).forEach(el => {
        el.classList.remove('d-none');
    });
    
    // Update language flag
    const flags = { en: '🇺🇸', ur: '🇵🇰', ar: '🇸🇦' };
    const flagElement = document.getElementById('currentLanguageFlag');
    if (flagElement) {
        flagElement.textContent = flags[lang];
    }
    
    // Update placeholders
    updatePlaceholders();
    
    // Re-render dynamic content
    renderProperties();
    renderFeedback();
    
    // Save preference
    Storage.set('remmic_language', lang);
}

function updatePlaceholders() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = placeholders[currentLanguage].searchPlaceholder;
    }
    
    const contactName = document.getElementById('contactName');
    if (contactName) {
        contactName.placeholder = placeholders[currentLanguage].namePlaceholder;
    }
    
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) {
        contactEmail.placeholder = placeholders[currentLanguage].emailPlaceholder;
    }
    
    const contactPhone = document.getElementById('contactPhone');
    if (contactPhone) {
        contactPhone.placeholder = placeholders[currentLanguage].phonePlaceholder;
    }
    
    const contactSubject = document.getElementById('contactSubject');
    if (contactSubject) {
        contactSubject.placeholder = placeholders[currentLanguage].subjectPlaceholder;
    }
    
    const contactMessage = document.getElementById('contactMessage');
    if (contactMessage) {
        contactMessage.placeholder = placeholders[currentLanguage].messagePlaceholder;
    }
    
    const loginEmail = document.getElementById('loginEmail');
    if (loginEmail) {
        loginEmail.placeholder = placeholders[currentLanguage].emailAddressPlaceholder;
    }
    
    const loginPassword = document.getElementById('loginPassword');
    if (loginPassword) {
        loginPassword.placeholder = placeholders[currentLanguage].passwordPlaceholder;
    }
}

// Property Management
function renderProperties() {
    const container = document.getElementById('propertiesContainer');
    if (!container) {
        console.log('Properties container not found');
        return;
    }

    console.log('Rendering', filteredProperties.length, 'properties');
    container.innerHTML = '';
    
    // Update property count
    const propertyCount = document.getElementById('propertyCount');
    if (propertyCount) {
        propertyCount.textContent = filteredProperties.length;
    }

    if (filteredProperties.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4 class="text-muted">No properties found matching your criteria</h4>
                <p class="text-muted">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }

    filteredProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        container.appendChild(propertyCard);
    });
}

function createPropertyCard(property) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';

    const isSaved = savedProperties.includes(property.id);
    const heartIcon = isSaved ? 'bi-heart-fill text-danger' : 'bi-heart';

    col.innerHTML = `
        <div class="card property-card h-100">
            <div class="position-relative">
                <img src="${property.image}"
                     alt="${property.title[currentLanguage]}"
                     class="card-img-top"
                     style="height: 250px; object-fit: cover; width: 100%;"
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/800x600/e9ecef/6c757d?text=Property+Image'">
                <span class="badge position-absolute" style="top: 1rem; left: 1rem; background-color: #ff6b35; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">${property.type}</span>
                <div class="country-badge">
                    <span>${countryFlags[property.countryCode] || property.countryCode}</span>
                    <span>${property.country}</span>
                </div>
                <button class="btn position-absolute ${isSaved ? 'btn-danger' : 'btn-light'}"
                        style="top: 1rem; right: 1rem; width: 40px; height: 40px; border-radius: 50%; padding: 0;"
                        onclick="toggleSaveProperty('${property.id}')"
                        title="Save Property">
                    <i class="bi ${heartIcon}"></i>
                </button>
                <div class="currency-badge">${property.currency}</div>
            </div>
            <div class="card-body property-details">
                <h5 class="card-title property-title">${property.title[currentLanguage]}</h5>
                <p class="text-muted property-location">
                    <i class="bi bi-geo-alt me-1"></i>
                    ${property.location[currentLanguage]}
                </p>
                <p class="property-description text-muted" style="font-size: 0.9rem;">${property.description[currentLanguage]}</p>
                <div class="property-features d-flex gap-3 mb-3 text-muted" style="font-size: 0.9rem;">
                    ${property.beds > 0 ? `<div class="d-flex align-items-center"><i class="bi bi-bed me-1"></i>${property.beds}</div>` : ''}
                    <div class="d-flex align-items-center"><i class="bi bi-bath me-1"></i>${property.baths}</div>
                    <div class="d-flex align-items-center"><i class="bi bi-square me-1"></i>${property.area}</div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="property-price text-primary fw-bold" style="font-size: 1.5rem;">${property.price}</div>
                    <button class="btn btn-primary" onclick="scrollToSection('contact')">
                        ${currentLanguage === 'en' ? 'Contact Us' : currentLanguage === 'ur' ? 'ہم سے رابطہ کریں' : 'اتصل بنا'}
                    </button>
                </div>
            </div>
        </div>
    `;

    return col;
}

function toggleSaveProperty(propertyId) {
    const index = savedProperties.indexOf(propertyId);
    if (index > -1) {
        savedProperties.splice(index, 1);
    } else {
        savedProperties.push(propertyId);
    }
    
    Storage.set('remmic_saved_properties', savedProperties);
    renderProperties();
}

function applyFilters() {
    const cityFilter = document.getElementById('cityFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const bedsFilter = document.getElementById('bedsFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    filteredProperties = allProperties.filter(property => {
        const matchesCity = cityFilter === 'all' || property.city === cityFilter;
        const matchesType = typeFilter === 'all' || property.type === typeFilter;
        const matchesBeds = bedsFilter === 'all' || property.beds.toString() === bedsFilter;
        const matchesSearch = !searchInput || 
            property.title[currentLanguage].toLowerCase().includes(searchInput) ||
            property.location[currentLanguage].toLowerCase().includes(searchInput) ||
            property.country.toLowerCase().includes(searchInput);
        
        return matchesCity && matchesType && matchesBeds && matchesSearch;
    });
    
    renderProperties();
    
    // Update map markers if in map view
    if (currentView === 'map' && map) {
        updateMapMarkers();
    }
    
    // Save filter preferences
    Storage.set('remmic_filters', {
        city: cityFilter,
        type: typeFilter,
        beds: bedsFilter
    });
}

function searchProperties() {
    applyFilters();
    scrollToSection('properties');
}

// Feedback Management
function renderFeedback() {
    const container = document.getElementById('feedbackContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    feedbackData.forEach(feedback => {
        const feedbackCard = createFeedbackCard(feedback);
        container.appendChild(feedbackCard);
    });
}

function createFeedbackCard(feedback) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 mb-4';

    const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);

    col.innerHTML = `
        <div class="card h-100" style="border: none; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);">
            <div class="card-body p-0">
                <div class="d-flex align-items-center mb-3">
                    <img src="${feedback.image}"
                         alt="${feedback.name}"
                         class="rounded-circle me-3"
                         style="width: 50px; height: 50px; object-fit: cover;"
                         loading="lazy"
                         onerror="this.src='https://via.placeholder.com/50x50/e9ecef/6c757d?text=${feedback.name.charAt(0)}'">
                    <div>
                        <h6 class="mb-1 fw-semibold">${feedback.name}</h6>
                        <small class="text-muted">${feedback.location[currentLanguage]}</small>
                    </div>
                </div>
                <div class="mb-3" style="color: #ffc107; font-size: 1rem;">${stars}</div>
                <p class="card-text text-muted">${feedback.comment[currentLanguage]}</p>
            </div>
        </div>
    `;

    return col;
}

// Form Management
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const inquiries = Storage.get('remmic_inquiries') || [];
    inquiries.push({
        id: `inquiry_${Date.now()}`,
        ...formData
    });
    Storage.set('remmic_inquiries', inquiries);
    
    // Show success message
    alert(successMessages[currentLanguage]);
    
    // Reset form
    document.getElementById('contactForm').reset();
}

function handleLoginForm(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        // Simple authentication - in real implementation, this would be handled by backend
        const user = {
            id: `user_${Date.now()}`,
            name: email.split('@')[0], // Use email prefix as name
            email: email,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            loginTime: new Date().toISOString()
        };

        // Save logged in user to localStorage
        Storage.set('remmic_logged_in_user', user);

        // Show success message
        alert(currentLanguage === 'en' ? 'Login successful! Redirecting to dashboard...' :
              currentLanguage === 'ur' ? 'کامیاب لاگ ان! ڈیش بورڈ پر بھیجا جا رہا ہے...' :
              'تم تسجيل الدخول بنجاح! جاري التوجه إلى لوحة التحكم...');

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleBtn = document.getElementById('togglePassword');
    const icon = toggleBtn.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.className = 'bi bi-eye-slash';
    } else {
        passwordInput.type = 'password';
        icon.className = 'bi bi-eye';
    }
}

// Navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80; // Account for fixed navbar
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

function filterAndGoToProperties(type) {
    document.getElementById('typeFilter').value = type;
    applyFilters();
    scrollToSection('properties');
}

// Initialization
function initializeApp() {
    try {
        console.log('Starting app initialization...');

        // Load saved preferences
        const savedLanguage = Storage.get('remmic_language') || 'en';
        const savedFilters = Storage.get('remmic_filters') || { city: 'all', type: 'all', beds: 'all' };
        const savedPropertiesData = Storage.get('remmic_saved_properties') || [];

        // Set global variables
        currentLanguage = savedLanguage;
        savedProperties = savedPropertiesData;
        allProperties = propertyData;
        filteredProperties = [...propertyData];

        console.log('Initialized with', allProperties.length, 'properties');

        // Check if user is logged in and show dashboard link
        checkLoginStatus();

        // Apply saved language
        changeLanguage(savedLanguage);

        // Apply saved filters if elements exist
        const cityFilter = document.getElementById('cityFilter');
        const typeFilter = document.getElementById('typeFilter');
        const bedsFilter = document.getElementById('bedsFilter');

        if (cityFilter && typeFilter && bedsFilter) {
            cityFilter.value = savedFilters.city;
            typeFilter.value = savedFilters.type;
            bedsFilter.value = savedFilters.beds;
        }

        // Render initial content
        console.log('Rendering initial content...');
        renderProperties();
        renderFeedback();

        // Setup event listeners
        setupEventListeners();

        // Update placeholders
        updatePlaceholders();

        console.log('App initialization completed successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Check login status and show/hide dashboard link
function checkLoginStatus() {
    const loggedInUser = Storage.get('remmic_logged_in_user');
    const dashboardNavItem = document.getElementById('dashboardNavItem');

    if (loggedInUser && dashboardNavItem) {
        dashboardNavItem.classList.remove('d-none');
    } else if (dashboardNavItem) {
        dashboardNavItem.classList.add('d-none');
    }
}

function setupEventListeners() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginForm);
    }
    
    // Password toggle
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const passwordInput = document.getElementById('loginPassword');
            const icon = togglePassword.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'bi bi-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'bi bi-eye';
            }
        });
    }
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
    
    // Filter changes
    ['cityFilter', 'typeFilter', 'bedsFilter'].forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

// Also initialize if the script loads after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    console.log('DOM already loaded, initializing app immediately...');
    initializeApp();
}

// Make functions globally available
window.changeLanguage = changeLanguage;
window.scrollToSection = scrollToSection;
window.searchProperties = searchProperties;
window.applyFilters = applyFilters;
window.toggleSaveProperty = toggleSaveProperty;
window.filterAndGoToProperties = filterAndGoToProperties;
window.initGoogleMaps = initGoogleMaps;
window.switchToGridView = switchToGridView;
window.switchToMapView = switchToMapView;
window.viewPropertyDetails = viewPropertyDetails;
