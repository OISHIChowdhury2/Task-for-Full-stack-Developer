import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Components/Assets/Navbar/Navbar';
import { Homepage } from './Components/Assets/HomePage/Homepage';
import { Card } from './Pages/Card';
import { Createcard } from './Pages/Createcard';
import {StepTwo} from './Components/Assets/HomePage/StepTwo'
import { Footer } from './Components/Assets/Footer/Footer';
import { Partnar } from './Components/Assets/HomePage/Partnar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Define routes for different components */}
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/card" element={<Card />} />
          <Route path="/createcard" element={<Createcard />} />
        </Routes>
        <StepTwo/>
        <Partnar/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
