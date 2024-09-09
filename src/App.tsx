import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import Navbar from './components/Navbar'
import WordleGame from './components/WordleGame'
import { AppEvent, CHAR_STATE, GameLogic, GridRowEvent, InputEvent, loadRandomWord, WordCompletedEvent } from './game/GameLogicHandler'
import GameKeyboard from './components/GameKeyboard'
import PopupMessageContainer from './components/PopupMessageContainer'

export interface GameContextType {
   wordOfTheDay: () => string
   keypressHandler: (eventKey: string) => void

   gridRowEventQueueSetters: Map<
      number, // Row index
      React.Dispatch<React.SetStateAction<GridRowEvent[]>>
   >
   appEventQueueSetter: React.Dispatch<React.SetStateAction<AppEvent[]>>

   messagePusher: (message: string) => void
   messagePusherSetter: (msgPusher: (msg: string) => void) => void

   gameContextSetter: React.Dispatch<React.SetStateAction<GameContextType>> 
}

export const GameContext = React.createContext<GameContextType | undefined>(undefined)

const App: React.FC = () => {
   // Used for rendering the in-game keyboard
   const [m_rowIndex, setRowIndex] = React.useState<number>(0)
   const [m_keyData, setKeyData] = React.useState<Map<string, CHAR_STATE>>(new Map())
   const [m_appEventQueue, setAppEventQueue] = React.useState<AppEvent[]>([])
   const [m_gameContext, setGameContext] = React.useState<GameContextType>({
      wordOfTheDay: () => "",
      keypressHandler: (_) => {},
      gridRowEventQueueSetters: new Map(),
      appEventQueueSetter: setAppEventQueue, 

      messagePusher: () => {},
      messagePusherSetter: () => {},
      gameContextSetter: () => {}
   })

   // Enqueue inputAction to the appropriate gridRow's actionQueue
   const onKeyPress = (eventKey: string): void => {
      const gridrowActionQueueSetter = m_gameContext.gridRowEventQueueSetters.get(m_rowIndex)
      if (!gridrowActionQueueSetter) {
         return
      }
      gridrowActionQueueSetter(oldActionQueue => {
         return [...oldActionQueue, new InputEvent(eventKey)]
      })
   }

   // Initialize game
   React.useEffect(() => {
      const setMessagePusher = (msgPusher: (msg: string) => void): void => {
         setGameContext(oldGameCtx => {
            return {...oldGameCtx, messagePusher: msgPusher}
         })
      }

      const wordOfTheDay = loadRandomWord()
      setGameContext(oldGameCtx => {
         return {
            ...oldGameCtx,
            keypressHandler: onKeyPress,
            wordOfTheDay: () => wordOfTheDay, 
            messagePusherSetter: setMessagePusher, 
            gameContextSetter: setGameContext
         } as GameContextType
      })
      setKeyData(GameLogic.initializeKeyData())

      // console.log("Message pusher: ", m_gameContext.pushMesage)
      // m_gameContext.messagePusher("A really random message")

      console.log("App | Word of the day: ", wordOfTheDay)
   }, [])

   // If I don't do this - then the "keypressHandler" will go out of date
   // i.e it will still think m_rowIndex is 0, when in reality it has been incremented
   //
   // I don't knot enough about React to understand why, but this fixes it
   React.useEffect(() => {
      setGameContext(oldGameCtx => {
         return {
            ...oldGameCtx,
            keypressHandler: onKeyPress,
         } as GameContextType
      })
   }, [m_rowIndex])

   // Handle any pending actions in the 'AppEventQueue'
   React.useEffect(() => {
      while (m_appEventQueue.length > 0) {
         const appEvent = m_appEventQueue.shift() as AppEvent
         if (!appEvent || appEvent == null || appEvent === undefined) {
            continue
         }

         if (appEvent as WordCompletedEvent) {
            const wordCompletedEvent = appEvent as WordCompletedEvent
            wordCompletedEvent.keyData.forEach((newDesiredCharState: CHAR_STATE, ch: string) => {
               setKeyData(oldKeyData => {
                  const newKeyData = new Map(oldKeyData)
                  const oldCharState: CHAR_STATE = m_keyData.get(ch) || CHAR_STATE.NIL
                  newKeyData.set(
                     ch, Math.max(oldCharState, newDesiredCharState)
                  )
                  return newKeyData
               })
            })
            setRowIndex(wordCompletedEvent.completedRowIndex + 1)
         }
      }
   }, [m_appEventQueue])

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
      onKeyPress(evt.key)
   })

   return (
      <GameContext.Provider value={m_gameContext}>
         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* <Sidebar /> */}
            <PopupMessageContainer />
            <Navbar />
            <WordleGame />
            <GameKeyboard keyData={m_keyData} />
         </div>
      </GameContext.Provider>
   )
}

export default App
