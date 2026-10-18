import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link, useNavigate } from "react-router-dom";
import emailTemplate from "../../html/EmailTemplate.html?raw";
import developerImage from "../../Assets/dot-net-developer.jpg";
import resume from "../../Assets/deepak_kumar_mahato__resume.pdf";

const driveResumeUrl =
  "https://drive.google.com/file/d/1RGvjfrrqxR2kRx6TuImaLJ18KBkn9ZrJ/view?usp=sharing";

function Message({ notice }) {
  if (!notice) return null;
  return (
    <div className={`q-notice${notice.error ? " is-error" : ""}`} role="status">
      {notice.message}
    </div>
  );
}

function QuickPageLayout({ eyebrow, title, description, children }) {
  return (
    <div className="quick-page">
      <header className="quick-header">
        <Link className="quick-brand" to="/" aria-label="Deepak's portfolio home">
          DK<span>.</span>
        </Link>
        <div className="quick-header-label">
          <span className="quick-header-indicator" />
          PORTFOLIO TOOLKIT
        </div>
        <Link className="quick-home-link" to="/">
          <i className="fas fa-arrow-left" aria-hidden="true" />
          <span>Back to portfolio</span>
        </Link>
      </header>
      <main className="quick-main">
        <div className="quick-page-intro">
          <p className="quick-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="quick-intro-description">{description}</p>
        </div>
        {children}
      </main>
      <footer className="quick-footer">
        <Link className="quick-footer-brand" to="/">Deepak Kumar Mahato<span>.</span></Link>
        <span>Thoughtfully built for the next opportunity.</span>
        <nav aria-label="Portfolio tools">
          <Link to="/generate-email">Email builder</Link>
          <Link to="/referral">Referral kit</Link>
        </nav>
      </footer>
    </div>
  );
}

