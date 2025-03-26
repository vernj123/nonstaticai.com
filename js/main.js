// NonstaticAI Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            const hamburger = this.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
            
            // Close menu when clicking outside
            if (navMenu.classList.contains('active')) {
                document.addEventListener('click', function closeMenu(event) {
                    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                        navMenu.classList.remove('active');
                        if (hamburger) {
                            hamburger.classList.remove('active');
                        }
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }
        });
    }
    
    // Dropdown Menu for Mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Form Submission (placeholder)
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                // For now, we'll just show a success message
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Add neon glow effect to buttons on hover
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            if (this.classList.contains('btn-primary')) {
                this.style.boxShadow = '0 0 10px rgba(121, 40, 202, 0.7), 0 0 20px rgba(121, 40, 202, 0.5), 0 0 30px rgba(121, 40, 202, 0.3)';
            } else if (this.classList.contains('btn-secondary')) {
                this.style.boxShadow = '0 0 10px rgba(255, 0, 128, 0.7), 0 0 20px rgba(255, 0, 128, 0.5), 0 0 30px rgba(255, 0, 128, 0.3)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Animate category cards on scroll
    const categoryCards = document.querySelectorAll('.category-card');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function animateOnScroll() {
        categoryCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('animate');
            }
        });
    }
    
    // Initial check on page load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    const searchButton = document.querySelector('.search-form button');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="query"]');
            const query = searchInput.value.trim();
            
            if (!query) {
                e.preventDefault();
                alert('Please enter a search term');
            }
        });
        
        // Mobile search icon toggle
        if (searchButton && window.innerWidth <= 768) {
            searchButton.addEventListener('click', function(e) {
                if (!searchForm.classList.contains('active')) {
                    e.preventDefault();
                    searchForm.classList.add('active');
                    setTimeout(() => {
                        searchForm.querySelector('input').focus();
                    }, 100);
                    
                    // Close search when clicking outside
                    document.addEventListener('click', function closeSearch(event) {
                        if (!searchForm.contains(event.target)) {
                            searchForm.classList.remove('active');
                            document.removeEventListener('click', closeSearch);
                        }
                    });
                }
            });
        }
    }
});
