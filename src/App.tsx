import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import GridRow from './components/GridRow'
import GameKeyboard from './components/GameKeyboard'
import { GameRowData } from './game/GameLogicHandler'
import Navbar from './components/Navbar'

const WORDLIST_PATH = ""
export const WORD_LENGTH = 5
const NUM_ROWS = 6

// Style Params
const GAP_PX = 10

const App: React.FC = () => {
   

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
   })

   React.useEffect(() => {
   }, [])

   return (
      <div>
         {/* ---- HEADER/NAVBAR ----- */}
         <Navbar /> 

         {/* ----- GAME BODY ------ */}
         <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: String(GAP_PX) + "px" }}>
               {/* {
                  m_gameData.map((GameRowData, idx) => {
                     return <GridRow key={idx} GameRowData={GameRowData} gap_px={GAP_PX} />
                  })
               } */}
            </div>

         </div>

         {/* ----- ON-SCREEN KEYBOARD ----- */}
         {/* <GameKeyboard keyData={m_keyData}/> */}
      </div>

   )
}

export default App
