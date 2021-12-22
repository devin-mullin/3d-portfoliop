import { useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import Player from './Player'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {useSound } from 'use-sound'


function App() {



  useEffect(()=>{ 
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  const renderer = new THREE.WebGLRenderer()

  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight)
  document.body.appendChild( renderer.domElement)
  renderer.render( scene, camera )

  const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];
  
  const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 )
  const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
  const poly = new THREE.Mesh( geometry, material )
  
  scene.add(poly)
  camera.position.z = 10

  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(6, 6, 6)

  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(pointLight)

  const lightHelper = new THREE.PointLightHelper(pointLight)
  const gridHelper = new THREE.GridHelper(200, 50)
  scene.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera, renderer.domElement)

  function animate() {
    requestAnimationFrame( animate )
    poly.rotation.x += 0.01
    poly.rotation.y += 0.005
    poly.rotation.z += 0.01

    controls.update()

    renderer.render( scene, camera )
  }

  animate()
},[])

  return (

  <Player className="player" />

  )
}

export default App
