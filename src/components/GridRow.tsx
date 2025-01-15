import React from 'react'
import { GridRowEvent, InputEvent, WordCompletedEvent, CHAR_STATE } from '../game/GameLogicHandler'
import { GameContext, GameContextType } from '../App'
import GridBlock from './GridBlock'
import { useAnimate, Variant } from 'framer-motion'

interface GridRowProps {
   rowIdx: number
}

const GridRow: React.FC<GridRowProps> = props => {
   const [m_word, setWord] = React.useState<string>("")
   const [m_charStates, setCharStates] = React.useState<CHAR_STATE[]>([])
   const [m_eventQueue, setEventQueue] = React.useState<GridRowEvent[]>([])
   const [m_guessedCorrectly, setGuessedCorrectly] = React.useState<boolean>(false)

   const [scope, animate] = useAnimate()
   const gameCtx = React.useContext(GameContext) as GameContextType

   React.useEffect(() => {
      setCharStates(
         gameCtx.wordOfTheDay().split("").map(_ => CHAR_STATE.NIL)
      )
   }, [gameCtx.wordOfTheDay()])

   // Pass the 'action queue setter' to the game context
   // So other components may enqueue actions for the current GridRow to handle
   React.useEffect(() => {
      gameCtx.gridRowEventQueueSetters.set(props.rowIdx, setEventQueue)
   }, [setEventQueue])

   const cardShakeAnim = async (): Promise<void> => {
      const offsetValues: number[] = []
      for (let i = 3; Math.floor(i) >= 0; i--) {
         offsetValues.push(i)
         offsetValues.push(-i)
      }
      for (const val of offsetValues) {
         await animate(scope.current, { translateX: val } as Variant, { duration: 0.05 })
      }
   }

   // Every time action queue change is detected, dequeue and handle the actions until empty
   React.useEffect(() => {
      while (m_eventQueue.length > 0) {
         const gridrowEvent = m_eventQueue.shift() as GridRowEvent
         if (!gridrowEvent || gridrowEvent === null || gridrowEvent === undefined) {
            continue
         }

         // TODO: Handle action
         if (gridrowEvent as InputEvent) {
            const inputAction = gridrowEvent as InputEvent
            if (inputAction.eventKey === "Backspace" || inputAction.eventKey === "Delete") {
               setWord(oldWord => oldWord.substring(0, oldWord.length - 1))
            }
            else if (inputAction.eventKey === "Enter") {

               // Not enough letters
               if (m_word.length < gameCtx.wordOfTheDay().length) {
                  cardShakeAnim()
                  gameCtx.pushMessage("Not enough letters")
                  return
               }
               // Check if word exists in word bank
               if (!gameCtx.wordset.has(m_word)) {
                  cardShakeAnim()
                  gameCtx.pushMessage("Word does not exist")
                  return
               }

               // Pre-fill an array with the desired "char states"
               const wordOfTheDay: string = gameCtx.wordOfTheDay()
               const newCharStates: CHAR_STATE[] = []
               for (let i = 0; i < m_word.length; i++) {
                  if (m_word.charAt(i) === wordOfTheDay.charAt(i)) {
                     newCharStates.push(CHAR_STATE.CORRECT)
                  }
                  else if (wordOfTheDay.includes(m_word.charAt(i))) {
                     newCharStates.push(CHAR_STATE.HALF_CORRECT)
                  }
                  else {
                     newCharStates.push(CHAR_STATE.WRONG)
                  }
               }

               // Convert 'newCharStates' array to keyData map
               // 
               // Blit the data to the "AppEventQueue"
               // so it can be used to set the game keyboard highlighting
               gameCtx.appEventQueueSetter(oldAppEventQueue => {
                  const keyData = new Map<string, CHAR_STATE>()
                  newCharStates.forEach((charState, idx) => {
                     keyData.set(m_word.charAt(idx), charState)
                  })
                  const guessIsCorrect: boolean = m_word === gameCtx.wordOfTheDay()
                  if (guessIsCorrect) {
                     setGuessedCorrectly(true)
                  }
                  const evt = new WordCompletedEvent(keyData, props.rowIdx, guessIsCorrect)
                  return [...oldAppEventQueue, evt]
               })

               const asyncCardFlip = async (idx: number) => {
                  const delay = async (ms: number): Promise<void> => {
                     return new Promise(resolve => setTimeout(resolve, ms))
                  }
                  await delay(100 * idx)

                  setCharStates(oldCharStates => {
                     const newCharStates = [...oldCharStates] as CHAR_STATE[]
                     if (m_word.charAt(idx) === wordOfTheDay.charAt(idx)) {
                        newCharStates[idx] = CHAR_STATE.CORRECT
                     }
                     else if (wordOfTheDay.includes(m_word.charAt(idx))) {
                        newCharStates[idx] = CHAR_STATE.HALF_CORRECT
                     }
                     else {
                        newCharStates[idx] = CHAR_STATE.WRONG
                     }
                     return newCharStates
                  })
               }
               for (let i = 0; i < m_word.length; i++) {
                  asyncCardFlip(i)
               }
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
   }, [m_eventQueue])

   return (
      <div ref={scope} style={{ display: "flex", gap: "0.5rem" }}>{
         ((): JSX.Element[] => {
            const elems: JSX.Element[] = []

            const wordPadded: string = m_word.padEnd(gameCtx.wordOfTheDay().length, " ")
            const charArr: string[] = wordPadded.split("")

            charArr.forEach((_, idx: number) => {
               elems.push(
                  <GridBlock
                     key={idx} idx={idx}
                     charArr={charArr}
                     charState={m_charStates[idx] || CHAR_STATE.NIL}
                     guessIsCorrect={m_guessedCorrectly}
                  />
               )
            })
            return elems
         })()
      }</div>
   )
}

export default GridRow