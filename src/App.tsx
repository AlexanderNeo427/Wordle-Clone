import React from 'react'

const WORDLIST_PATH = ""
const WORD_LENGTH = 5
const NUM_ROWS = 5

const randIntRange = (min: number, max: number): number => {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min)) + min
}

enum LETTER_STATE {
   CORRECT, // Correct letter - Correct position
   HALF_CORRECT, // Correct letter - Wrong position
   WRONG // Self-explanatory
}

class GameRow {
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

   const handlePlayerInput = (evt: KeyboardEvent): void => {
      evt.preventDefault()
      if (!m_inputEnabled) return

      // if (!isAlphabetChar && evt.key !== 'Enter' && evt.key !== 'Backspace') {
      //    return
      // }
      
      if (!m_allowedKeys.has(evt.key)) return

      const isAlphabetChar = /^[a-zA-Z]$/.test(evt.key)
      if (isAlphabetChar) {
         const lettersSoFar = m_gameData[m_rowIndex].letters
         if (lettersSoFar.length < WORD_LENGTH) {
            m_gameData[m_rowIndex].letters += evt.key
         }
      }
      else if (evt.key === 'Enter') {
         
      }
      else if (evt.key === 'Backspace' || evt.key === 'Delete') {
         const numLetters = m_gameData[m_rowIndex].letters.length 
         const oneLessLetter = Math.max(0, numLetters - 1)
         m_gameData[m_rowIndex].letters = m_gameData[m_rowIndex].letters.substring(0, oneLessLetter)
      }
   }

   // TODO
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

      // Register keyboard-handler/input-listener
      document.addEventListener('keydown', evt => {
         handlePlayerInput(evt)
         console.log(m_gameData)
      })
   }, [])

   return (
      <>
      </>
   )
}

export default App
