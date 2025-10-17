// Simple, working JavaScript for KK Financial 2016 website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize forms
    initializeForms();
    
    // Initialize FAQ
    initializeFAQ();
    
    // Initialize calculator
    initializeCalculator();
    
    // Initialize feedback feature
    initializeFeedbackFeature();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Simple, direct form handling
function initializeForms() {
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('fullName');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const city = formData.get('city') || 'Mumbai';
            const loanType = formData.get('loanType');
            const loanAmount = formData.get('loanAmount') || 'To be discussed';
            const income = formData.get('income') || 'To be discussed';
            const message = formData.get('message') || 'Please contact me for consultation.';
            
            // Simple validation
            if (!name || !phone || !email || !loanType) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show loading
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Opening Email...';
            submitBtn.disabled = true;
            
            // Create email
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

Message: ${message}

Please contact me at your earliest convenience.

Best regards,
${name}`;
            
            // Open email client
            const mailtoLink = `mailto:kkfinancial2016@gmail.com,kkfinancial2016@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
            
            // Reset after delay
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('Your email client should have opened. Please send the email to complete your consultation request.');
            }, 3000);
        });
    }
}

// FAQ functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Close all other answers
            faqQuestions.forEach(q => {
                const a = q.nextElementSibling;
                a.style.display = 'none';
                q.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isOpen) {
                answer.style.display = 'block';
                this.classList.add('active');
            }
        });
    });
}

// EMI Calculator
function initializeCalculator() {
    const calculatorContainer = document.querySelector('.calculator-container');
    if (!calculatorContainer) return;
    
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const loanTenureInput = document.getElementById('loanTenure');
    
    if (loanAmountInput && interestRateInput && loanTenureInput) {
        // Add event listeners for real-time calculation
        [loanAmountInput, interestRateInput, loanTenureInput].forEach(input => {
            input.addEventListener('input', calculateEMI);
        });
        
        calculateEMI(); // Initial calculation
    }
    
    function calculateEMI() {
        const principal = parseFloat(loanAmountInput.value) || 0;
        const annualRate = parseFloat(interestRateInput.value) || 0;
        const tenureYears = parseFloat(loanTenureInput.value) || 0;
        
        if (principal > 0 && annualRate > 0 && tenureYears > 0) {
            const monthlyRate = annualRate / (12 * 100);
            const tenureMonths = tenureYears * 12;
            
            const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                       (Math.pow(1 + monthlyRate, tenureMonths) - 1);
            
            const totalAmount = emi * tenureMonths;
            const totalInterest = totalAmount - principal;
            
            // Update display
            const monthlyEMIElement = document.getElementById('monthlyEMI');
            const totalInterestElement = document.getElementById('totalInterest');
            const totalAmountElement = document.getElementById('totalAmount');
            
            if (monthlyEMIElement) monthlyEMIElement.textContent = `₹${formatNumber(emi)}`;
            if (totalInterestElement) totalInterestElement.textContent = `₹${formatNumber(totalInterest)}`;
            if (totalAmountElement) totalAmountElement.textContent = `₹${formatNumber(totalAmount)}`;
        }
    }
    
    function formatNumber(num) {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0
        }).format(Math.round(num));
    }
}

// Initialize Feedback Feature
function initializeFeedbackFeature() {
    // Initialize star rating functionality for all modals
    initializeStarRating();
    
    // Initialize feedback form submission for all forms
    initializeFeedbackForm();
}

// Better Error and Success Popup Functions
function showErrorPopup(title, errors) {
    removeExistingPopups();
    
    const popup = document.createElement('div');
    popup.className = 'error-popup';
    
    const content = document.createElement('div');
    content.className = 'popup-content error';
    
    const header = document.createElement('div');
    header.className = 'popup-header';
    header.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    
    const titleEl = document.createElement('h4');
    titleEl.textContent = title;
    header.appendChild(titleEl);
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.textContent = '×';
    closeBtn.onclick = removeExistingPopups;
    header.appendChild(closeBtn);
    
    const body = document.createElement('div');
    body.className = 'popup-body';
    
    if (errors.length > 0) {
        const ul = document.createElement('ul');
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            ul.appendChild(li);
        });
        body.appendChild(ul);
    }
    
    content.appendChild(header);
    content.appendChild(body);
    popup.appendChild(content);
    document.body.appendChild(popup);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 8000);
}

