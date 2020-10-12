import React, { useRef, useState, useEffect} from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { Html, draco } from 'drei'
import './styles.css'
import {gameOver, generatePosition, checkScore} from './game'
import Timer from 'react-compound-timer'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered for colour change 
  const [hovered, setHover] = useState(false)


  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


function ScoreBoard(props) { 
  return (
    <div> 
      <h1> Total Score: {props.score}</h1>
    </div>
  )
}


function PlayAgain(props) { 
  return (
    <button onClick={() => props.reset(true)}>
        Play Again
    </button>
  )
}


  function Game(props) { 
    const [showBox, setShowBox] = React.useState(true)
    const [count, setCount] = useState(0)
    const [repeat, setRepeat] = useState(1)

    const handleClick = () => {
      setShowBox(!showBox)
      setCount(count + 1)
    }

    useEffect(() => {
      if (count === 10) {
        props.pause();
      }  
    }, [count, props.pause]);
    

    useEffect(() => {
      if (count === 10) {
        setRepeat(0);
      }  
    }, [count, setRepeat]); 


    useEffect(() => {
      if (props.again) {
        setCount(0);
        props.reset();
      }
    }, [props.again, props.reset]);

    return (
      <> 
    <ScoreBoard score={count}/>
      {gameOver(count) && repeat ?
      (<Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} /> 
        {showBox && <Box onClick={handleClick} position={generatePosition()} />}
        {!showBox && <Box onClick={handleClick} position={generatePosition()} />}
      </Canvas>)  : (<div> <h1> Game Over!</h1></div>) }
      </>
    )
  }

export default function App() {
  const [isReset, setisReset] = React.useState(false);
  return (
    <Timer initialTime={0}>
      {({ start, resume, pause, stop, reset})  => (
      
      <React.Fragment>
        <div>
            <Timer.Seconds /> seconds, 
            <Timer.Milliseconds /> milliseconds
        </div>
        <div>
            <button onClick={reset}> New </button>
        </div>
        <PlayAgain reset={setisReset}/>
        <Game pause={pause} reset={reset} again={isReset}/>
        
    </React.Fragment>)
    }
    </Timer>
   
  )
}

