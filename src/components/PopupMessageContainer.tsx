import React from 'react'
import PopupMessage from './PopupMessage'
import { PopupMessageData } from '../App'

interface PopupMessageContainerProps {
   allPopupMessageData: PopupMessageData[]
   popupMessageDataSetter: React.Dispatch<React.SetStateAction<PopupMessageData[]>>
}

const getContainerStyles = (): React.CSSProperties => {
   const css = {} as React.CSSProperties

   // Layout
   css.display = "flex"
   css.flexDirection = "column"
   css.justifyContent = "flex-start"
   css.alignItems = "center"
   css.gap = "0.7rem"

   // Positioning & Size
   css.position = "absolute"
   css.width = "100vw"
   css.height = "100vh"
   css.zIndex = 5
   css.top = "5rem"

   return css
}

const PopupMessageContainer: React.FC<PopupMessageContainerProps> = props => {
   const removePopupMessage = (idToRemove: number): void => {
      props.popupMessageDataSetter(popupMessages => {
         return popupMessages.filter(msg => msg.id !== idToRemove)
      })
   }

   return (
      <div style={getContainerStyles()}>{
         props.allPopupMessageData.map(msgData => {
            return (
               <PopupMessage
                  key={msgData.id} id={msgData.id}
                  content={msgData.content}
                  popupMessagesRemover={removePopupMessage}
               />
            )
         })
      }</div>
   )
}

export default PopupMessageContainer