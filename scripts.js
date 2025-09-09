// Modern Portfolio JavaScript with Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background blur based on scroll
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.9)';
        }

        // Hide/show navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Typing animation for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    const texts = [
        'AI/ML Researcher & Entrepreneur',
        'Building Legal Tech Solutions',
        'Democratizing AI for All',
        'IIT Madras Data Science Student'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500; // Pause before typing next text
        }

        setTimeout(typeWriter, typingDelay);
    }

    // Start typing animation after page load
    setTimeout(typeWriter, 1000);

    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Animated counter for stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target === Infinity ? '∞' : Math.ceil(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(start);
            }
        }, 16);
    };

    // Intersection Observer for counters
    const observeCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target.textContent;
                    if (target === '∞') {
                        entry.target.textContent = '∞';
                    } else {
                        const value = parseInt(target.replace('+', ''));
                        entry.target.textContent = '0';
                        animateCounter(entry.target, value);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    observeCounters();

    // Floating icons animation with GSAP
    gsap.registerPlugin();
    
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        gsap.to(icon, {
            y: -20,
            duration: 2 + index * 0.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
        
        gsap.to(icon, {
            rotation: 360,
            duration: 10 + index * 2,
            ease: "none",
            repeat: -1
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Form submission handler
    const contactForm = document.querySelector('.form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = document.querySelector('input[type="text"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const subject = document.querySelector('input[type="text"]:nth-of-type(2)').value;
        const message = document.querySelector('textarea').value;
        
        // Simulate form submission
        const submitBtn = document.querySelector('.btn-full');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });

    // Tech stack tags animation
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });

    // Social links hover animation
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -5,
                rotation: 5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Particle effect on mouse move
    const createParticle = (x, y) => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--accent-color)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.7';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            y: -50,
            x: gsap.utils.random(-30, 30),
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                particle.remove();
            }
        });
    };

    let particleTimer;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(particleTimer);
        particleTimer = setTimeout(() => {
            if (Math.random() > 0.8) { // 20% chance to create particle
                createParticle(e.clientX, e.clientY);
            }
        }, 50);
    });

    // Loading animation
    const loading = document.createElement('div');
    loading.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-primary); z-index: 10000; display: flex; align-items: center; justify-content: center; flex-direction: column;">
            <div style="width: 50px; height: 50px; border: 3px solid var(--primary-color); border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 1rem; color: var(--text-secondary);">Loading Portfolio...</p>
        </div>
    `;
    
    document.body.appendChild(loading);
    
    // Remove loading screen after page load
    window.addEventListener('load', () => {
        gsap.to(loading, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loading.remove();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Mouse cursor trail effect
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'radial-gradient(circle, var(--accent-color), transparent)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.opacity = '0.3';
    cursor.style.transition = 'transform 0.1s ease';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }

    // Console welcome message
    console.log(`
    🚀 Welcome to Rudra Meher's Portfolio!
    
    AI/ML Researcher & Entrepreneur
    Building the future of Legal Tech
    
    Connect with me:
    📧 Email: [Your Email]
    💼 LinkedIn: [Your LinkedIn]
    🐙 GitHub: [Your GitHub]
    
    Made with ❤️ and lots of ☕
    `);
});

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
