import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getCertificates, deleteCertificate } from '../../api/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import he from 'he';

const CertificatesListPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const { data } = await getCertificates();
      setCertificates(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch certificates');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const originalCertificates = [...certificates];
      setCertificates(certificates.filter((cert) => cert._id !== id));
      try {
        await deleteCertificate(id);
      } catch (err) {
        setError('Could not delete certificate. Please try again.');
        setCertificates(originalCertificates);
      }
    }
  };

  return (
    <Container>
      <Row className="align-items-center my-5">
        <Col>
          <h1>Manage Certificates</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/certificates/create">
            <Button variant="primary">
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Create Certificate
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>ISSUER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert._id}>
                <td>{he.decode(cert.title)}</td>
                <td>{he.decode(cert.issuer)}</td>
                <td>
                  <LinkContainer to={`/admin/certificates/${cert._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-1">
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm mx-1"
                    onClick={() => deleteHandler(cert._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CertificatesListPage;