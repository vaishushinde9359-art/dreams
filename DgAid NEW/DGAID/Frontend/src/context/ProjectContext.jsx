// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";

// const ProjectContext = createContext();
// export const useProjects = () => useContext(ProjectContext);

// export const ProjectProvider = ({ children }) => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [role, setRole] = useState(localStorage.getItem("role") || "user");

//   const API_URL = "http://localhost:5000/api/projects";

//   // Axios config with token
//   const getConfig = () => ({
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   // Fetch all projects
//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
//       setProjects(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Admin actions
//   const addProject = async (project) => {
//     if (role !== "admin") return alert("Admin only");
//     await axios.post(API_URL, project, getConfig());
//     fetchProjects();
//   };

//   const updateProject = async (id, project) => {
//     if (role !== "admin") return alert("Admin only");
//     await axios.put(`${API_URL}/${id}`, project, getConfig());
//     fetchProjects();
//   };

//   const deleteProject = async (id) => {
//     if (role !== "admin") return alert("Admin only");
//     await axios.delete(`${API_URL}/${id}`, getConfig());
//     fetchProjects();
//   };

//   // Login
//   const login = async (email, password) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       setToken(res.data.token);
//       setRole(res.data.role);
//       fetchProjects();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   // Logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setToken("");
//     setRole("user");
//     setProjects([]);
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   return (
//     <ProjectContext.Provider
//       value={{
//         projects,
//         loading,
//         addProject,
//         updateProject,
//         deleteProject,
//         token,
//         role,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </ProjectContext.Provider>
//   );
// };

















import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const ProjectContext = createContext();
export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "user");

  const API_URL = "http://localhost:5000/api/projects";

  // Axios config with token
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${token}` },
  });

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Admin actions
  const addProject = async (project) => {
    if (role !== "admin") return alert("Admin only");
    await axios.post(API_URL, project, getConfig());
    fetchProjects();
  };

  const updateProject = async (id, project) => {
    if (role !== "admin") return alert("Admin only");
    await axios.put(`${API_URL}/${id}`, project, getConfig());
    fetchProjects();
  };

  const deleteProject = async (id) => {
    if (role !== "admin") return alert("Admin only");
    await axios.delete(`${API_URL}/${id}`, getConfig());
    fetchProjects();
  };

  // Register
  const register = async (full_name, email, password, confirm_password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        full_name,
        email,
        password,
        confirm_password,
      });
      alert(res.data.message);
      return true;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setToken(res.data.token);
      setRole(res.data.role);
      fetchProjects();
      return true;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("user");
    setProjects([]);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        addProject,
        updateProject,
        deleteProject,
        token,
        role,
        login,
        logout,
        register, // ✅ now available
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
