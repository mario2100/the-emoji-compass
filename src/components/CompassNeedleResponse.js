import React, { useRef, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useSpring, animated, config } from 'react-spring'
import { addRequestEmoji, updateNeedlePosition, setActiveNeedle } from '../store/actions/app'
import { random, getUniqueRandomIntegers, getRotation } from '../utils'
import { autoRotateNeedle } from '../scripts'
import symbols from '../symbols.json'
import './CompassNeedle.css'

const INHERENT_NEEDLE_ID = 200
const INHERENT_NEEDLE_TYPE = 'response'

function CompassNeedleResponse (props) {
  const symbols = useSelector(state => state.app.symbols)
  const activeNeedle = useSelector(state => state.app.activeNeedle)
  const dispatch = useDispatch()
  const el = useRef(null)

  const initialRotation = random() * 360 // Set at random start position

  // for now auto-rotate 1 number on render.
  const numberOfSymbols = symbols.length
  const randomNumbers = getUniqueRandomIntegers(numberOfSymbols, 3)
  const responseEmojis = randomNumbers.map((num) => symbols[num])
  const rotateDirection = Math.round(random()) ? 1 : -1
  const rotateQuantity = Math.ceil(random()) // a number between 2 and 3 inclusive
  const rotateTo = getRotation(randomNumbers[0], numberOfSymbols) + (360 * rotateQuantity * rotateDirection)

  const spring = useSpring({
    from: {
      rotate: initialRotation,
      transform: `rotate(${initialRotation}deg)`
    },
    to: {
      rotate: rotateTo,
      transform: `rotate(${rotateTo}deg)`
    },
    config: {
      mass: 10,
      tension: 160,
      friction: 60,
    }
  })

  useEffect(() => {
    // Set needle width according to actual circle dimensions
    setElementSize()
    window.addEventListener('resize', setElementSize)
  
    return () => {
      window.removeEventListener('resize', setElementSize)
    }
  })

  function setElementSize () {
    const circleSize = document.getElementById('ring').getBoundingClientRect().width
    const ratio = 0.425
    el.current.style.width = (ratio * circleSize) + 'px'
  }

  return (
    <>
      {/* Debug */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
        textAlign: 'left',
        fontFamily: "'Courier New', 'Courier', 'monospace'",
        textShadow: 'none',
        color: 'red',
        fontWeight: 'bold'
      }}>
        start: {initialRotation.toFixed(2)}°<br />
        end: {rotateTo}°<br />
        current: <animated.span>{spring.rotate}</animated.span>°
      </div>
      <animated.div
        className="needle needle-response"
        ref={el}
        style={spring}
      />
    </>
  )
}

// addRequestEmoji: (emoji) => { dispatch(addRequestEmoji(emoji)) },
// updateNeedlePosition: (rotation) => { dispatch(updateNeedlePosition(rotation)) },
// setActiveNeedle: (needleId) => { dispatch(setActiveNeedle(needleId)) }

export default CompassNeedleResponse