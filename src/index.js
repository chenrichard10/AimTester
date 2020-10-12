import React, { useRef, useState, Suspense} from 'react'
import ReactDOM from 'react-dom';
import './styles.css'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'

import App from './App'


ReactDOM.render(<App />, document.getElementById('root'))