// Selectors for various elements
const navbarLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const footer = document.querySelector("footer");
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const hireModal = document.getElementById("hireModal");
const hireMeBtn = document.getElementById("hireMeBtn");
const closeBtn = hireModal.querySelector(".close");
const hireForm = document.getElementById("hireForm"); // Ensure this is not commented out

document.addEventListener('DOMContentLoaded', function() {
  var footerHireMeBtn = document.getElementById('footerHireMeBtn');
  var hireModal = document.getElementById('hireModal');
  
  footerHireMeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    hireModal.style.display = 'block';
  });
});

// Hire Me Button - Open Modal
hireMeBtn.onclick = function () {
  hireModal.style.display = "block";
};

// Close Modal Button
closeBtn.onclick = function () {
  hireModal.style.display = "none";
};

// Close Modal by Clicking Outside
window.onclick = function (event) {
  if (event.target === hireModal) {
    hireModal.style.display = "none";
  }
};

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

// Handle Form Submission
hireForm.onsubmit = function (e) {
  e.preventDefault();

  // Clear all previous error messages
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));

  const recruiterName = document.getElementById("recruiterName").value;
  const recruiterEmail = document.getElementById("recruiterEmail").value;
  const companyName = document.getElementById("companyName").value;
  const message = document.getElementById("message").value;

  let formIsValid = true;

  // Validate Name
  if (recruiterName.trim() === "") {
    document.getElementById("nameError").textContent = "Name is required.";
    document.getElementById("nameError").style.display = "block";
    formIsValid = false;
  }

  // Validate Email (First, check if the email field is empty)
  if (recruiterEmail.trim() === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    document.getElementById("emailError").style.display = "block";
    formIsValid = false;
  } else {
    // Validate Email format (if the email field is not empty)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(recruiterEmail)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      document.getElementById("emailError").style.display = "block";
      formIsValid = false;
    }
  }

  // Validate Company Name
  if (companyName.trim() === "") {
    document.getElementById("companyError").textContent =
      "Company name is required.";
    document.getElementById("companyError").style.display = "block";
    formIsValid = false;
  }

  // Validate Message
  if (message.trim() === "") {
    document.getElementById("messageError").textContent =
      "Please enter your message.";
    document.getElementById("messageError").style.display = "block";
    formIsValid = false;
  }

  // Check if the form is valid before showing the loader
  if (!formIsValid) {
    return; // Exit if validation fails, no loader will be shown
  }

  // Show the loader only after all validations have passed
  const loader = document.getElementById("loader");
  loader.style.display = "flex"; // Use flex to center the loader

  // If form is valid, proceed with sending email
  if (formIsValid) {
    const templateParams = {
      recruiterName: recruiterName,
      recruiterEmail: recruiterEmail,
      companyName: companyName,
      message: message,
    };

    // Send the email using EmailJS
    emailjs
      .send("service_m8clctq", "template_yb8t3qn", templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        // alert("Thank you for your interest! Your invitation has been sent.");
        showMessagePopup(
          "Thank you for your interest! Your invitation has been sent.",
          true
        ); // Success message
        loader.style.display = "none";
        hireModal.style.display = "none";
        hireForm.reset();
      })
      .catch(function (error) {
        console.log("FAILED...", error);
        // alert("Failed to send email. Please try again.");
        showMessagePopup("Failed to send email. Please try again.", false); // Failure message
        // Hide the loader
        loader.style.display = "none";
        hireForm.reset();
      });
  }
};

// Active Link Highlighting
function updateActiveLink() {
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  let activeIndex = sections.length;

  while (--activeIndex && scrollPosition < sections[activeIndex].offsetTop) {}

  // Check if footer is in view
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 100
  ) {
    activeIndex = navbarLinks.length - 1; // Set to last link (Contact)
  }

  navbarLinks.forEach((link) => link.classList.remove("active"));
  navbarLinks[activeIndex].classList.add("active");
}

// Hamburger Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("show");
});

// Smooth Scroll for Navbar Links
navbarLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    hamburger.classList.remove("active");
    navbar.classList.remove("show");

    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Update active link on scroll and resize
window.addEventListener("scroll", updateActiveLink);
window.addEventListener("resize", updateActiveLink);

// Initial call to highlight the correct link
updateActiveLink();

// Modal Trigger Functionality (Check for correct references for 'btn' and 'span')
const btn = document.getElementById("btn");
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
