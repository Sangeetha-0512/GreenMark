// // Signup.js
// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";


// const Signup = () => {
//   const [inputData, setInputData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [isChecked, setIsChecked] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setInputData((prevData) => ({ ...prevData, [name]: value }));

//     if (name === "password") validatePassword(value);
//   };

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
//     if (!regex.test(password)) {
//       setPasswordError(
//         "Password must be at least 8 characters, include a letter, a number, and a special character."
//       );
//       return false;
//     } else {
//       setPasswordError("");
//       return true;
//     }
//   };

//   const handleCheck = (e) => setIsChecked(e.target.checked);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulated signup logic
//     setTimeout(() => {
//     //   savedata(inputData); // save data in context
//      console.log("✅ User Signed Up:", inputData); 
//       setInputData({ name: "", email: "", password: "" });
//       setIsSubmitting(false);
//       navigate("/home");
//     }, 1000);
//   };

//   const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
//   const handleLogin = () => navigate("/Login");

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="card shadow p-4 w-100" style={{ maxWidth: "450px" }}>
//         <div className="text-center mb-4">
//           <h3 className="text-success">Create Your Account</h3>
//           <p className="text-muted">Enter your details to get started</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={inputData.name}
//               onChange={handleInput}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={inputData.email}
//               onChange={handleInput}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//              <div className="input-group">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               className="form-control"
//               name="password"
//               value={inputData.password}
//               onChange={handleInput}
//               required
//             />
//             <span
//              className="input-group-text"
//       style={{ cursor: "pointer" }}
//       onClick={togglePasswordVisibility}
//             //   onClick={togglePasswordVisibility}
//             //   style={{
//             //     position: "absolute",
//             //     right: "10px",
//             //     top: "50%",
//             //     transform: "translateY(-50%)",
//             //     cursor: "pointer",
//             //     fontSize: "1.1rem",
//             //     color: "#333",
//             //   }}
//             >
//               {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//             </span>
//             </div>
//             {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
//           </div>

//           <div className="form-check mb-3">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               checked={isChecked}
//               onChange={handleCheck}
//               id="termsCheck"
//             />
//             <label className="form-check-label" htmlFor="termsCheck">
//               I agree to the <span className="text-primary">terms and conditions</span>
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-success w-100 mb-2"
//             disabled={!isChecked || !!passwordError || isSubmitting}
//           >
//             {isSubmitting ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <div className="text-center">
//           <p>
//             Already have an account?{" "}
//             <button className="btn btn-link p-0" onClick={handleLogin}>
//               Login
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Signup = () => {
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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:3001/api/register", inputData);

      // console.log("✅ User Registered:", res.data);
      alert("Account created successfully!");
      setInputData({ name: "", email: "", password: "" });
      navigate("/home");
    } catch (err) {
      console.error("❌ Error registering:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const handleLogin = () => navigate("/login");

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
              onChange={handleInput}
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
              onChange={handleInput}
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
                onChange={handleInput}
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
            <button className="btn btn-link p-0" onClick={handleLogin}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
