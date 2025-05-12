import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { API_AUTH_URL } from '../config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Added for navigation


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    passwordhash: '',
  });
  const navigate = useNavigate(); // Added for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_AUTH_URL}/Register`, formData);
      toast.success('Registration successful! You can now log in.');
      navigate('/login'); // Redirect to Login page

    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
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
            name="passwordhash"
            placeholder="Enter password"
            value={formData.passwordhash}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;