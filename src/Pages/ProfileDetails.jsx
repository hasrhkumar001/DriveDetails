// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

const ProfileDetails = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  console.log(userData)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Updated user data:', userData);
  };

  return (
    <Container className="my-5 ">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header style={{backgroundColor: "#FF4C30", color: "white"}}>
              <h4 className="mb-0 fs-2 fw-bold">Profile Details</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label className='fs-2'>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={userData.name}
                    className='fs-3 text-secondary'
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label className='fs-2'>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={userData.email}
                    className='fs-3 text-secondary'
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className=" d-flex justify-content-end">
                <Button  type="submit" style={{backgroundColor: "#FF4C30", color: "white" , border : 'none'}} className="shadow navbar__buttons fs-2 fw-bold  mt-5">
                  Save Changes
                </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileDetails;
