import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiBook, 
  FiBookOpen, 
  FiUserPlus, 
  FiClipboard 
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/students', label: 'Students', icon: FiUsers },
    { path: '/courses', label: 'Courses', icon: FiBook },
    { path: '/subjects', label: 'Subjects', icon: FiBookOpen },
    { path: '/instructors', label: 'Instructors', icon: FiUserPlus },
    { path: '/enrollments', label: 'Enrollments', icon: FiClipboard },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>SMS Admin</h3>
      </div>
      <Nav className="flex-column">
        {navItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={NavLink}
            to={item.path}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <item.icon className="nav-icon" />
            <span>{item.label}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;