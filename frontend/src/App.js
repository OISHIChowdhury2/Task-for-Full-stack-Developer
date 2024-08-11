import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import { Card } from './Pages/Card';
import { Createcard } from './Pages/Createcard';
import { Services } from './Components/Services/Services';
import { Hero } from './Components/Hero/Hero';
import { Banner } from './Components/Banner/Banner';
import { Footer } from './Components/Footer/Footer';
import { AppStore } from './Components/AppStore/AppStore';
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Banner />
                <AppStore />
              </>
            }
          />
          <Route path="/card" element={<Card />} />
          <Route path="/createcard" element={<Createcard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
