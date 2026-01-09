import React from "react";
import { useProjects } from "../context/ProjectContext";
import "./styles/AboutSection.css";

export default function AboutSection({ college, collegeInfo, author, projectId }) {
  const { role, updateProject } = useProjects();

  const handleEdit = () => {
    const newCollege = prompt("Enter new college name:", college);
    const newCollegeInfo = prompt("Enter new college info:", collegeInfo);
    const newAuthorName = prompt("Enter new author name:", author?.name);
    const newAuthorBio = prompt("Enter new author bio:", author?.bio);

    if (newCollege && newAuthorName) {
      updateProject(projectId, {
        college: newCollege,
        collegeInfo: newCollegeInfo,
        author: { name: newAuthorName, bio: newAuthorBio },
      });
    }
  };

  return (
    <div className="about-section">
      {college && (
        <div className="about-card">
          <h3 className="about-title">About the College</h3>
          <p className="about-text">
            <strong>{college}</strong> {collegeInfo}
          </p>
        </div>
      )}
      {author?.name && (
        <div className="about-card">
          <h3 className="about-title">About the Author</h3>
          <p className="about-text">
            <strong>{author.name}</strong> {author.bio}
          </p>
        </div>
      )}

      {role === "admin" && (
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit Info
        </button>
      )}
    </div>
  );
}
