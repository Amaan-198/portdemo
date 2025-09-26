import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { getCertificates } from '../../api/apiService';

const CertificatesSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const { data } = await getCertificates();
        setCertifications(data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch certifications.');
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <Container id="certificates" className="my-5 py-5">
      <h2 className="display-5 fw-bold mb-5">Certifications & Credentials</h2>
      {loading ? (
        <p>Loading certifications...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {certifications.map((cert, index) => (
            <div key={index} className="d-flex align-items-start mb-4">
              <FontAwesomeIcon
                icon={faCertificate}
                size="2x"
                className="text-primary me-4 mt-1"
              />
              <div>
                <h4 className="fw-bold">{cert.title}</h4>
                <p className="text-muted mb-2">Issued by: {cert.issuer}</p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Credential
                </Button>
              </div>
            </div>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CertificatesSection;