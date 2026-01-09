import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext"; // ✅ import context
import Header from "./Component/Navbar";
import Footer from "./Component/Footer";
import "./App.css";
import ScrollToTop from "./Component/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Lazy load components
const Home = lazy(() => import("./Component/Home"));
const Projects = lazy(() => import("./pages/HomePage"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
const SubmitProject = lazy(() => import("./pages/SubmitProject"));

export default function App() {
  return (
      <Router>
        <ScrollToTop /> {/* 👈 Automatically scrolls to top on every route change */}
        <div className="container">
          <Header />
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home />} />

              {/* Projects List & Nested Project Detail */}
              <Route path="/projects" element={<Projects />}>
                <Route path=":id" element={<ProjectDetailsPage />} />
              </Route>

              {/* Submit Project Page */}
              <Route path="/formproject" element={<SubmitProject />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Router>
  );
}
