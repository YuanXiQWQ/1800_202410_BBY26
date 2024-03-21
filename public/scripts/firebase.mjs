import {collection, addDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {db} from "./firebaseAPI.js";

// Function to save form data to Firestore
async function saveFormData(name, email, password, address, city, province) {
    const docRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        password: password,
        address: address,
        city: city,
        province: province,
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Data saved successfully!");

}

// Event listener for form submission
window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupForm-name').value;
        const email = document.getElementById('signupForm-email').value;
        const password = document.getElementById('signupForm-password').value;
        const address = document.getElementById('signupForm-address').value;
        const city = document.getElementById('signupForm-city').value;
        const province = document.getElementById('signupForm-province').value;
        saveFormData(name, email, password, address, city, province);
    });
});