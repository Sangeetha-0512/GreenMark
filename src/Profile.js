import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Sangeetha",
    ecoCoins: 120,
    registerDate: "2025-09-18",
    sponsorName: "GreenMark Sponsor",
    shopName: "Eco Shop",
    ownerName: "Mr. Kumar",
  });

  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [showSpecies, setShowSpecies] = useState(false);

  // Simulate fetching data
  useEffect(() => {
    // Replace with API call
    const mockSpecies = [
      {
        id: 1,
        type: "Neem",
        plantedDate: "2025-01-15",
        health: "Healthy 🌿",
        careTips: "Water daily, provide sunlight",
        timing: "Morning watering, weekly trimming",
      },
      {
        id: 2,
        type: "Mango",
        plantedDate: "2025-03-20",
        health: "Moderate 🌱",
        careTips: "Water twice a week, avoid overwatering",
        timing: "Evening watering, monthly fertilizer",
      },
      {
        id: 3,
        type: "Tulsi",
        plantedDate: "2025-06-01",
        health: "Excellent 🌸",
        careTips: "Keep in shade, water every day",
        timing: "Morning sunlight, daily watering",
      },
    ];
    setSpeciesList(mockSpecies);
    setSelectedSpecies(mockSpecies[0]); // default first
  }, []);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-4 shadow-lg">
            <h3 className="text-center mb-4">My Profile</h3>

            {/* User Basic Details */}
            <Row>
              <Col md={6}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Eco-Coins:</strong> {user.ecoCoins}</p>
                <p><strong>Register Date:</strong> {user.registerDate}</p>
                <p><strong>Sponsor:</strong> {user.sponsorName}</p>
                <p><strong>Shop Name:</strong> {user.shopName}</p>
                <p><strong>Owner Name:</strong> {user.ownerName}</p>
              </Col>
              <Col md={6} className="text-center">
                {/* QR Code */}
                <QRCode
                  value={`User: ${user.name}, EcoCoins: ${user.ecoCoins}`}
                  size={120}
                />
                <p className="mt-2">Your QR Code</p>
              </Col>
            </Row>

            {/* Button to open Species List */}
            <div className="text-center mt-4">
              <Button
                variant="success"
                onClick={() => setShowSpecies(!showSpecies)}
              >
                {showSpecies ? "Hide My Species" : "View My Species List"}
              </Button>
            </div>

            {/* Species Section */}
            {showSpecies && (
              <Row className="mt-4">
                <Col md={4}>
                  <h5>My Saplings</h5>
                  <ListGroup>
                    {speciesList.map((sp) => (
                      <ListGroup.Item
                        key={sp.id}
                        action
                        active={selectedSpecies?.id === sp.id}
                        onClick={() => setSelectedSpecies(sp)}
                      >
                        {sp.type}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={8}>
                  {selectedSpecies ? (
                    <Card className="p-3">
                      <h5>{selectedSpecies.type} Details</h5>
                      <p><strong>Planted Date:</strong> {selectedSpecies.plantedDate}</p>
                      <p><strong>Health:</strong> {selectedSpecies.health}</p>
                      <p><strong>Care Tips:</strong> {selectedSpecies.careTips}</p>
                      <p><strong>Timing:</strong> {selectedSpecies.timing}</p>
                      <QRCode
                        value={`Species: ${selectedSpecies.type}, Planted: ${selectedSpecies.plantedDate}`}
                        size={100}
                      />
                      <p className="mt-2">Species QR</p>
                    </Card>
                  ) : (
                    <p>Select a species to view details</p>
                  )}
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
