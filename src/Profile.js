import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import { UserContext } from "./Context/UserContext"; // ✅ Import correct context
import axios from "axios";
const Profile = () => {
  const { user, setUser } = useContext(UserContext); // ✅ Get user from context
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [showSpecies, setShowSpecies] = useState(false);
const [saplings, setSaplings] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // if JWT is stored
        const res = await axios.get("http://localhost:3001/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSaplings(res.data.saplings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);
  useEffect(() => {
    // ✅ Load user from localStorage if not in context
    if (!user) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setUser({
          name: currentUser.name,
          ecoCoins: currentUser.ecoCoins,
          registerDate: currentUser.registerDate,
        });
        setSpeciesList(currentUser.saplings || []);
        if (currentUser.saplings?.length > 0) {
          setSelectedSpecies(currentUser.saplings[0]);
        }
      }
    } else {
      // If user already in context, load saplings
      setSpeciesList(user.saplings || []);
      if (user.saplings?.length > 0) {
        setSelectedSpecies(user.saplings[0]);
      }
    }
  }, [user, setUser]);

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h4>No user data found. Please register or login.</h4>
      </Container>
    );
  }

  return (

    
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-4 shadow-lg">
            <h3 className="text-center mb-4">My Profile</h3>

            <Row>
              <Col md={6}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Eco-Coins:</strong> {user.ecoCoins || 0}</p>
                <p><strong>Register Date:</strong> {user.registerDate ? new Date(user.registerDate).toLocaleDateString() : "N/A"}</p>
                <p><strong>No. of Saplings:</strong> {speciesList.length}</p>
              </Col>
              <Col md={6} className="text-center">
                <QRCode
                  value={`User: ${user.name}, EcoCoins: ${user.ecoCoins || 0}`}
                  size={120}
                />
                <p className="mt-2">Your QR Code</p>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button
                variant="success"
                onClick={() => setShowSpecies(!showSpecies)}
              >
                {showSpecies ? "Hide My Species" : "View My Species List"}
              </Button>
            </div>

            {showSpecies && (
              <Row className="mt-4">
                <Col md={4}>
                  <h5>My Saplings</h5>
                  <ListGroup>
                    {speciesList.map((sp, idx) => (
                      <ListGroup.Item
                        key={idx}
                        action
                        active={selectedSpecies === sp}
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
                      <p><strong>Species Name:</strong> {selectedSpecies.species}</p>
                      <p><strong>Planted Date:</strong> {selectedSpecies.plantedDate}</p>
                      <img src={`http://localhost:3001/uploads/${selectedSpecies.image}`} alt={selectedSpecies.species} width="150" />
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
