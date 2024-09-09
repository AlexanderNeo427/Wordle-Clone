import { useAnimate, Variant } from 'framer-motion'
import React from 'react'

interface PopupMessageProps {
   id: number
   content: string

   popupMessagesRemover: (id: number) => void
}

const popupStyles = (): React.CSSProperties => {
   const css = {} as React.CSSProperties
   css.background = "black"
   css.color = "white"
   css.textAlign = "center"
   css.borderRadius = "0.25rem"
   css.padding = "0.5rem"
   css.opacity = 1
   return css
}

const PopupMessage: React.FC<PopupMessageProps> = props => {
   const [scope, animate] = useAnimate()

   React.useEffect(() => {
      const delay = async (seconds: number): Promise<void> => {
         return new Promise(resolve => setTimeout(resolve, seconds * 1000))
      }
      const asyncAnim = async () => {
         await delay(1.25)
         await animate(scope.current, { opacity: 0.01 } as Variant, { duration: 0.7 })
         await delay(0.1)
         props.popupMessagesRemover(props.id)
      }
      asyncAnim()
   }, [])

   return (
      <div ref={scope} style={popupStyles()}>{props.content}</div>
   )
}

export default PopupMessage