// Main JavaScript file for KK Financial 2016 website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeForms();
    initializeFAQ();
    initializeAnimations();
    initializeCalculator();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '#ffffff';
                navbar.style.backdropFilter = 'none';
            }
        });
    }
}

// Form handling
function initializeForms() {
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleConsultationForm(this);
        });
        
        // Real-time validation
        const requiredFields = consultationForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Phone number formatting
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', function() {
                formatPhoneNumber(this);
            });
        }
        
        // Loan amount formatting
        const loanAmountField = document.getElementById('loanAmount');
        if (loanAmountField) {
            loanAmountField.addEventListener('input', function() {
                formatCurrency(this);
            });
        }
        
        const incomeField = document.getElementById('income');
        if (incomeField) {
            incomeField.addEventListener('input', function() {
                formatCurrency(this);
            });
        }
    }
}

function handleConsultationForm(form) {
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('fullName') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || '';
    const city = formData.get('city') || 'Mumbai';
    const loanType = formData.get('loanType') || 'General Consultation';
    const loanAmount = formData.get('loanAmount') || 'To be discussed';
    const income = formData.get('income') || 'To be discussed';
    const message = formData.get('message') || 'Please contact me for consultation.';
    
    // Validate required fields
    if (!name.trim() || !phone.trim() || !email.trim()) {
        alert('Please fill in all required fields (Name, Phone, Email).');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Email...';
    submitBtn.disabled = true;
    
    // Create email content
    const subject = `Loan Consultation Request - ${name}`;
    const body = `Dear KK Financial Team,

I am interested in your loan consultation services. Here are my details:

Name: ${name}
Phone: ${phone}
Email: ${email}
City: ${city}
Loan Type: ${loanType}
Loan Amount: ${loanAmount}
Monthly Income: ${income}

Message:
${message}

Please contact me at your earliest convenience.

Best regards,
${name}`;
    
    // Create mailto link and open email client
    const mailtoLink = `mailto:kkfinancial2016@gmail.com,kkfinancial2016@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after brief delay
    setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('Your email client should have opened with the consultation request. Please send the email to complete your submission.');
    }, 2000);
            form.reset();
            
            // Log data for development (remove in production)
            console.log('Form submitted successfully:', data);
        })
        .catch((error) => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show error message with manual option
            showNotification('Email client could not open. Please call us at +91 93722 67693 or email kkfinancial2016@gmail.com directly.', 'warning');
            
            console.error('Form submission error:', error);
            
            // Show manual contact options
            setTimeout(() => {
                showManualContactOptions(data);
            }, 3000);
        });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styles
    field.classList.remove('error');
    removeErrorMessage(field);
    
    // Check if field is empty and required
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (value) {
        // Field-specific validation
        switch (fieldName) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'phone':
                const phoneRegex = /^[6-9]\d{9}$/;
                const cleanPhone = value.replace(/\D/g, '');
                if (!phoneRegex.test(cleanPhone)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 10-digit mobile number';
                }
                break;
            case 'fullName':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function formatPhoneNumber(field) {
    let value = field.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    field.value = value;
}

function formatCurrency(field) {
    let value = field.value.replace(/[^\d]/g, '');
    if (value) {
        field.value = formatNumberWithCommas(value);
    }
}

function formatNumberWithCommas(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function removeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Form submission function
async function submitFormData(data) {
    // Create email content
    const emailContent = `
New Consultation Request from KK Financial Website:

Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
City: ${data.city || 'Not provided'}
Loan Type: ${data.loanType}
Loan Amount: ${data.loanAmount || 'Not provided'}
Monthly Income: ${data.income || 'Not provided'}
Message: ${data.message || 'None'}

Consent: ${data.consent ? 'Yes' : 'No'}

Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `.trim();

    try {
        // Using EmailJS for form submission (requires setup)
        // For now, we'll use a simple fetch to a form handler service
        
        // Option 1: Use Formspree (requires account setup)
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         ...data,
        //         _subject: 'New Loan Consultation Request - KK Financial',
        //         _template: 'box'
        //     })
        // });

        // Option 2: Use Netlify Forms (if hosted on Netlify)
        // const response = await fetch('/', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     body: new URLSearchParams({
        //         'form-name': 'consultation',
        //         ...data
        //     }).toString()
        // });

        // Email redirect submission
        return new Promise((resolve) => {
            // Store form data locally for reference
            const submissions = JSON.parse(localStorage.getItem('consultationSubmissions') || '[]');
            submissions.push({
                ...data,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('consultationSubmissions', JSON.stringify(submissions));
            
            // Create formatted email with better structure
            const subject = `Loan Consultation Request - ${data.fullName}`;
            const formattedBody = `
Dear KK Financial Team,

I am interested in your loan consultation services. Please find my details below:

PERSONAL INFORMATION:
• Name: ${data.fullName}
• Phone: ${data.phone}
• Email: ${data.email}
• City: ${data.city || 'Mumbai'}

LOAN REQUIREMENTS:
• Loan Type: ${data.loanType}
• Required Amount: ${data.loanAmount || 'To be discussed'}
• Monthly Income: ${data.income || 'To be discussed'}

MESSAGE:
${data.message || 'Please contact me for consultation.'}

I consent to receive consultation calls and loan updates: ${data.consent ? 'Yes' : 'No'}

Best regards,
${data.fullName}

---
Submitted via KK Financial website on ${new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
})}
            `.trim();
            
            // Create mailto link with both primary and secondary emails
            const primaryEmail = 'kkfinancial2016@gmail.com';
            const secondaryEmail = 'kkfinancial2016@yahoo.com';
            const mailtoLink = `mailto:${primaryEmail},${secondaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
            
            // Direct email redirect - simple and reliable
            console.log('Opening email client with consultation request...');
            
            // Use window.location to redirect directly
            window.location = mailtoLink;
            
            setTimeout(resolve, 1500);
        });
    } catch (error) {
        throw new Error('Failed to submit form: ' + error.message);
    }
}

