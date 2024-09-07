import React from 'react'
import { GridRowAction, InputAction, CompleteWordAction, NUM_ROWS, CHAR_STATE } from '../game/GameLogicHandler'
import { GameContext, GameContextType } from '../App'
import './GridRow.css'
import { animateValue, AnimationControls, AnimationScope, useAnimate, useAnimation } from 'framer-motion'
import GridBlock from './GridBlock'

interface GridRowProps {
   rowIdx: number
}

class BlockData {
   letter: string
   styles: React.CSSProperties 

   constructor() {
      this.letter = ""
      this.styles = {
         width: "60px", height: "60px",
         textAlign: "center",
         fontSize: "3rem", fontFamily: "Neue Helvetica", fontWeight: "lighter",
         outline: "2px solid lightgray"
      } as React.CSSProperties
   }
}

const GridRow: React.FC<GridRowProps> = props => {
   // const [m_colIdx, setColIdx] = React.useState<number>(0)
   // const [m_allBlockData, setAllBlockData] = React.useState<BlockData[]>([])

   // const [m_animControls, setAnimControls] = React.useState<AnimationControls[]>([])
   const [m_word, setWord] = React.useState<string>("")

   const [m_actionQueue, setActionQueue] = React.useState<GridRowAction[]>([])
   const gameCtx = React.useContext(GameContext) as GameContextType

   // const animControls = gameCtx.wordOfTheDay().split("").map(_ => useAnimation())

   React.useEffect(() => {
      // setAllBlockData(
      //    gameCtx.wordOfTheDay().split("").map(_ => new BlockData())
      // )
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

               // const keyData = new Map<string, CHAR_STATE>()
               // m_word.split("").forEach(ch => {
               // })
               

               gameCtx.appActionQueueSetter(oldAppActionQueue => {
                  return [...oldAppActionQueue, new CompleteWordAction(new Map())]
               })
            }
            else if (/^[a-zA-Z]$/.test(inputAction.eventKey)) {
               // setAllBlockData(oldAllBlockData => {
               //    if (m_colIdx >= m_allBlockData.length) {
               //       return [...oldAllBlockData]
               //    }
               //    const newBlockData = [...oldAllBlockData] as BlockData[]
               //    newBlockData[m_colIdx].letter = inputAction.eventKey
               //    setColIdx(idx => idx + 1)
               //    return newBlockData
               // })
               setWord(oldWord => {
                  if (oldWord.length >= gameCtx.wordOfTheDay().length) {
                     return oldWord
                  }
                  const newWord = oldWord + inputAction.eventKey.toLowerCase()
                  return newWord
               })
            }

            // console.log("GridRow | Row: ", props.rowIdx, ". Current word: ", m_word)
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
               elems.push(<GridBlock key={idx} idx={idx} charArr={charArr}/>)
            })
            return elems 
         })()
         // m_word.padEnd(gameCtx.wordOfTheDay().length, " ").split("").map((_, idx) => {
         //    return (
         //       <GridBlock 
         //          key={idx} 
         //          idx={idx} 
         //          word={m_word}
         //          gridLength={gameCtx.wordOfTheDay().length}
         //       />
         //    )
         // })
         // m_allBlockData.map((blockData, idx) => {
         //    // return <div key={idx} style={blockData.styles}>{blockData.letter}</div>
         //    return <GridBlock key={idx} idx={idx}/>
         // })
      }</div>
   )
}

export default GridRow