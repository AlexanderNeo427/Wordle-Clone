import { useAnimate } from 'framer-motion'
import React from 'react'

interface GridBlockProps {
   idx: number
   
}

const GridBlock: React.FC<GridBlockProps> = props => {
   const [m_char, setChar] = React.useState<string>("")
   const [scope, animate] = useAnimate()

   const charSetter = (char: string): void => {
      // TODO: Your own processing
      setChar(char)
   }

   return (
      <div
         ref={scope}
         style={{
            width: "60px", height: "60px",
            textAlign: "center",
            fontSize: "3rem", fontFamily: "Neue Helvetica", fontWeight: "lighter",
            outline: "2px solid lightgray"
         }}
      >
         {m_char}
      </div>
   )
}

export default GridBlock