export function GenerateEmailPage() {
  const [errors, setErrors] = useState({});
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [notice, setNotice] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const nextErrors = {};
    for (const field of ["name", "company", "position", "skills"]) {
      if (!values[field].trim()) {
        nextErrors[field] = `${{
          name: "Name",
          company: "Company name",
          position: "Position",
          skills: "Skills",
        }[field]} is required.`;
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const message = values.message.trim()
      || "I am interested in this position as it aligns with my skills and experience.";
    setGeneratedEmail(`Subject: Application for ${values.position} at ${values.company}

Dear HR,

I hope this email finds you well. My name is ${values.name}, and I am writing to express my interest in the ${values.position} position at ${values.company}. I have extensive experience in ${values.skills}, and I believe my skills and experience make me an ideal candidate for this role.

${message}

I have attached my resume for your consideration. I would appreciate the opportunity to discuss my application further. Thank you for your time and consideration.
here’s my portfolio link: https://deepakmahato.vercel.app

Best regards,
${values.name}
+91 9123163568`);
  }

  async function copyEmail() {
try {
  await navigator.clipboard.writeText(generatedEmail);
  setNotice({ message: "Your email draft has been copied." });
} catch (error) {
  console.error("Unable to copy the generated email.", error);
  setNotice({ message: "Could not copy the email. Please select and copy the text.", error: true });
}
  }

  useEffect(() => {
if (!notice) return undefined;
const timeout = window.setTimeout(() => setNotice(null), 4000);
return () => window.clearTimeout(timeout);
  }, [notice]);

  return (
<QuickPageLayout
  eyebrow="YOUR NEXT APPLICATION, MADE EASIER"
  title="A better first impression starts here."
  description="Create a polished, personal application email in a few steps. Add your details and we’ll shape them into a ready-to-send draft."
>
  <div className={`q-tool-grid${generatedEmail ? " has-output" : ""}`}>
    <section className="q-surface q-builder-card">
      <div className="q-card-heading">
        <span className="q-card-icon"><i className="fas fa-pen-to-square" /></span>
        <div>
          <h2>Build your introduction</h2>
          <p>Fields marked with an asterisk are required.</p>
        </div>
      </div>
      <form id="emailForm" className="q-form" noValidate onSubmit={handleSubmit}>
        <div className="q-field-grid">
          <div className="q-field">
            <label htmlFor="name">Your name <span>*</span></label>
            <input id="name" name="name" type="text" placeholder="e.g. Alex Morgan" />
            {errors.name && <span className="q-field-error" role="alert">{errors.name}</span>}
          </div>
          <div className="q-field">
            <label htmlFor="company">Company <span>*</span></label>
            <input id="company" name="company" type="text" placeholder="e.g. Acme Technologies" />
            {errors.company && <span className="q-field-error" role="alert">{errors.company}</span>}
          </div>
          <div className="q-field">
            <label htmlFor="position">Role you&apos;re applying for <span>*</span></label>
            <input id="position" name="position" type="text" defaultValue=".NET Developer" />
            {errors.position && <span className="q-field-error" role="alert">{errors.position}</span>}
          </div>
          <div className="q-field">
            <label htmlFor="skills">Your key skills <span>*</span></label>
            <input
              id="skills"
              name="skills"
              type="text"
              defaultValue="C#, .NET Core, ASP.NET, SQL Server"
            />
            {errors.skills && <span className="q-field-error" role="alert">{errors.skills}</span>}
          </div>
          <div className="q-field q-field-wide">
            <label htmlFor="message">Personal note <span className="q-optional">OPTIONAL</span></label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Add a short note about what excites you about this opportunity."
            />
          </div>
        </div>
        <div className="q-form-actions">
          <button className="q-button q-button-primary" type="submit">
            Generate my email <i className="fas fa-arrow-right" />
          </button>
          <Link className="q-button q-button-secondary" to="/referral">
            <i className="fas fa-share-nodes" /> Share referral kit
          </Link>
        </div>
      </form>
    </section>
    <aside className="q-aside">
      <div className="q-aside-icon"><i className="fas fa-wand-magic-sparkles" /></div>
      <p className="q-aside-kicker">A NOTE ON GOOD APPLICATIONS</p>
      <h2>Specific beats generic.</h2>
      <p>
        Tailor the role, company, and skills to the opportunity. A small
        personal note helps your introduction sound like you.
      </p>
      <div className="q-aside-steps">
        <span><i className="fas fa-check" /> Your details</span>
        <span><i className="fas fa-check" /> A ready-to-edit draft</span>
        <span><i className="fas fa-check" /> You stay in control</span>
      </div>
    </aside>
    {generatedEmail && (
      <section className="q-surface q-output-card">
        <div className="q-output-heading">
          <div className="q-card-heading">
            <span className="q-card-icon"><i className="fas fa-envelope-open-text" /></span>
            <div>
              <h2>Your application email</h2>
              <p>Review your draft, then copy it into your email client.</p>
            </div>
          </div>
          <button className="q-button q-button-secondary q-copy-button" type="button" onClick={copyEmail}>
            <i className="fas fa-copy" /> Copy draft
          </button>
        </div>
        <pre id="generatedEmail" className="q-generated-email">{generatedEmail}</pre>
      </section>
    )}
  </div>
  <Message notice={notice} />
</QuickPageLayout>
  );
}

export function ReferralPage() {
  return (
<QuickPageLayout
  eyebrow="A READY-TO-SHARE INTRODUCTION"
  title="Make your next introduction count."
  description="A concise overview of my background and experience, ready to share with a recruiter or hiring manager."
>
  <article className="q-surface q-referral-card">
    <div className="q-referral-banner">
      <img src={developerImage} alt="Illustration of .NET software development" />
      <div className="q-referral-banner-copy">
        <span>APPLICATION PROFILE</span>
        <h2>Full Stack<br />Developer</h2>
        <p>.NET · React · SQL</p>
      </div>
      <span className="q-referral-banner-number">01 / PROFILE</span>
    </div>
    <div className="q-referral-content">
      <div className="q-referral-copy">
        <p className="q-card-kicker">A PERSONAL INTRODUCTION</p>
        <h2>Dear Hiring Manager,</h2>
        <p>
          I hope this message finds you well. My name is Deepak Kumar Mahato,
          and I have over 3 years of experience as a .NET Full Stack
          Developer. My background spans .NET application development,
          modern frontend frameworks, and database-backed systems.
        </p>
        <p>
          I believe my skills and experience could be a strong fit for a
          Dot Net Developer opportunity at your organization. I&apos;d be
          grateful if you would consider my profile.
        </p>
      </div>
      <div className="q-referral-skills">
        <p className="q-card-kicker">CORE SKILLS</p>
        <div className="q-skill-chips">
          {[".NET Core", "Web API", "ASP.NET MVC", "MS SQL Server", "MongoDB", "Elastic", "Angular", "ReactJS"].map(
            (skill) => <span key={skill}>{skill}</span>,
          )}
        </div>
      </div>
      <div className="q-referral-actions">
        <div>
          <p className="q-card-kicker">LEARN MORE</p>
          <p>Explore my work and experience, or review my resume.</p>
        </div>
        <div className="q-action-buttons">
          <a className="q-button q-button-primary" href="https://deepakmahato.vercel.app" target="_blank" rel="noreferrer">
            View portfolio <i className="fas fa-arrow-up-right-from-square" />
          </a>
          <a className="q-button q-button-secondary" href={resume} target="_blank" rel="noreferrer">
            Download resume <i className="fas fa-download" />
          </a>
        </div>
      </div>
      <div className="q-referral-signoff">
        Thank you for your time and consideration.
        <strong>Warm regards, Deepak Kumar</strong>
        <a href="mailto:deepakmahatoj.n.v@gmail.com">deepakmahatoj.n.v@gmail.com</a>
      </div>
    </div>
  </article>
  <div className="q-next-step">
    <div>
      <span className="q-next-step-icon"><i className="fas fa-paper-plane" /></span>
      <div><strong>Ready to send this introduction?</strong><span>Continue to prepare an email for a recruiter.</span></div>
    </div>
    <Link className="q-button q-button-primary" to="/auth">
      Continue to email <i className="fas fa-arrow-right" />
    </Link>
  </div>
</QuickPageLayout>
  );
}

export function AuthPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function authenticate(event) {
    event.preventDefault();
    if (password === "Avengers@123") {
      navigate("/email-form");
      return;
    }
    setError("Invalid password. Please try again.");
  }

  return (
    <QuickPageLayout
      eyebrow="RECRUITER EMAIL"
      title="One last step before sending."
      description="Confirm access to the recruiter email tool. Your application details stay in your hands."
    >
      <section className="q-surface q-auth-card">
        <div className="q-auth-illustration">
          <span className="q-auth-shield"><i className="fas fa-shield-halved" /></span>
          <p className="q-card-kicker">A PRIVATE WORKFLOW</p>
          <h2>Protecting a little inbox peace.</h2>
          <p>
            This step helps prevent accidental messages from being sent through
            the recruiter email form.
          </p>
          <div className="q-auth-caption"><i className="fas fa-lock" /> Secure step · Takes a moment</div>
        </div>
        <form className="q-auth-form" onSubmit={authenticate}>
          <span className="q-auth-step">STEP 01 <i /> VERIFY ACCESS</span>
          <h2>Authenticate</h2>
          <p>Enter the password to continue to the email form.</p>
          <label htmlFor="password">Access password</label>
          <div className="q-password-wrap">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              aria-label="Enter Password"
              aria-invalid={Boolean(error)}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
            </button>
          </div>
          {error && <div className="q-field-error" role="alert">{error}</div>}
          <button className="q-button q-button-primary q-auth-submit" type="submit">
            Verify &amp; continue <i className="fas fa-arrow-right" />
          </button>
          <Link className="q-text-link" to="/referral"><i className="fas fa-arrow-left" /> Return to referral</Link>
        </form>
      </section>
    </QuickPageLayout>
  );
}

