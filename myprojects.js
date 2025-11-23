// Smooth scrolling for navigation
document.querySelectorAll('.icon-nav a, .home-icon').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // If it's a link to index.html sections, redirect there
        if (href.includes('index.html')) {
            return; // Let the default behavior happen
        }
        
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loaded class when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Active section highlighting
const navLinks = document.querySelectorAll('.icon-nav a');
const sections = document.querySelectorAll('.project-section');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Photo gallery interactions
document.addEventListener('DOMContentLoaded', () => {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click functionality here (e.g., open lightbox, modal, etc.)
            console.log('Photo clicked:', this);
        });
    });

    // Carousel scroll on hover for photography section
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        let scrollInterval;
        let scrollSpeed = 2;
        
        carouselContainer.addEventListener('mouseenter', function() {
            scrollInterval = setInterval(() => {
                this.scrollLeft += scrollSpeed;
                
                // Reset to start when reaching the end
                if (this.scrollLeft >= this.scrollWidth - this.clientWidth) {
                    this.scrollLeft = 0;
                }
            }, 20);
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            clearInterval(scrollInterval);
        });
        
        // Allow manual scrolling with mouse wheel
        carouselContainer.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
    }
});
