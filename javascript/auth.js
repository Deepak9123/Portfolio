function closeModal() {
  window.location.href = "Referral.html";
}

// Display the modal when the script runs
document.getElementById("authModal").style.display = "block";

document.getElementById("submitPassword").onclick = function () {
  const password = document.getElementById("password").value;
  const correctPassword = "Avengers@123"; // Your actual password

  const errorMessageElement = document.getElementById("message");

  if (password === correctPassword) {
    window.location.href = "emailForm.html"; // Redirect on success
  } else {
    errorMessageElement.textContent = "Invalid password. Please try again."; // Set error message
    errorMessageElement.style.display = "block"; // Show error message
  }
};

// Hide error message when the user types in the password field
document.getElementById("password").addEventListener("input", function () {
  const errorMessageElement = document.getElementById("message");
  errorMessageElement.style.display = "none"; // Hide error message
});

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("authModal");
  if (event.target == modal) {
    // Redirect to the main page when clicking outside the modal
    window.location.href = "auth.html"; // Replace "auth.html" with the actual main page URL
  }
};

// Handle the cancel button click
function cancelAuthentication() {
  document.getElementById("authModal").style.display = "none";
  window.location.href = "Referral.html"; // Replace with the actual URL of your main page
}

// Toggle password visibility
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const icon = this.querySelector("i"); // Select the icon element

    // Toggle password visibility
    const passwordType =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", passwordType);

    // Toggle the icon between eye and eye-slash
    if (passwordType === "text") {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
