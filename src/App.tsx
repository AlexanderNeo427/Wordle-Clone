import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import GridRow from './components/GridRow'

const WORDLIST_PATH = ""
export const WORD_LENGTH = 5
const NUM_ROWS = 5

// Style Params
const GAP_PX = 10

const randIntRange = (min: number, max: number): number => {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min)) + min
}

export enum LETTER_STATE {
   CORRECT, // Correct letter - Correct position
   HALF_CORRECT, // Correct letter - Wrong position
   WRONG // Self-explanatory
}

export class GameRow {
   letters: string
   letterStates: LETTER_STATE[]

   constructor() {
      this.letters = ""
      this.letterStates = []
   }
}

const App: React.FC = () => {
   const [m_wordOfTheDay, setWordOfTheDay] = React.useState<string>("")

   const [m_inputEnabled, setInputEnabled] = React.useState<boolean>(true)
   const [m_allowedKeys, setAllowedKeys] = React.useState<Set<string>>(new Set())
   const [m_rowIndex, setRowIndex] = React.useState<number>(0)
   const [m_gameData, setGameData] = React.useState<GameRow[]>([])

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
      if (!m_inputEnabled) return
      if (!m_allowedKeys.has(evt.key)) return

      const lettersSoFar = m_gameData[m_rowIndex].letters

      // Handle alphabet input - append char to end-of-string
      const isAlphabetChar = /^[a-zA-Z]$/.test(evt.key)
      if (isAlphabetChar && lettersSoFar.length < WORD_LENGTH) {
         setGameData(oldGameData => {
            const newGameData: GameRow[] = [...oldGameData]
            newGameData[m_rowIndex] = {
               ...newGameData[m_rowIndex],
               letters: newGameData[m_rowIndex].letters + evt.key.toLowerCase()
            }
            return newGameData
         })
      }
      // Handle 'Delete' input 
      else if (evt.key === 'Backspace' || evt.key === 'Delete') {
         const oneLessLetter = Math.max(0, lettersSoFar.length - 1)

         setGameData(oldGameData => {
            const newGameData: GameRow[] = [...oldGameData]
            newGameData[m_rowIndex] = {
               ...newGameData[m_rowIndex],
               letters: newGameData[m_rowIndex].letters.substring(0, oneLessLetter)
            }
            return newGameData
         })
      }
      // Handle 'Enter' input - Check the correctness of the current "GameRow"
      else if (evt.key === 'Enter') {
         if (lettersSoFar.length === WORD_LENGTH) {
            // Num letters = WORD_LENGTH (Default: 5) - Check Row 
            for (let i = 0; i < lettersSoFar.length; i++) {
               const chr = lettersSoFar[i]

               if (m_wordOfTheDay[i] === chr) { // CORRECT 
                  setGameData(oldGameData => {
                     const newGameData: GameRow[] = [...oldGameData]
                     newGameData[m_rowIndex] = {
                        ...newGameData[m_rowIndex],
                        letterStates: [...newGameData[m_rowIndex].letterStates, LETTER_STATE.CORRECT]
                     }
                     return newGameData
                  })
               }
               else if (m_wordOfTheDay.includes(chr)) { // HALF-CORRECT (CONTAINS LETTER) 
                  setGameData(oldGameData => {
                     const newGameData: GameRow[] = [...oldGameData]
                     newGameData[m_rowIndex] = {
                        ...newGameData[m_rowIndex],
                        letterStates: [...newGameData[m_rowIndex].letterStates, LETTER_STATE.HALF_CORRECT]
                     }
                     return newGameData
                  })
               }
               else { // WRONG
                  setGameData(oldGameData => {
                     const newGameData: GameRow[] = [...oldGameData]
                     newGameData[m_rowIndex] = {
                        ...newGameData[m_rowIndex],
                        letterStates: [...newGameData[m_rowIndex].letterStates, LETTER_STATE.WRONG]
                     }
                     return newGameData
                  })
               }
            }
            setRowIndex(prev => prev + 1)
         }
         else {
            // TODO: Perform 'shake' to indicate "insufficient length"
         }
      }
   })

   // DEBUG
   // React.useEffect(() => {
   //    console.log("Current Word: ", m_gameData[m_rowIndex])
   // }, [m_gameData])

   // DEBUG
   React.useEffect(() => {
      console.log("Word of the Day: ", m_wordOfTheDay)
   }, [m_wordOfTheDay])

   React.useEffect(() => {
      // TODO
      // Load word list - Validate against 'WORD_LENGTH'
      // Temp solution for now
      const wordlist: string[] = [
         "argue", "arise", "audio", "badly", "block", "blood"
      ]

      // Pick random 'word of the day'
      const randomWord = wordlist[randIntRange(0, wordlist.length - 1)]
      setWordOfTheDay(randomWord)

      // Populate 'm_allowedKeys'
      const allowedKeys = new Set<string>()
      for (let i = 65; i <= 90; i++) {
         allowedKeys.add(String.fromCharCode(i))
      }
      for (let i = 97; i <= 122; i++) {
         allowedKeys.add(String.fromCharCode(i))
      }
      allowedKeys.add("Backspace")
      allowedKeys.add("Delete")
      allowedKeys.add("Enter")
      setAllowedKeys(allowedKeys)

      const gameData: GameRow[] = []
      for (let i = 0; i < NUM_ROWS; i++) {
         gameData.push(new GameRow())
      }
      setGameData(gameData)
   }, [])

   return (
      <div>
         {/* ---- HEADER/NAVBAR ----- */}
         <nav style={{ display: "flex", justifyContent: "space-between" }}>
            <button>BURGER MENU</button>
            <div style={{ display: "flex" }}>
               <button>HINT</button>
               <button>STAT</button>
               <button>HowToPlay</button>
               <button>SETTINGS</button>
               <button>SUBSCRIBE TO GAMES</button>
            </div>
         </nav>

         {/* ----- GAME BODY ------ */}
         <div style={{ display: "flex", flexDirection: "column", gap: String(GAP_PX) + "px" }}>
            {
               m_gameData.map((gameRow, idx) => {
                  return <GridRow key={idx} gameRow={gameRow} gap_px={GAP_PX} />
               })
            }
         </div>

         {/* ----- ON-SCREEN KEYBOARD ----- */}
         <div style={{ display: "flex", flexDirection: "column" }}>
            <div>

            </div>
            <div>

            </div>
            <div></div>
         </div>
      </div>

   )
}

export default App
