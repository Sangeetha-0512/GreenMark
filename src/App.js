import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import indoor from './images/indoor_plant.jpeg';
import outdoor from './images/outdoor_plant.jpeg';
import IndoorPlantd from './Detailspage/Indoorplantdetail'
import OutdoorPlantd from './Detailspage/Outdoorplantdetail'
import Registerplant from './Register'
import { Link } from "react-router-dom";
import Watering from "./Guides/Watering";
// import Sunlight from "./Guides/Sunlight";
// import Soil from "./Guides/Soil";
// import Fertilization from "./Guides/Fertilization";
// import Pest from "./Guides/Pest";
// import Seasonal from "./Guides/Seasonal";
// import Pruning from "./Guides/Pruning";
// import Organic from "./Guides/Organic";
// import Composting from "./Guides/Composting";
// import Harvesting from "./Guides/Harvesting";
import Login from './Credentials/Login';
import register from './Register'
import Signup from './Credentials/Signup';
import SupportUs from './SupportUs';
import Profile from './Profile';
import Layout from './Layout';
import About from './About';

import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";

function Home() {
  const navigate = useNavigate();
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const speciesData = [
    {
      type: "Indoor plants",
      features: ["Air purifier", "Low sunlight", "Easy care"],
      image:indoor,
      link:"/indoor",
    },
    {
      type: "Outdoor plants",
      features: ["Strong sunlight", "Weather resistant", "Fast growing"],
      image:outdoor, 
      link:"/outdoor",
    },
  ];

  const guides = [
    { title: "Watering", link: "/Guides/watering" },
    { title: "Sunlight & Shading", link: "/guides/sunlight" },
  { title: "Soil Preparation", link: "/guides/soil" },
  { title: "Fertilization", link: "/guides/fertilization" },
  { title: "Pest Resistance", link: "/guides/pest" },
  { title: "Seasonal Care", link: "/guides/seasonal" },
  { title: "Pruning", link: "/guides/pruning" },
  { title: "Organic Growth", link: "/guides/organic" },
  { title: "Composting", link: "/guides/composting" },
  { title: "Harvesting", link: "/guides/harvesting" },
  ];

  return (

    <>
      {/* Species Section */}
      <Container className="py-5">
  <h2 className="text-center mb-4 fw-bold text-success">
    Free Courses about Plant Care
  </h2>
  <Row>
    {/* Left side: species */}
    <Col md={6}>
      {speciesData.map((sp, idx) => (
        <Card
          key={idx}
          className="mb-4 shadow-sm"
          style={{ cursor: "pointer" }}
        >
          <Row className="g-0 align-items-center">
            <Col md={4} className="text-center">
              <img
                src={sp.image}
                alt={sp.type}
                className="img-fluid p-3"
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{sp.type}</Card.Title>
                <ul>
                  {sp.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <Button
                  variant="success"
                  onClick={() => navigate(sp.link)}
                >
                  View Course
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}

      {/* Order button should also stay on left side */}
      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={() => navigate("/register")}
        >
          Order Sapling
        </button>
      </div>
    </Col>

    {/* Right side: Guides */}
    <Col md={6}>
      <h4 className="fw-bold">Guides by Topic</h4>
     <ListGroup variant="flush">
  {guides.map((g, i) => (
    <ListGroup.Item key={i}>
      <Link to={g.link} className="text-decoration-none text-dark">
        {g.title}
      </Link>
    </ListGroup.Item>
  ))}
</ListGroup>

    </Col>
  </Row>
</Container>


      {/* Footer */}
      <footer className="bg-light text-dark py-5 mt-5 border-top">
        <Container>
          <Row>
            <Col md={3}>
              <h6>ABOUT US</h6>
              <ul className="list-unstyled">
                <li>Team and Story</li>
                <li>Rewards</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>Clubs</h6>
              <ul className="list-unstyled">
                <li>Youth Empowerment</li>
                <li>Academies</li>
                <li>Workshops</li>
                <li>Global Council</li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>Support Us</h6>
              <ul className="list-unstyled">
                <li>Donate Funds</li>
                <li>Conduct Camps</li>
                <li>Plant Saplings</li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>OTHER</h6>
              <ul className="list-unstyled">
                <li>Sign In</li>
                <li>Redeem Coins</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </Col>
          </Row>
          <hr />
          <p className="text-center small mb-0">
            © {new Date().getFullYear()} GREENMARK. All rights reserved.
          </p>
        </Container>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter> 
     <Routes>
 <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/Signup" element={<Signup />} />
         <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
         <Route
          path="/About"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
         <Route
          path="/Login"
          element={
            <Layout>
               <Login />
            </Layout>
          }
        />
        <Route
          path="/indoor"
          element={
            <Layout>
              <IndoorPlantd />
            </Layout>
          }
        />
        <Route
          path="/outdoor"
          element={
            <Layout>
              <OutdoorPlantd />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Registerplant />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/SupportUs"
          element={
            <Layout>
              <SupportUs />
            </Layout>
          }
        />
        <Route
          path="/guides/watering"
          element={
            <Layout>
              <Watering />
            </Layout>
          }
        />
         {/* <Route path="/guides/sunlight" element={<Sunlight />} />
        <Route path="/guides/soil" element={<Soil />} />
        <Route path="/guides/fertilization" element={<Fertilization />} />
        <Route path="/guides/pest" element={<Pest />} />
        <Route path="/guides/seasonal" element={<Seasonal />} />
        <Route path="/guides/pruning" element={<Pruning />} />
        <Route path="/guides/organic" element={<Organic />} />
        <Route path="/guides/composting" element={<Composting />} />
        <Route path="/guides/harvesting" element={<Harvesting />} /> */}
      </Routes>



      
    </BrowserRouter>
  );
}

export default App;

