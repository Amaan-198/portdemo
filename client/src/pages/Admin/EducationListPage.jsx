import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getEducation, deleteEducation } from '../../api/apiService';
import he from 'he';

const EducationListPage = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const { data } = await getEducation();
      setEducationList(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch education entries');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const originalEducationList = [...educationList];
      setEducationList(educationList.filter((edu) => edu._id !== id));
      try {
        await deleteEducation(id);
      } catch (err) {
        setError('Could not delete education entry. Please try again.');
        setEducationList(originalEducationList);
      }
    }
  };

  return (
    <Container>
      <Row className="align-items-center my-5">
        <Col><h1>Manage Education</h1></Col>
        <Col className="text-end">
          <LinkContainer to="/admin/education/create">
            <Button variant="primary">Add Education</Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? <p>Loading...</p> : error ? <Alert variant="danger">{error}</Alert> : (
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>DEGREE</th>
              <th>INSTITUTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {educationList.map((edu) => (
              <tr key={edu._id}>
                <td>{he.decode(edu.degree)}</td>
                <td>{he.decode(edu.institution)}</td>
                <td>
                  <LinkContainer to={`/admin/education/${edu._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-1">Edit</Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm mx-1" onClick={() => deleteHandler(edu._id)}>
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

export default EducationListPage;