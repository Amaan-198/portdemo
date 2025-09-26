import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Admin/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import ProjectListPage from './pages/Admin/ProjectListPage';
import ProjectCreatePage from './pages/Admin/ProjectCreatePage';
import ProjectEditPage from './pages/Admin/ProjectEditPage';
import ExperienceListPage from './pages/Admin/ExperienceListPage';
import ExperienceCreatePage from './pages/Admin/ExperienceCreatePage';
import ExperienceEditPage from './pages/Admin/ExperienceEditPage';
import AchievementListPage from './pages/Admin/AchievementListPage';
import AchievementCreatePage from './pages/Admin/AchievementCreatePage';
import AchievementEditPage from './pages/Admin/AchievementEditPage';
import CertificatesListPage from './pages/Admin/CertificatesListPage';
import CertificatesCreatePage from './pages/Admin/CertificatesCreatePage';
import CertificatesEditPage from './pages/Admin/CertificatesEditPage';
import SkillsListPage from './pages/Admin/SkillsListPage';
import SkillsCreatePage from './pages/Admin/SkillsCreatePage';
import SkillsEditPage from './pages/Admin/SkillsEditPage';
import ProfileEditPage from './pages/Admin/ProfileEditPage';
import EducationListPage from './pages/Admin/EducationListPage';
import EducationCreatePage from './pages/Admin/EducationCreatePage';
import EducationEditPage from './pages/Admin/EducationEditPage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: '1' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Private Admin Routes */}
            <Route path="/admin" element={<PrivateRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<ProjectListPage />} />
                <Route path="projects/create" element={<ProjectCreatePage />} />
                <Route path="projects/:id/edit" element={<ProjectEditPage />} />
                <Route path="experiences" element={<ExperienceListPage />} />
                <Route path="experiences/create" element={<ExperienceCreatePage />} />
                <Route path="experiences/:id/edit" element={<ExperienceEditPage />} />
                <Route path="achievements" element={<AchievementListPage />} />
                <Route path="achievements/create" element={<AchievementCreatePage />} />
                <Route path="achievements/:id/edit" element={<AchievementEditPage />} />
                <Route path="certificates" element={<CertificatesListPage />} />
                <Route path="certificates/create" element={<CertificatesCreatePage />} />
                <Route path="certificates/:id/edit" element={<CertificatesEditPage />} />
                <Route path="skills" element={<SkillsListPage />} />
                <Route path="skills/create" element={<SkillsCreatePage />} />
                <Route path="skills/:id/edit" element={<SkillsEditPage />} />
                <Route path="profile/edit" element={<ProfileEditPage />} />
                <Route path="education" element={<EducationListPage />} />
                <Route path="education/create" element={<EducationCreatePage />} />
                <Route path="education/:id/edit" element={<EducationEditPage />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;