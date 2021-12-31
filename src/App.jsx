import { useEffect } from 'react'
import './App.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vwave from './pics/vwave.jpg'
import medusa from './pics/medusa.png'
import test from './pics/test.jpg'
import sun from './pics/sun.png'
import devin from './pics/devin.png'


function App() {



  useEffect(()=>{ 
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  const renderer = new THREE.WebGLRenderer()

  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight)
  document.body.appendChild( renderer.domElement)
  renderer.render( scene, camera )

//   const verticesOfCube = [
//     -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
//     -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
// ];

// const indicesOfFaces = [
//     2,1,0,    0,3,2,
//     0,4,7,    7,3,0,
//     0,1,5,    5,4,0,
//     1,2,6,    6,5,1,
//     2,3,7,    7,6,2,
//     4,5,6,    6,7,4
// ];
  

  const polyTexture = new THREE.TextureLoader().load(medusa)
  const geometry = new THREE.SphereGeometry(3, 26, 26)
  const material = new THREE.MeshStandardMaterial( { 
    map: polyTexture
  } )
  const poly = new THREE.Mesh( geometry, material )
  
  scene.add(poly)
  poly.position.z = 5
  poly.position.setX(-10)
  camera.position.z = 10

  const polyTexture2 = new THREE.TextureLoader().load(test)
  const material2 = new THREE.MeshStandardMaterial( { 
    map: polyTexture2
  } )
  const poly2 = new THREE.Mesh( geometry, material2 )
  
  scene.add(poly2)
  poly2.position.z = 25
  poly2.position.setX(-10)

  const polyTexture3 = new THREE.TextureLoader().load(sun)
  const material3 = new THREE.MeshStandardMaterial( { 
    map: polyTexture3
  } )
  const poly3 = new THREE.Mesh( geometry, material3 )
  
  scene.add(poly3)
  poly3.position.z = 45
  poly3.position.setX(-10)



  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(10, 10, 10)

  scene.add(pointLight)

  const lightHelper = new THREE.PointLightHelper(pointLight)
  const gridHelper = new THREE.GridHelper(200, 50)
  // scene.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera, renderer.domElement)

  function newStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial( { 
      color: 0x00ffff, 
      roughness: 0.1,
      metalness: 0.4
    })
    const star = new THREE.Mesh( geometry, material )
    const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 100 ))
    
    star.position.set(x, y, z)

    scene.add(star)
  }

  Array(500).fill().forEach(newStar)

  const texture = new THREE.TextureLoader().load(vwave)
  scene.background = texture

  function cameraScroll(){ 
    const top = document.body.getBoundingClientRect().top
    poly.rotation.x += 0.1
    poly.rotation.y += 0.125
    poly.rotation.z += 0.125
    poly2.rotation.x += 0.1
    poly2.rotation.y += 0.125
    poly2.rotation.z += 0.125
    poly3.rotation.x += 0.2
    poly3.rotation.y += 0.225
    poly3.rotation.z += 0.2
    camera.position.z = top * -0.1
    camera.position.x = top * -0.02
    camera.rotation.y = top * -0.02
  }

  document.body.onscroll = cameraScroll

  function animate() {
    requestAnimationFrame( animate )
    poly.rotation.x += 0.05
    poly.rotation.y += 0.005
    poly.rotation.z += 0.05
    poly2.rotation.x += -0.05
    poly2.rotation.y += -0.005
    poly2.rotation.z += -0.05
    poly3.rotation.x += 0.05
    poly3.rotation.y += 0.005
    poly3.rotation.z += 0.05

    controls.update()

    renderer.render( scene, camera )
  }

  animate()
},[])

  return (
  <div>
  </div>
  )
}

export default App
