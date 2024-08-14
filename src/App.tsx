import React from 'react'
import useInputHandler from './hooks/useInputHandler'
import Navbar from './components/Navbar'
import WordleGame from './components/WordleGame'
import { GAME_OP_STATUS, GameData, GameLogic, loadRandomWord } from './game/GameLogicHandler'

const WORDLIST_PATH = ""

// Style Params
const GAP_PX = 10

interface RenderParamsContext {
   blockWidth: number
   blockHeight: number
}

const renderParamsCtx = React.createContext<RenderParamsContext | null>(null)

const App: React.FC = () => {
   const [m_gameData, setGameData] = React.useState<GameData>(new GameData())

   // Initialization
   React.useEffect(() => {
      const wordOfTheDay = loadRandomWord()
      const gameData = GameLogic.createGameData(wordOfTheDay, 7)
      setGameData(gameData)

      console.log("Word of the day: ", wordOfTheDay)
   }, [])

   useInputHandler((evt: KeyboardEvent) => {
      evt.preventDefault()
      const opResult = GameLogic.handlePlayerInput(m_gameData, evt.key)
      if (opResult.status === GAME_OP_STATUS.SUCCESS) {
         setGameData(opResult.gameData)
      }
   })

   return (
      <div>
         <Navbar />
         <WordleGame gameData={m_gameData} />
         {/* <GameKeyboard keyData={m_keyData}/> */}
      </div>

   )
}

export default App
