import React from 'react'
import { CHAR_STATE, GameBlockData } from '../game/GameLogicHandler'
import { GameContext, GameContextType } from '../App'
import './GridRow.css'
import { AppColors } from '../globals'

interface GridRowProps {
   rowIdx: number
   gameBlockArray: GameBlockData[]
}

const getGridBlockStyles = (char: string, charState: CHAR_STATE): React.CSSProperties => {
   const css: React.CSSProperties = {}
   css.width = "60px"
   css.height = "60px"
   css.textAlign = "center"
   css.fontSize = "3rem"
   css.fontFamily = "Neue Helvetica"
   css.fontWeight = "lighter"
   switch (charState) {
      case CHAR_STATE.NIL: 
         css.outline = char.length > 0 ? "2px solid " + AppColors.GRAY : "2px solid lightgray"
         break
      case CHAR_STATE.CORRECT: 
         css.background = AppColors.GREEN
         css.outline = '2px solid ' + AppColors.GREEN
         css.color = 'white'
         break
      case CHAR_STATE.HALF_CORRECT:
         css.background = AppColors.YELLOW
         css.outline = '2px solid ' + AppColors.YELLOW
         css.color = 'white'
         break
      case CHAR_STATE.WRONG:
         css.background = AppColors.GRAY
         css.outline = '2px solid ' + AppColors.GRAY
         css.color = 'white'
         break
   }
   css.display = "flex"
   css.justifyContent = "center"
   css.alignItems = "center"
   return css
}

const getClassName = (gameCtx: GameContextType, rowIdx: number, colIdx: number): string => {
   const isCurrentRow = gameCtx.rowIndex === rowIdx
   const isCurrentCol = gameCtx.colIndex === colIdx + 1
   if (isCurrentRow && isCurrentCol) {
      return "scale-bounce-anim"
   }
   return "" 
}

const GridRow: React.FC<GridRowProps> = props => {
   const gameCtx = React.useContext(GameContext) as GameContextType

   return (
      <div style={{ display: "flex", gap: "12px" }}>
         {
            props.gameBlockArray.map((gameBlock, colIdx) => {
               return (
                  <div 
                     key={colIdx} 
                     className={getClassName(gameCtx, props.rowIdx, colIdx)}
                     style={getGridBlockStyles(gameBlock.char, gameBlock.state)}
                  >
                     <span>
                        {gameBlock.char}
                     </span>
                  </div>
               )
            })
         }
      </div>
   )
}

export default GridRow