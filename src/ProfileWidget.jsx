import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileImage from "../Assets/profile-icon.jpg";

export default function ProfileWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className={`profile-widget${isOpen ? " is-open" : ""}`}>
      {isOpen && (
        <section
          className="profile-widget-card"
          id="profile-widget-card"
          role="dialog"
          aria-labelledby="profile-widget-name"
        >
          <div className="profile-widget-card-top">
            <span>LET&apos;S CONNECT</span>
            <button
              className="profile-widget-close"
              type="button"
              aria-label="Close profile"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-xmark" aria-hidden="true" />
            </button>
          </div>
          <div className="profile-widget-person">
            <img src={profileImage} alt="Deepak Kumar Mahato" />
            <div>
              <h2 id="profile-widget-name">Deepak Kumar Mahato</h2>
              <p>.NET Full Stack Developer</p>
            </div>
          </div>
          <div className="profile-widget-details">
            <a href="mailto:deepakmahatoj.n.v@gmail.com">
              <span className="profile-widget-detail-icon">
                <i className="fas fa-envelope" aria-hidden="true" />
              </span>
              <span>
                <small>EMAIL</small>
                <strong>deepakmahatoj.n.v@gmail.com</strong>
              </span>
              <i className="fas fa-arrow-up-right-from-square profile-widget-external" aria-hidden="true" />
            </a>
            <a href="tel:+919123163568">
              <span className="profile-widget-detail-icon">
                <i className="fas fa-phone" aria-hidden="true" />
              </span>
              <span>
                <small>PHONE</small>
                <strong>+91 9123163568</strong>
              </span>
              <i className="fas fa-arrow-up-right-from-square profile-widget-external" aria-hidden="true" />
            </a>
            <div className="profile-widget-location">
              <span className="profile-widget-detail-icon">
                <i className="fas fa-location-dot" aria-hidden="true" />
              </span>
              <span>
                <small>LOCATION</small>
                <strong>Jamshedpur, Jharkhand, India</strong>
              </span>
            </div>
          </div>
          <Link className="profile-widget-cta" to="/#contact" onClick={() => setIsOpen(false)}>
            View portfolio &amp; get in touch
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </section>
      )}
      <button
        className="profile-widget-trigger"
        type="button"
        aria-label={isOpen ? "Close Deepak's profile" : "View Deepak's profile and contact details"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "profile-widget-card" : undefined}
        onClick={() => setIsOpen((open) => !open)}
      >
        <img src={profileImage} alt="" />
        <span className="profile-widget-trigger-label">Contact</span>
      </button>
    </div>
  );
}
