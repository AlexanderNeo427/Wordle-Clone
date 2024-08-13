import React from 'react'
import { GameBlockData } from '../game/GameLogicHandler'

interface GridRowProps {
   gameBlockArray: GameBlockData[]
}

const getGridBlockStyles = (): React.CSSProperties => {
   const css: React.CSSProperties = {}
   css.width = "60px"
   css.height = "60px"
   css.outline = "2px solid black"
   css.textAlign = "center"
   css.fontSize = "3rem"

   return css
}

const GridRow: React.FC<GridRowProps> = props => {
   return (
      <div style={{ display: "flex", gap: "5px" }}>
         {
            props.gameBlockArray.map(gameBlock => {
               return (
                  <div style={getGridBlockStyles()}>
                     {gameBlock.char}
                  </div>
               )
            })
         }
      </div>
   )
}

export default GridRow