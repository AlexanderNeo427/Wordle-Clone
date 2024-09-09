import { useAnimate, Variant } from 'framer-motion'
import React from 'react'
import { CHAR_STATE } from '../game/GameLogicHandler'
import { AppColors } from '../globals'
import { GameContext } from '../App'

interface GridBlockProps {
   idx: number
   charArr: string[]
   charState: CHAR_STATE

   guessIsCorrect: boolean
}

const getStyles = (idx: number, charArr: string[]): React.CSSProperties => {
   const ch: string = charArr[idx]

   const styles = {} as React.CSSProperties
   styles.width = "3.7rem"
   styles.height = "3.7rem"
   styles.textAlign = "center"
   styles.fontSize = "2.8rem"
   styles.fontFamily = "Neue Helvetica"
   styles.fontWeight = "lighter"
   styles.display = "flex"
   styles.justifyContent = "center"
   styles.alignItems = "center"
   styles.outline = (ch === " ") ? "2px solid lightgray" : "2px solid darkgray"
   styles.background = "white"
   styles.color = "black"
   return styles
}

const colorFromCharState = (charState: CHAR_STATE): string => {
   switch (charState) {
      case CHAR_STATE.WRONG:
         return AppColors.GRAY
      case CHAR_STATE.HALF_CORRECT:
         return AppColors.YELLOW
      case CHAR_STATE.CORRECT:
         return AppColors.GREEN
      default:
         return "white"
   }
}

const GridBlock: React.FC<GridBlockProps> = props => {
   const [scope, animate] = useAnimate()
   const m_gameCtx = React.useContext(GameContext)

   React.useEffect(() => {
      if (!props.guessIsCorrect) {
         return
      }
    
      const delay = async (seconds: number): Promise<void> => {
         return new Promise(resolve => setTimeout(resolve, seconds * 1000))
      }
      const cardDanceAnim = async(): Promise<void> => {
         await delay((props.charArr.length * 0.12) + (props.idx * 0.1)) 

         // Last card - Responsible for pushing the congratulatory message to the user
         if (props.idx === props.charArr.length - 1) {
            m_gameCtx?.pushMessage("Great!") 
         }

         for (let y = 18; y > 0; y-=3.5) {
            await animate(scope.current, { translateY: -y } as Variant, { duration: 0.1 })
            await animate(scope.current, { translateY: 0 } as Variant, { duration: 0.1 })
         }
      }
      cardDanceAnim()
   }, [props.guessIsCorrect])

   React.useEffect(() => {
      const animAsync = async () => {
         await animate(scope.current, { scale: 1.2 } as Variant, { duration: 0.05 })
         await animate(scope.current, { scale: 1 } as Variant, { duration: 0.05 })
      }
      animAsync()
   }, [props.charArr[props.idx]])

   React.useEffect(() => {
      if (props.charState === CHAR_STATE.NIL) {
         return
      }
      const animAsync = async () => {
         await animate(scope.current, { rotateX: 90 } as Variant, { duration: 0.25 })
         await animate(scope.current, {
            background: colorFromCharState(props.charState),
            color: "white"
         } as Variant, { duration: 0 })
         await animate(scope.current, { rotateX: 0 } as Variant, { duration: 0.25 })
      }
      animAsync()
   }, [props.charState])

   return (
      <div ref={scope} style={getStyles(props.idx, props.charArr)}>
         {props.charArr[props.idx]}
      </div>
   )
}

export default GridBlock