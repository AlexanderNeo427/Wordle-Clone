import React from 'react'
import './Navbar.css'

const Navbar: React.FC = () => {
   return (
      <nav className='navbar'> 
         <span className="material-symbols-outlined navbar-btn">menu</span>
         <div style={{ display: "flex", alignItems: "center" }}>
            <span className="material-symbols-outlined navbar-btn">lightbulb</span>
            <span className="material-symbols-outlined navbar-btn">bar_chart</span>
            <span className="material-symbols-outlined navbar-btn">help</span>
            <span className="material-symbols-outlined navbar-btn">settings</span>

            {/* Provides gap */}
            <div style={{ minWidth: "1rem" }}/>

            <button style={{ 
               borderRadius: "50px", 
               border: "none",
               outline: "2px solid black",
               boxShadow: "0px 0px",
               background: "none",
               paddingLeft: "2rem", paddingRight: "2rem",
               fontSize: "1rem",
               height: '78%',
            }}>
               <strong>Subscribe to Games</strong>
            </button>
         </div>
      </nav>
   )
}

export default Navbar