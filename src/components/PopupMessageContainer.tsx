import React from 'react'
import useInputHandler from '../hooks/useInputHandler'
import PopupMessage from './PopupMessage'
import { GameContext, GameContextType, PopupMessageData } from '../App'

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
   // const flagMessageForRemoval = (idToFlag: number): void => {
   //    props.popupMessageDataSetter(popupMessages => {
   //       // 'newPopupMessages' - copy of popupMessages, but with the msg of 'idToFlag' being flagged for removal
   //       const newPopupMessages = popupMessages.map(msg => {
   //          return msg.id === idToFlag ?
   //             { ...msg, flaggedForRemoval: true } as PopupMessageData : msg
   //       }) as PopupMessageData[]
   //
   //       // If ALL messages are flagged for removal - clear everything (return empty arr)
   //       const messagesFlaggedForRemoval = newPopupMessages.filter(msg => msg.flaggedForRemoval) as PopupMessageData[]
   //       if (messagesFlaggedForRemoval.length === newPopupMessages.length) {
   //          return []
   //       }
   //       return newPopupMessages
   //    })
   // }
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