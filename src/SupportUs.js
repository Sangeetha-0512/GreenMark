
// SupportUs.js
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import company from "./images/companysupportus.jpeg";
import ngo from "./images/ngosupportus.jpeg";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";
 import "./SocialIcons.css";
const supportOptions = [
  {
    id: 1,
    title: "Companies & IT Firms",
    description:
      "Partner with us to sponsor plantation drives, awareness camps, and sustainability events.",
    img: company,
  },
  {
    id: 2,
    title: "High-Level Schools & Colleges",
    description:
      "Encourage students to donate for saplings and become part of a green movement.",
    img: "https://img.icons8.com/color/80/school.png",
  },
  {
    id: 3,
    title: "Charity Foundations & NGOs",
    description:
      "Support us by funding reforestation projects and social awareness campaigns.",
    img: ngo,
  },
  {
    id: 4,
    title: "Individuals & Families",
    description:
      "Every small contribution counts! Donate funds to help us plant more trees.",
    img: "https://img.icons8.com/color/80/conference-call.png",
  },
];

const SupportUs = () => {
  const [idea, setIdea] = useState("");

  const handleIdeaSubmit = (e) => {
    e.preventDefault();
    if (idea.trim()) {
      console.log("New Idea Submitted:", idea);
      alert("Thank you for sharing your idea!");
      setIdea("");
    }
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    console.log("Membership Request:", email);
    alert("Thank you! We'll contact you soon.");
    e.target.reset();
  };

  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-5 text-success">Support Us</h2>

      <Row className="g-4">
        {/* Donate Section */}
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold mb-4 text-success">DONATE</h5>
              <p className="text-muted mb-4">
                Join hands with us to restore forests, plant saplings, and create sustainable futures.
              </p>

              {supportOptions.map((item) => (
                <Card key={item.id} className="mb-3 shadow-sm border-0">
                  <Row className="g-0 align-items-center">
                    <Col md={3} className="text-center p-3">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="img-fluid"
                        style={{ maxHeight: "100px" }}
                      />
                    </Col>
                    <Col md={7} className="p-3">
                      <h6 className="fw-bold">{item.title}</h6>
                      <p className="text-muted small">{item.description}</p>
                    </Col>
                    <Col md={2} className="text-center p-3">
                      <Button variant="success" size="sm">
                        Donate
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Mission Section */}
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-bold mb-4 text-success">ADVANCE OUR MISSION</h5>
              <p className="text-muted">
                Share your innovative ideas with us — whether it’s about sustainability, awareness,
                or new ways to engage people in protecting our environment.
              </p>

              <Form onSubmit={handleIdeaSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your idea here..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Submit Idea
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Membership / Interest Form */}
      <Card className="p-4 shadow-sm border-0 mt-5">
        <h4 className="fw-bold text-center text-success mb-3">Become a Member</h4>
        <p className="text-center text-muted mb-4">
          Interested in joining GreenMark as a member or partner?  
          Enter your email below, and we’ll reach out to you.
        </p>
        <Form className="d-flex justify-content-center" onSubmit={handleMemberSubmit}>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            style={{ maxWidth: "400px" }}
            required
          />
          <Button type="submit" variant="primary" className="ms-2">
            Submit
          </Button>
        </Form>
      </Card>
    <div>
        <div>
        {/* Social Media */}
        <div className="d-flex justify-content-center mt-5">
      <a href="#" className="social-icon instagram">
        <FaInstagram />
      </a>
      <a href="#" className="social-icon facebook">
        <FaFacebook />
      </a>
      <a href="#" className="social-icon youtube">
        <FaYoutube />
      </a>
      <a href="#" className="social-icon linkedin">
        <FaLinkedin />
      </a>
      <a href="#" className="social-icon tiktok">
        <FaTiktok />
      </a>
        </div>
      </div>
    </div>
    </Container>

    
  );
};

export default SupportUs;
