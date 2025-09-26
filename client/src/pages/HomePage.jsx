import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import CertificatesSection from '../components/sections/CertificatesSection';
import SkillsSection from '../components/sections/SkillsSection';
import EducationSection from '../components/sections/EducationSection'; // Import the new section

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <CertificatesSection />
      <SkillsSection />
      <EducationSection /> {/* Add it here */}
    </div>
  );
};

export default HomePage;