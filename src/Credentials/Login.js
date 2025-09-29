
import React, { useState,useContext } from "react";

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
import { UserContext } from "../Context/UserContext";
const Login = () => {
  
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Send email & 
    // password to backend
    const res = await axios.post("http://localhost:3001/api/login", formData);

    if (res.status === 200) {
      // Save the entire user info in localStorage for Profile page
      alert("Login successful!");
      // setInputDatas({ email: "", password: "" }); // clear form
      // navigate("/profile"); // redirect to Profile page
      setUser(res.data.profile);   // ✅ Save user profile
      localStorage.setItem("token", res.data.token);  // store JWT for later
      navigate("/home");  
    }
  } catch (error) {
    const status = error.response?.status;
    console.log("error msg", status);
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
                  value={formData.email}
                  onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
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

