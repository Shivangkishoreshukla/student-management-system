import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Subjects from './pages/Subjects';
import Instructors from './pages/Instructors';
import Enrollments from './pages/Enrollments';
import './App.css';

function App() {
  return (
    <Router>
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={2} className="sidebar-col">
            <Sidebar />
          </Col>
          <Col md={10} className="content-col">
            <div className="main-content p-4">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/enrollments" element={<Enrollments />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;