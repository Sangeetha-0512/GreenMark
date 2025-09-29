import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

const Register = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") validatePassword(value);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include a letter, a number, and a special character."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleCheck = (e) => setIsChecked(e.target.checked);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked || passwordError) return;

    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:3001/api/register", inputData);
      if (res.data) {
        // Save user in context
        setUser(res.data.user);

        // Optionally store in localStorage
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));

        alert("Account created successfully!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-4">
          <h3 className="text-success">Create Your Account</h3>
          <p className="text-muted">Enter your details to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={inputData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={inputData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                name="password"
                value={inputData.password}
                onChange={handleChange}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheck}
              id="termsCheck"
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I agree to the <span className="text-primary">terms and conditions</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 mb-2"
            disabled={!isChecked || !!passwordError || isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <button className="btn btn-link p-0" onClick={() => navigate("/login")}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
