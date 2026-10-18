import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import developerIllustration from "../../Assets/dot-net-developer.jpg";
import resume from "../../Assets/deepak_kumar_mahato__resume.pdf";

const sections = ["home", "projects", "experience", "skills", "contact"];

const projects = [
  {
    title: "E-Movie Tickets",
    description:
      "Developed a .NET project to manage and streamline movie ticket bookings, significantly improving the user experience.",
    technologies: [".NET", "C#", "SQL"],
    url: "https://github.com/Deepak9123/EMovieTickets",
  },
  {
    title: "Basic Banking System",
    description:
      "Analyzed a web application for virtual money transfers, implementing OTP verification to enhance security.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    url: "https://github.com/Deepak9123/sparks-foundation-Projects-Internship",
  },
  {
    title: "Hiring Search Tool",
    description:
      "Developed a tool using ReactJS, NodeJS, and Firebase to search for Hiring Managers and Recruiters. (Over 25,000 users, 5000+ saved queries)",
    technologies: ["ReactJS", "NodeJS", "Firebase"],
    url: "https://hiring-search.careerflow.ai/",
  },
];

const experience = [
  {
    title: "Associate",
    company: "PwC",
    dates: "Nov 2025 - Present",
    responsibilities: [
      "Developed and maintained enterprise-grade applications using modern technologies, ensuring scalability, security, and performance.",
      "Collaborated with cross-functional teams to analyze business requirements and deliver high-quality solutions.",
      "Participated in code reviews, debugging, and performance optimization initiatives to improve application reliability.",
      "Contributed to Agile development processes, including sprint planning, estimation, and deployment activities.",
    ],
  },
  {
    title: "Software Developer",
    company: "Indus Net Technologies Pvt Ltd",
    dates: "Dec 2024 - Nov 2025",
    responsibilities: [
      "Composed custom Shopify themes and plugins, resulting in a 25% increase in online sales for clients.",
      "Led a team of 5 developers in the successful delivery of a complex ERP system, meeting all project milestones and client expectations.",
      "Conducted regular code reviews and achieved best practices, resulting in a 15% reduction in bug reports.",
      "Collaborated with stakeholders to gather requirements, define project scope, and prioritize tasks, ensuring on-time project delivery.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Everest Instruments Pvt. Ltd.",
    dates: "June 2023 - Nov 2024",
    responsibilities: [
      "Engineered and maintained high-performance web applications using ASP.NET, Angular, and MS SQL Server, improving database management processes.",
      "Achieved a 20% improvement in application performance by optimizing database queries and implementing caching strategies.",
      "Led cross-functional collaboration to define requirements, design optimal solutions, and deploy new features; improved project delivery speed by 25% and ensured alignment with strategic business goals.",
      "Revamped website flows and navigation menus, reducing the frequency of misdirected customer service queries by 30% and increasing traffic to previously neglected pages.",
    ],
  },
];

const skillGroups = [
  { title: "Languages", icon: "fas fa-code", skills: ["C#", "JavaScript", "TypeScript", "SQL"] },
  {
    title: "Frameworks",
    icon: "fas fa-layer-group",
    skills: [".NET Core", "ASP.NET MVC", "React", "Angular"],
  },
  {
    title: "Tools",
    icon: "fas fa-tools",
    skills: ["Visual Studio", "Git", "Azure DevOps", "Docker"],
  },
];

function Notice({ notice }) {
  if (!notice) return null;
  return (
    <div className={`app-notice${notice.error ? " is-error" : ""}`} role="status">
      {notice.message}
    </div>
  );
}

function HireModal({ onClose, onNotice }) {
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const nextErrors = {};

    if (!values.recruiterName.trim()) nextErrors.recruiterName = "Name is required.";
    if (!values.recruiterEmail.trim()) {
      nextErrors.recruiterEmail = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.recruiterEmail)) {
      nextErrors.recruiterEmail = "Please enter a valid email address.";
    }
    if (!values.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!values.message.trim()) nextErrors.message = "Please enter your message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSending(true);
    try {
      await emailjs.send(
        "service_m8clctq",
        "template_yb8t3qn",
        {
          recruiterName: values.recruiterName,
          recruiterEmail: values.recruiterEmail,
          companyName: values.companyName,
          message: values.message,
        },
        { publicKey: "CmNUoBgCx9Rhq6QQy" },
      );
      onNotice({ message: "Thank you for your interest! Your invitation has been sent." });
      form.reset();
      onClose();
    } catch (error) {
      console.error("Failed to send the invitation.", error);
      onNotice({ message: "Failed to send email. Please try again.", error: true });
    } finally {
      setIsSending(false);
    }
  }

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="modal" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="hire-title">
        <button className="close" type="button" aria-label="Close" onClick={onClose}>
          &times;
        </button>
        <h2 id="hire-title">Hire Deepak Kumar</h2>
        <div className="modal-sections">
          <div className="contact-section">
            <h3>Contact Details</h3>
            <p><i className="fas fa-envelope" /> deepakmahatoj.n.v@gmail.com</p>
            <p><i className="fas fa-map-marker-alt" /> Jharkhand India</p>
            <p><i className="fas fa-phone" /> +91 9123163568</p>
          </div>
          <div className="skills-section">
            <h3>Technical Skills</h3>
            <ul>
              {["C#", "React", "MS SQL", ".NET Core", "ASP.NET MVC", "Angular", "Elastic"].map(
                (skill) => <li key={skill}>{skill}</li>,
              )}
            </ul>
          </div>
        </div>
        <form id="hireForm" noValidate onSubmit={handleSubmit}>
          <input name="recruiterName" type="text" placeholder="Your Name" aria-label="Your Name" />
          {errors.recruiterName && <span className="error-message visible">{errors.recruiterName}</span>}
          <input name="recruiterEmail" type="email" placeholder="Your Email" aria-label="Your Email" />
          {errors.recruiterEmail && <span className="error-message visible">{errors.recruiterEmail}</span>}
          <input name="companyName" type="text" placeholder="Company Name" aria-label="Company Name" />
          {errors.companyName && <span className="error-message visible">{errors.companyName}</span>}
          <textarea name="message" placeholder="Your Message" aria-label="Your Message" />
          {errors.message && <span className="error-message visible">{errors.message}</span>}
          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Invitation"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    function updateActiveSection() {
      const current = sections
        .map((id) => document.getElementById(id))
        .filter((section) => section && section.getBoundingClientRect().top <= window.innerHeight / 2)
        .at(-1);
      if (current) setActiveSection(current.id);
    }
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  return (
    <div className="portfolio-site">
      <header className="header">
        <a href="#home" className="logo">Portfolio.</a>
        <nav id="navbar" className={`navbar${isMenuOpen ? " show" : ""}`} aria-label="Main navigation">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={activeSection === section ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              {section[0].toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>
        <button
          className={`hamburger${isMenuOpen ? " active" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <section id="home" className="home">
          <div className="home-content">
            <div className="hero-eyebrow">
              <span className="availability-dot" />
              Software Engineer <span className="eyebrow-divider">/</span> Jharkhand, India
            </div>
            <h1>
              Hi, I&apos;m <span className="hero-name">Deepak.</span>
              <span className="hero-headline">I build reliable digital experiences.</span>
            </h1>
            <h2 className="hero-role">.NET Full Stack Developer</h2>
            <p className="hero-description">
              I turn complex ideas into useful, dependable web applications —
              from polished interfaces to the systems that power them.
            </p>
            <div className="btn-box">
              <a href="#hireModal" onClick={(event) => {
                event.preventDefault();
                setIsHireModalOpen(true);
              }} className="primary-action">
                Let&apos;s work together <i className="fas fa-arrow-up-right-from-square" />
              </a>
              <a href="#projects" className="secondary-action">
                Explore my work <i className="fas fa-arrow-down" />
              </a>
            </div>
            <div className="social-resume-container">
              <div className="home-sci">
                <a href="https://github.com/Deepak9123" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <i className="bx bxl-github" />
                </a>
                <a href="https://www.linkedin.com/in/deepak-kumar-mahato/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i className="bx bxl-linkedin-square" />
                </a>
                <a href="mailto:deepakmahatoj.n.v@gmail.com" aria-label="Email">
                  <i className="bx bxl-gmail" />
                </a>
              </div>
              <a href={resume} target="_blank" rel="noreferrer" className="download-resume">
                Download resume <i className="fas fa-arrow-down" />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <img src={developerIllustration} alt=".NET developer working with code and software tools" />
            </div>
            <div className="hero-image-note">
              <span>SOFTWARE ENGINEERING</span>
              <strong>Ideas into working software</strong>
              <i className="fas fa-code" aria-hidden="true" />
            </div>
            <span className="hero-orbit hero-orbit-one" aria-hidden="true" />
            <span className="hero-orbit hero-orbit-two" aria-hidden="true" />
          </div>
        </section>

        <section id="projects" className="projects">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">A FEW THINGS I&apos;VE BUILT</p>
                <h2 className="section-title">Selected work<span>.</span></h2>
              </div>
              <p className="section-description">
                Practical products, thoughtful engineering, and a focus on making
                everyday experiences work better.
              </p>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.title}>
                  <div className="project-content">
                    <div className="project-card-top">
                      <span className="project-index">0{index + 1} / PROJECT</span>
                      <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
                    </div>
                    <h3 className="project-title">{project.title}<span>.</span></h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((technology) => (
                        <span className="tech-tag" key={technology}>{technology}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-links">
                    <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
                      View Project
                    </a>
                    <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="experience">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">THE JOURNEY SO FAR</p>
                <h2 className="section-title">Experience<span>.</span></h2>
              </div>
              <p className="section-description">
                Growing through collaboration, curiosity, and shipping software
                that solves real problems.
              </p>
            </div>
            <div className="experience-timeline">
              {experience.map((job, index) => (
                <article className="experience-item" key={job.company}>
                  <div className="experience-header">
                    <div className="job-heading">
                      <h3 className="job-title">{job.title}</h3>
                      {index === 0 && <span className="current-role">CURRENT</span>}
                    </div>
                    <div className="company-info">
                      <p>{job.company}</p>
                      <p className="job-dates">{job.dates}</p>
                    </div>
                  </div>
                  <ul className="job-responsibilities">
                    {job.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">TOOLS OF THE TRADE</p>
                <h2 className="section-title">My toolkit<span>.</span></h2>
              </div>
              <p className="section-description">
                The languages, frameworks, and tools I use to take an idea from
                first commit to production.
              </p>
            </div>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article className="skill-category" key={group.title}>
                  <div className="skill-header">
                    <i className={group.icon} />
                    <h3>{group.title}</h3>
                  </div>
                  <ul className="skill-list">
                    {group.skills.map((skill) => (
                      <li key={skill}><span className="skill-item">{skill}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="contact">
        <div className="footer-container">
          <div className="contact-cta">
            <p className="section-kicker">HAVE A PROJECT IN MIND?</p>
            <h2>Let&apos;s make<br />something great.</h2>
            <a href="mailto:deepakmahatoj.n.v@gmail.com" className="contact-email">
              deepakmahatoj.n.v@gmail.com <i className="fas fa-arrow-up-right-from-square" />
            </a>
          </div>
          <div className="footer-content">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>
                <i className="fas fa-envelope" />
                <a href="mailto:deepakmahatoj.n.v@gmail.com">deepakmahatoj.n.v@gmail.com</a>
              </p>
              <p><i className="fas fa-map-marker-alt" /> Jamshedpur, Jharkhand India</p>
              <p>
                <i className="fas fa-phone" />
                <a href="tel:+919123163568">+91 9123163568</a>
              </p>
            </div>
            <div className="footer-sections">
              <div className="social-media">
                <h3>Follow Me</h3>
                <ul>
                  <li><a href="https://www.linkedin.com/in/deepak-kumar-mahato/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin" /> LinkedIn</a></li>
                  <li><a href="https://github.com/Deepak9123" target="_blank" rel="noreferrer"><i className="fab fa-github" /> GitHub</a></li>
                  <li><a href="https://x.com/deepak04900276" target="_blank" rel="noreferrer"><i className="fab fa-twitter" /> Twitter</a></li>
                </ul>
              </div>
              <div className="quick-links">
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#hireModal" id="footerHireMeBtn" onClick={(event) => {
                    event.preventDefault();
                    setIsHireModalOpen(true);
                  }}>Send Invitation</a></li>
                  <li><Link to="/generate-email">Generate Email Template</Link></li>
                  <li><a href={resume} target="_blank" rel="noreferrer">Download My Resume</a></li>
                  <li><Link to="/referral">Refer Your Friends</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Deepak Kumar Mahato. All Rights Reserved.</p>
        </div>
      </footer>

      {isHireModalOpen && (
        <HireModal
          onClose={() => setIsHireModalOpen(false)}
          onNotice={setNotice}
        />
      )}
      <Notice notice={notice} />
    </div>
  );
}
