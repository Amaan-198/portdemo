import React from 'react';
import AnimatedHero from '../components/sections/AnimatedHero';
import ExperienceSection from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import CertificatesSection from '../components/sections/CertificatesSection';
import SkillsSection from '../components/sections/SkillsSection';
import EducationSection from '../components/sections/EducationSection';

const HomePage = () => {
  return (
    <div>
      <AnimatedHero />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <CertificatesSection />
      <SkillsSection />
      <EducationSection />
    </div>
  );
};

export default HomePage;