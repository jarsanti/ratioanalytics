// ===================================
// Main JavaScript File
// ===================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just #
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // Active Nav Link on Scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===================================
    // Back to Top Button
    // ===================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===================================
    // Lazy Loading Images
    // ===================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
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
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // Counter Animation for Stats
    // ===================================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statObserver.observe(stat));
    
    // ===================================
    // Newsletter Form (Footer)
    // ===================================
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input[type="email"]');
            const email = input.value;
            
            if (email) {
                // Here you would typically send to your backend
                console.log('Newsletter subscription:', email);
                
                // Show success message
                alert('¡Gracias por suscribirte! Te mantendremos informado.');
                input.value = '';
            }
        });
    });
    
    // ===================================
    // Detect if user prefers reduced motion
    // ===================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.body.classList.add('reduced-motion');
    }
    
    // ===================================
    // Add animation classes on page load
    // ===================================
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    // Small delay to ensure animations trigger
    setTimeout(() => {
        fadeElements.forEach(element => {
            element.style.opacity = '1';
        });
    }, 100);
    
    // ===================================
    // Console Message (Easter Egg)
    // ===================================
    console.log('%c🚀 Ratio Analytics', 'font-size: 20px; font-weight: bold; color: #5B7EFF;');
    console.log('%c¿Buscando talento en análisis de datos? Contáctanos!', 'font-size: 14px; color: #6b7280;');
    
    // ===================================
    // Performance Monitoring
    // ===================================
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
            }, 0);
        });
    }
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export utility functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle, isInViewport };
}