function showSuccessPopup(message) {
    removeExistingPopups();
    
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    
    const content = document.createElement('div');
    content.className = 'popup-content success';
    
    const header = document.createElement('div');
    header.className = 'popup-header';
    header.innerHTML = '<i class="fas fa-check-circle"></i>';
    
    const titleEl = document.createElement('h4');
    titleEl.textContent = 'Success!';
    header.appendChild(titleEl);
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.textContent = '×';
    closeBtn.onclick = removeExistingPopups;
    header.appendChild(closeBtn);
    
    const body = document.createElement('div');
    body.className = 'popup-body';
    
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    body.appendChild(messageEl);
    
    content.appendChild(header);
    content.appendChild(body);
    popup.appendChild(content);
    document.body.appendChild(popup);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 5000);
}

function removeExistingPopups() {
    const existingPopups = document.querySelectorAll('.error-popup, .success-popup');
    existingPopups.forEach(popup => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    });
}

// Feedback Modal Functions
function openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Wait for modal to be fully visible before initializing
        setTimeout(() => {
            initializeStarRating();
            initializeFeedbackForm();
        }, 100);
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
        
        // Reset form
        const form = document.getElementById('feedbackForm');
        if (form) {
            form.reset();
            resetStarRating();
        }
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('feedbackModal');
    if (modal && event.target === modal) {
        closeFeedbackModal();
    }
});

// Modern Star Rating Functionality
function initializeStarRating() {
    // Clear any existing star event listeners
    const existingStars = document.querySelectorAll('.star-btn');
    existingStars.forEach(star => {
        star.replaceWith(star.cloneNode(true));
    });
    
    // Get fresh references after clearing listeners
    const starButtons = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('rating');
    const ratingText = document.querySelector('.rating-text');
    const ratingLabels = document.querySelectorAll('.rating-label');
    const starContainer = document.querySelector('.star-rating');
    
    if (!starButtons || starButtons.length === 0 || !ratingInput) {
        return;
    }
    
    // Set initial roving tabindex (first button gets tabindex=0)
    starButtons.forEach((btn, index) => {
        btn.setAttribute('tabindex', index === 2 ? '0' : '-1'); // Start with middle star (3rd)
    });
    
    // Add event handlers to each star button
    starButtons.forEach((starBtn, index) => {
        // Click handler
        starBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Set the rating immediately
            ratingInput.value = rating;
            
            // Update roving tabindex
            starButtons.forEach(btn => btn.setAttribute('tabindex', '-1'));
            this.setAttribute('tabindex', '0');
            
            // Update visual feedback with animation
            updateStarDisplay(rating);
            updateRatingText(rating);
            updateRatingLabels(rating);
            updateAriaStates(rating);
            
            // Add a subtle click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
        
        // Hover handlers for preview
        starBtn.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            updateStarHover(rating);
        });
        
        // Keyboard support
        starBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation with selection
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const currentIndex = Array.from(starButtons).indexOf(this);
                let nextIndex;
                
                if (e.key === 'ArrowLeft') {
                    nextIndex = Math.max(0, currentIndex - 1);
                } else {
                    nextIndex = Math.min(starButtons.length - 1, currentIndex + 1);
                }
                
                // Update roving tabindex
                this.setAttribute('tabindex', '-1');
                starButtons[nextIndex].setAttribute('tabindex', '0');
                starButtons[nextIndex].focus();
                
                // Also update the selection
                const newRating = nextIndex + 1;
                ratingInput.value = newRating;
                updateStarDisplay(newRating);
                updateRatingText(newRating);
                updateRatingLabels(newRating);
                updateAriaStates(newRating);
            }
        });
    });
    
    // Reset hover effects on mouse leave
    if (starContainer) {
        starContainer.addEventListener('mouseleave', function() {
            const currentRating = parseInt(ratingInput.value) || 0;
            clearStarHover();
            updateStarDisplay(currentRating);
        });
    }
}

function updateStarDisplay(rating) {
    const starButtons = document.querySelectorAll('.star-btn');
    
    starButtons.forEach((starBtn, index) => {
        if (index < rating) {
            starBtn.classList.add('active');
            starBtn.classList.remove('hover-active');
        } else {
            starBtn.classList.remove('active', 'hover-active');
        }
    });
}

function updateAriaStates(rating) {
    const starButtons = document.querySelectorAll('.star-btn');
    
    starButtons.forEach((starBtn, index) => {
        const isSelected = (index + 1) === rating;
        starBtn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });
}

