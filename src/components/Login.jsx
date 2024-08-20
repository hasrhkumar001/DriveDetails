import React, { useContext, useState } from 'react';
import { Form, Button, Col, Row, Container, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import carImage from '../images/banners/login.jpg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/auth/login', { email, password })
        .then((res) => {
          if (res.status === 200) {
            const { access_token, user } = res.data;
            login(access_token, user);
            console.log('Login successful');
            navigate('/'); // Redirect to the home page
          } else {
            console.log('User does not exist');
            setMessage('Invalid credentials. Please try again.');
          }
        })
        .catch((err) => {
          console.log("Error=>", err);
          setMessage('Invalid credentials. Please try again.');
        });
    } catch (error) {
      console.error('There was a login error!', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const userData = jwtDecode(token);
      console.log(userData);
      const res = await axios.post('http://127.0.0.1:8000/api/auth/google', { userData });

      if (res.status === 200) {
        const { access_token, user } = res.data;
        login(access_token, user);
        navigate('/');
      } else {
        console.log('User creation or login failed');
        setMessage('Failed to authenticate with Google. Please try again.');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setMessage('An error occurred with Google login. Please try again.');
    }
  };

  return (
    <Container className="py-5 h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col lg={6} className="mb-5 mb-lg-0">
          <img
            src={carImage}
            className="w-100 rounded-4 shadow-4"
            alt="Sign up"
          />
        </Col>
        <Col lg={4} className="mb-5 mb-lg-0">
          <Card className="shadow" style={{ borderRadius: '1rem', backdropFilter: 'blur(30px)' }}>
            <Card.Body className="p-5 shadow-5">
              <h2 className="mb-5 fw-bold text-center">SIGN IN</h2>
              
              {message && <Alert variant="danger" className="text-center fs-4">{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4 fs-3">
                  <label htmlFor="typeEmailX-2" className=' text-md-start'>Email</label>
                  <Form.Control 
                    type="email" 
                    id="typeEmailX-2" 
                    placeholder="Email" 
                    value={email}
                    className="form-control-lg mt-2"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: '' });
                    }}
                    className="form-control-lg mt-2"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4 fs-3">
                  <label htmlFor="typePasswordX-2 " className=' text-md-start'>Password</label>
                  <Form.Control  
                    type="password" 
                    id="typePasswordX-2" 
                    value={password}
                    className="form-control-lg mt-2"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: '' });
                    }}
                    placeholder="Password" 
                    className="form-control-lg mt-2"
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className='fs-4 text-end mb-4'>
                  <p>Forget Password? <Link className='text-decoration-none' style={{color: "#ff4d30"}} to='/forget-password'>Click here</Link></p>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ backgroundColor: "#ff4d30", border: "none", fontWeight: "700" }}
                    className="btn-lg btn-block w-100 fs-3 py-3"
                  >
                    Login
                  </Button>
                </div>

                <div className='fs-4 my-4 text-center'>
                  <p>Don't have an account? <Link className='text-decoration-none' style={{color: "#ff4d30"}} to='/signup'>Register</Link></p>
                </div>

                <div className='d-flex my-4 justify-content-center align-items-baseline text-secondary'>
                  <hr className='w-25'/>
                  <p className='text-center fw-bold mx-2'>Or</p>
                  <hr className='w-25'/>
                </div>

                <div className='d-flex justify-content-center mb-3'>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
