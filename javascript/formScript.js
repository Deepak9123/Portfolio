function goToHomePage() {
  window.location.href = "/index.html";
}

// Function to display message popup box
function showMessagePopup(message, isSuccess) {
  // Create the popup box
  const popup = document.createElement("div");
  popup.classList.add("popup-message");
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = isSuccess ? "#4CAF50" : "#f44336"; // Green for success, Red for failure
  popup.style.color = "white";
  popup.style.padding = "15px";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
  popup.style.zIndex = "1000";
  popup.style.fontSize = "16px";
  popup.textContent = message;

  // Append the popup box to the body
  document.body.appendChild(popup);

  // Automatically remove the popup after 3 seconds
  setTimeout(function () {
    popup.remove();
  }, 3000);
}

document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();
});

// Handle Form Submission
document.getElementById("emailForm").onsubmit = function (e) {
  e.preventDefault();

  // Clear all previous error messages
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));

  const hrEmail = document.getElementById("hrEmail").value;
  const subject = document.getElementById("subject").value;

  let formIsValid = true;

  // Validate Email (First, check if the email field is empty)
  if (hrEmail.trim() === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    document.getElementById("emailError").style.display = "block";
    formIsValid = false;
  } else {
    // Validate Email format (if the email field is not empty)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(hrEmail)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      document.getElementById("emailError").style.display = "block";
      formIsValid = false;
    }
  }

  // Validate Subject
  if (subject.trim() === "") {
    document.getElementById("subjectError").textContent =
      "Subject is required.";
    document.getElementById("subjectError").style.display = "block";
    formIsValid = false;
  }

  // If form is not valid, return early without showing loader
  if (!formIsValid) {
    return; // Exit if validation fails
  }

  // Show the loader only after all validations have passed
  const loader = document.getElementById("loader");
  loader.style.display = "flex"; // Use flex to center the loader

  // Fetch the email body template from the Referral.html file
  fetch("EmailTemplate.html")
    .then((response) => response.text())
    .then((emailBody) => {
      const templateParams = {
        hrEmail: hrEmail,
        subject: subject,
        message: emailBody, // The email body template fetched from Referral.html
      };

      // Send the email using EmailJS
      emailjs
        .send("service_5rsktvp", "template_ctelnrp", templateParams)
        .then(function (response) {
          console.log("SUCCESS!", response.status, response.text);
          showMessagePopup("Thank you! Your email has been sent.", true); // Success message
          loader.style.display = "none"; // Hide loader after success
          emailForm.reset();
        })
        .catch(function (error) {
          console.log("FAILED...", error);
          showMessagePopup("Failed to send email. Please try again.", false); // Failure message
          loader.style.display = "none"; // Hide loader after failure
        });
    })
    .catch(function (error) {
      console.log("Error fetching email template:", error);
      loader.style.display = "none"; // Hide loader in case of fetch error
    });
};
