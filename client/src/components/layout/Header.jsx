import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll'; // Import the Link component from react-scroll

const Header = () => {
  // This data will eventually come from your CMS
  const navLinks = [
    { title: 'About', id: 'about' },
    { title: 'Experience', id: 'experience' },
    { title: 'Projects', id: 'projects' },
    { title: 'Achievements', id: 'achievements' },
    { title: 'Skills', id: 'skills' },
  ];

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="home" spy={true} smooth={true} duration={500} style={{cursor: 'pointer'}}>
          Amaan Ahmed Shaikh
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            {navLinks.map((link) => (
              <Nav.Link as={Link}
                key={link.id}
                to={link.id} // This 'to' prop matches the 'id' of our section containers
                spy={true}
                smooth={true}
                offset={-70} // Adjusts scroll position to account for the navbar height
                duration={500}
                className="mx-2"
                style={{cursor: 'pointer'}}
              >
                {link.title}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;