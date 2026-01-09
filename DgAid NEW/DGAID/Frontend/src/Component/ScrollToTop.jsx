// src/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Automatically scrolls to top when route changes
    window.scrollTo({ top: 0, behavior: "auto" }); // use "smooth" for animation
  }, [pathname]);

  return null;
}
