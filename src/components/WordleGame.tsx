import React from 'react'
import { GameData } from '../game/GameLogicHandler'
import GridRow from './GridRow'
import Sidebar from './Sidebar'

interface WordleGameProps {
   gameData: GameData
}

const WordleGame: React.FC<WordleGameProps> = props => {
   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
         <Sidebar />
         <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}> 
            {
               props.gameData.gameBlockArrays.map((arrayOfGameBlocks, idx) => { 
                  return (
                     <GridRow key={idx} rowIdx={idx} gameBlockArray={arrayOfGameBlocks}/> 
                  )
               })
            }
         </div>

      </div>
   )
}

export default WordleGame