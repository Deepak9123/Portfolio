document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  // Initialize validation flag
  let formIsValid = true;

  // Get form field values and trim
  const name = document.getElementById("name").value.trim();
  const company = document.getElementById("company").value.trim();
  const position = document.getElementById("position").value.trim();
  const skills = document.getElementById("skills").value.trim();
  const message = document.getElementById("message").value.trim() || "I am interested in this position as it aligns with my skills and experience.";

  // Clear previous error messages
  document.getElementById("nameError").style.display = "none";
  document.getElementById("companyError").style.display = "none";
  document.getElementById("positionError").style.display = "none";
  document.getElementById("skillsError").style.display = "none";

  // Validation checks
  if (name === "") {
      document.getElementById("nameError").textContent = "Name is required.";
      document.getElementById("nameError").style.display = "block";
      formIsValid = false;
  }

  if (company === "") {
      document.getElementById("companyError").textContent = "Company name is required.";
      document.getElementById("companyError").style.display = "block";
      formIsValid = false;
  }

  if (position === "") {
      document.getElementById("positionError").textContent = "Position is required.";
      document.getElementById("positionError").style.display = "block";
      formIsValid = false;
  }

  if (skills === "") {
      document.getElementById("skillsError").textContent = "Skills are required.";
      document.getElementById("skillsError").style.display = "block";
      formIsValid = false;
  }

  // If the form is not valid, stop here
  if (!formIsValid) {
      return;
  }

  // Generate email if all fields are valid
  const phoneno = "+91 9123163568";
  const portfolio = "here’s my portfolio link: https://deepakmahato.vercel.app";

  const emailBody = `Subject: Application for ${position} at ${company}

Dear HR,

I hope this email finds you well. My name is ${name}, and I am writing to express my interest in the ${position} position at ${company}. I have extensive experience in ${skills}, and I believe my skills and experience make me an ideal candidate for this role.

${message}

I have attached my resume for your consideration. I would appreciate the opportunity to discuss my application further. Thank you for your time and consideration.
${portfolio}

Best regards,
${name}
${phoneno}`;

  document.getElementById("generatedEmail").textContent = emailBody;
  document.getElementById("emailOutput").style.display = "block";
});

function goToHomePage() {
  window.location.href = '/index.html'; // Change this if your homepage has a different file name or path
}

function goToRefer() {
  window.location.href = 'Referral.html'; // Change this if your homepage has a different file name or path
}