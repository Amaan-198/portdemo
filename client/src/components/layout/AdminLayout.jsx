import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css';
import '../../pages/Admin/AdminGlobal.css'; // Import global admin styles

const AdminLayout = () => {
  return (
    <div className="admin-layout-container">
      <Row className="g-0">
        <Col md={3} lg={2} className="sidebar-wrapper">
          <AdminSidebar />
        </Col>
        <Col md={9} lg={10} className="content-wrapper">
          <Outlet /> {/* 2. Add the Outlet here to render the nested pages */}
        </Col>
      </Row>
    </div>
  );
};

export default AdminLayout;