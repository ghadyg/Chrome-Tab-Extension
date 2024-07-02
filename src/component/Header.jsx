import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className='headerHero'>
      <h1>Tab Wizard</h1>
      <div>
        <a href='#/'>
          Home
        </a>
        <a href='#settings'>
          Settings
        </a>
        <a href='#feedback'>
          Feedback
        </a>
      </div>
    </div>
  )
}
