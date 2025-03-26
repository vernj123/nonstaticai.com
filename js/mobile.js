/* Mobile Responsiveness Enhancements */

document.addEventListener('DOMContentLoaded', function() {
    // Function to check if device is mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Mobile menu functionality
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            // Toggle menu on click
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Toggle hamburger animation
                const hamburger = this.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.toggle('active');
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.main-nav') && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    
                    const hamburger = menuToggle.querySelector('.hamburger');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
            });
        }
    }
    
    // Handle dropdown menus on mobile
    function setupMobileDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (isMobile()) {
                    e.preventDefault();
                    this.parentElement.classList.toggle('active');
                    
                    // Close other open dropdowns
                    dropdownToggles.forEach(otherToggle => {
                        if (otherToggle !== toggle && otherToggle.parentElement.classList.contains('active')) {
                            otherToggle.parentElement.classList.remove('active');
                        }
                    });
                }
            });
        });
    }
    
    // Optimize tables for mobile
    function optimizeTablesForMobile() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            // Add a wrapper div for horizontal scrolling
            if (!table.parentElement.classList.contains('comparison-table-container')) {
                const wrapper = document.createElement('div');
                wrapper.classList.add('mobile-table-wrapper');
                wrapper.style.overflowX = 'auto';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
            
            // Add data-label attributes to cells for responsive display
            const headerCells = table.querySelectorAll('thead th');
            const headerTexts = Array.from(headerCells).map(cell => cell.textContent.trim());
            
            const bodyRows = table.querySelectorAll('tbody tr');
            bodyRows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    if (headerTexts[index]) {
                        cell.setAttribute('data-label', headerTexts[index]);
                    }
                });
            });
        });
    }
    
    // Optimize images for mobile
    function optimizeImagesForMobile() {
        if (isMobile()) {
            const images = document.querySelectorAll('img:not(.logo)');
            
            images.forEach(img => {
                // Add loading="lazy" attribute for better performance
                img.setAttribute('loading', 'lazy');
                
                // Ensure images don't overflow their containers
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            });
        }
    }
    
    // Adjust font sizes for better readability on mobile
    function adjustFontSizesForMobile() {
        if (isMobile()) {
            document.documentElement.style.fontSize = '14px';
            
            // Adjust heading sizes
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    h1 { font-size: 1.8rem !important; }
                    h2 { font-size: 1.5rem !important; }
                    h3 { font-size: 1.2rem !important; }
                    .hero h1 { font-size: 2rem !important; }
                    .section-title { font-size: 1.5rem !important; }
                    .container { padding: 0 15px; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Optimize forms for mobile
    function optimizeFormsForMobile() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Increase touch target size
                if (isMobile()) {
                    input.style.minHeight = '44px';
                    
                    // Add autocomplete attributes for better UX
                    if (input.type === 'email') {
                        input.setAttribute('autocomplete', 'email');
                    } else if (input.type === 'name' || input.id === 'name') {
                        input.setAttribute('autocomplete', 'name');
                    }
                }
            });
        });
    }
    
    // Fix viewport for mobile devices
    function fixViewport() {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        
        if (viewportMeta) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
        } else {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
            document.head.appendChild(meta);
        }
    }
    
    // Add touch-friendly navigation
    function addTouchFriendlyNavigation() {
        if (isMobile()) {
            const links = document.querySelectorAll('a');
            
            links.forEach(link => {
                // Increase touch target size
                link.style.padding = '8px 0';
                
                // Add active state for touch feedback
                link.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                });
                
                link.addEventListener('touchend', function() {
                    this.classList.remove('touch-active');
                });
            });
            
            // Add a style for touch-active state
            const style = document.createElement('style');
            style.textContent = `
                .touch-active {
                    opacity: 0.7;
                    transition: opacity 0.2s ease;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Optimize CTA buttons for mobile
    function optimizeCtaButtons() {
        if (isMobile()) {
            const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
            
            ctaButtons.forEach(button => {
                // Make buttons more prominent on mobile
                button.style.padding = '12px 20px';
                button.style.fontSize = '1.1rem';
                button.style.width = '100%';
                button.style.textAlign = 'center';
                button.style.marginBottom = '10px';
            });
        }
    }
    
    // Add "back to top" button for mobile
    function addBackToTopButton() {
        if (isMobile()) {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTopBtn.classList.add('back-to-top');
            backToTopBtn.style.position = 'fixed';
            backToTopBtn.style.bottom = '20px';
            backToTopBtn.style.right = '20px';
            backToTopBtn.style.zIndex = '999';
            backToTopBtn.style.width = '40px';
            backToTopBtn.style.height = '40px';
            backToTopBtn.style.borderRadius = '50%';
            backToTopBtn.style.backgroundColor = 'var(--neon-primary)';
            backToTopBtn.style.color = 'white';
            backToTopBtn.style.border = 'none';
            backToTopBtn.style.boxShadow = 'var(--neon-glow)';
            backToTopBtn.style.display = 'none';
            backToTopBtn.style.justifyContent = 'center';
            backToTopBtn.style.alignItems = 'center';
            backToTopBtn.style.cursor = 'pointer';
            
            document.body.appendChild(backToTopBtn);
            
            // Show/hide button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.display = 'flex';
                } else {
                    backToTopBtn.style.display = 'none';
                }
            });
            
            // Scroll to top when clicked
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Run all mobile optimization functions
    function optimizeForMobile() {
        fixViewport();
        setupMobileMenu();
        setupMobileDropdowns();
        optimizeTablesForMobile();
        optimizeImagesForMobile();
        adjustFontSizesForMobile();
        optimizeFormsForMobile();
        addTouchFriendlyNavigation();
        optimizeCtaButtons();
        addBackToTopButton();
    }
    
    // Initialize mobile optimizations
    optimizeForMobile();
    
    // Re-run optimizations on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            optimizeForMobile();
        }, 250);
    });
});
