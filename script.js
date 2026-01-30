// ==================== TYPING ANIMATION ====================
const typingTexts = [
    "That actually work.",
    "24/7 for your customers.",
    "And handle your business.",
    "With real intelligence.",
    "No downtime, ever.",
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 50;
const deletingSpeed = 30;
const pauseSpeed = 2000;

function typeEffect() {
    const typingElement = document.getElementById('typingText');
    const currentText = typingTexts[currentTextIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, deletingSpeed);
        }
    } else {
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseSpeed);
        } else {
            setTimeout(typeEffect, typingSpeed);
        }
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 500);
});

// ==================== SCROLL ANIMATIONS ====================
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Add animation class to elements on scroll
    document.querySelectorAll('.service-card, .step, .benefit-card, .trust-card').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

// ==================== DEMO CHAT FUNCTIONALITY ====================
const demoResponses = [
    "Great question! Let me help you with that.",
    "I'm here to assist. Can you tell me more about your issue?",
    "I understand. Let me find the best solution for you.",
    "Thanks for reaching out. I've analyzed your request.",
    "That's a common question. Here's what I recommend...",
    "I'm processing your request right now.",
    "Perfect! I can definitely help with that.",
    "Based on your inquiry, I suggest...",
    "Absolutely! Let me connect you with the right solution.",
    "I appreciate your patience. Here's what I found..."
];

function sendDemoMessage() {
    const input = document.getElementById('demoInput');
    const messagesContainer = document.getElementById('demoMessages');

    if (input.value.trim() === '') return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'demo-message user';
    userMessage.innerHTML = `<div class="demo-bubble">${input.value}</div>`;
    messagesContainer.appendChild(userMessage);

    // Clear input
    input.value = '';

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        const botMessage = document.createElement('div');
        botMessage.className = 'demo-message bot';
        botMessage.innerHTML = `<div class="demo-bubble">${randomResponse}</div>`;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 800);
}

// Allow Enter key to send message
document.addEventListener('DOMContentLoaded', () => {
    const demoInput = document.getElementById('demoInput');
    if (demoInput) {
        demoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== NAVBAR STICKY EFFECT ====================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.borderBottomColor = 'rgba(34, 211, 238, 0.2)';
    } else {
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== BUTTON CLICK EFFECTS ====================
function addRippleEffect(btn) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');

    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleAnimation 0.6s ease-out';

    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', addRippleEffect);
});

// ==================== PARALLAX EFFECT ON SCROLL ====================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');

    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initMobileMenu);

// ==================== FORM VALIDATION ====================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== LAZY LOADING ==================== 
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
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

// ==================== ANIMATION CONFIGURATION ====================
const animationConfig = {
    duration: 0.6,
    delay: 0.1,
    easing: 'ease-out'
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AgentAI Website Loaded Successfully');

    // Initialize all features
    observeElements();
    initMobileMenu();
    lazyLoadImages();

    // Add active state to current nav link
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Add error tracking here if needed
});

// ==================== ANALYTICS SETUP (Optional) ====================
function trackEvent(eventName, eventData) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log(`📊 Event tracked: ${eventName}`, eventData);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: btn.textContent
        });
    });
});