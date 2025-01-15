import React from 'react'
import './Sidebar.css'

const Sidebar: React.FC = () => {
   // const [m_isOpen, setIsOpen] = React.useState<boolean>(false)

   return (
      <aside className="sidebar" style={{
         position: "absolute", left: "0",
         top: "0", bottom: "0", width: "20rem",
         background: "white", outline: "2px solid black"
      }}>
         {/* ----- HEADER ------ */}
         <header style={{
            display: "flex", justifyContent: "start", alignItems: "center",
            paddingLeft: "1rem", height: "60px", gap: "1rem",
            boxShadow: "0px 2px 2px 0px lightgray",
         }}>
            <button style={{
               border: "none", background: "transparent", fontSize: "1.5rem", cursor: "pointer"
            }}>X</button>
            <button style={{
               border: "none", background: "transparent", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer"
            }}>NeoGames</button>
         </header>

         <div style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ paddingLeft: "1rem" }}>NEWS</h5>
            <div className='selectable'>
               <img src="" alt="" />
               <span>The New York Times</span>
            </div>

            <h5 style={{ paddingLeft: "1rem" }}>MORE FROM NEW YORK TIMES GAMES</h5>
            <div className='selectable'>
               <img src="" alt="" />
               <span>Spelling Bee</span>
            </div>
            <div className='selectable'>
               <img src="" alt="" />
               <span>The Crossword</span>
            </div>
            <div className='selectable'>
               <img src="" alt="" />
               <span>The Mini</span>
            </div>
            <div className='selectable'>
               <img src="" alt="" />
               <span>Strands</span>
            </div>
            <div className='selectable'>
               <img src="" alt="" />
               <span>Connections</span>
            </div>

            <div style={{
               marginLeft: "0.5rem", marginRight: "0.5rem",
               height: "0.05rem", background: "gray",
            }} />

            <div className='selectable'>
               <img src="" alt="" />
               <span>The New York Times</span>
            </div>
            <div className='selectable'>
               <img src="" alt="" />
               <span>New York Times Cooking</span>
            </div>
            <div className='selectable'>
               <img src="" alt="" />
               <span>New York Times Wirecutter</span>
            </div>

            <div style={{
               marginLeft: "0.5rem", marginRight: "0.5rem",
               height: "0.05rem", background: "gray",
            }} />

            <a href="" style={{ paddingLeft: "1rem", fontSize: "0.85rem", marginTop: "0.3rem" }}
            >Privacy Policy</a>
         </div>
      </aside>
   )
}

export default Sidebar