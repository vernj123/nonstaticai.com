// NonstaticAI Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Create overlay element for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Toggle hamburger animation
            const hamburger = this.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            const hamburger = menuToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
        
        // Close menu when clicking on X button
        navMenu.addEventListener('click', function(e) {
            // Check if click was on the ::before pseudo-element (close button)
            // We can't directly target pseudo-elements, so we check position
            const rect = navMenu.getBoundingClientRect();
            const isCloseButton = 
                e.clientX >= rect.right - 40 && 
                e.clientX <= rect.right - 10 &&
                e.clientY >= rect.top + 10 && 
                e.clientY <= rect.top + 40;
                
            if (isCloseButton) {
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                
                const hamburger = menuToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
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
    
// Search functionality removed as requested
});
