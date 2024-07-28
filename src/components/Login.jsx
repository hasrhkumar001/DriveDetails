import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroPages from './HeroPages';
import axios from 'axios';
import carImage from '../images/banners/login.jpg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
       await axios.post('http://127.0.0.1:8000/api/auth/login', { email, password }).then((res)=>{
        console.log("Response", res?.data);

        if (res.status === 200) {
          // Assuming the token is returned in response.data.token
          localStorage.setItem('authToken', res?.data.access_token); // Store token in local storage
        
          console.log('Login successfully');
          navigate('/'); // Redirect to the home page
        } else {
          console.log('User does not exist');
          setMessage('Invalid credentials. Please try again.');
        }
       }).catch((err)=>{
        console.log("Error=>",err)  
    });
     
    } catch (error) {
      console.error('There was a login error!', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* <HeroPages name="Login Page" /> */}
      {/* <section className="vh-100" style={{ backgroundColor: '#508bfc' }}> */}
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
              <Card className="shadow-2-strong" style={{ borderRadius: '1rem',  backdropFilter: 'blur(30px)' }}>
                <Card.Body className="p-5  shadow-5">
                  <h2 className="mb-5 fw-bold text-center">SIGN IN NOW</h2>
                  <hr className="my-5" />
                  <Form onSubmit={handleSubmit}>
                    {/* Email input */}
                    <Form.Group className="mb-4">
                    <label htmlFor="typeEmailX-2" className='fs-3 text-md-start'>Email</label>
                      <Form.Control 
                        type="email" 
                        id="typeEmailX-2" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control-lg"
                      />
                      
                    </Form.Group>

                    {/* Password input */}
                    <Form.Group className="mb-4">
                    <label htmlFor="typePasswordX-2 " className='fs-3 text-md-start'>Password</label>
                      <Form.Control  
                        type="password" 
                        id="typePasswordX-2" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                        className="form-control-lg"
                      />
                      
                    </Form.Group>

                    

                    <div className='fs-4 text-end'>
                      <p >Don't have an account? <Link to='/signup'>Register</Link></p>
                    </div>

                    <hr className="my-5" />

                    {/* Login button */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="btn-lg btn-block  fs-3 "
                    >
                      Login
                    </Button>
                    </div>
{/* 
                    <hr className="my-4" /> */}

                    {/* Social login buttons */}
                    {/* <Button 
                      variant="danger" 
                      type="button" 
                      className="btn-lg btn-block mb-2"
                      style={{ backgroundColor: '#dd4b39' }}
                    >
                      <i className="fab fa-google me-2"></i> Sign in with Google
                    </Button>

                    <Button 
                      variant="primary" 
                      type="button" 
                      className="btn-lg btn-block"
                      style={{ backgroundColor: '#3b5998' }}
                    >
                      <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                    </Button> */}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            
          </Row>
        </Container>
      {/* </section> */}
    </>
  );
};
