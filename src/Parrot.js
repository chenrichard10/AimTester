import React from 'react';
import { Canvas, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, Html, draco } from 'drei'
// Will be updated later
function Model({ url }) {
    const { scene } = useLoader(GLTFLoader, url, draco())
    return <primitive object={scene} dispose={null} />
}
  
export default Model;
