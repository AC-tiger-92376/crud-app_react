import React from 'react'
import { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { API_BASE_URL } from '../config';

const FormComponent = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [age, setAge] = useState('')
  const [isCheck, setIsCheck] = useState(0)

  const [data, setData] = useState([]);
/*
  useEffect(()=>{
    getData();
  },[])
*/
  const getData = () => {
    axios.get(API_BASE_URL)
    .then((result)=>{
        setData(result.data)
    })
    .catch((error)=>{
        console.log(error)
    })
  }

  const handleSave = () => {
    const url = API_BASE_URL;
    const data = {
        "FirstName" : fname,
        "LastName" : lname,
        "Email" : email,
        "Address" : address,
        "City" : city,
        "Age" : age,
        "IsCheck" : isCheck
    }
    axios.post(url, data)
    .then((result)=>{
        getData();
        clear();
        toast.success('Employee has been added');
    }).catch((error)=>{
        toast.error(error);
    })
  }

  const clear = () => {
    setFname('');
    setLname('');
    setEmail('');
    setAddress('');
    setCity('');
    setAge('');
    setIsCheck('0');
  }

  const handleCheckChange = (e) => {
    if(e.target.checked){
      setIsCheck(1);
    }
    else{
      setIsCheck(0);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSave();
  }

  return (
    <div>
      <Container>
        <Form onSubmit={handleFormSubmit}>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" value={fname} onChange={(e)=>setFname(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Last Name" value={lname} onChange={(e)=>setLname(e.target.value)} />
          </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" value={address} onChange={(e)=>setAddress(e.target.value)} />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" value={age} onChange={(e)=>setAge(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={city} onChange={(e)=>setCity(e.target.value)} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" checked={isCheck === 1 ? true : false} value={setIsCheck} onChange={(e)=>handleCheckChange(e)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <ToastContainer />
        </Container>
    </div>
  )
}

export default FormComponent