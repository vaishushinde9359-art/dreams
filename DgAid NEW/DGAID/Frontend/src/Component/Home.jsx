import React from "react";
import "./Home.css";
import data from "../data/data.json";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="main-hero">
        <section className="hero">
          <div className="hero-content">
            <div className="Dgaid">
              <h1>DG</h1>
              <h1 className="Aid">AID</h1>
            </div>
            <p>
              Unlock Your Digital Potential. Explore<br />Our Premium Projects – Starting at Just ₹999
            </p>
            <button className="btn-primary">Contact Us</button>
          </div>
        </section>
      </div>

      {/* Categories Section */}
      <section className="categories">
        <h2>Explore Project Fields</h2>
        <div className="category-grid">
          {data.categories.map((item) => (
            <Link to="/projects" key={item.title}>
              <div className="category-card">
                {/* 🖼️ Image fix */}
                <img src={item.img} alt={item.title}  />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="showcase">
        <h2>Ready to Showcase Your Talent?</h2>
        <p>
          Join our growing community of student creators. List your projects and
          connect with buyers eager to support your innovation.
        </p>
        <Link to="/formproject" className="btn-secondary">
          List Your Project Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
