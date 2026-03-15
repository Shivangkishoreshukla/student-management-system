import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [instructorName, setInstructorName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await api.get('/instructors');
      setInstructors(response.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      setError('Failed to load instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/instructors', { instructorName });
      setShowModal(false);
      setInstructorName('');
      fetchInstructors();
    } catch (error) {
      console.error('Error adding instructor:', error);
      setError('Failed to add instructor');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Instructors</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Instructor
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Instructor Name</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.InstructorID}>
              <td>{instructor.InstructorID}</td>
              <td>{instructor.InstructorName}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Instructor</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Instructor Name</Form.Label>
              <Form.Control
                type="text"
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Instructor
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Instructors;