import React from 'react'

interface GridBlockProps {
   idx: number
   word: string
   gridLength: number
}

const GridBlock: React.FC<GridBlockProps> = props => {

   return (
      <div
         style={{
            width: "60px", height: "60px",
            textAlign: "center",
            fontSize: "3rem", fontFamily: "Neue Helvetica", fontWeight: "lighter",
            outline: "2px solid lightgray"
         }}
      >
      </div>
   )
}

export default GridBlock