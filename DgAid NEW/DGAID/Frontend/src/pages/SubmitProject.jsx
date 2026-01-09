import React, { useState } from 'react';
import './styles/SubmitProject.css';
// import React { useState } from 'react';
// import './Submitroject.css';

const SubmitProjectForm = () => {
  

  
  return (
    <div className="form-container">
      <h1 className='Headings'>Submit Your Project</h1>
      <p className='paragraph'>Share your innovation with the world and connect with potential buyers.</p>

      <form className='form' >
        <fieldset className="section">
          <legend> 🖼 Project Details</legend>

          <div className="input-label">Project Name</div>
          <input
           
            name="name"
            placeholder="e.g. Interactive Portfolio Website"
            
            className="input-field"
          />

          <div className="input-label">Category</div>
          <select
           
            className="input-field"
          >
            <option value="">Select a category</option>
            <option value="web">Web Development</option>
            <option value="web">Game Development</option>
            <option value="web">Data Science</option>
            <option value="mobile">Mobile App</option>
            <option value="web">3D Model</option>
            <option value="design">UI/UX Design</option>
            <option value="design">AI / ML Products</option>
          </select>

          <div className="input-label">Project Description</div>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your project, its features, and technologies used."
          
            className="input-field"
          />

         
        </fieldset>

        <fieldset className="section">
          <legend>📁 Project Media</legend>
          <div className="upload-section">
             
             <div className="upload-row">
    <h2 className="upload">Add Project Image</h2>
    <label className="custom-btn" htmlFor="documentFile">Choose File</label>
    <input type="file" id="documentFile" className="file-input" />
  </div>
             <div className="upload-row">
    <h2 className="upload">Add Document</h2>
    <label className="custom-btn" htmlFor="documentFile">Choose File</label>
    <input type="file" id="documentFile" className="file-input" />
  </div>
  <div className="upload-row">
    <h2 className="upload">Add Project</h2>
    <label className="custom-btn" htmlFor="projectFile">Choose File</label>
    <input type="file" id="projectFile" className="file-input" />
  </div>

  

</div>

        </fieldset>

        <button type="submit" className="submit-btn">Next Page</button>
      </form>
    </div>
  );
};

export default SubmitProjectForm;