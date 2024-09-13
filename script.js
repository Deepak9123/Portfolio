const navbarLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const modal = document.getElementById("contactModal");
const btn = document.getElementById("hireMeBtn");
const span = document.getElementsByClassName("close")[0];

function updateActiveLink() {
  let index = sections.length;
  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
  navbarLinks.forEach((link) => link.classList.remove("active"));
  navbarLinks[index].classList.add("active");
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
