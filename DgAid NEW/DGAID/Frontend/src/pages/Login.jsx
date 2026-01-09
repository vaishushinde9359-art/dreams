import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import "./styles/Login.css";

export default function Login() {
  const { login } = useProjects();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    await login(email, password); // context login sets token & role
    navigate("/projects"); // redirect after login
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="login">Login</h1>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" ref={emailRef} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" ref={passwordRef} />
          </div>

          <a className="forgot" href="#">
            Forgot password?
          </a>

          <div className="btn-group">
            <button type="submit" className="btn">Login</button>
            <Link to="/signup" className="btn outline">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
