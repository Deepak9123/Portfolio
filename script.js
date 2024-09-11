const navbarLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const modal = document.getElementById("contactModal");
const btn = document.getElementById("hireMeBtn");
const span = document.getElementsByClassName("close")[0];

// Function to update the active link based on scroll position
function updateActiveLink() {
    let index = sections.length; // Default index

    // Loop through sections to find which one is in view
    while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navbarLinks.forEach((link) => link.classList.remove('active'));
    navbarLinks[index].classList.add('active');
}

// Toggle the visibility of the navbar on hamburger click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('show'); // Ensure the class for visibility is 'show'
});

// Smooth scrolling and close the mobile menu on link click
navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        hamburger.classList.remove('active');
        navbar.classList.remove('show'); // Close the menu on click

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add event listener for scrolling to update the active link
window.addEventListener('scroll', updateActiveLink);

// Initial call to set the active link on page load
updateActiveLink();

// Modal functionality
btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
