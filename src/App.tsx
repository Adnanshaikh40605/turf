import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingPage from './pages/BookingPage/BookingPage';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking/:sportType" element={<BookingPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 