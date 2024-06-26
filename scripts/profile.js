import {auth, db} from './firebaseInit.js';
import {doc, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Listen for auth state changes to ensure we have a user logged in
auth.onAuthStateChanged(user => {
    if (user) {
        // If there's a user, setup form submission listener
        const form = document.querySelector('#infoForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const userInfo = {
                name: form.name.value,
                address: form.address.value,
                gender: form.gender.value,
                bio: form.bio.value,
                phone: form.phone.value,
            };

            try {
                // Use the user's UID as the document ID in the 'users' collection
                await setDoc(doc(db, "users", user.uid), userInfo);
                alert(getLocalisedString("profileSaveSuccess"));
                window.location.href = '../main.html';
                form.reset();
            } catch (error) {
                console.error("Error saving profile information:", error);
                alert(getLocalisedString("profileSaveError"));
            }
        });
    } else {
        // If no user is signed in, possibly redirect to the login page or show an alert
        console.log("No user is signed in.");
        alert(getLocalisedString("profileNeedLogin"));
        // Redirect to login page if necessary
        // window.location.href = '/index.html';
    }
});

/**
 * Function to populate the form with current user information.
 *
 * @param {string} userId - The ID of the user whose profile information to retrieve.
 */
auth.onAuthStateChanged(user => {
    if (user) {
        populateFormWithCurrentUserInfo(user.uid); // Populate form with current user info

        const form = document.querySelector('#infoForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const userInfo = {
                name: form.name.value,
                address: form.address.value,
                gender: form.gender.value,
                bio: form.bio.value,
                phone: form.phone.value,
            };

            try {
                // Use the user's UID as the document ID in the 'users' collection
                await setDoc(doc(db, "users", user.uid), userInfo);
                alert(getLocalisedString("profileSaveSuccess"));
                window.location.href = '../main.html';
            } catch (error) {
                console.error("Error saving profile information:", error);
                alert(getLocalisedString("profileSaveError"));
            }
        });
    } else {
        console.log("No user is signed in.");
        alert(getLocalisedString("profileNeedLogin"));
    }
});

/**
 * Function to populate the form with current user information.
 *
 * @param userId - User ID.
 * @return {Promise<void>} Promise.
 * @async Async.
 */
async function populateFormWithCurrentUserInfo(userId) {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        document.querySelector('#name').value = userData.name || '';
        document.querySelector('#address').value = userData.address || '';
        document.querySelector('#gender').value = userData.gender || 'other';
        document.querySelector('#bio').value = userData.bio || '';
        document.querySelector('#phone').value = userData.phone || '';
    } else {
        console.log("No user data available");
    }
}
