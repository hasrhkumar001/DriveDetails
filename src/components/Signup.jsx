import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import carImage from '../images/banners/signup.jpg';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage('Registration Successful, Redirecting to Login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setResponseMessage('Registration failed. Please try again22.');
      }
    } catch (error) {
      console.error('Registration error: ', error);
      setResponseMessage('Registration failed. Please try again333.');
    }
  };

  return (
    <section className="text-center text-lg-start">
      <style>
        {`
          .cascading-right {
            margin-right: -50px;
          }
          @media (max-width: 991.98px) {
            .cascading-right {
              margin-right: 0;
            }
          }
        `}
      </style>

      <Container className="py-5 h-100">
        <Row className="d-flex h-100 align-items-center justify-content-center">
          <Col lg={4} className="mb-5 mb-lg-0">
            <Card className="shadow" style={{ backdropFilter: 'blur(30px)', borderRadius: '1rem' }}>
              <Card.Body className="p-5 shadow-5">
                <h2 className="fw-bold text-center mb-5">SIGN UP </h2>
                
                {responseMessage && <p className='text-center fs-4 text-secondary'>{responseMessage}</p>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4 fs-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-control-lg mt-2"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4 fs-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="form-control-lg mt-2"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-5 fs-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      className="form-control-lg mt-2"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  
                  
                  

                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button variant="primary" type="submit" style={{ backgroundColor: "#ff4d30", border: "none", fontWeight: "700" }} className="btn-block py-3 w-100 fs-3">
                      Sign up
                    </Button>
                  </div>
                  <div className="fs-4 text-center my-4">
                    <p>Already have an account? <Link className="text-decoration-none" style={{ color: "#ff4d30" }} to='/login'>Login</Link></p>
                  </div>
                </Form>
                
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-5 mb-lg-0">
            <img
              src={carImage}
              className="w-100 rounded-4 shadow-4"
              alt="Sign up"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
