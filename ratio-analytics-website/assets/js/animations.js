// ===================================
// Animations JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Scroll Reveal Animation
    // ===================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Optional: unobserve after animation to improve performance
                // scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-animate class
    const scrollAnimateElements = document.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right'
    );
    
    scrollAnimateElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // ===================================
    // Staggered Animation for Groups
    // ===================================
    function staggerAnimation(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            element.style.transitionDelay = `${index * delay}ms`;
        });
    }
    
    // Apply stagger to service cards, case cards, etc.
    staggerAnimation('.service-card', 100);
    staggerAnimation('.case-card', 100);
    staggerAnimation('.metric-card', 150);
    
    // ===================================
    // Parallax Effect
    // ===================================
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', throttleParallax);
    }
    
    const throttleParallax = throttle(updateParallax, 10);
    
    // ===================================
    // Mouse Move Effect for Hero Visual
    // ===================================
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        const speed = 0.1;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = (e.clientX - window.innerWidth / 2) / 50;
            mouseY = (e.clientY - window.innerHeight / 2) / 50;
        });
        
        function animateHeroVisual() {
            currentX += (mouseX - currentX) * speed;
            currentY += (mouseY - currentY) * speed;
            
            const charts = heroVisual.querySelectorAll('.chart-container, .metric-card');
            charts.forEach((chart, index) => {
                const depth = (index + 1) * 0.5;
                chart.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
            });
            
            requestAnimationFrame(animateHeroVisual);
        }
        
        // Only run on desktop
        if (window.innerWidth > 1024) {
            animateHeroVisual();
        }
    }
    
    // ===================================
    // Typing Animation for Text
    // ===================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Example usage (uncomment if needed)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }
    
    // ===================================
    // Number Counter Animation
    // ===================================
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            element.textContent = current;
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    // Counter observer for stat numbers
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const element = entry.target;
                const endValue = parseInt(element.dataset.count) || 0;
                
                animateValue(element, 0, endValue, 2000);
                element.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('[data-count]').forEach(element => {
        counterObserver.observe(element);
    });
    
    // ===================================
    // Gradient Animation
    // ===================================
    const gradientElements = document.querySelectorAll('.gradient-animated');
    
    gradientElements.forEach(element => {
        let angle = 0;
        
        setInterval(() => {
            angle = (angle + 1) % 360;
            element.style.background = `linear-gradient(${angle}deg, var(--color-primary), var(--color-accent))`;
        }, 50);
    });
    
    // ===================================
    // Card Tilt Effect (3D)
    // ===================================
    const tiltCards = document.querySelectorAll('.card-tilt');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // ===================================
    // Background Shapes Animation
    // ===================================
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Random movement
        setInterval(() => {
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 100 - 50;
            const randomRotate = Math.random() * 360;
            
            shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 5000 + index * 1000);
    });
    
    // ===================================
    // Ripple Effect on Click
    // ===================================
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // ===================================
    // Progress Bar Animation
    // ===================================
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const progress = bar.dataset.progress || 0;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = `${progress}%`;
            }, 100);
        });
    }
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const progressSection = document.querySelector('.progress-section');
    if (progressSection) {
        progressObserver.observe(progressSection);
    }
    
    // ===================================
    // Utility: Throttle Function
    // ===================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ===================================
    // Add subtle animations on hover
    // ===================================
    const hoverElements = document.querySelectorAll('.lift-on-hover, .glow-on-hover, .scale-on-hover');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // ===================================
    // Disable animations if user prefers reduced motion
    // ===================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
        });
    }
    
    console.log('✨ Animations initialized');
});
