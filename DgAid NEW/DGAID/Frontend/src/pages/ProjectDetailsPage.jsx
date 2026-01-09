import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import PurchaseCard from "./PurchaseCard";
import AboutSection from "./AboutSection";
import ContentSection from "../Component/ContentSection";
import "./styles/ProjectDetailsPage.css";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = useProjects();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) return <div className="loading">Loading project...</div>;

  // Find project by matching id as string for safety
  const project = projects.find((p) => String(p.id) === id);

  if (!project) return <div>Project not found</div>;

  // Define the content sections for the project details
  const sections = [
    { title: "Project Overview", content: project.overview },
    { title: "Key Features", content: project.features },
    { title: "Learning Outcomes", content: project.outcomes },
  ];

  return (
    <main className="project-details-page">
      <button
        className="btn btn-secondary back-btn"
        onClick={() => navigate("/projects")} // Reliable back navigation
      >
        &larr; Back to Projects
      </button>

      <div
        className="hero-section"
        style={{ backgroundImage: `url(${project.image || ""})` }}
      ></div>

      <div className="project-details-grid">
        <div className="project-info">
          <h1 className="project-title">{project.title}</h1>
          <div className="college-info">
            <CollegeIcon />
            <span>{project.college}</span>
          </div>

          {sections.map((section, i) => (
            <ContentSection
              key={i}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>

        <aside className="purchase-info">
          <PurchaseCard price={project.price} />
          <AboutSection
            college={project.college}
            collegeInfo={project.collegeInfo}
            author={project.author}
          />
        </aside>
      </div>
    </main>
  );
}

// SVG Icon Component
const CollegeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="college-icon"
  >
    <path d="M12 2L1 9l11 7 9-7-5-3.11v5.94l-4 2.22v-5.94L12 2zm0 10.47L4.5 9 12 5.53 19.5 9 12 12.47zM23 9l-11 7v5l11-7v-5z"></path>
  </svg>
);
