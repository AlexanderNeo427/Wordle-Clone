import React from 'react'

const useInputHandler = (inputHandler: (evt: KeyboardEvent) => void): void => {
   React.useEffect(() => {
      console.log("Registering inputHandler....")
      window.addEventListener('keydown', inputHandler)
      console.log("Success register inputHandler!")

      return () => {
         console.log("Removing inputHandler....")
         window.removeEventListener('keydown', inputHandler)
         console.log("Success removing inputHandler!")
      }
   }, [inputHandler])   
}

export default useInputHandler