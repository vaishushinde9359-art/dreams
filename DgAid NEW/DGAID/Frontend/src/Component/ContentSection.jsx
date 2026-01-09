import React from "react";
import "./ContentSection.css";

export default function ContentSection({ title, content }) {
  return (
    <section className="content-section">
      <h2 className="content-title">{title}</h2>
      {Array.isArray(content) ? (
        <ul className="content-list">
          {content.map((item, i) => (
            <li key={i} className="content-list-item">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="content-text">{content}</p>
      )}
    </section>
  );
}
