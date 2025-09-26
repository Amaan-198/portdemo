import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Dashboard = () => {
    return (
        <Container className="my-5">
            <h1 className="mb-4">Admin Dashboard</h1>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Manage Profile</Card.Title>
                            <Card.Text>
                                Update your personal details, professional headline, and About Me section.
                            </Card.Text>
                            <LinkContainer to="/admin/profile/edit">
                                <Button variant="primary">Edit Profile</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;