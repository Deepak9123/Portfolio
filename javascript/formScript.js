document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const hrEmail = document.getElementById("hrEmail").value;
  const subject = document.getElementById("subject").value;

  fetch("Refferal.html")
    .then((response) => response.text())
    .then((emailBody) => {
      const mailtoLink = `mailto:${hrEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    })
    .catch((error) => console.error("Error fetching email template:", error));
});

function goToHomePage() {
  window.location.href = "/index.html";
}
