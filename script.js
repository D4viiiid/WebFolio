// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize EmailJS
(function(){
    emailjs.init("YqWI0ztkkLbdvvyBUh");
})();

// Custom Notification Function
function showNotification(title, message, type = 'info') {
    const modal = document.getElementById('notificationModal');
    const titleEl = document.getElementById('notificationTitle');
    const messageEl = document.getElementById('notificationMessage');
    const iconEl = document.getElementById('notificationIcon');
    const btnEl = document.getElementById('notificationBtn');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Set icon based on type
    iconEl.className = 'notification-icon ' + type;
    
    if (type === 'success') {
        iconEl.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke="currentColor" stroke-width="3"/>
                <path d="M15 30L25 40L45 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    } else if (type === 'error') {
        iconEl.innerHTML = `
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke="currentColor" stroke-width="3"/>
                <path d="M20 20L40 40M40 20L20 40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
        `;
    }
    
    modal.classList.add('active');
    
    // Close notification on button click
    btnEl.onclick = function() {
        modal.classList.remove('active');
    };
    
    // Close on clicking outside
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    };
    
    // Close on Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}


// Active navigation highlight and color change
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    const nav = document.querySelector('nav');
    const heroSection = document.getElementById('home');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Change nav color based on section
    if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY >= heroBottom - 200) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for background text
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const portfolioOutline = document.querySelector('.portfolio-outline');
    if (portfolioOutline) {
        portfolioOutline.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.5}px)`;
    }
});

// Add loaded class for animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Optional: Add scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Scroll-to-About for the arrow-down indicator (click + keyboard)
(function() {
    const arrowDown = document.querySelector('.arrow-down');
    const aboutSection = document.getElementById('about');
    if (!arrowDown || !aboutSection) return;

    // make it keyboard focusable and announce role
    arrowDown.setAttribute('tabindex', '0');
    arrowDown.setAttribute('role', 'button');
    arrowDown.setAttribute('aria-label', 'Scroll to About section');

    const scrollToAbout = () => {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    arrowDown.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToAbout();
    });

    arrowDown.addEventListener('keydown', (e) => {
        const key = e.key || e.keyCode;
        if (key === 'Enter' || key === ' ' || key === 'Spacebar' || key === 13 || key === 32) {
            e.preventDefault();
            scrollToAbout();
        }
    });
})();

// About section animations - typing effect and fade-in
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const aboutSection = entry.target;
            
            // Add animation classes
            const heading = aboutSection.querySelector('.about-heading');
            const paragraphs = aboutSection.querySelectorAll('.about-paragraph');
            const avatar = aboutSection.querySelector('.about-avatar');
            const button = aboutSection.querySelector('.download-cv');
            const stats = aboutSection.querySelectorAll('.stat');
            
            if (heading) {
                heading.classList.add('typing-animation');
                // Remove cursor after typing completes
                setTimeout(() => {
                    heading.classList.add('typing-complete');
                }, 2500);
            }
            
            paragraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.classList.add('typing-animation');
                    // Remove cursor after typing completes
                    setTimeout(() => {
                        p.classList.add('typing-complete');
                    }, 3000);
                }, (index + 1) * 2000);
            });
            
            if (avatar) {
                avatar.classList.add('fade-in-animation');
            }
            
            if (button) {
                setTimeout(() => {
                    button.classList.add('fade-in-animation');
                }, paragraphs.length * 2000 + 2500);
            }
            
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.classList.add('fade-in-animation');
                }, paragraphs.length * 2000 + 2800 + (index * 150));
            });
            
            // Unobserve after animation triggers
            aboutObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

const aboutSection = document.getElementById('about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Popup Form Functionality
const hireMeBtn = document.getElementById('hireMeBtn');
const popupOverlay = document.getElementById('popupOverlay');
const closePopup = document.getElementById('closePopup');
const exitBtn = document.getElementById('exitBtn');
const contactForm = document.getElementById('contactForm');
const nav = document.querySelector('nav');

// Open popup
if (hireMeBtn) {
    hireMeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        if (nav) {
            nav.style.display = 'none'; // Hide navbar
        }
    });
}

// Close popup function
function closePopupForm() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    if (nav) {
        nav.style.display = ''; // Show navbar again
    }
    if (contactForm) {
        contactForm.reset(); // Clear form
    }
}

// Close popup on X button
if (closePopup) {
    closePopup.addEventListener('click', closePopupForm);
}

// Close popup on Exit button
if (exitBtn) {
    exitBtn.addEventListener('click', closePopupForm);
}

// Close popup when clicking outside the form
if (popupOverlay) {
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopupForm();
        }
    });
}

// Close popup on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) {
        closePopupForm();
    }
});

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const details = document.getElementById('details').value;

        // Disable submit button to prevent multiple submissions
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS with single template
        emailjs.send('service_5j5371m', 'template_jl6bvlg', {
            from_name: name,
            from_email: email,
            from_address: address,
            message: details,
            reply_to: email
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success notification
            showNotification(
                'Message Sent!',
                'Thank you! Your message has been sent successfully.\nI will get back to you shortly.',
                'success'
            );
            
            // Close popup
            closePopupForm();
            
            // Re-enable submit button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            
            // Show error notification with details
            let errorMsg = 'Sorry, there was an error sending your message.';
            if (error.text) {
                errorMsg += '\n\nError: ' + error.text;
            }
            errorMsg += '\n\nPlease try again or contact me directly at:\ncmpamplona@ccc.edu.ph';
            
            showNotification('Sending Failed', errorMsg, 'error');
            
            // Re-enable submit button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
