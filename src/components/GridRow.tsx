import React from 'react'
import { GameRow, WORD_LENGTH } from '../App'

interface GridRowProps {
   gameRow: GameRow
}

const getGridBlockStyles = (): React.CSSProperties => {
   const css: React.CSSProperties = {}
   css.width = "40px"
   css.height = "40px"
   css.outline = "2px solid black"
   css.textAlign = "center"
   return css
}

const GridRow: React.FC<GridRowProps> = props => {
   return (
      <div style={{ display: "flex" }}>
         { 
            (() => {
               let lettersToDisplay = props.gameRow.letters
               lettersToDisplay = lettersToDisplay.padEnd(WORD_LENGTH, " ")

               console.log("Letters to Display Len: ", lettersToDisplay.length)
               console.log("Letters to Display: ", lettersToDisplay)
               const jsxElems: JSX.Element[] = lettersToDisplay.split("").map(chr => {
                  return (
                     <div style={getGridBlockStyles()}>
                        {chr}
                     </div>
                  )
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