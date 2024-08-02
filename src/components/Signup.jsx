import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import carImage from '../images/banners/signup.jpg'

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''

  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData
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
    ).then((res) => {
      if (res.status == 201) {
        console.log("Registration Successfull, Please Login.");

      } else {
        console.log("Registration failed. Please Try Again1.");
      }
    })
      .catch((e) => {
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

      <Container className="py-5 h-100 ">
        <Row className="d-flex h-100 align-items-center justify-content-center ">
          <Col lg={4} className="mb-5 mb-lg-0 ">
            <Card className="shadow" style={{ backdropFilter: 'blur(30px)',  borderRadius: '1rem' }}>
              <Card.Body className="p-5 shadow-5 ">
                <h2 className="fw-bold  text-center">SIGN UP NOW</h2>
                <hr className="my-5" />
                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-4 fs-3" controlId="formName">
                    <label>Name</label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      className="form-control-lg"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </Form.Group>

                  <Form.Group className="mb-4 fs-3" controlId="formEmail">
                    <label>Email</label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="form-control-lg"
                      placeholder="Enter Your Email address"
                      value={formData.email}
                      onChange={handleChange}
                    />

                  </Form.Group>

                  <Form.Group className="mb-4 fs-3" controlId="formPassword">
                    <label>Password</label>
                    <Form.Control
                      type="password"
                     className="form-control-lg"
                      name="password"
                      placeholder="Enter Your Password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                  </Form.Group>

                  {/* <Form.Check
                    type="checkbox"
                    name="subscribe"
                    id="formNewsletter"
                    label="Subscribe to our newsletter"
                    className="d-flex justify-content-center mb-4"
                    checked={formData.subscribe}
                    onChange={handleChange}
                  /> */}
                  <div className='fs-4 text-end'>
                    <p >Already have an account? <Link to='/login'>Login</Link></p>
                  </div>

                  <hr className="my-5" />

                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button variant="primary" type="submit" className="btn-block  fs-3">
                      Sign up
                    </Button>
                  </div>

                  {/* <div className="text-center">
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
                  </div> */}
                </Form>
                {responseMessage && <p>{responseMessage}</p>}
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
