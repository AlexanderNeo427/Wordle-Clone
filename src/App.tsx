import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import Navbar from './components/Navbar'
import WordleGame from './components/WordleGame'
import { CHAR_STATE, GAME_OP_STATUS, GameData, GameLogic, GameOperationResult, loadRandomWord } from './game/GameLogicHandler'
import GameKeyboard from './components/GameKeyboard'

export interface GameContextType {
   rowIndex: number
   colIndex: number
   keypressHandler: (eventKey: string) => void
}

export const GameContext = React.createContext<GameContextType | undefined>(undefined)

const App: React.FC = () => {
   // Used for rendering the in-game keyboard
   const [m_keyData, setKeyData] = React.useState<Map<string, CHAR_STATE>>(new Map())
   const [m_gameData, setGameData] = React.useState<GameData>(new GameData())
   const [m_gameContext, setGameContext] = React.useState<GameContextType>()

   const onKeyPress = (eventKey: string): void => {
      const opResult: GameOperationResult = GameLogic.handlePlayerInput(eventKey, m_gameData, m_keyData)
      setGameData(opResult.gameData)
      setKeyData(opResult.keyData)

      switch (opResult.status) {
         case GAME_OP_STATUS.OP_SUCCESS:
            break
         case GAME_OP_STATUS.WIN:
            console.log("Winner chicken dinner")
            break
         case GAME_OP_STATUS.LOSE:
            console.log("Losers weepers")
            break
      }
   }

   React.useEffect(() => {
      const wordOfTheDay = loadRandomWord()
      const gameData = GameLogic.createGameData(wordOfTheDay, 7)
      setGameData(gameData)
      setKeyData(GameLogic.initializeKeyData())

      setGameContext({ 
         rowIndex: gameData.rowIndex, 
         colIndex: gameData.colIndex,
         keypressHandler: onKeyPress 
      })

      console.log("Word of the day: ", wordOfTheDay)
   }, [])

   React.useEffect(() => {
      setGameContext({
         rowIndex: m_gameData.rowIndex,
         colIndex: m_gameData.colIndex,
         keypressHandler: onKeyPress
      })
   }, [m_gameData])

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
      onKeyPress(evt.key)
   })

   return (
      <GameContext.Provider value={m_gameContext}>
         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Navbar />
            <WordleGame gameData={m_gameData} />
            <GameKeyboard keyData={m_keyData} />
         </div>
      </GameContext.Provider>
   )
}

export default App
