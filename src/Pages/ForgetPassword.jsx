import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import carImage from '../images/banners/login.jpg';

export const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forget-password', { email });
      
      if (response.status === 200) {
        setMessage('Check your email for a reset link.');
        setError('');
      }
       else {
        setError('An error occurred. Please try again.');
      }
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={6} className="mb-5 mb-lg-0">
            <img
              src={carImage}
              className="w-100 rounded-4 shadow-4"
              alt="Reset Password"
            />
          </Col>
          <Col lg={4} className="mb-5 mb-lg-0">
            <Card className="shadow" style={{ borderRadius: '1rem', backdropFilter: 'blur(30px)' }}>
              <Card.Body className="p-5 shadow-5">
                <h2 className="mb-5 fw-bold text-center">FORGOT PASSWORD</h2>
                
                {error && <Alert variant="danger" className="text-center fs-4">{error}</Alert>}
                {message && <Alert variant="success" className="text-center fs-4">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-5 fs-3">
                    <label htmlFor="typeEmailX-2" >Email</label>
                    <Form.Control 
                      type="email" 
                      id="typeEmailX-2" 
                      placeholder="Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control-lg mt-2 "
                      required
                    />
                    
                    

                  </Form.Group>
                  
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      style={{backgroundColor: "#ff4d30" ,border:"none" ,fontWeight:"700"}}
                      className="btn-lg btn-block w-100 fs-3 py-3 "
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
