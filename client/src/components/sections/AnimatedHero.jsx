import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion, useScroll, useTransform } from 'framer-motion';
import he from 'he';
import { getProfile } from '../../api/apiService';
import './AnimatedHero.css';

const AnimatedContent = ({ profile }) => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
    const introOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const introScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
    const aboutOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
    const aboutScale = useTransform(scrollYProgress, [0.25, 0.5], [0.95, 1]);

    return (
        <div ref={targetRef} id="home" className="animated-hero-container">
            <div className="sticky-wrapper">
                <motion.div className="background-image-container" style={{ y: backgroundY }}>
                    <div
                        className="sticky-background"
                        style={{ backgroundImage: `url(${profile?.profilePhoto || 'https://picsum.photos/seed/picsum/1920/1080'})` }}
                    />
                </motion.div>
                
                <div className="content-container">
                    <motion.div className="text-section" style={{ opacity: introOpacity, scale: introScale }}>
                        <Container>
                            <h1 className="display-1 fw-bold text-shadow">
                                {profile?.name ? he.decode(profile.name) : 'Your Name'}
                            </h1>
                            <p className="lead fs-2 text-shadow">
                                {profile?.headline ? he.decode(profile.headline) : 'Your Professional Headline'}
                            </p>
                            <div className="mt-4 social-icons">
                                <a href="https://www.linkedin.com/in/amaanahmed8097" target="_blank" rel="noopener noreferrer" className="me-4">
                                    <FontAwesomeIcon icon={faLinkedin} size="3x" />
                                </a>
                                <a href="mailto:shaikhamaanahmed@gmail.com" className="me-4">
                                    <FontAwesomeIcon icon={faEnvelope} size="3x" />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} size="3x" />
                                </a>
                            </div>
                            <div className="mt-4">
                                <Button
                                    variant="outline-light"
                                    size="lg"
                                    href={profile?.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download Resume
                                </Button>
                            </div>
                        </Container>
                    </motion.div>
                
                    <motion.div id="about" className="text-section" style={{ opacity: aboutOpacity, scale: aboutScale }}>
                        <Container className="about-content">
                            <h2 className="display-4 fw-bold">About Me</h2>
                            <hr className="my-4" style={{ width: '60px', height: '3px', margin: 'auto', opacity: 1 }} />
                            <p className="lead">
                                {profile?.about ? he.decode(profile.about) : ''}
                            </p>
                        </Container>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const AnimatedHero = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (loading) return <div style={{height: '100vh'}}><p className="text-center p-5">Loading...</p></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return <AnimatedContent profile={profile} />;
};

export default AnimatedHero;