import { useState } from 'react'
import './App.css'
import SimpleSidebar from './component/Sidebar'


function App() {
  
  return (
    <>
      <SimpleSidebar>
      <section class="hero">
        <div className='headerHero'>
          <h1>Tab Navigator</h1>
        </div>
        <div class="hero-content">
          <div className='div-content'>
            <h2>Simplify Your Browsing </h2>
            <h2>Experience</h2>
            <p>
              Seamlessly preview, open, and manage tabs with intuitive hover previews and click-to-open functionality.
            </p>
            <a href="#download" class="cta-button">Get Started</a>
          </div>
        </div>
      </section>
      </SimpleSidebar>
    </>
  )
}

export default App
