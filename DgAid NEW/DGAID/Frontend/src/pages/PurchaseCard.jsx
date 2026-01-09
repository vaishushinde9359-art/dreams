import "./styles/PurchaseCard.css";
import { useProjects } from "../context/ProjectContext";

export default function PurchaseCard({ projectId, price }) {
  const { role, addProject } = useProjects();

  const handleAddProject = () => {
    if (role !== "admin") return alert("Only admins can add projects");
    addProject({ id: projectId, price });
  };

  return (
    <div className="purchase-card">
      <div className="price">{price} ₹/project</div>
      <div className="action-buttons">
        {role === "admin" && (
          <button className="btn btn-primary" onClick={handleAddProject}>
            Add / Update Project
          </button>
        )}
        <button className="btn btn-secondary">Purchase Now</button>
      </div>
    </div>
  );
}
