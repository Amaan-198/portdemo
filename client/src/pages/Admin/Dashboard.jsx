import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faProjectDiagram, faAward, faCertificate, faCode, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

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
                        <Card className="h-100">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>
                                    <FontAwesomeIcon icon={section.icon} className="me-2" />
                                    {section.title}
                                </Card.Title>
                                <Card.Text className="flex-grow-1">
                                    {section.text}
                                </Card.Text>
                                <LinkContainer to={section.link}>
                                    <Button variant="primary" className="mt-auto">Go to {section.title.split(' ')[1]}</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;