import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import Navbar from './components/Navbar'
import WordleGame from './components/WordleGame'
import { GameData, GameLogic } from './game/GameLogicHandler'

const WORDLIST_PATH = ""

// Style Params
const GAP_PX = 10

const App: React.FC = () => {
   const [m_gameData, setGameData] = React.useState<GameData>(new GameData())

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
   })

   React.useEffect(() => {
      setGameData(GameLogic.createGameData(6, 5))
   }, [])

   return (
      <div>
         <Navbar /> 
         <WordleGame gameData={m_gameData}/>
         {/* <GameKeyboard keyData={m_keyData}/> */}
      </div>

   )
}

export default App
