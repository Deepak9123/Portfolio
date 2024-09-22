// document.getElementById("openModal").onclick = function() {
//     document.getElementById("authModal").style.display = "block";
// };

function closeModal() {
    window.location.href = 'Referral.html';
}

document.getElementById('authModal').style.display = 'block';

document.getElementById("submitPassword").onclick = function() {
    const password = document.getElementById("password").value;
    const correctPassword = "Avengers@123"; // Change to your actual password

    if (password === correctPassword) {
        // Redirect to your portfolio page
        window.location.href = 'emailForm.html'; // Opens the form page
    } else {
        document.getElementById("message").textContent = "Invalid password. Please try again.";
        document.getElementById("message").style.display = "block";
    }
};

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("authModal")) {
        document.getElementById("authModal").style.display = "none";
    }
};
