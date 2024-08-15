import React from 'react'
import { CHAR_STATE } from '../game/GameLogicHandler'

const GAP_BETWEEN_KEYS = "0.4rem"

interface GameKeyboardProps {
   // string 1 - eventKey
   // string 2 - CHAR_STATE of the corresponding key 
   keyData: Map<string, CHAR_STATE> 
}

const getKeyboardRowCSS = (): React.CSSProperties => {
   const css: React.CSSProperties = {}
   css.display = "flex"
   css.gap = GAP_BETWEEN_KEYS
   return css
}

const getKeyCSS = (eventKey: string, keyCharState: CHAR_STATE): React.CSSProperties => {
   const css: React.CSSProperties = {}
   css.minWidth = "2.8rem"
   css.minHeight = "4rem"

   css.background = "lightgray"
   css.borderRadius = "0.5rem"
   css.outlineWidth = "0"
   css.fontWeight = "bold"
   css.border = "none"

   if (eventKey === 'Enter' || eventKey === 'Delete') {
      css.fontSize = "0.85rem"
      css.paddingLeft = "0.5rem"
      css.paddingRight = "0.5rem"
   }
   else {
      css.fontSize = "1.4rem"
   }

   switch (keyCharState) {
      case CHAR_STATE.CORRECT:
         css.color = "white"
         css.background = "green"
         break
      case CHAR_STATE.HALF_CORRECT:
         css.color = "white"
         css.background = "yellow"
         break
      case CHAR_STATE.WRONG:
         css.color = "white"
         css.background = "gray"
         break
   }
   if (keyCharState !== CHAR_STATE.NIL) {
      console.log("Key State Char: ", keyCharState)
   }
   return css
}

// const getDisplayChar = (eventKey: string) => {
//    if (eventKey === 'Enter') return 'Enter'
//    if (eventKey === 'Delete' || eventKey === 'Backspace') {
//       return 'X'
//    }
//    return eventKey.toUpperCase()
// }

const getEventKeys = (): string[][] => {
   return [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete']
   ]
}

const GameKeyboard: React.FC<GameKeyboardProps> = props => {
   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "full", gap: GAP_BETWEEN_KEYS }}>
            {
               getEventKeys().map(rowOfEventKeys => {
                  return (
                     <div style={getKeyboardRowCSS()}>
                        {rowOfEventKeys.map(eventKey => {
                           return (
                              <button style={getKeyCSS(eventKey, props.keyData.get(eventKey) || CHAR_STATE.NIL)}>
                                 {eventKey.toUpperCase()}
                              </button>
                           )
                        })}
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}

export default GameKeyboard