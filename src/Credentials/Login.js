
// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   InputGroup,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const navigate = useNavigate();

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [inputdatas, setInputDatas] = useState({ email: "", password: "" });

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setInputDatas((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // ✅ Instead of DB/API check, just log to console
//     console.log("✅ Login Attempt:", inputdatas);

//     alert("Login successful!");
//     navigate("/home");

//     // clear form after login
//     setInputDatas({ email: "", password: "" });
//   };

//   return (
//     <Container fluid className="d-flex vh-100 justify-content-center align-items-center bg-light">
//       <Row className="w-100 justify-content-center">
//         <Col md={5}>
//           <Card className="shadow-lg p-4">
//             {/* Header */}
//             <div className="text-center mb-4">
//               <h3 className="fw-bold mt-2 text-success">GreenMark Login</h3>
//               <p className="text-muted">Enter your email and password</p>
//             </div>

//             {/* Form */}
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3" controlId="email">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                   value={inputdatas.email}
//                   onChange={handleInput}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="password">
//                 <Form.Label>Password</Form.Label>
//                 <InputGroup>
//                   <Form.Control
//                     type={passwordVisible ? "text" : "password"}
//                     name="password"
//                     placeholder="Enter password"
//                     value={inputdatas.password}
//                     onChange={handleInput}
//                     required
//                   />
//                   <InputGroup.Text
//                     onClick={() => setPasswordVisible(!passwordVisible)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>

//               <Button variant="success" type="submit" className="w-100 mb-3">
//                 Login
//               </Button>
//             </Form>

//             {/* Footer */}
//             <div className="text-center">
//               <p className="mb-2">Don’t have an account?</p>
//               <Button
//                 variant="outline-primary"
//                 className="w-100"
//                 onClick={() => navigate("/Signup")}
//               >
//                 Create Account
//               </Button>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputdatas, setInputDatas] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputDatas((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Send email & password to backend
      const res = await axios.post("http://localhost:3001/api/login", inputdatas);
      if (res.status === 200) {
        // ✅ Save token in localStorage
        localStorage.setItem("jwt-token", res.data.token);
        alert("Login successful!");
        navigate("/home");
        setInputDatas({ email: "", password: "" }); // clear form
      }
    } catch (error) {
      const status = error.response?.status;
      console.log("error msg",status);
      if (status === 404) alert("❌ User not found!");
      else if (status === 401) alert("❌ Incorrect password!");
      else if (status === 403) {
        alert("⚠️ Your plan has expired. Please buy a plan.");
        navigate("/pricing", { state: { from: "login" } });
      } else {
        alert("⚠️ Login failed. Please try again.");
      }
    }
  };

  return (
    <Container fluid className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={5}>
          <Card className="shadow-lg p-4">
            {/* Header */}
            <div className="text-center mb-4">
              <h3 className="fw-bold mt-2 text-success">GreenMark Login</h3>
              <p className="text-muted">Enter your email and password</p>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={inputdatas.email}
                  onChange={handleInput}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={inputdatas.password}
                    onChange={handleInput}
                    required
                  />
                  <InputGroup.Text
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mb-3">
                Login
              </Button>
            </Form>

            {/* Footer */}
            <div className="text-center">
              <p className="mb-2">Don’t have an account?</p>
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={() => navigate("/Signup")}
              >
                Create Account
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

