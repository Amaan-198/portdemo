import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getSkills, deleteSkill } from '../../api/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const SkillsListPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data } = await getSkills();
      setSkills(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch skills');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill category?')) {
      try {
        await deleteSkill(id);
        fetchSkills();
      } catch (err) {
        setError('Could not delete skill category.');
      }
    }
  };

  return (
    <Container>
      <Row className="align-items-center my-5">
        <Col>
          <h1>Manage Skills</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/skills/create">
            <Button variant="primary">
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Create Skill Category
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>CATEGORY</th>
              <th>SKILLS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id}>
                <td>{skill.title}</td>
                <td>{skill.skills.join(', ')}</td>
                <td>
                  <LinkContainer to={`/admin/skills/${skill._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-1">
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm mx-1"
                    onClick={() => deleteHandler(skill._id)}
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

export default SkillsListPage;