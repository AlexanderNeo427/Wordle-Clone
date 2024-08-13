import React from 'react'
import { GameData, GameLogic } from '../game/GameLogicHandler'
import GridRow from './GridRow'

interface WordleGameProps {
   gameData: GameData
}

const WordleGame: React.FC<WordleGameProps> = props => {
   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
         <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* {
                  m_gameData.map((GameRowData, idx) => {
                     return <GridRow key={idx} GameRowData={GameRowData} gap_px={GAP_PX} />
                  })
               } */}
            {
               props.gameData.gameBlockArrays.map(gameBlockArray => { 
                  console.log(props.gameData)
                  return (
                     <GridRow gameBlockArray={gameBlockArray}/> 
                  )
               })
            }
         </div>

      </div>
   )
}

export default WordleGame