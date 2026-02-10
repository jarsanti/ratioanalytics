// ===================================
// Form Validation JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // ===================================
        // Form Submission Handler
        // ===================================
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Clear previous messages
            clearFormMessage();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitButton = this.querySelector('.btn-submit');
            const originalButtonText = submitButton.innerHTML;
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
            
            try {
                // Simulate API call (replace with actual endpoint)
                await submitFormData(data);
                
                // Show success message
                showFormMessage('success', '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                
                // Reset form
                this.reset();
                
                // Remove validation classes
                this.querySelectorAll('input, textarea, select').forEach(field => {
                    field.classList.remove('error', 'success');
                });
                
            } catch (error) {
                // Show error message
                showFormMessage('error', 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
                console.error('Form submission error:', error);
                
            } finally {
                // Reset button state
                submitButton.classList.remove('btn-loading');
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
        
        // ===================================
        // Real-time Validation
        // ===================================
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        
        formFields.forEach(field => {
            // Validate on blur
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Remove error on input
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    removeFieldError(this);
                }
            });
        });
    }
    
    // ===================================
    // Validation Functions
    // ===================================
    function validateForm() {
        let isValid = true;
        const formFields = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name;
        
        // Remove previous error
        removeFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && value === '') {
            showFieldError(field, 'Este campo es requerido');
            return false;
        }
        
        // Email validation
        if (fieldType === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Por favor, ingresa un email válido');
                return false;
            }
        }
        
        // Phone validation
        if (fieldType === 'tel' && value !== '') {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Por favor, ingresa un teléfono válido');
                return false;
            }
        }
        
        // Message minimum length
        if (fieldName === 'message' && value !== '') {
            if (value.length < 10) {
                showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
                return false;
            }
        }
        
        // Name validation (no numbers)
        if (fieldName === 'name' && value !== '') {
            const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (!nameRegex.test(value)) {
                showFieldError(field, 'El nombre solo puede contener letras');
                return false;
            }
        }
        
        // Mark as valid
        field.classList.add('success');
        field.classList.remove('error');
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        
        // Create error message element
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Insert after field
        const formGroup = field.closest('.form-group');
        if (formGroup && !formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
    }
    
    function removeFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    }
    
    function showFormMessage(type, message) {
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.className = `form-message ${type} show`;
            
            const icon = type === 'success' 
                ? '<i class="fas fa-check-circle"></i>' 
                : '<i class="fas fa-exclamation-circle"></i>';
            
            formMessage.innerHTML = `${icon} ${message}`;
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }
    }
    
    function clearFormMessage() {
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.classList.remove('show');
            formMessage.innerHTML = '';
        }
    }
    
    // ===================================
    // Submit Form Data (API Integration)
    // ===================================
    async function submitFormData(data) {
        // Simulate API call with delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Log form data (replace with actual API call)
                console.log('Form Data:', data);
                
                // Simulate success
                resolve({ success: true });
                
                // To simulate error, uncomment:
                // reject(new Error('API Error'));
            }, 1500);
        });
        
        // Example of actual API call:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
        */
    }
    
    // ===================================
    // Character Counter for Textarea
    // ===================================
    const messageField = document.getElementById('message');
    
    if (messageField) {
        const formGroup = messageField.closest('.form-group');
        const counter = document.createElement('small');
        counter.className = 'char-counter';
        counter.style.display = 'block';
        counter.style.textAlign = 'right';
        counter.style.color = 'var(--color-gray-500)';
        counter.style.fontSize = 'var(--text-sm)';
        counter.style.marginTop = 'var(--spacing-xs)';
        
        formGroup.appendChild(counter);
        
        messageField.addEventListener('input', function() {
            const length = this.value.length;
            const maxLength = this.getAttribute('maxlength') || 500;
            counter.textContent = `${length}/${maxLength} caracteres`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = 'var(--color-primary)';
            } else {
                counter.style.color = 'var(--color-gray-500)';
            }
        });
        
        // Trigger initial counter
        messageField.dispatchEvent(new Event('input'));
    }
    
    // ===================================
    // Auto-resize Textarea
    // ===================================
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
    
    // ===================================
    // Input Masking for Phone
    // ===================================
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            // Format as: (123) 456-7890
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            
            this.value = value;
        });
    }
    
    // ===================================
    // Prevent Form Spam (Honeypot)
    // ===================================
    const honeypot = document.createElement('input');
    honeypot.setAttribute('type', 'text');
    honeypot.setAttribute('name', 'website');
    honeypot.setAttribute('tabindex', '-1');
    honeypot.setAttribute('autocomplete', 'off');
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-9999px';
    
    if (contactForm) {
        contactForm.appendChild(honeypot);
        
        contactForm.addEventListener('submit', function(e) {
            if (honeypot.value !== '') {
                e.preventDefault();
                console.warn('Bot detected');
                return false;
            }
        });
    }
    
    // ===================================
    // File Upload (if needed in the future)
    // ===================================
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'No file chosen';
            const label = this.nextElementSibling;
            
            if (label) {
                label.textContent = fileName;
            }
        });
    });
    
    console.log('📝 Form validation initialized');
});

// ===================================
// Export functions if using modules
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        submitFormData
    };
}
