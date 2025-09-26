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

    const backgroundY = useTransform(scrollYProgress, [0.3, 1], ['0%', '-50%']);
    const introOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const introScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    const aboutOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.8, 0.95], [0, 1, 1, 0]);
    const aboutPointerEvents = useTransform(scrollYProgress, [0.2, 0.3], ['none', 'auto']);

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
                                {profile?.linkedinUrl && (
                                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="me-4">
                                        <FontAwesomeIcon icon={faLinkedin} size="3x" />
                                    </a>
                                )}
                                {profile?.email && (
                                    <a href={`mailto:${profile.email}`} className="me-4">
                                        <FontAwesomeIcon icon={faEnvelope} size="3x" />
                                    </a>
                                )}
                                {profile?.githubUrl && (
                                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faGithub} size="3x" />
                                    </a>
                                )}
                            </div>
                            <div className="mt-4">
                                {profile?.resumeUrl && (
                                    <Button
                                        variant="outline-light"
                                        size="lg"
                                        href={profile.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download Resume
                                    </Button>
                                )}
                            </div>
                        </Container>
                    </motion.div>
                
                    <motion.div id="about" className="text-section" style={{ opacity: aboutOpacity, pointerEvents: aboutPointerEvents }}>
                        <motion.div
                            className="bento-grid-container"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.div className="bento-card card-intro" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                                <img src={profile?.profilePhoto || "https://via.placeholder.com/150"} alt="Headshot" className="headshot" />
                                <h3>Hello, I’m {profile?.name ? he.decode(profile.name).split(' ')[0] : 'Amaan'}</h3>
                            </motion.div>
                            <motion.div className="bento-card card-narrative" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                                <h4>My Journey</h4>
                                <p>
                                    {profile?.aboutNarrative || "A passionate developer with a knack for creating dynamic and intuitive web applications. My journey in tech is driven by a love for problem-solving and a desire to build things that make a difference."}
                                </p>
                            </motion.div>
                            <motion.div className="bento-card card-skills" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                                <h4>Core Skills</h4>
                                <ul>
                                    {profile?.aboutSkills && profile.aboutSkills.length > 0 ? (
                                        profile.aboutSkills.map((skill, index) => <li key={index}>{skill}</li>)
                                    ) : (
                                        <>
                                            <li>React</li>
                                            <li>Node.js</li>
                                            <li>Express</li>
                                            <li>MongoDB</li>
                                            <li>JavaScript</li>
                                        </>
                                    )}
                                </ul>
                            </motion.div>
                        </motion.div>
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