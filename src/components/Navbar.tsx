import React from 'react'

const Navbar: React.FC = props => {
   return (
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "0.8rem" }}>
         <button>BURGER MENU</button>
         <div style={{ display: "flex" }}>
            <button>HINT</button>
            <button>STAT</button>
            <button>HowToPlay</button>
            <button>SETTINGS</button>
            <button>SUBSCRIBE TO GAMES</button>
         </div>
      </nav>
   )
}

export default Navbar