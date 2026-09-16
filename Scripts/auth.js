// ==========================================
// DOM ELEMENTS
// ==========================================

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function toggleForms() {
    loginForm.classList.toggle('active');
    signupForm.classList.toggle('active');
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

// ==========================================
// FORM TOGGLE
// ==========================================

showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const loginBtn = document.getElementById('login-btn');
    
    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        showSuccess('Login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'readersDigest.html';
        }, 1000);
    } catch (error) {
        console.error('Login error:', error);
        let errorMsg = 'Login failed. Please try again.';
        
        if (error.code === 'auth/invalid-email') {
            errorMsg = 'Invalid email address.';
        } else if (error.code === 'auth/user-not-found') {
            errorMsg = 'No account found with this email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMsg = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-credential') {
            errorMsg = 'Invalid email or password.';
        }
        
        showError(errorMsg);
        loginBtn.disabled = false;
        loginBtn.textContent = 'Login';
    }
});

// ==========================================
// SIGNUP
// ==========================================

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-password-confirm').value;
    const signupBtn = document.getElementById('signup-btn');
    
    if (password !== confirmPassword) {
        showError('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long.');
        return;
    }
    
    signupBtn.disabled = true;
    signupBtn.textContent = 'Creating account...';
    
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        showSuccess('Account created! Redirecting...');
        setTimeout(() => {
            window.location.href = 'readersDigest.html';
        }, 1000);
    } catch (error) {
        console.error('Signup error:', error);
        let errorMsg = 'Signup failed. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
            errorMsg = 'This email is already registered. Please login instead.';
        } else if (error.code === 'auth/invalid-email') {
            errorMsg = 'Invalid email address.';
        } else if (error.code === 'auth/weak-password') {
            errorMsg = 'Password is too weak. Use at least 6 characters.';
        }
        
        showError(errorMsg);
        signupBtn.disabled = false;
        signupBtn.textContent = 'Sign Up';
    }
});

// ==========================================
// FORGOT PASSWORD
// ==========================================

forgotPasswordLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    
    if (!email) {
        showError('Please enter your email address first.');
        return;
    }
    
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        showSuccess('Password reset email sent! Check your inbox.');
    } catch (error) {
        console.error('Password reset error:', error);
        if (error.code === 'auth/user-not-found') {
            showError('No account found with this email.');
        } else {
            showError('Failed to send reset email. Please try again.');
        }
    }
});

// ==========================================
// CHECK IF ALREADY LOGGED IN
// ==========================================

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('User already logged in:', user.email);
        window.location.href = 'readersDigest.html';
    }
});
