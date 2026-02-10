// ===================================
// Navigation JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
    
    // ===================================
    // Active Link Highlighting
    // ===================================
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Check if it's the current page
            if (linkPath.includes(currentPage) || 
                (currentPage === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveLink();
    
    // ===================================
    // Scroll-based Active Link
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href').includes(`#${sectionId}`)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttle(highlightNavOnScroll, 100));
    
    // ===================================
    // Dropdown Menu (if exists)
    // ===================================
    const dropdownTriggers = document.querySelectorAll('.dropdown');
    
    dropdownTriggers.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownMenu) {
            // Desktop: hover
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', function() {
                    dropdownMenu.style.display = 'block';
                    setTimeout(() => {
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.visibility = 'visible';
                    }, 10);
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    setTimeout(() => {
                        dropdownMenu.style.display = 'none';
                    }, 300);
                });
            } else {
                // Mobile: click
                dropdown.addEventListener('click', function(e) {
                    e.preventDefault();
                    const isOpen = dropdownMenu.classList.contains('open');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.classList.remove('open');
                    });
                    
                    if (!isOpen) {
                        dropdownMenu.classList.add('open');
                    }
                });
            }
        }
    });
    
    // ===================================
    // Prevent Body Scroll When Menu Open
    // ===================================
    function preventBodyScroll() {
        if (body.classList.contains('menu-open')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    const observer = new MutationObserver(preventBodyScroll);
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    
    // ===================================
    // Navbar Hide/Show on Scroll
    // ===================================
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 100;
    
    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            // At top of page
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Uncomment if you want navbar to hide on scroll down
    // window.addEventListener('scroll', throttle(handleNavbarScroll, 100));
    
    // ===================================
    // Breadcrumb Navigation (if needed)
    // ===================================
    function generateBreadcrumb() {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (!breadcrumbContainer) return;
        
        const pathArray = window.location.pathname.split('/').filter(path => path);
        let breadcrumbHTML = '<a href="/">Home</a>';
        
        let currentPath = '';
        pathArray.forEach((path, index) => {
            currentPath += '/' + path;
            const isLast = index === pathArray.length - 1;
            const displayName = path.replace(/-/g, ' ').replace('.html', '');
            
            if (isLast) {
                breadcrumbHTML += ` <span class="separator">/</span> <span class="current">${displayName}</span>`;
            } else {
                breadcrumbHTML += ` <span class="separator">/</span> <a href="${currentPath}">${displayName}</a>`;
            }
        });
        
        breadcrumbContainer.innerHTML = breadcrumbHTML;
    }
    
    generateBreadcrumb();
    
    // ===================================
    // Search Functionality (if implemented)
    // ===================================
    const searchInput = document.querySelector('.search-input input');
    const searchButton = document.querySelector('.search-input button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
    
    function performSearch(query) {
        if (query.trim() === '') return;
        
        console.log('Searching for:', query);
        // Implement your search logic here
        // You could redirect to a search page or show results in a modal
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
    
    // ===================================
    // Mega Menu (for future expansion)
    // ===================================
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');
    
    megaMenuTriggers.forEach(trigger => {
        const megaMenu = trigger.nextElementSibling;
        
        if (megaMenu && megaMenu.classList.contains('mega-menu')) {
            trigger.addEventListener('mouseenter', function() {
                megaMenu.classList.add('active');
            });
            
            trigger.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!megaMenu.matches(':hover')) {
                        megaMenu.classList.remove('active');
                    }
                }, 100);
            });
            
            megaMenu.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        }
    });
    
    // ===================================
    // Sticky Sidebar Navigation (for long pages)
    // ===================================
    const sidebarNav = document.querySelector('.sidebar-nav');
    
    if (sidebarNav) {
        const sidebarLinks = sidebarNav.querySelectorAll('a');
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===================================
    // Progress Indicator
    // ===================================
    const progressBar = document.querySelector('.reading-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
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
    
    console.log('🧭 Navigation initialized');
});
