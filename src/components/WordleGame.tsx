import React from 'react'
import { GameData } from '../game/GameLogicHandler'
import GridRow from './GridRow'

interface WordleGameProps {
   gameData: GameData
}

const WordleGame: React.FC<WordleGameProps> = props => {
   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
         <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}> 
            {
               props.gameData.gameBlockArrays.map((arrayOfGameBlocks, idx) => { 
                  return (
                     <GridRow key={idx} gameBlockArray={arrayOfGameBlocks}/> 
                  )
               })
            }
         </div>

      </div>
   )
}

export default WordleGame