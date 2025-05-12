import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { API_AUTH_URL } from '../config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Added for navigation


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Added for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_AUTH_URL}/Login`, formData);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate('/'); // Redirect to WelcomePage

    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };
  const handleRegister =  () => {
    
      navigate('/signup'); // Redirect to Login page
   
  };


  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="primary" onClick={handleRegister} >
            Register
        </Button>
      </Form>
    </Container>
  );
};

export default Login;