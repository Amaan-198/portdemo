import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import he from 'he';
import './HeroSection.css';
import { getProfile } from '../../api/apiService';

const HeroSection = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await getProfile();
                setProfile(data);
                setLoading(false);
            } catch (err) {
                setError('Could not fetch profile data.');
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);
    
    if (loading) return <div className="text-center p-5"><p>Loading profile...</p></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container fluid id="home" className="hero-section-container bg-light py-5">
            <div className="hero-shape"></div>
            <Container>
                <Row className="align-items-center">
                    <Col md={7} className="text-center">
                        <h1 className="display-4 fw-bold">{profile?.name ? he.decode(profile.name) : 'Your Name'}</h1>
                        <p className="lead text-muted">
                            {profile?.headline ? he.decode(profile.headline) : 'Your Professional Headline'}
                        </p>
                        <div>
                            <Button
                                variant="primary"
                                size="lg"
                                className="m-2"
                                href={profile?.resumeUrl}
                                download
                            >
                                Download Resume
                            </Button>
                        </div>
                        <div className="mt-3">
                            <a href="https://www.linkedin.com/in/amaanahmed8097" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                            <a href="mailto:shaikhamaanahmed@gmail.com" className="text-dark me-3">
                                <FontAwesomeIcon icon={faEnvelope} size="2x" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark">
                                <FontAwesomeIcon icon={faGithub} size="2x" />
                            </a>
                        </div>
                    </Col>
                    
                    <Col md={5} className="mt-4 mt-md-0 d-flex justify-content-center">
                        <Image
                            src={profile?.profilePhoto || 'https://via.placeholder.com/300'}
                            roundedCircle
                            className="hero-image shadow"
                        />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default HeroSection;