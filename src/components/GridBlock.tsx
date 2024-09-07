import { AnimationControls, useAnimate, useAnimation } from 'framer-motion'
import React from 'react'

interface GridBlockProps {
   idx: number
   charArr: string[]
}

const getStyles = (idx: number, charArr: string[]): React.CSSProperties => {
   const ch: string = charArr[idx]

   const styles = {} as React.CSSProperties
   styles.width = "60px"
   styles.height = "60px"
   styles.textAlign = "center"
   styles.fontSize = "3rem"
   styles.fontFamily = "Neue Helvetica"
   styles.fontWeight = "lighter"
   styles.display = "flex" 
   styles.justifyContent = "center"
   styles.alignItems = "center"
   styles.outline = (ch === " ") ? "2px solid lightgray" : "2px solid darkgray"
   return styles
}

const GridBlock: React.FC<GridBlockProps> = props => {
   const [scope, animate] = useAnimate()

   React.useEffect(() => {
      const animAsync = async () => {
         await animate(scope.current, { scale: 1.2 }, { duration: 0.05 })
         await animate(scope.current, { scale: 1 }, { duration: 0.05 })
      }
      animAsync()
   }, [props.charArr[props.idx]])

   return (
      <div ref={scope} style={getStyles(props.idx, props.charArr)}>
         {props.charArr[props.idx]}
      </div>
   )
}

export default GridBlock