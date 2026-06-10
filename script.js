// ============ TYPING ANIMATION ============
const typingText = document.querySelector('.typing');
const texts = [
    'Full Stack Developer',
    'React Native Expert',
    'Web Designer',
    'Mobile App Creator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let speed = 100;

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 500);
            return;
        }
    }
    
    setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// ============ SCROLL REVEAL ANIMATION ============
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach((el) => {
    observer.observe(el);
});

// ============ NAVBAR SCROLL EFFECT ============
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-scroll');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ============ SMOOTH SCROLL FOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const navbar = document.querySelector('.navbar-scroll');
            const offset = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ SKILL PROGRESS ANIMATION ============
const progressBars = document.querySelectorAll('.progress-bar');
let animated = false;

window.addEventListener('scroll', () => {
    if (!animated) {
        const skillSection = document.querySelector('.skills-section');
        if (skillSection) {
            const rect = skillSection.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                animated = true;
            }
        }
    }
});

// ============ ACTIVE NAV LINK ============
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});