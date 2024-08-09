// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ProfileDetails = () => {
  const [userData, setUserData] = useState({ name: '', email: '',password: '' });

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
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
     const token = localStorage.getItem('authToken');

     
     const response = await axios.put('http://127.0.0.1:8000/api/user/profile', userData, {
       headers: {
         'Authorization': `Bearer ${token}`, 
         'Content-Type': 'application/json',
       }
      
     });

     
     localStorage.setItem('user', JSON.stringify(userData)); 

   } catch (err) {
     console.log(err.response?.data?.message || 'An error occurred while updating the profile.');
   }
    
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
                    placeholder="Enter New name"
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
                    placeholder=""
                    disabled
                    value={userData.email}
                    className='fs-3 text-secondary'
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label className='fs-2'>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter New Password"
                    
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
