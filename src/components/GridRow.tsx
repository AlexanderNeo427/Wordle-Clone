import React from 'react'
import { GridRowAction, InputAction, CompleteWordAction, NUM_ROWS, CHAR_STATE } from '../game/GameLogicHandler'
import { GameContext, GameContextType } from '../App'
import './GridRow.css'
import GridBlock from './GridBlock'
import { div } from 'framer-motion/client'
import { animateValue, AnimationScope, useAnimate } from 'framer-motion'

interface GridRowProps {
   rowIdx: number
}

class BlockData {
   letter: string
   styles: React.CSSProperties 
   scope: AnimationScope<any>
   animate: any

   constructor(scope: AnimationScope<any>, animate: any) {
      this.letter = ""
      this.styles = {
         width: "60px", height: "60px",
         textAlign: "center",
         fontSize: "3rem", fontFamily: "Neue Helvetica", fontWeight: "lighter",
         outline: "2px solid lightgray"
      } as React.CSSProperties
      this.scope = scope
      this.animate = animate
   }
}

const GridRow: React.FC<GridRowProps> = props => {
   const [m_colIdx, setColIdx] = React.useState<number>(0)
   const [m_allBlockData, setAllBlockData] = React.useState<BlockData[]>([])
   const [m_actionQueue, setActionQueue] = React.useState<GridRowAction[]>([])
   const gameCtx = React.useContext(GameContext) as GameContextType

   const [scope, animate] = useAnimate()

   React.useEffect(() => {
      const allBlockData: BlockData[] = []
      for (let i = 0; i < gameCtx.wordOfTheDay().length; i++) {
         const [scope, animate] = useAnimate()
         allBlockData.push(new BlockData(scope, animate))
      }
      setAllBlockData(allBlockData)
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

            }
            else if (inputAction.eventKey === "Enter") {
               // if (m_word.length < gameCtx.wordOfTheDay().length) {
               //    // TODO: "NotEnoughLetters" action
               //    return
               // }
               // TODO: Check if word exists in word bank

               // const keyData = new Map<string, CHAR_STATE>()
               // m_word.split("").forEach(ch => {
               // })

               gameCtx.appActionQueueSetter(oldAppActionQueue => {
                  return [...oldAppActionQueue, new CompleteWordAction(new Map())]
               })
            }
            else if (/^[a-zA-Z]$/.test(inputAction.eventKey)) {
               setAllBlockData(oldAllBlockData => {
                  const newBlockData = [...oldAllBlockData] as BlockData[]
                  newBlockData[m_colIdx].letter = inputAction.eventKey
                  setColIdx(prevColIndex => prevColIndex + 1)
                  return newBlockData
               })
               // setWord(oldWord => {
               //    if (oldWord.length >= gameCtx.wordOfTheDay().length) {
               //       return oldWord
               //    }
               //    const newWord = oldWord + inputAction.eventKey.toLowerCase()

               //    return newWord
               // })
            }

            // console.log("GridRow | Row: ", props.rowIdx, ". Current word: ", m_word)
         }
      }
   }, [m_actionQueue])

   return (
      <div style={{ display: "flex", gap: "12px" }}>{
         // m_word.padEnd(gameCtx.wordOfTheDay().length, " ").split("").map((_, idx) => { 
         //    return <GridBlock key={idx} idx={idx}/>
         // })
         m_allBlockData.map((blockData, idx) => {
            return <div key={idx} style={blockData.styles}>{blockData.letter}</div>
         })
      }</div>
   )
}

export default GridRow