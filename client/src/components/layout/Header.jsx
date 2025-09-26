import React, { useState, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const navLinks = [
    { title: 'About', id: 'about' },
    { title: 'Experience', id: 'experience' },
    { title: 'Projects', id: 'projects' },
    { title: 'Achievements', id: 'achievements' },
    { title: 'Skills', id: 'skills' },
  ];

  // State to hold the position and width of the active indicator
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);

  const handleSetActive = (to) => {
    // Find the link element that corresponds to the active section
    const linkElements = Array.from(navRef.current.children);
    const targetLink = linkElements.find(
      (child) => child.getAttribute('data-to') === to
    );

    if (targetLink) {
      const { offsetLeft, offsetWidth } = targetLink;
      setIndicator({ left: offsetLeft, width: offsetWidth, opacity: 1 });
    }
  };

  const handleSetInactive = () => {
    // Optionally hide the indicator when not hovering over a link
    // For now, we'll keep it visible on the active link
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <ScrollLink
          to="home" // Assuming you have a home section with this id
          spy={true}
          smooth={true}
          duration={500}
          className="header-brand"
        >
          Amaan Ahmed Shaikh
        </ScrollLink>
        <nav className="header-nav" ref={navRef}>
          {navLinks.map((link) => (
            <ScrollLink
              key={link.id}
              to={link.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="header-nav-link"
              onSetActive={handleSetActive}
              onSetInactive={handleSetInactive}
              data-to={link.id} // Custom attribute to help find the element
            >
              {link.title}
            </ScrollLink>
          ))}
          <motion.div
            className="active-link-indicator"
            animate={indicator}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;