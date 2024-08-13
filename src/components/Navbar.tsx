import React from 'react'
import './Navbar.css'

const Navbar: React.FC = props => {
   return (
      <nav className='navbar'> 
         <span className="material-symbols-outlined navbar-btn">menu</span>
         <div style={{ display: "flex" }}>
            <span className="material-symbols-outlined navbar-btn">lightbulb</span>
            <span className="material-symbols-outlined navbar-btn">bar_chart</span>
            <span className="material-symbols-outlined navbar-btn">help</span>
            <span className="material-symbols-outlined navbar-btn">settings</span>
            <button>Subscribe to Games</button>
         </div>
      </nav>
   )
}

export default Navbar