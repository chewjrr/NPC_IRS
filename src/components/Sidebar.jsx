import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      <Button variant="primary" onClick={toggleSidebar} className="sidebar-toggle">
        ☰
      </Button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Nav className="flex-column" style={{marginTop: '50px'}}>
          <Nav.Link as={Link} to="/chart">График</Nav.Link>
          <Nav.Link as={Link} to="/joined-table">Таблица</Nav.Link>
          <Nav.Link href="https://github.com">Github</Nav.Link>
        </Nav>
        <div className="sidebar-footer" style={{marginBottom: '10px'}}>
          chewjr
        </div>
      </div>
      {isOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;
