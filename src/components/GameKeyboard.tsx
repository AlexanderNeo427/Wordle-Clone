import React from 'react'
import { KEY_STATE } from '../App'

interface GameKeyboardProps {
   keyData: Map<string, KEY_STATE>
}

const getKeyboardRowCSS = (): React.CSSProperties => {
   const css: React.CSSProperties = {}

   return css
}

const getKeyCSS = (keyState: KEY_STATE): React.CSSProperties => {
   const css: React.CSSProperties = {}
   css.width = "40px"
   css.maxWidth = "60px"
   css.height = "50px"

   switch (keyState) {
      case KEY_STATE.CORRECT:
         css.background = "green"
         break
      case KEY_STATE.EXISTS:
         css.background = "yellow"
         break
      case KEY_STATE.WRONG:
         css.background = "gray"
         break
      case KEY_STATE.UNKNOWN: break
   }
   return css
}

// string 1 - Key Code
// string 2 - String to display
// const getRow1 = (): Map<string, string> => {

// }

const GameKeyboard: React.FC<GameKeyboardProps> = props => {
   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "1rem" }}>
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "full", }}>
            {/* ---- KEYBOARD ROW 1 ----- */}
            <div style={getKeyboardRowCSS()}>
               {
                  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(chr => {
                     const lowercase = chr.toLowerCase()
                     const keyState = props.keyData.get(lowercase) || KEY_STATE.UNKNOWN
                     const keyCSS = getKeyCSS(keyState)
                     return (
                        <button style={keyCSS}>{chr}</button>
                     )
                  })
               }
            </div>

            {/* ---- KEYBOARD ROW 2 ----- */}
            <div style={getKeyboardRowCSS()}>
               {
                  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(chr => {
                     const lowercase = chr.toLowerCase()
                     const keyState = props.keyData.get(lowercase) || KEY_STATE.UNKNOWN
                     const keyCSS = getKeyCSS(keyState)
                     return (
                        <button style={keyCSS}>{chr}</button>
                     )
                  })
               }
            </div>

            {/* ---- KEYBOARD ROW 3 ----- */}
            <div style={getKeyboardRowCSS()}>
               {
                  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'].map(chr => {
                     const lowercase = chr.toLowerCase()
                     const keyState = props.keyData.get(lowercase) || KEY_STATE.UNKNOWN
                     const keyCSS = getKeyCSS(keyState)
                     return (
                        <button style={keyCSS}>{chr}</button>
                     )
                  })
               }
            </div>
         </div>
      </div>
   )
}

export default GameKeyboard