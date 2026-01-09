import React from "react";
import { useLocation, Outlet, Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import "./styles/HomePage.css";

export default function HomePage() {
  const location = useLocation();
  const { projects, loading } = useProjects();

  // Check if current path is exactly "/projects"
  const isOnProjectList = location.pathname === "/projects";

  if (loading) return <div className="loading">Loading projects...</div>;
  if (!projects.length) return <div className="no-projects">No projects available</div>;

  return (
    <div className="home-page">
      {isOnProjectList && (
        <>
          <h1 className="title">Our Projects</h1>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                {/* Image */}
                <div
                  className="project-card-image"
                  style={{ backgroundImage: `url(${project.image || ""})` }}
                ></div>

                {/* Content */}
                <div className="project-card-content">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-description">{project.shortDescription}</p>
                  <Link to={`/projects/${project.id}`} className="project-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 👇 This is where /projects/:id will render */}
      <Outlet />
    </div>
  );
}
