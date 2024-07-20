import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import JoinedTable from './components/JoinedTable';
import Charts from './components/Charts';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Container fluid className={sidebarOpen ? 'main-container open' : 'main-container'}>
        <Routes>
          <Route path="/joined-table" element={<JoinedTable />} />
          <Route path="/chart" element={<Charts />} />
          <Route path="/" element={<Navigate to="/joined-table" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
