import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faProjectDiagram, faAward, faCertificate, faCode, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
    const managementSections = [
        { title: "Manage Profile", text: "Update your name, headline, and about section.", link: "/admin/profile/edit", icon: faUser },
        { title: "Manage Projects", text: "Add, edit, reorder, and delete your projects.", link: "/admin/projects", icon: faProjectDiagram },
        { title: "Manage Experience", text: "List your professional work history.", link: "/admin/experiences", icon: faBriefcase },
        { title: "Manage Achievements", text: "Showcase your awards and accomplishments.", link: "/admin/achievements", icon: faAward },
        { title: "Manage Certificates", text: "Display your professional certifications.", link: "/admin/certificates", icon: faCertificate },
        { title: "Manage Skills", text: "List your technical skills and technologies.", link: "/admin/skills", icon: faCode },
        { title: "Manage Education", text: "Outline your academic background.", link: "/admin/education", icon: faGraduationCap },
    ];

    return (
        <Container className="my-5">
            <h1 className="mb-4">Admin Dashboard</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {managementSections.map((section, index) => (
                    <Col key={index}>
                        <div className="dashboard-card">
                            <h5 className="dashboard-card-title">
                                <FontAwesomeIcon icon={section.icon} className="dashboard-card-icon" />
                                {section.title}
                            </h5>
                            <p className="dashboard-card-text">
                                {section.text}
                            </p>
                            <LinkContainer to={section.link}>
                                <Button variant="primary" className="mt-auto">Go to {section.title.split(' ')[1]}</Button>
                            </LinkContainer>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;