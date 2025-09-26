import React from 'react';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import he from 'he';
import { getCertificates } from '../../api/apiService';
import { motion } from 'framer-motion';
import useFetchData from '../../hooks/useFetchData';
import './CertificatesSection.css';

const CertificatesSection = () => {
  const { data: certifications, loading, error } = useFetchData(getCertificates);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="certificates">
      <Container>
        <div className="section-container-glass">
          <h2 className="display-5 fw-bold mb-5 text-center">Certifications & Credentials</h2>
          {loading ? (
            <p className="text-center">Loading certifications...</p>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div className="certificates-section-container">
              <Row xs={1} md={2} className="g-4">
                {certifications.map((cert, index) => (
                  <Col key={cert._id} className="d-flex align-items-stretch">
                    <motion.div
                      className="certificate-card h-100 w-100"
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      custom={index}
                    >
                      <FontAwesomeIcon
                        icon={faCertificate}
                        size="3x"
                        className="certificate-icon"
                      />
                      <h4 className="certificate-title">{he.decode(cert.title)}</h4>
                      <p className="certificate-issuer">Issued by: {he.decode(cert.issuer)}</p>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="credential-button"
                        >
                          View Credential <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                        </a>
                      )}
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CertificatesSection;