import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Card, Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import carImage from '../images/banners/login.jpg';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const validatePassword = (password) => {
    // Basic password validation: at least 8 characters long
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validate token and email presence
    if (!token || !email) {
      setError('Invalid or expired link.');
      return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Validate password confirmation
    if (password !== password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
        token,
        email,
        password,
        password_confirmation
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setMessage('Password reset successfully');
        navigate('/login');
      } else {
        setError('Failed to reset password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
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
                <h2 className="mb-5 fw-bold text-center">RESET PASSWORD NOW</h2>
                {error && <Alert variant="danger" className="text-center fs-4">{error}</Alert>}
                {message && <Alert variant="success" className="text-center fs-4">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <label htmlFor="password" className='fs-3 text-md-start'>Password</label>
                    <Form.Control  
                      type="password" 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" 
                      className="form-control-lg mt-2"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <label htmlFor="password_confirmation" className='fs-3 text-md-start'>Confirm Password</label>
                    <Form.Control  
                      type="password" 
                      id="password_confirmation" 
                      value={password_confirmation}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password" 
                      className="form-control-lg mt-2"
                      required
                    />
                  </Form.Group>
                 
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      style={{backgroundColor: "#ff4d30", border:"none", fontWeight:"700"}}
                      className="btn-lg btn-block w-100 fs-3 py-3"
                    >
                      Change Password
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
