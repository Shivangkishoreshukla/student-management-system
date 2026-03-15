import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    enrollmentDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [enrollmentsRes, studentsRes, coursesRes] = await Promise.all([
        api.get('/enrollments'),
        api.get('/students'),
        api.get('/courses')
      ]);
      
      setEnrollments(enrollmentsRes.data);
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/enrollments', formData);
      setShowModal(false);
      setFormData({
        studentId: '',
        courseId: '',
        enrollmentDate: new Date().toISOString().split('T')[0]
      });
      fetchData();
    } catch (error) {
      console.error('Error adding enrollment:', error);
      setError('Failed to add enrollment');
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
        <h2>Enrollments</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          New Enrollment
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Enrollment Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment, index) => (
            <tr key={index}>
              <td>{enrollment.Student}</td>
              <td>{enrollment.CourseName}</td>
              <td>{new Date(enrollment.EnrollmentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Enrollment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.StudentID} value={student.StudentID}>
                    {student.Name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.CourseID} value={course.CourseID}>
                    {course.CourseName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Enrollment Date</Form.Label>
              <Form.Control
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Enroll Student
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Enrollments;