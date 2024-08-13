import React from 'react'

const WordleGame = props => {
   return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
         <div style={{ display: "flex", flexDirection: "column", gap: String(5) + "px" }}>
            {/* {
                  m_gameData.map((GameRowData, idx) => {
                     return <GridRow key={idx} GameRowData={GameRowData} gap_px={GAP_PX} />
                  })
               } */}
         </div>

      </div>
   )
}

export default WordleGame