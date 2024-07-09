import { useState, useEffect } from 'react';
import './App.css';
import Header from './component/Header';


function App() {

  useEffect(() => {
    // Function to handle smooth scrolling
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Event listener to handle clicks on navigation links
    const handleNavigationClick = (event, id) => {
      event.preventDefault();
      scrollToSection(id);
    };

    // Attach click event listeners to navigation links
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', (event) => handleNavigationClick(event, 'functions'));
    }

    return () => {
      // Clean up event listeners if component unmounts
      if (ctaButton) {
        ctaButton.removeEventListener('click', (event) => handleNavigationClick(event, 'functions'));
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <section id="hero" className="hero">
        <Header />
        <div className="hero-content">
          <div className='div-content'>
            <h2>Simplify Your Browsing </h2>
            <h2>Experience</h2>
            <p>
              Seamlessly preview, open, and manage tabs with intuitive hover previews and click-to-open functionality.
            </p>
            <a href="#!" className="cta-button">Get Started</a>
          </div>
          <img src='tab-open.png' className='img-tab-open' alt="Tab Open"></img>
          <img src='fullpopup.png' className='img-tab' alt="Full Popup"></img>
        </div>   
      </section>

      <section id="functions" className="functions">
        <div className="function-item" style={{height:'15vh'}}>
          <h3>How to Use:</h3>
          <p>
            To make the popup appear, press <b>alt+v</b> or the specified command in the <b><a href="#settings" className="link">Settings</a></b>.
          </p>
        </div>
        <div className="function-item" style={{height:'48vh'}}>
          <h3>Features:</h3>
          <ul className="features-list">
            <li>Pressing the plus icon  &nbsp; <b>+</b>  &nbsp; will open a new tab.</li>
            <li>Hovering over the text or the icon will display a popup preview of the tab content.</li>
            <li>Left clicking on the text or the icon will open the tab in a popup window.</li>
            <li>Right clicking on the text or the icon will switch to the corresponding tab.</li>
            <li>Middle clicking on the text or the icon, or pressing the &nbsp; <b>X</b>,&nbsp; will close the tab.</li>
            <li>Pressing &nbsp;<b>Load from history</b>&nbsp; will add tabs from the history to the popup.</li>
          </ul>
        </div>
        <div className="function-item" style={{textAlign: 'center', height:'25vh'}} >
          <h3>To Customize your popup click on the button below 👇:</h3>
          <a href="#settings" className="cta-button" style={{marginTop: '10px', width:'10vw',fontSize:'25px'}}>Settings</a>
        </div>
      </section>
      {/* <section>
        <SmallWithSocial/>
      </section> */}
    </>
  );
}

export default App;