function updateStarHover(rating) {
    const starButtons = document.querySelectorAll('.star-btn');
    const currentRating = parseInt(document.getElementById('rating').value) || 0;
    
    starButtons.forEach((starBtn, index) => {
        if (index < rating) {
            if (index >= currentRating) {
                starBtn.classList.add('hover-active');
            }
        } else {
            starBtn.classList.remove('hover-active');
        }
    });
}

function clearStarHover() {
    const starButtons = document.querySelectorAll('.star-btn');
    starButtons.forEach(starBtn => {
        starBtn.classList.remove('hover-active');
    });
}

function updateRatingText(rating) {
    const ratingText = document.querySelector('.rating-text');
    const ratingTexts = {
        1: 'Poor - Needs significant improvement',
        2: 'Fair - Below expectations', 
        3: 'Good - Meets expectations',
        4: 'Very Good - Exceeds expectations',
        5: 'Excellent - Outstanding service'
    };
    
    if (ratingText) {
        ratingText.textContent = ratingTexts[rating] || 'Click to rate';
        if (rating) {
            ratingText.classList.add('selected');
        } else {
            ratingText.classList.remove('selected');
        }
    }
}

function updateRatingLabels(rating) {
    const ratingLabels = document.querySelectorAll('.rating-label');
    
    ratingLabels.forEach((label, index) => {
        if (index === rating - 1) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });
}

function setRating(rating) {
    const ratingInput = document.getElementById('rating');
    
    if (!ratingInput) {
        return;
    }
    
    ratingInput.value = rating;
    updateStarDisplay(rating);
    updateRatingText(rating);
    updateRatingLabels(rating);
}

function resetStarRating() {
    const ratingInput = document.getElementById('rating');
    const ratingText = document.querySelector('.rating-text');
    const starButtons = document.querySelectorAll('.star-btn');
    
    if (ratingInput) ratingInput.value = '';
    if (ratingText) {
        ratingText.textContent = 'Click to rate';
        ratingText.classList.remove('selected');
    }
    
    // Reset roving tabindex to middle star
    starButtons.forEach((btn, index) => {
        btn.setAttribute('tabindex', index === 2 ? '0' : '-1');
        btn.setAttribute('aria-checked', 'false');
    });
    
    updateStarDisplay(0);
    updateRatingLabels(0);
    clearStarHover();
}

// Feedback Form Submission
function initializeFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    
    if (form) {
        // Remove existing event listeners by cloning
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFeedbackSubmission(this);
        });
    }
}

function handleFeedbackSubmission(form) {
    // Get form data
    const formData = new FormData(form);
    const customerName = formData.get('customerName') || 'Anonymous';
    const customerEmail = formData.get('customerEmail') || 'Not provided';
    const serviceCategory = formData.get('serviceCategory');
    const rating = formData.get('rating');
    const feedbackMessage = formData.get('feedbackMessage');
    const consent = formData.get('feedbackConsent');
    
    // Validate required fields with better error messages
    const errors = [];
    if (!serviceCategory) errors.push('Please select a service category');
    if (!rating) errors.push('Please provide a rating by clicking the stars');
    if (!feedbackMessage || feedbackMessage.trim().length < 5) errors.push('Please provide feedback (at least 5 characters)');
    if (!consent) errors.push('Please agree to our feedback terms');
    
    if (errors.length > 0) {
        showErrorPopup('Please fix the following issues:', errors);
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Feedback...';
    submitBtn.disabled = true;
    
    // Create email content
    const subject = `Customer Feedback - ${serviceCategory} (${rating} Stars)`;
    const body = `Dear KK Financial Team,

A customer has submitted feedback through your website:

Customer Details:
Name: ${customerName}
Email: ${customerEmail}

Feedback Details:
Service Category: ${serviceCategory}
Rating: ${rating} out of 5 stars
Message: ${feedbackMessage}

This feedback was submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.

Best regards,
Website Feedback System`;
    
    // Open email client
    const mailtoLink = `mailto:kkfinancial2016@gmail.com,kkfinancial2016@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
        window.location.href = mailtoLink;
        
        // Reset after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message and close modal
            showSuccessPopup('Thank you for your feedback! Your email client should have opened. Please send the email to complete your feedback submission.');
            setTimeout(() => closeFeedbackModal(), 2000);
        }, 3000);
    } catch (error) {
        // Handle any errors
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showErrorPopup('Failed to open email client. Please try again or contact us directly.', []);
    }
}