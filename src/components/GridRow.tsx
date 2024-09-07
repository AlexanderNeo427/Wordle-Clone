import React from 'react'
import { GridRowAction, InputAction, CompleteWordAction, CHAR_STATE } from '../game/GameLogicHandler'
import { GameContext, GameContextType } from '../App'
import './GridRow.css'
import GridBlock from './GridBlock'

interface GridRowProps {
   rowIdx: number
}

const GridRow: React.FC<GridRowProps> = props => {
   const [m_word, setWord] = React.useState<string>("")
   const [m_isRowComplete, setIsRowComplete] = React.useState<boolean>(false)
   const [m_charStates, setCharStates] = React.useState<CHAR_STATE[]>([])
   const [m_actionQueue, setActionQueue] = React.useState<GridRowAction[]>([])
   const gameCtx = React.useContext(GameContext) as GameContextType

   React.useEffect(() => {
      setCharStates(
         gameCtx.wordOfTheDay().split("").map(_ => CHAR_STATE.NIL)
      )
   }, [gameCtx.wordOfTheDay()])

   // Pass the 'action queue setter' to the game context
   // So other components may enqueue actions for the current GridRow to handle
   React.useEffect(() => {
      gameCtx.gridRowActionQueueSetters.set(props.rowIdx, setActionQueue)
   }, [setActionQueue])

   // Every time action queue change is detected, dequeue and handle the actions until empty
   React.useEffect(() => {
      // console.log("GridRow.tsx, row ", props.rowIdx, "| ActionQueue - Change detected!")
      while (m_actionQueue.length > 0) {
         const action = m_actionQueue.shift() as GridRowAction
         if (action === null) {
            break
         }

         // TODO: Handle action
         if (action as InputAction) {
            const inputAction = action as InputAction
            if (inputAction.eventKey === "Backspace" || inputAction.eventKey === "Delete") {
               setWord(oldWord => oldWord.substring(0, oldWord.length - 1))
            }
            else if (inputAction.eventKey === "Enter") {
               // if (m_word.length < gameCtx.wordOfTheDay().length) {
               //    // TODO: "NotEnoughLetters" action
               //    return
               // }
               // TODO: Check if word exists in word bank
               // 
               // const keyData = new Map<string, CHAR_STATE>()
               // m_word.split("").forEach(ch => {
               // })

               gameCtx.appActionQueueSetter(oldAppActionQueue => {
                  return [...oldAppActionQueue, new CompleteWordAction(new Map())]
               })
            }
            else if (/^[a-zA-Z]$/.test(inputAction.eventKey)) {
               setWord(oldWord => {
                  if (oldWord.length >= gameCtx.wordOfTheDay().length) {
                     return oldWord
                  }
                  return oldWord + inputAction.eventKey.toLowerCase()
               })
            }
         }
      }
   }, [m_actionQueue])

   return (
      <div style={{ display: "flex", gap: "12px" }}>{
         ((): JSX.Element[] => {
            const elems: JSX.Element[] = []

            const wordPadded: string = m_word.padEnd(gameCtx.wordOfTheDay().length, " ")
            const charArr: string[] = wordPadded.split("")

            charArr.forEach((_, idx: number) => {
               elems.push(
                  <GridBlock
                     key={idx} idx={idx}
                     charArr={charArr}
                     isRowComplete={m_isRowComplete}
                     charState={m_charStates[idx]}
                  />
               )
            })
            return elems
         })()
      }</div>
   )
}

export default GridRow