export function RecruiterEmailPage() {
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const nextErrors = {};
    if (!values.hrEmail.trim()) {
      nextErrors.hrEmail = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.hrEmail)) {
      nextErrors.hrEmail = "Please enter a valid email address.";
    }
    if (!values.subject.trim()) nextErrors.subject = "Subject is required.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSending(true);
    try {
      await emailjs.send(
        "service_5rsktvp",
        "template_ctelnrp",
        { hrEmail: values.hrEmail, subject: values.subject, message: emailTemplate },
        { publicKey: "dz4fK0ceg1X5VsJYP" },
      );
      setNotice({ message: "Thank you! Your email has been sent." });
      form.reset();
    } catch (error) {
      console.error("Failed to send the recruiter email.", error);
      setNotice({ message: "Failed to send email. Please try again.", error: true });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <QuickPageLayout
      eyebrow="READY WHEN YOU ARE"
      title="Send your introduction."
      description="Add the recruiter’s address and a subject. The application message will be included with your email."
    >
      <div className="q-mail-grid">
        <section className="q-surface q-mail-card">
          <div className="q-card-heading">
            <span className="q-card-icon"><i className="fas fa-paper-plane" /></span>
            <div>
              <h2>Address your email</h2>
              <p>Your application preview is included automatically.</p>
            </div>
          </div>
          <form id="emailForm" className="q-form" noValidate onSubmit={handleSubmit}>
            <div className="q-field">
              <label htmlFor="hrEmail">Recruiter&apos;s email <span>*</span></label>
              <input
                id="hrEmail"
                name="hrEmail"
                type="email"
                placeholder="name@company.com"
                aria-describedby={errors.hrEmail ? "emailError" : undefined}
                aria-invalid={Boolean(errors.hrEmail)}
              />
              {errors.hrEmail && <span id="emailError" className="q-field-error" role="alert">{errors.hrEmail}</span>}
            </div>
            <div className="q-field">
              <label htmlFor="subject">Email subject <span>*</span></label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Application for .NET Developer"
                aria-describedby={errors.subject ? "subjectError" : undefined}
                aria-invalid={Boolean(errors.subject)}
              />
              {errors.subject && <span id="subjectError" className="q-field-error" role="alert">{errors.subject}</span>}
            </div>
            <div className="q-mail-included">
              <i className="fas fa-circle-check" />
              <span><strong>Application profile included</strong><small>Your experience, skills, portfolio, and resume links.</small></span>
              <Link to="/email-template" aria-label="Preview application email"><i className="fas fa-arrow-up-right-from-square" /></Link>
            </div>
            <div className="q-form-actions">
              <button className="q-button q-button-primary" type="submit" disabled={isSending}>
                {isSending ? "Sending your email..." : "Send application email"}
                <i className={`fas ${isSending ? "fa-spinner q-spin" : "fa-arrow-right"}`} />
              </button>
              <Link className="q-button q-button-secondary" to="/referral">
                <i className="fas fa-arrow-left" /> Back to referral
              </Link>
            </div>
          </form>
        </section>
        <aside className="q-aside q-mail-aside">
          <span className="q-aside-icon"><i className="fas fa-envelope-open-text" /></span>
          <p className="q-aside-kicker">BEFORE YOU SEND</p>
          <h2>A small check goes a long way.</h2>
          <p>Make sure the recruiter’s address is right, and personalize the subject if you know the role or team.</p>
          <Link className="q-aside-link" to="/email-template">Preview the included profile <i className="fas fa-arrow-right" /></Link>
          <Link className="q-aside-back" to="/">Return to your portfolio</Link>
        </aside>
      </div>
      <Message notice={notice} />
    </QuickPageLayout>
  );
}

