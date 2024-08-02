import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      setError('Passwords do not match');
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
        setError('');
        navigate('/login');
      } else {
        setError('Failed to reset password');
        setMessage('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
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
              alt="Sign up"
            />
          </Col>
          <Col lg={4} className="mb-5 mb-lg-0">
            <Card className="shadow-2-strong" style={{ borderRadius: '1rem', backdropFilter: 'blur(30px)' }}>
              <Card.Body className="p-5 shadow-5">
                <h2 className="mb-5 fw-bold text-center">RESET PASSWORD NOW</h2>
                <hr className="my-5" />
                <Form onSubmit={handleSubmit}>
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
                  <Form.Group className="mb-4">
                    <label htmlFor="typePasswordX-2 " className='fs-3 text-md-start'> Confirm Password</label>
                    <Form.Control  
                      type="password" 
                      id="typePasswordX-2" 
                      value={password_confirmation}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password" 
                      className="form-control-lg"
                    />
                  </Form.Group>
                  <hr className="my-5" />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="btn-lg btn-block fs-3 "
                    >
                      Change Password
                    </Button>
                  </div>
                </Form>
                {message && <p className="text-success mt-3">{message}</p>}
                {error && <p className="text-danger mt-3">{error}</p>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
