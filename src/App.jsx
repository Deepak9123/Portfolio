import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProfileWidget from "./ProfileWidget.jsx";
import HomePage from "./pages/HomePage.jsx";
import {
  AuthPage,
  EmailTemplatePage,
  GenerateEmailPage,
  RecruiterEmailPage,
  ReferralPage,
} from "./pages/UtilityPages.jsx";
import homeStyles from "../style.css?inline";
import generateEmailStyles from "../css/GenerateEmail.css?inline";
import referralStyles from "../css/Referral.css?inline";
import authStyles from "../css/auth.css?inline";
import formStyles from "../css/formStyle.css?inline";
import profileIcon from "../Assets/icons8-profile-48.png";
import professionalHomeStyles from "./home.css?inline";
import utilityPageStyles from "./utility-pages.css?inline";

const routeStyles = {
  "/": `${homeStyles}\n${professionalHomeStyles}`,
  "/generate-email": generateEmailStyles,
  "/referral": referralStyles,
  "/auth": authStyles,
  "/email-form": formStyles,
  "/email-template": referralStyles,
};

const pageTitles = {
  "/": "Portfolio of Deepak",
  "/generate-email": "Generate Email Template",
  "/referral": "Referral Application",
  "/auth": "Password Authentication",
  "/email-form": "Email Form - HR Notification",
  "/email-template": "Job Application",
};

export default function App() {
  const { pathname } = useLocation();
  const styles = pathname === "/"
    ? routeStyles[pathname]
    : `${routeStyles[pathname] ?? homeStyles}\n${utilityPageStyles}`;

  useEffect(() => {
    const style = document.createElement("style");
    style.dataset.routeStyles = "true";
    style.textContent = styles;
    document.head.append(style);
    document.body.classList.toggle("utility-document", pathname !== "/");
    document.title = pageTitles[pathname] ?? pageTitles["/"];

    return () => style.remove();
  }, [pathname, styles]);

  useEffect(() => {
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.href = profileIcon;
    document.head.append(icon);
    return () => icon.remove();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate-email" element={<GenerateEmailPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/email-form" element={<RecruiterEmailPage />} />
        <Route path="/email-template" element={<EmailTemplatePage />} />
        <Route path="/html/GenerateEmail.html" element={<Navigate to="/generate-email" replace />} />
        <Route path="/html/Referral.html" element={<Navigate to="/referral" replace />} />
        <Route path="/html/auth.html" element={<Navigate to="/auth" replace />} />
        <Route path="/html/emailForm.html" element={<Navigate to="/email-form" replace />} />
        <Route path="/html/EmailTemplate.html" element={<Navigate to="/email-template" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ProfileWidget />
    </>
  );
}
