// ==========================
// TYPING ANIMATION
// ==========================

const typingElement = document.querySelector(".typing");

const texts = [
    "Full Stack Mobile Developer",
    "React Native Specialist",
    "Web Development Expert",
    "UI/UX Enthusiast"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenTexts = 1500;

function typeEffect() {
    if (!typingElement) return;

    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
        // Typing
        typingElement.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    } else if (!isDeleting && charIndex === currentText.length) {
        // Pause before erasing
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenTexts);
    } else if (isDeleting && charIndex > 0) {
        // Erasing
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, erasingSpeed);
    } else if (isDeleting && charIndex === 0) {
        // Move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    typeEffect();
});

// ==========================
// NAVBAR SCROLL EFFECT
// ==========================

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar-scroll");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==========================
// SMOOTH SCROLL FOR NAV LINKS
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const navHeight = document.querySelector('.navbar-scroll').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
    });
});

// ==========================
// SCROLL REVEAL ANIMATION
// ==========================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let visible = 100;

        if (elementTop < windowHeight - visible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
// Initial check on page load
revealOnScroll();

// ==========================
// SKILL PROGRESS BARS ANIMATION
// ==========================

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-out';
                    bar.style.width = width;
                    bar.classList.add('animated');
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

window.addEventListener("load", animateProgressBars);

// ==========================
// ACTIVE NAV LINK HIGHLIGHT
// ==========================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================
// SCROLL TO TOP BUTTON
// ==========================

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #0a66c2;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(10, 102, 194, 0.3);
        font-size: 1.2rem;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px)';
        scrollBtn.style.boxShadow = '0 10px 25px rgba(10, 102, 194, 0.5)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 5px 15px rgba(10, 102, 194, 0.3)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ==========================
// PAGE LOAD ANIMATION
// ==========================

window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ==========================
// PARALLAX EFFECT ON HERO
// ==========================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${window.scrollY * 0.5}px`;
    }
});

// ==========================
// PROJECT CARDS INTERACTION
// ==========================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
    });
});

// ==========================
// STAT CARDS COUNTER
// ==========================

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                
                const increment = Math.ceil(finalValue / 50);
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = target.textContent;
                        clearInterval(counter);
                        target.classList.add('counted');
                    } else {
                        target.textContent = currentValue + (target.textContent.match(/[a-zA-Z%+]/g) || []).join('');
                    }
                }, 30);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => observer.observe(number));
}

window.addEventListener('load', animateCounters);

// ==========================
// FORM VALIDATION (Future Use)
// ==========================

function validateForm(formData) {
    const email = formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================
// CONSOLE WELCOME MESSAGE
// ==========================

console.log(
    `%c👋 Welcome to Muhammad Ameer Moavia's Portfolio!
    
%cFeel free to explore my projects and get in touch.
%cLet's create something amazing together! 🚀`,
    'font-size: 20px; font-weight: bold; color: #0a66c2;',
    'font-size: 14px; color: #6c757d;',
    'font-size: 14px; color: #0a66c2; font-weight: bold;'
);