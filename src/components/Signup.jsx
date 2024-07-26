import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subscribe: false
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res)=>{
          if(res.status == 201){
              console.log("Registration Successfull, Please Login.");
              
          }else{
            console.log("Registration failed. Please Try Again1.");
          }
      })
      .catch((e)=>{
          console.error('registration error: ', e);
          console.error("Registration failed. Please Try Again2.");
      });
    //   setResponseMessage('Signup successful!');
    // }.catch (error) {
    //   setResponseMessage('Signup failed. Please try again.');
    //   console.error(error);
    // }}
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

      <Container className="py-4">
        <Row className="g-0 align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <Card className="cascading-right bg-body-tertiary" style={{ backdropFilter: 'blur(30px)' }}>
              <Card.Body className="p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formName">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <Form.Label>Name</Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Form.Label>Email address</Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Form.Label>Password</Form.Label>
                  </Form.Group>

                  <Form.Check
                    type="checkbox"
                    name="subscribe"
                    id="formNewsletter"
                    label="Subscribe to our newsletter"
                    className="d-flex justify-content-center mb-4"
                    checked={formData.subscribe}
                    onChange={handleChange}
                  />

                  <Button variant="primary" type="submit" className="btn-block mb-4">
                    Sign up
                  </Button>

                  <div className="text-center">
                    <p>or sign up with:</p>
                    <Button variant="link" className="btn-floating mx-1">
                      <i className="fab fa-facebook-f"></i>
                    </Button>
                    <Button variant="link" className="btn-floating mx-1">
                      <i className="fab fa-google"></i>
                    </Button>
                    <Button variant="link" className="btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button variant="link" className="btn-floating mx-1">
                      <i className="fab fa-github"></i>
                    </Button>
                  </div>
                </Form>
                {responseMessage && <p>{responseMessage}</p>}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="mb-5 mb-lg-0">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              className="w-100 rounded-4 shadow-4"
              alt="Sign up"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
