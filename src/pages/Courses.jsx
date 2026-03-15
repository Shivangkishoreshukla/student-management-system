import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses', { courseName });
      setShowModal(false);
      setCourseName('');
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
      setError('Failed to add course');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        setError('Failed to delete course');
      }
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
        <h2>Courses</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Course
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.CourseID}>
              <td>{course.CourseID}</td>
              <td>{course.CourseName}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(course.CourseID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Course
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Courses;