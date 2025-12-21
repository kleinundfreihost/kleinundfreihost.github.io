// Klein und Frei - Essential JavaScript for responsiveness

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link-mobile').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Simple scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation for stat numbers
                if (entry.target.classList.contains('stats-card')) {
                    animateStats(entry.target);
                }
            }
        });
    }, observerOptions);

    // Animate stat numbers with counting effect
    function animateStats(container) {
        const statNumbers = container.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add('counting');
                const originalValue = stat.textContent;
                
                // Only animate numeric values
                if (!isNaN(parseInt(originalValue))) {
                    const finalValue = parseInt(originalValue);
                    let currentValue = 0;
                    const increment = Math.ceil(finalValue / 20);
                    const duration = 800;
                    const stepTime = duration / (finalValue / increment);
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            stat.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            stat.textContent = currentValue;
                        }
                    }, stepTime);
                }
            }, index * 150);
        });
    }

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .workshop-card, .product-card, .contact-card, .stats-card, .social-card, .cta-card, .review-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });

    // Add essential CSS animations
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(dynamicStyles);
});