// Manual contact options fallback
function showManualContactOptions(data) {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Alternative Contact Methods</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Your form couldn't be sent automatically. Here are your contact options:</p>
                
                <div class="contact-options">
                    <div class="contact-option">
                        <i class="fas fa-phone"></i>
                        <div>
                            <strong>Call Directly</strong>
                            <a href="tel:+919372267693">+91 93722 67693</a>
                        </div>
                    </div>
                    
                    <div class="contact-option">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <strong>Email Manually</strong>
                            <a href="mailto:kkfinancial2016@gmail.com">kkfinancial2016@gmail.com</a>
                        </div>
                    </div>
                    
                    <div class="contact-option">
                        <i class="fas fa-copy"></i>
                        <div>
                            <strong>Copy Your Details</strong>
                            <button onclick="copyFormDetails('${JSON.stringify(data).replace(/"/g, '&quot;')}')">Copy to Clipboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (modal.parentNode) modal.remove();
    }, 10000);
}

// Copy form details to clipboard
function copyFormDetails(dataString) {
    const data = JSON.parse(dataString);
    const details = `
Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
City: ${data.city || 'Mumbai'}
Loan Type: ${data.loanType}
Loan Amount: ${data.loanAmount || 'To be discussed'}
Monthly Income: ${data.income || 'To be discussed'}
Message: ${data.message || 'Please contact me for consultation.'}
    `.trim();
    
    navigator.clipboard.writeText(details).then(() => {
        showNotification('Your details have been copied to clipboard!', 'success');
    });
}

// Email confirmation function
function showEmailConfirmation(data) {
    const confirmModal = document.createElement('div');
    confirmModal.className = 'contact-modal';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Did Your Email Client Open?</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>We attempted to open your email client with your consultation request pre-filled.</p>
                
                <div class="confirmation-buttons">
                    <button class="btn-primary" onclick="confirmEmailSuccess()">
                        <i class="fas fa-check"></i> Yes, Email Opened
                    </button>
                    <button class="btn-secondary" onclick="showManualOptions()">
                        <i class="fas fa-times"></i> No, Show Alternatives
                    </button>
                </div>
                
                <div class="email-details" style="margin-top: 20px; padding: 15px; background: var(--background-light); border-radius: 8px;">
                    <small><strong>Email Details:</strong></small><br>
                    <small><strong>To:</strong> kkfinancial2016@gmail.com, kkfinancial2016@yahoo.com</small><br>
                    <small><strong>Subject:</strong> Loan Consultation Request - ${data.fullName}</small>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmModal);
    
    // Store data for manual options
    window.currentFormData = data;
    
    // Close modal functionality
    confirmModal.querySelector('.modal-close').onclick = () => confirmModal.remove();
    confirmModal.onclick = (e) => {
        if (e.target === confirmModal) confirmModal.remove();
    };
}

