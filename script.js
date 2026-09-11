document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const dobInput = document.getElementById('dob');
    const genderInputs = document.getElementsByName('gender');
    const termsInput = document.getElementById('terms');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');

    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const dobError = document.getElementById('dob-error');
    const genderError = document.getElementById('gender-error');
    const termsError = document.getElementById('terms-error');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password: at least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Helper functions for validation feedback
    const showError = (input, errorElement, message) => {
        if(input && input.classList) {
            input.classList.add('error');
            input.classList.remove('success');
        }
        if(errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
        }
    };

    const clearError = (input, errorElement) => {
        if(input && input.classList) {
            input.classList.remove('error');
            input.classList.add('success');
        }
        if(errorElement) {
            errorElement.classList.remove('visible');
        }
    };

    // Validation Functions
    const validateEmail = () => {
        const val = emailInput.value.trim();
        if (val === '') {
            showError(emailInput, emailError, 'Email is required.');
            return false;
        } else if (!emailPattern.test(val)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    };

    const validatePassword = () => {
        const val = passwordInput.value;
        if (val === '') {
            showError(passwordInput, passwordError, 'Password is required.');
            return false;
        } else if (!passwordPattern.test(val)) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters, with 1 uppercase, 1 lowercase, and 1 number.');
            return false;
        } else {
            clearError(passwordInput, passwordError);
            // Re-validate confirm password if it has a value
            if (confirmPasswordInput.value !== '') {
                validateConfirmPassword();
            }
            return true;
        }
    };

    const validateConfirmPassword = () => {
        const val = confirmPasswordInput.value;
        const passVal = passwordInput.value;
        if (val === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
            return false;
        } else if (val !== passVal) {
            showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
            return false;
        } else {
            clearError(confirmPasswordInput, confirmPasswordError);
            return true;
        }
    };

    const validateDob = () => {
        if (dobInput.value === '') {
            showError(dobInput, dobError, 'Date of birth is required.');
            return false;
        } else {
            clearError(dobInput, dobError);
            return true;
        }
    };

    const validateGender = () => {
        let isSelected = false;
        for (const radio of genderInputs) {
            if (radio.checked) {
                isSelected = true;
                break;
            }
        }
        if (!isSelected) {
            genderError.classList.add('visible');
            return false;
        } else {
            genderError.classList.remove('visible');
            return true;
        }
    };

    const validateTerms = () => {
        if (!termsInput.checked) {
            termsError.classList.add('visible');
            return false;
        } else {
            termsError.classList.remove('visible');
            return true;
        }
    };

    // Event listeners for real-time validation
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    
    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('blur', validatePassword);
    
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    
    dobInput.addEventListener('input', validateDob);
    dobInput.addEventListener('blur', validateDob);
    
    genderInputs.forEach(radio => {
        radio.addEventListener('change', validateGender);
    });
    
    termsInput.addEventListener('change', validateTerms);

    // Form Submit Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDobValid = validateDob();
        const isGenderValid = validateGender();
        const isTermsValid = validateTerms();

        const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid && 
                            isDobValid && isGenderValid && isTermsValid;

        if (isFormValid) {
            // Simulate form submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Form submission logic would go here
            }, 1500);
        } else {
            // Focus first invalid element
            if (!isEmailValid) emailInput.focus();
            else if (!isPasswordValid) passwordInput.focus();
            else if (!isConfirmPasswordValid) confirmPasswordInput.focus();
            else if (!isDobValid) dobInput.focus();
            else if (!isTermsValid) termsInput.focus();
        }
    });
});
