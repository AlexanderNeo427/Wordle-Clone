import React from 'react'

const useInputHandler = (inputHandler: (evt: KeyboardEvent) => void): void => {
   React.useEffect(() => {
      window.addEventListener('keydown', inputHandler)

      return () => {
         window.removeEventListener('keydown', inputHandler)
      }
   }, [inputHandler])
}

export default useInputHandler