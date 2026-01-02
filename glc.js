lucide.createIcons();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
    } else {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
    }
});

// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Scroll Header Logic
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Modal Logic
const modal = document.getElementById('consult-modal');
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Gmail Logic
function sendToGmail(event) {
    event.preventDefault();
    
    // Handle both main form and footer form IDs
    const isFooter = event.target.closest('footer');
    const prefix = isFooter ? 'footer-' : 'contact-';
    
    const name = document.getElementById(prefix + 'name').value;
    const email = document.getElementById(prefix + 'email').value;
    const linkedin = document.getElementById(prefix + 'linkedin').value;
    const message = isFooter ? "Interested in plans" : document.getElementById('contact-message').value;
    
    const subject = `GLC Consultation Request: ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ALinkedIn: ${linkedin}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    window.location.href = `mailto:sales@growlinkconnect.com?subject=${subject}&body=${body}`;
    setTimeout(closeModal, 1000);
}

// Interactive Process Animation
const stepTexts = document.querySelectorAll('.step-text');
const frames = document.querySelectorAll('.stage-frame');

const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stepIndex = entry.target.getAttribute('data-step');
            stepTexts.forEach(t => t.classList.remove('active'));
            entry.target.classList.add('active');
            frames.forEach(f => f.classList.remove('active'));
            const activeFrame = document.getElementById(`frame-${stepIndex}`);
            if(activeFrame) activeFrame.classList.add('active');
        }
    });
}, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0.1 });

stepTexts.forEach(step => stepObserver.observe(step));