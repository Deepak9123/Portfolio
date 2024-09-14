// Selectors for various elements
const navbarLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const footer = document.querySelector('footer');
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const hireModal = document.getElementById("hireModal");
const hireMeBtn = document.getElementById("hireMeBtn");
const closeBtn = hireModal.querySelector(".close");
const hireForm = document.getElementById("hireForm");  // Ensure this is not commented out

// Hire Me Button - Open Modal
hireMeBtn.onclick = function() {
  hireModal.style.display = "block";
}

// Close Modal Button
closeBtn.onclick = function() {
  hireModal.style.display = "none";
}

// Close Modal by Clicking Outside
window.onclick = function(event) {
  if (event.target === hireModal) {
    hireModal.style.display = "none";
  }
}

// Handle Form Submission
hireForm.onsubmit = function(e) {
  e.preventDefault();

  const recruiterName = document.getElementById("recruiterName").value;
  const recruiterEmail = document.getElementById("recruiterEmail").value;
  const companyName = document.getElementById("companyName").value;
  const message = document.getElementById("message").value;

  // Prepare the data to send via EmailJS
  const templateParams = {
    recruiterName: recruiterName,
    recruiterEmail: recruiterEmail,
    companyName: companyName,
    message: message
  };

  // Send the email using EmailJS
  emailjs.send("service_id", "template_id", templateParams)
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);  
      alert("Thank you for your interest! Your invitation has been sent.");
      hireModal.style.display = "none"; 
      hireForm.reset(); 
    })
    .catch(function(error) {
      hireModal.style.display = "none"; 
      hireForm.reset(); 
    });
};

// Active Link Highlighting
function updateActiveLink() {
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  let activeIndex = sections.length;

  while (--activeIndex && scrollPosition < sections[activeIndex].offsetTop) {}

  // Check if footer is in view
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
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
