import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import Navbar from './components/Navbar'
import WordleGame from './components/WordleGame'
import { AppAction, CHAR_STATE, GameLogic, GridRowAction, InputAction, loadRandomWord, CompleteWordAction } from './game/GameLogicHandler'
import GameKeyboard from './components/GameKeyboard'

export interface GameContextType {
   wordOfTheDay: () => string

   gridRowActionQueueSetters: Map<
      number, // Row index
      React.Dispatch<React.SetStateAction<GridRowAction[]>>
   >
   appActionQueueSetter: React.Dispatch<React.SetStateAction<AppAction[]>>
}

export const GameContext = React.createContext<GameContextType | undefined>(undefined)

const App: React.FC = () => {
   // Used for rendering the in-game keyboard
   const [m_rowIndex, setRowIndex] = React.useState<number>(0)
   const [m_keyData, setKeyData] = React.useState<Map<string, CHAR_STATE>>(new Map())
   const [m_appActionQueue, setActionQueue] = React.useState<AppAction[]>([])
   const [m_gameContext, setGameContext] = React.useState<GameContextType>({
      wordOfTheDay: () => "",
      gridRowActionQueueSetters: new Map(),
      appActionQueueSetter: setActionQueue
   })

   // Initialize game
   React.useEffect(() => {
      const wordOfTheDay = loadRandomWord()
      setGameContext(oldGameCtx => {
         return {
            ...oldGameCtx,
            wordOfTheDay: () => wordOfTheDay
         } as GameContextType
      })
      setKeyData(GameLogic.initializeKeyData())

      console.log("App | Word of the day: ", wordOfTheDay)
   }, [])

   // Enqueue inputAction to the appropriate gridRow's actionQueue
   const onKeyPress = (eventKey: string): void => {
      const gridrowActionQueueSetter = m_gameContext.gridRowActionQueueSetters.get(m_rowIndex)
      if (!gridrowActionQueueSetter) {
         return
      }
      gridrowActionQueueSetter(oldActionQueue => {
         return [...oldActionQueue, new InputAction(eventKey)]
      })
      // console.log("App.tsx | onKeyPress - Finished")
   }

   // Handle any pending actions in the 'AppActionQueue'
   React.useEffect(() => {
      while (m_appActionQueue.length > 0) {
         const appAction = m_appActionQueue.shift() as AppAction
         if (appAction == null) {
            return
         }
         
         // TODO: Handle app action
         // if (appAction as CompleteWordAction) {
         //    setRowIndex(prevRow => prevRow + 1)
         // }
         
      }
   }, [m_appActionQueue])

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
      onKeyPress(evt.key)
   })

   return (
      <GameContext.Provider value={m_gameContext}>
         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* <Sidebar /> */}
            <Navbar />
            <WordleGame />
            <GameKeyboard keyData={m_keyData} />
         </div>
      </GameContext.Provider>
   )
}

export default App
