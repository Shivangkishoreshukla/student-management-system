import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    subjects: 0,
    instructors: 0,
    enrollments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [studentsRes, coursesRes, subjectsRes, instructorsRes, enrollmentsRes] = await Promise.all([
        api.get('/students'),
        api.get('/courses'),
        api.get('/subjects'),
        api.get('/instructors'),
        api.get('/enrollments')
      ]);

      setStats({
        students: studentsRes.data.length,
        courses: coursesRes.data.length,
        subjects: subjectsRes.data.length,
        instructors: instructorsRes.data.length,
        enrollments: enrollmentsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
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
      <h2 className="mb-4">Dashboard</h2>
      <p className="text-muted mb-4">Welcome to the Student Management System</p>
      
      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <h1 className="display-4 text-primary">{stats.students}</h1>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Courses</Card.Title>
              <h1 className="display-4 text-success">{stats.courses}</h1>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Subjects</Card.Title>
              <h1 className="display-4 text-info">{stats.subjects}</h1>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Instructors</Card.Title>
              <h1 className="display-4 text-warning">{stats.instructors}</h1>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Enrollments</Card.Title>
              <h1 className="display-4 text-danger">{stats.enrollments}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;