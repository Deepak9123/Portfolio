const navbarLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const footer = document.querySelector('footer');
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const hireModal = document.getElementById("hireModal");
const hireMeBtn = document.getElementById("hireMeBtn");
const closeBtn = hireModal.querySelector(".close");
const hireForm = document.getElementById("hireForm");

hireMeBtn.onclick = function() {
  hireModal.style.display = "block";
}

closeBtn.onclick = function() {
  hireModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == hireModal) {
    hireModal.style.display = "none";
  }
}

hireForm.onsubmit = function(e) {
  e.preventDefault();
  
  const recruiterName = document.getElementById("recruiterName").value;
  const recruiterEmail = document.getElementById("recruiterEmail").value;
  const companyName = document.getElementById("companyName").value;
  const message = document.getElementById("message").value;

  // Here you would typically send this data to a server
  // For now, we'll just log it to the console
  console.log("Invitation sent:", { recruiterName, recruiterEmail, companyName, message });

  // You could also use a service like EmailJS to send emails directly from the client-side
  // emailjs.send("service_id", "template_id", { recruiterName, recruiterEmail, companyName, message });

  alert("Thank you for your interest! Your invitation has been sent.");
  hireModal.style.display = "none";
  hireForm.reset();
}

function updateActiveLink() {
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  let activeIndex = sections.length;

  // Check regular sections
  while (--activeIndex && scrollPosition < sections[activeIndex].offsetTop) {}

  // Check if footer is in view
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
    activeIndex = navbarLinks.length - 1; // Set to last link (Contact)
  }

  navbarLinks.forEach((link) => link.classList.remove("active"));
  navbarLinks[activeIndex].classList.add("active");
}

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("show");
});

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

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("resize", updateActiveLink);

// Initial call
updateActiveLink();

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};