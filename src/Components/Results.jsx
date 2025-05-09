import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Col, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { API_BASE_URL } from '../config';

const Results = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sortConfig, setSortConfig] = useState({ key: 'firstname', direction: 'asc' });
  const [totalPages, setTotalPages] = useState(1);

  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage, rowsPerPage, sortConfig]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        params: {
          search: searchTerm,
          sort: sortConfig.key,
          order: sortConfig.direction,
          page: currentPage,
          pageSize: rowsPerPage,
        },
      });
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.total / rowsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handleEdit = (item) => {
    setEditData(item);
    handleShow();
  };

  const handleUpdate = async () => {
    try {
      const url = `${API_BASE_URL}/${editData.id}`;
      await axios.put(url, editData);
      handleClose();
      fetchData();
      toast.success('Employee has been updated');
    } catch (error) {
      toast.error('Failed to update employee');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        fetchData();
        toast.success('Employee has been deleted');
      } catch (error) {
        toast.error('Failed to delete employee');
      }
    }
  };

  return (
    <Container>
      <Form.Control
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th onClick={() => handleSort('firstname')}>First Name</th>
            <th onClick={() => handleSort('lastname')}>Last Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('address')}>Address</th>
            <th onClick={() => handleSort('age')}>Age</th>
            <th onClick={() => handleSort('city')}>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.age}</td>
                <td>{item.city}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEdit(item)}>Edit</Button> &nbsp;
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "primary" : "outline-primary"}
            onClick={() => setCurrentPage(index + 1)}
            className="mx-1"
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.firstName || ''}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.lastName || ''}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editData.email || ''}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={editData.address || ''}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={editData.age || ''}
                  onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.city || ''}
                  onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Container>
  );
};

export default Results;