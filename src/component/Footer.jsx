import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>TaskManager Pro</h5>
            <p>Stay organized. Stay productive.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>
              <a href="#privacy" className="text-white text-decoration-none me-3">Privacy</a>
              <a href="#terms" className="text-white text-decoration-none">Terms</a>
            </p>
            <p className="mb-0">&copy; {new Date().getFullYear()} TaskManager Pro. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