export function EmailTemplatePage() {
  return (
    <QuickPageLayout
      eyebrow="APPLICATION PREVIEW"
      title="A clear story, ready to share."
      description="This is the profile included with your recruiter email: a considered introduction, relevant experience, and easy ways to learn more."
    >
      <article className="q-surface q-email-preview">
        <header className="q-email-preview-header">
          <div className="q-email-monogram">DK<span>.</span></div>
          <div>
            <span>PROFESSIONAL PROFILE</span>
            <h2>Full Stack Developer</h2>
            <p>.NET · React · SQL</p>
          </div>
          <span className="q-preview-status"><i /> READY TO SHARE</span>
        </header>
        <div className="q-email-preview-body">
          <p className="q-card-kicker">INTRODUCTION</p>
          <p>Hello Sir / Ma&apos;am,</p>
          <p>I hope this email finds you well.</p>
          <p>
            My name is Deepak Kumar Mahato, and I have over 2.5 years of
            experience as a .NET Full Stack Developer. I believe my skills and
            experience align well with the role of Dot Net Developer in your
            esteemed organization.
          </p>
          <div className="q-preview-divider" />
          <p className="q-card-kicker">TECHNICAL SKILLS</p>
          <div className="q-skill-chips">
            {[".NET Core", "Web API", "ASP.NET MVC", "MS SQL Server", "MongoDB", "Elastic", "Angular", "ReactJS"].map(
              (skill) => <span key={skill}>{skill}</span>,
            )}
          </div>
          <div className="q-preview-divider" />
          <p className="q-card-kicker">PORTFOLIO &amp; RESUME</p>
          <p>You can review my portfolio and download my resume using the links below.</p>
          <div className="q-action-buttons">
            <a href="https://deepakmahato.vercel.app" className="q-button q-button-primary" target="_blank" rel="noreferrer">
              View portfolio <i className="fas fa-arrow-up-right-from-square" />
            </a>
            <a href={driveResumeUrl} className="q-button q-button-secondary" target="_blank" rel="noreferrer">
              Download resume <i className="fas fa-download" />
            </a>
          </div>
          <div className="q-email-signoff">
            <p>Thank you for considering my application. I look forward to hearing from you.</p>
            <p>Warm regards,<br /><strong>Deepak Kumar Mahato</strong><br />+91 9123163568</p>
          </div>
        </div>
      </article>
      <div className="q-preview-navigation">
        <Link className="q-button q-button-secondary" to="/referral">
          <i className="fas fa-arrow-left" /> Back to referral
        </Link>
        <Link className="q-button q-button-primary" to="/auth">
          Continue to recruiter email <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </QuickPageLayout>
  );
}
