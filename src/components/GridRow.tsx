import React from 'react'
import { CHAR_STATE, GameBlockData } from '../game/GameLogicHandler'

interface GridRowProps {
   gameBlockArray: GameBlockData[]
}

const getGridBlockStyles = (char: string, charState: CHAR_STATE): React.CSSProperties => {
   const css: React.CSSProperties = {}
   css.width = "60px"
   css.height = "60px"
   css.outline = "2px solid lightgray"
   css.textAlign = "center"
   css.fontSize = "3rem"
   switch (charState) {
      case CHAR_STATE.NIL: 
         if (char.length > 0) {
            css.outline = "2px solid gray"
         }
         break
      case CHAR_STATE.CORRECT: 
         css.background = 'green'
         break
      case CHAR_STATE.HALF_CORRECT:
         css.background = 'yellow'
         break
      case CHAR_STATE.WRONG:
         css.background = 'gray'
         break
   }
   return css
}

const GridRow: React.FC<GridRowProps> = props => {
   return (
      <div style={{ display: "flex", gap: "12px" }}>
         {
            props.gameBlockArray.map(gameBlock => {
               return (
                  <div style={getGridBlockStyles(gameBlock.char, gameBlock.state)}>
                     {gameBlock.char}
                  </div>
               )
            })
         }
      </div>
   )
}

export default GridRow