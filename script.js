// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!name) {
            showAlert('Please enter your name', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        if (!message || message.length < 10) {
            showAlert('Message must be at least 10 characters long', 'error');
            return;
        }
        
        // Simulate form submission
        showAlert(`Thank you ${name}! Your message has been sent. We'll contact you soon.`, 'success');
        this.reset();
    });
}

// Donation Button Functionality
const donationButtons = document.querySelectorAll('.donation-card .btn');
donationButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.donation-card');
        const amount = card.querySelector('h3').textContent;
        
        if (amount === 'Custom') {
            const customAmount = card.querySelector('.custom-input').value;
            if (!customAmount || customAmount <= 0) {
                showAlert('Please enter a valid amount', 'error');
                return;
            }
            processPayment(`$${customAmount}`);
        } else {
            processPayment(amount);
        }
    });
});

// Process Payment
function processPayment(amount) {
    showAlert(`Processing donation of ${amount}... Thank you for your generosity! 💝`, 'success');
    
    // Simulate payment processing
    setTimeout(() => {
        showAlert(`Donation of ${amount} completed successfully! You will receive a receipt via email.`, 'success');
    }, 2000);
}

// Alert Function
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    
    // Add styles dynamically
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        alertBox.style.backgroundColor = '#4caf50';
        alertBox.style.color = 'white';
    } else if (type === 'error') {
        alertBox.style.backgroundColor = '#f44336';
        alertBox.style.color = 'white';
    }
    
    document.body.appendChild(alertBox);
    
    // Remove alert after 4 seconds
    setTimeout(() => {
        alertBox.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertBox.remove(), 300);
    }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll Animation for Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.about-card, .stat-card, .donation-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add fadeInUp animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Start counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card h3');
            statCards.forEach(card => {
                const text = card.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const symbol = text.replace(/[0-9]/g, '');
                
                if (!isNaN(number)) {
                    animateCounter(card, number, 2000);
                    card.textContent = symbol + number;
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact');
if (impactSection) {
    statsObserver.observe(impactSection);
}

// Dark Mode Toggle (Optional Feature)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #333;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 24px;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    darkModeToggle.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    darkModeToggle.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
}

// Initialize dark mode
initDarkMode();

// Donation Amount Display
const customInput = document.querySelector('.custom-input');
if (customInput) {
    customInput.addEventListener('input', function() {
        if (this.value && this.value > 0) {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
}

// Log page analytics (Optional - for tracking)
function trackPageView() {
    const pageData = {
        timestamp: new Date(),
        page: document.title,
        url: window.location.href,
        referrer: document.referrer
    };
    console.log('Page viewed:', pageData);
}

// Call tracking on page load
window.addEventListener('load', trackPageView);

// Prevent accidental form submission with unsaved changes
let formModified = false;
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('change', () => {
        formModified = true;
    });
});

window.addEventListener('beforeunload', (e) => {
    if (formModified) {
        e.preventDefault();
        e.returnValue = '';
    }
});

console.log('✅ Charity Hearts Website - JavaScript loaded successfully!');