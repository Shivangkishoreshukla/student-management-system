import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setError('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/subjects', { subjectName });
      setShowModal(false);
      setSubjectName('');
      fetchSubjects();
    } catch (error) {
      console.error('Error adding subject:', error);
      setError('Failed to add subject');
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
        <h2>Subjects</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Subject
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject Name</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.SubjectID}>
              <td>{subject.SubjectID}</td>
              <td>{subject.SubjectName}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Subject</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Subject
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Subjects;