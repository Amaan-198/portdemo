import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGraduationCap,
    faTachometerAlt,
    faBriefcase,
    faProjectDiagram,
    faCertificate,
    faLaptopCode,
    faTrophy // <-- NEW: Import the trophy icon
} from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
    return (
        <Nav className="flex-column bg-light vh-100 p-3 shadow-sm">
            <h4 className="mb-4">Admin Menu</h4>
            <LinkContainer to="/admin/dashboard">
                <Nav.Link>
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    Dashboard
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/projects">
                <Nav.Link>
                    <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
                    Manage Projects
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/experiences">
                <Nav.Link>
                    <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                    Manage Experience
                </Nav.Link>
            </LinkContainer>
            {/* <-- NEW: Add the Achievements link --> */}
            <LinkContainer to="/admin/achievements">
                <Nav.Link>
                    <FontAwesomeIcon icon={faTrophy} className="me-2" />
                    Manage Achievements
                </Nav.Link>
            </LinkContainer>
            {/* <-- Existing links --> */}
            <LinkContainer to="/admin/certificates">
                <Nav.Link>
                    <FontAwesomeIcon icon={faCertificate} className="me-2" />
                    Manage Certificates
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/skills">
                <Nav.Link>
                    <FontAwesomeIcon icon={faLaptopCode} className="me-2" />
                    Manage Skills
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/education">
                <Nav.Link>
                    <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
                    Manage Education
                </Nav.Link>
            </LinkContainer>
        </Nav>
    );
};

export default AdminSidebar;