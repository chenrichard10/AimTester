import React, { useRef, useState, useEffect} from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import './styles.css'
import {gameOver, generatePosition, checkScore} from './game'
import Instructions from './components/Instructions'
import Timer from 'react-compound-timer'
import { Container, Row, Col, Button, Jumbotron } from 'react-bootstrap'
import axios from 'axios';

const GROUND_HEIGHT = -50;

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
    <Container>
    <Row className="justify-content-md-center">
      <Col md="auto">
        Total Score: {props.score}
      </Col>
    </Row>
    </Container>
  )
}


function PlayAgain(props) { 
  return (
    <Button onClick={() => 
        props.reset(true)}>
        Play Again
    </Button>
  )
}

function Terrain() {
  const terrain = useRef();

  useFrame(() => {
    terrain.current.position.z += 0.4;
  });
  return (
    <mesh
      visible
      position={[0, GROUND_HEIGHT, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  );
}

function TopScores(props) {
  const [scoreData, setScoreData] = useState(0);

  useEffect(() => {
  axios.get('http://localhost:5000/api/scores')
  .then(function (response) {
    // handle success
    setScoreData(response.data[0].scores);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  },[]);
  return(
  <Container>
    <Row className="justify-content-md-center">
      <Col md="auto">
        {"Top Scores:" + scoreData}
      </Col>
    </Row>
    </Container>
  )
}


  function Game(props) { 
    console.log("Play again?")
    console.log(props.again)
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
        setRepeat(1);
        props.reset();
        props.change(false);
        props.start();
      }
    }, [props.again, props.reset]);

    return (
      <> 
    <ScoreBoard score={count}/>
    <Canvas>
      <Terrain></Terrain>
      {gameOver(count) && repeat ?
      (
        <mesh>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} /> 
        {showBox && <Box onClick={handleClick} position={generatePosition()} />}
        {!showBox && <Box onClick={handleClick} position={generatePosition()} />}
        </mesh>
        ) : null }
        </Canvas>
      </>
    )
  }


export default function App() {
  const [isReset, setisReset] = React.useState(false);
  const [isNew, setisNew] = React.useState(true);
  return (
    <>
    
    {!isNew ? (<Timer initialTime={0}>
      {({ start, resume, pause, stop, reset})  => (
      <React.Fragment>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
            <Timer.Seconds /> seconds, 
            <Timer.Milliseconds /> milliseconds
            </Col>
            <Col md="auto">
            </Col>
          </Row>
        </Container>
        <Game pause={pause} reset={reset} 
              start={start} again={isReset} 
              change={setisReset}   />
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <PlayAgain reset={setisReset} />
            </Col>
          </Row>
        </Container>
        
        
    </React.Fragment>)
    }
    </Timer>) : 
      <Container>
        <TopScores/>
        <Jumbotron >
          <h1>AimTesting: A Simple Game to practice mouse aim</h1>
          <p> As a way to learn some React, Three.js and help improve my aim, 
              I created this aim-clicking game. 
          </p>
          <p>
        <Instructions/>
          </p>
        </Jumbotron>
        <Row className="justify-content-md-center">
            <Col md="auto">
            <Button onClick = {() => setisNew(false)}> New Game </Button>
            </Col>
        </Row>
      </Container>}
    </>
  )
}