// Confirmation functions
function confirmEmailSuccess() {
    document.querySelector('.contact-modal')?.remove();
    showNotification('Great! Your consultation request has been sent successfully.', 'success');
}

function showManualOptions() {
    document.querySelector('.contact-modal')?.remove();
    showManualContactOptions(window.currentFormData);
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        }
    });
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll([
        '.service-card',
        '.value-card',
        '.advantage-item',
        '.stat-item',
        '.benefit-item',
        '.tip-card',
        '.rate-card'
    ].join(', '));
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll reveal classes
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number based on original text
        const originalText = element.textContent;
        if (originalText.includes('Cr')) {
            element.textContent = `₹${Math.floor(current)}Cr+`;
        } else if (originalText.includes('+')) {
            element.textContent = `${Math.floor(current)}+`;
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// EMI Calculator functionality
function initializeCalculator() {
    if (document.getElementById('loanAmount')) {
        const loanAmountInput = document.getElementById('loanAmount');
        const loanAmountRange = document.getElementById('loanAmountRange');
        const interestRateInput = document.getElementById('interestRate');
        const interestRateRange = document.getElementById('interestRateRange');
        const loanTenureInput = document.getElementById('loanTenure');
        const loanTenureRange = document.getElementById('loanTenureRange');
        const tenureTypeButtons = document.querySelectorAll('.tenure-btn');
        
        let isMonthsMode = true;

        // Sync input with range
        function syncInputWithRange(input, range) {
            input.addEventListener('input', function() {
                range.value = this.value;
                calculateEMI();
            });
            
            range.addEventListener('input', function() {
                input.value = this.value;
                calculateEMI();
            });
        }

        syncInputWithRange(loanAmountInput, loanAmountRange);
        syncInputWithRange(interestRateInput, interestRateRange);
        syncInputWithRange(loanTenureInput, loanTenureRange);

        // Tenure type toggle
        tenureTypeButtons.forEach(button => {
            button.addEventListener('click', function() {
                tenureTypeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                isMonthsMode = this.textContent === 'Months';
                updateTenureLabels();
                calculateEMI();
            });
        });

        function updateTenureLabels() {
            const tenureLabels = document.querySelectorAll('.range-labels span');
            if (isMonthsMode) {
                tenureLabels[0].textContent = '12 months';
                tenureLabels[1].textContent = '360 months';
                loanTenureRange.min = '12';
                loanTenureRange.max = '360';
                loanTenureInput.min = '12';
                loanTenureInput.max = '360';
            } else {
                tenureLabels[0].textContent = '1 year';
                tenureLabels[1].textContent = '30 years';
                loanTenureRange.min = '1';
                loanTenureRange.max = '30';
                loanTenureInput.min = '1';
                loanTenureInput.max = '30';
            }
        }

        function calculateEMI() {
            const principal = parseFloat(loanAmountInput.value) || 0;
            const annualRate = parseFloat(interestRateInput.value) || 0;
            const tenureInput = parseFloat(loanTenureInput.value) || 0;
            
            // Convert tenure to months if needed
            const tenureMonths = isMonthsMode ? tenureInput : tenureInput * 12;
            const monthlyRate = annualRate / (12 * 100);

            if (principal > 0 && annualRate > 0 && tenureMonths > 0) {
                // EMI calculation formula
                const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                           (Math.pow(1 + monthlyRate, tenureMonths) - 1);
                
                const totalAmount = emi * tenureMonths;
                const totalInterest = totalAmount - principal;
                
                // Update display
                document.getElementById('monthlyEMI').textContent = `₹${formatNumber(emi)}`;
                document.getElementById('totalInterest').textContent = `₹${formatNumber(totalInterest)}`;
                document.getElementById('totalAmount').textContent = `₹${formatNumber(totalAmount)}`;
                
                // Update percentages
                const principalPercent = ((principal / totalAmount) * 100).toFixed(1);
                const interestPercent = ((totalInterest / totalAmount) * 100).toFixed(1);
                
                document.getElementById('principalPercent').textContent = `${principalPercent}%`;
                document.getElementById('interestPercent').textContent = `${interestPercent}%`;
            }
        }

        function formatNumber(num) {
            return new Intl.NumberFormat('en-IN', {
                maximumFractionDigits: 0
            }).format(Math.round(num));
        }

        // Initial calculation
        updateTenureLabels();
        calculateEMI();

        // Comparison table functionality
        const addComparisonBtn = document.getElementById('addComparison');
        if (addComparisonBtn) {
            addComparisonBtn.addEventListener('click', addToComparison);
        }

        function addToComparison() {
            const loanType = document.querySelector('.loan-type-selector select').value;
            const principal = parseFloat(loanAmountInput.value) || 0;
            const rate = parseFloat(interestRateInput.value) || 0;
            const tenure = parseFloat(loanTenureInput.value) || 0;
            const tenureDisplay = isMonthsMode ? `${tenure} months` : `${tenure} years`;
            
            if (principal > 0 && rate > 0 && tenure > 0) {
                const tenureMonths = isMonthsMode ? tenure : tenure * 12;
                const monthlyRate = rate / (12 * 100);
                const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                           (Math.pow(1 + monthlyRate, tenureMonths) - 1);
                const totalInterest = (emi * tenureMonths) - principal;
                
                const tableBody = document.querySelector('#comparisonTable tbody');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${loanType}</td>
                    <td>${rate}%</td>
                    <td>${tenureDisplay}</td>
                    <td>₹${formatNumber(emi)}</td>
                    <td>₹${formatNumber(totalInterest)}</td>
                    <td><button class="btn-danger" onclick="this.parentElement.parentElement.remove()">Remove</button></td>
                `;
                tableBody.appendChild(row);
            }
        }
    }
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const offsetTop = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTopButton();

// Utility functions
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function(...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Performance optimizations
// Throttle scroll events
const throttledScrollHandler = throttle(function() {
    // Handle scroll events efficiently
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Debounce resize events
const debouncedResizeHandler = debounce(function() {
    // Handle resize events
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResizeHandler);

// Add custom CSS for animations and notifications
const customStyles = `
    <style>
        /* Animation styles */
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Form validation styles */
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #e74c3c;
            background-color: #fdf2f2;
        }
        
        .field-error {
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 5px;
            display: block;
        }
        
        /* Notification styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            padding: 0;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.hide {
            transform: translateX(100%);
        }
        
        .notification.success {
            border-left: 4px solid #27ae60;
        }
        
        .notification.error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification.warning {
            border-left: 4px solid #f39c12;
        }
        
        .notification.info {
            border-left: 4px solid #3498db;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
        }
        
        .notification-content i:first-child {
            font-size: 1.2rem;
        }
        
        .notification.success .notification-content i:first-child {
            color: #27ae60;
        }
        
        .notification.error .notification-content i:first-child {
            color: #e74c3c;
        }
        
        .notification.warning .notification-content i:first-child {
            color: #f39c12;
        }
        
        .notification.info .notification-content i:first-child {
            color: #3498db;
        }
        
        .notification-content span {
            flex: 1;
            color: #2c3e50;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #7f8c8d;
            cursor: pointer;
            padding: 0;
            font-size: 1rem;
            transition: color 0.2s ease;
        }
        
        .notification-close:hover {
            color: #2c3e50;
        }
        
        /* Back to top button */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        
        /* Hamburger animation */
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
            .notification {
                right: 15px;
                left: 15px;
                max-width: none;
            }
            
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    </style>
`;

// Inject custom styles
document.head.insertAdjacentHTML('beforeend', customStyles);

// Export functions for use in other scripts
window.KKFinancial = {
    showNotification,
    validateField,
    formatCurrency,
    formatPhoneNumber,
    debounce,
    throttle
};
