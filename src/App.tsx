import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import Navbar from './components/Navbar'
import WordleGame from './components/WordleGame'
import { CHAR_STATE, GAME_OP_STATUS, GameData, GameLogic, loadRandomWord } from './game/GameLogicHandler'
import GameKeyboard from './components/GameKeyboard'

const App: React.FC = () => {
   // Used for rendering the in-game keyboard
   const [m_keyData, setKeyData] = React.useState<Map<string, CHAR_STATE>>(new Map())
   const [m_gameData, setGameData] = React.useState<GameData>(new GameData())

   // Initialization
   React.useEffect(() => {
      setKeyData(GameLogic.initializeKeyData())

      const wordOfTheDay = loadRandomWord()
      const gameData = GameLogic.createGameData(wordOfTheDay, 7)
      setGameData(gameData)

      console.log("Word of the day: ", wordOfTheDay)
   }, [])

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
      const opResult = GameLogic.handlePlayerInput(evt.key, m_gameData, m_keyData)
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
   })

   return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
         <Navbar />
         <WordleGame gameData={m_gameData} />
         <GameKeyboard keyData={m_keyData}/>
      </div>
   )
}

export default App
