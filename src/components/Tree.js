import React, { useRef, useState, Suspense} from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'

// This tree will be used for later additions of the game
function createTree(props){
	let sides=8;
	let tiers=6;
    let scalarMultiplier=(Math.random()*(0.25-0.1))+0.05;
	let midPointVector= new THREE.Vector3();
	let vertexVector= new THREE.Vector3();
	let treeGeometry = new THREE.ConeGeometry( 0.5, 1, sides, tiers);
	let treeMaterial = new THREE.MeshStandardMaterial( { color: 0x33ff33,shading:THREE.FlatShading  } );
	let offset;
	midPointVector=treeGeometry.vertices[0].clone();
	let currentTier=0;
	let vertexIndex;
	let treeTop = new THREE.Mesh( treeGeometry, treeMaterial );
	treeTop.castShadow=true;
	treeTop.receiveShadow=false;
	treeTop.position.y=0.9;
	treeTop.rotation.y=(Math.random()*(Math.PI));
	let treeTrunkGeometry = new THREE.CylinderGeometry( 0.1, 0.1,0.5);
	let trunkMaterial = new THREE.MeshStandardMaterial( { color: 0x886633,shading:THREE.FlatShading  } );
	let treeTrunk = new THREE.Mesh( treeTrunkGeometry, trunkMaterial );
	treeTrunk.position.y=0.25;
	let tree =new THREE.Object3D();
	tree.add(treeTrunk);
	tree.add(treeTop);
	return tree;
}

