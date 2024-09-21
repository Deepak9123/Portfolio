document.getElementById("emailForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const phoneno = "+91 9123163568"
    const portfolio = "here’s my portfolio link: https://deepakmahato.vercel.app"
    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;
    const position = document.getElementById("position").value;
    const skills = document.getElementById("skills").value;
    const message = document.getElementById("message").value || "I am interested in this position as it aligns with my skills and experience.";
  
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