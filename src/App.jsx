import { useState } from 'react'
import './App.css'
import Header from './component/Header'


function App() {
  
  return (
    <>
      <section class="hero">
        <Header/>
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
    </>
  )
}

export default App
