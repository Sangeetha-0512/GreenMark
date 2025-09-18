import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

const teamMembers = [
  {
    name: "Alice",
    role: "Project Lead",
    image: "/images/team1.jpg",
    achievement: "Published IEEE paper on plant care AI",
  },
  {
    name: "John Doe",
    role: "Backend Developer",
    image: "/images/team2.jpg",
    achievement: "Built Plant Monitoring System",
  },
  {
    name: "Jane Smith",
    role: "Frontend Developer",
    image: "/images/team3.jpg",
    achievement: "Designed User-friendly UI for GreenMark",
  },
];

const stepsForNewUsers = [
  {
    step: 1,
    title: "Login or Signup",
    description:
      "Create an account or login using your credentials to start your plant journey.",
  },
  {
    step: 2,
    title: "Order or Register a Sapling",
    description:
      "Choose your plant, register it, and start tracking its growth through our platform.",
  },
  {
    step: 3,
    title: "Grow Your Plant",
    description:
      "Follow the care guides (watering, sunlight, soil) to help your plant grow healthy.",
  },
  {
    step: 4,
    title: "Redeem Coins",
    description:
      "Earn coins for your plant growth milestones and redeem them for rewards or donations.",
  },
];

function About() {
  return (
    <Container className="py-5">
      {/* Page Title */}
      <h2 className="text-center mb-5 fw-bold text-success">About GreenMark</h2>

      {/* Our Team */}
      <section className="mb-5">
        <h3 className="fw-bold mb-4">Our Team</h3>
        <Row>
          {teamMembers.map((member, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <Card className="shadow-sm h-100 text-center">
                <Card.Img
                  variant="top"
                  src={member.image}
                  alt={member.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {member.role}
                  </Card.Subtitle>
                  <Card.Text>{member.achievement}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Join Us / Openings */}
      <section className="mb-5">
        <h3 className="fw-bold mb-4">Join Our Team</h3>
        <p>
          We welcome passionate individuals and NGOs to contribute to our mission.
          Openings for:
        </p>
        <ul>
          <li>Internships (Frontend, Backend, AI, Marketing)</li>
          <li>Full-time roles</li>
          <li>NGO Collaborations</li>
        </ul>
        <Button variant="success" href="/SupportUs">
          Join Us
        </Button>
      </section>

      {/* Step-by-Step Guide for New Users */}
      <section className="mb-5">
        <h3 className="fw-bold mb-4">How to Start Growing Your Plant</h3>
        <Row>
          {stepsForNewUsers.map((step) => (
            <Col md={6} key={step.step} className="mb-3">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>
                    Step {step.step}: {step.title}
                  </Card.Title>
                  <Card.Text>{step.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Proof / Images */}
      <section className="mb-5">
        <h3 className="fw-bold mb-4">Our Achievements</h3>
        <Row>
          <Col md={4} className="mb-3">
            <Image src="/images/achievement1.jpg" rounded fluid />
          </Col>
          <Col md={4} className="mb-3">
            <Image src="/images/achievement2.jpg" rounded fluid />
          </Col>
          <Col md={4} className="mb-3">
            <Image src="/images/achievement3.jpg" rounded fluid />
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default About;
