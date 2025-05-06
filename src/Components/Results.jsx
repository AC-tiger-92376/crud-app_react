import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { API_BASE_URL } from '../config';


const Results = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [age, setAge] = useState('')
  const [isCheck, setIsCheck] = useState(0)

  const [editID, setEditId] = useState('')
  const [editFname, setEditFname] = useState('')
  const [editLname, setEditLname] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editAddress, setEditAddress] = useState('')
  const [editCity, setEditCity] = useState('')
  const [editAge, setEditAge] = useState('')
  const [isEditCheck, setEditIsCheck] = useState(0)


  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckEditChange = (e) => {
    if(e.target.checked){
      setEditIsCheck(1);
    }
    else{
      setEditIsCheck(0);
    }
}

  useEffect(()=>{
    getData();
  },[])

  const getData = () => {
    axios.get(API_BASE_URL)
    .then((result)=>{
        setData(result.data)
    })
    .catch((error)=>{
        console.log(error)
    })
  }

  const handleEdit = (id) => {
    handleShow();
    axios.get(`${API_BASE_URL}/${id}`)
    .then((result)=>{
        setEditFname(result.data.firstName);
        setEditLname(result.data.lastName);
        setEditEmail(result.data.email);
        setEditAddress(result.data.address);
        setEditCity(result.data.city);
        setEditAge(result.data.age);
        setEditIsCheck(result.data.isCheck);
        setEditId(id);
    })
    .catch((error)=>{
        console.log(error)
    })
  }

  const handleUpdate = () => {
    const url = `${API_BASE_URL}/${editID}`;
    const data = {
        "Id" : editID,
        "FirstName" : editFname,
        "LastName" : editLname,
        "Email" : editEmail,
        "address" : editAddress,
        "city" : editCity,
        "Age" : editAge,
        "IsCheck" : isEditCheck
    }

    axios.put(url, data)
        .then((result)=> {
            handleClose();
            getData();
            clear();
            toast.success('Employee has been Updated');
        }).catch((error)=>{
            toast.error(error);
    })   
  }

  const handleDelete = (id) => {
    if(window.confirm("Are you sure to delete this employee") === true)
    {
        axios.delete(`${API_BASE_URL}/${id}`)
        .then((result)=>{
            if(result.status === 200)
            {
                toast.success('Employee has been Deleted');
                getData();
            }
        }).catch((error)=>{
            toast.error(error);
        })   
    } 
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

  return (
    <Container>
        <Table striped bordered hover size="sm">
              <thead>
                  <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>City</th>
                  <th>IsCheck</th>
                  <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.age}</td>
                                        <td>{item.city}</td>
                                        <td>{item.isCheck}</td>
                                        <td colSpan={2}>
                                            <Button variant="primary" onClick={()=>handleEdit(item.id)}>Edit</Button> &nbsp;
                                            <Button variant="danger" onClick={()=>handleDelete(item.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
                    }
                    
                </tbody>
        </Table>

        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Update Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" value={editFname} onChange={(e)=>setEditFname(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" value={editLname} onChange={(e)=>setEditLname(e.target.value)} />
              </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder="Enter email" value={editEmail} onChange={(e)=>setEditEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" value={editAddress} onChange={(e)=>setEditAddress(e.target.value)} />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="text" value={editAge} onChange={(e)=>setEditAge(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" value={editCity} onChange={(e)=>setEditCity(e.target.value)} />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" checked={isEditCheck === 1 ? true : false} value={isEditCheck} onChange={(e)=>handleCheckEditChange(e)}/>
              </Form.Group>             
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
    </Container>
  )
}

export default Results