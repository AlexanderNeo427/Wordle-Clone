import React from 'react'
import { GameRow, LETTER_STATE, WORD_LENGTH } from '../App'

interface GridRowProps {
   gameRow: GameRow
   gap_px: number
}

const getGridBlockStyles = (letterState: LETTER_STATE): React.CSSProperties => {
   const css: React.CSSProperties = {}
   css.width = "70px"
   css.height = "70px"
   css.outline = "2px solid black"
   css.textAlign = "center"
   css.fontSize = "3rem"
   switch (letterState) {
      case LETTER_STATE.CORRECT:
         css.background = 'green'
         break
      case LETTER_STATE.HALF_CORRECT:
         css.background = 'yellow'
         break
      case LETTER_STATE.WRONG:
         css.background = 'grey'
         break
   }
   return css
}

const GridRow: React.FC<GridRowProps> = props => {
   return (
      <div style={{ display: "flex", gap: String(props.gap_px) + "px" }}>
         {
            (() => {
               const lettersToDisplay = props.gameRow.letters.padEnd(WORD_LENGTH, " ")
               const jsxElems: JSX.Element[] = lettersToDisplay.split("").map((chr, idx) => {
                  return <div style={getGridBlockStyles(props.gameRow.letterStates[idx])}>{chr}</div>
               })
               return jsxElems
            })()
         }

         {/* ---- DEBUG ---- */}
         {/* <div style={{ width: "15px" }}></div>
         {
            props.gameRow.letterStates.map(letterState => {
               return <div>{letterState}</div>
            })
         } */}
      </div>
   )
}

export default GridRow