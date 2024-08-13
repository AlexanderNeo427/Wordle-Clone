import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import Navbar from './components/Navbar'
import WordleGame from './components/WordleGame'
import { GAME_OP_STATUS, GameData, GameLogic } from './game/GameLogicHandler'

const WORDLIST_PATH = ""

// Style Params
const GAP_PX = 10

const App: React.FC = () => {
   const [m_gameData, setGameData] = React.useState<GameData>(new GameData())

   // Initialization
   React.useEffect(() => {
      setGameData(GameLogic.createGameData(6, 5))
   }, [])

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
      const opResult = GameLogic.handlePlayerInput(m_gameData, evt.key)
      if (opResult.status === GAME_OP_STATUS.SUCCESS) {
         setGameData(opResult.gameData)
      }
      console.log("End inputHandler, key: ", evt.key)
   })
   
   return (
      <div>
         <Navbar /> 
         <WordleGame gameData={m_gameData}/>
         {/* <GameKeyboard keyData={m_keyData}/> */}
      </div>

   )
}

export default App
