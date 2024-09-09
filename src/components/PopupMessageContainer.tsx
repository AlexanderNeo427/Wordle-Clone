import React from 'react'
import useInputHandler from '../hooks/useInputHandler'
import PopupMessage from './PopupMessage'

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

class PopupMessageData {
   id: number
   content: string
   flaggedForRemoval: boolean 

   constructor(id: number, content: string) {
      this.id = id
      this.content = content
      this.flaggedForRemoval = false
   }
}

const PopupMessageContainer: React.FC = () => {
   const [m_popupMessagesData, setPopupMessagesData] = React.useState<PopupMessageData[]>([])
   const [_, setNextAvailableID] = React.useState<number>(0)

   useInputHandler((evt: KeyboardEvent) => {
      // console.log("PopupMessageContainer - Key Pressed: ", evt.key)
      if (evt.key !== "Backspace") {
         return
      }
      // console.log("PopupMessageContainer | Backspace was pressed....")
      setNextAvailableID(id => {
         const nextID = id + 1
         setPopupMessagesData(popupMessagesData => {
            return [
               new PopupMessageData(nextID, "Message of ID: " + nextID),
               ...popupMessagesData
            ]
         })
         return nextID
      })
   })
   
   const flagMessageForRemoval = (idToFlag: number): void => {
      setPopupMessagesData(popupMessages => {
         // 'newPopupMessages' - copy of popupMessages, but with the msg of 'idToFlag' being flagged for removal
         const newPopupMessages = popupMessages.map(msg => {
            return msg.id === idToFlag ? 
               {...msg, flaggedForRemoval: true } as PopupMessageData : msg
         }) as PopupMessageData[]

         // If ALL messages are flagged for removal - clear everything (return empty arr)
         const messagesFlaggedForRemoval = newPopupMessages.filter(msg => msg.flaggedForRemoval) as PopupMessageData[]
         if (messagesFlaggedForRemoval.length === newPopupMessages.length) {
            return []
         }
         return newPopupMessages
      })
   }

   return (
      <div style={getContainerStyles()}>{
         m_popupMessagesData.map(msgData => {
            return (
               <PopupMessage
                  key={msgData.id} id={msgData.id}
                  content={msgData.content}
                  popupMessagesRemover={flagMessageForRemoval}
               />
            )
         })
      }</div>
   )
}

export default PopupMessageContainer