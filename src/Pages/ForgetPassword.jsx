import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import carImage from '../images/banners/login.jpg';

export const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate to redirect after successful submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forget-password', { email });
      setMessage('Check your email for further instructions.');
      setError('');
      // Optionally redirect to another page or perform other actions
      // navigate('/another-page');
    } catch (error) {
      setError('An error occurred. Please try again.');
      setMessage('');
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
            <Card className="shadow-2-strong" style={{ borderRadius: '1rem', backdropFilter: 'blur(30px)' }}>
              <Card.Body className="p-5 shadow-5">
                <h2 className="mb-5 fw-bold text-center">FORGOT PASSWORD</h2>
                <hr className="my-5" />
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <label htmlFor="typeEmailX-2" className='fs-3 text-md-start'>Email</label>
                    <Form.Control 
                      type="email" 
                      id="typeEmailX-2" 
                      placeholder="Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control-lg"
                      required
                    />
                    {message && <p className="text-success mt-3">{message}</p>}
                    {error && <p className="text-danger mt-3">{error}</p>}

                  </Form.Group>
                  <hr className="my-5" />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="btn-lg btn-block fs-3 "
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
