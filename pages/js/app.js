// Your Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4ETj51DOCgARpJ_MoZRv9B5CkWjdsX7s",
    authDomain: "jobkorna-6166b.firebaseapp.com",
    projectId: "jobkorna-6166b",
    storageBucket: "jobkorna-6166b.appspot.com",
    messagingSenderId: "777191066920",
    appId: "1:777191066920:web:b0b4e63a743ea31c6d541d",
    measurementId: "G-KJZ11562SQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const signupForm = document.getElementById('signupForm');
const errorMessage = document.getElementById('error-message');

// Sign-Up Event
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate passwords
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // Sign up the user using Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Clear form and show success message
            signupForm.reset();
            errorMessage.textContent = 'Signup successful!';
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
        });
});
