import React from 'react'
import GridRow from './GridRow'
import { NUM_ROWS } from '../game/GameLogicHandler'

interface WordleGameProps {}

const WordleGame: React.FC<WordleGameProps> = () => {
   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "1rem" }}>
         <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}> {
            (() => {
               const gridRows: JSX.Element[] = []
               for (let i = 0; i < NUM_ROWS; i++) {
                  gridRows.push(<GridRow key={i} rowIdx={i} />)
               }
               return gridRows
            })()
         }</div>
      </div>
   )
}

export default WordleGame