import { useEffect, useState } from 'react'
import './App.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vwave from './pics/vwave.jpg'
import medusa from './pics/medusa.png'
import test from './pics/test.jpg'
import basketball from './pics/basketball.jpg'
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import { send } from 'emailjs-com';


function App() {

  const [toSend, setToSend] = useState({
    from_name: '',
    message: '',
    reply_to: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if(toSend.from_name != '' && toSend.message != '' && toSend.reply_to.includes('@'))
    send(
      'service_a3ugg8g',
      'template_ix17p4p',
      toSend,
      'user_VV3aStZF2GsejfG0iRyQj'
    )
      .then((response) => {
        alert('thanks, get back to you soon!');
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
      else {
       alert('please fill out the required fields so we can actually talk!')
      }
      setToSend({
        from_name: '',
        message: '',
        reply_to: ''
      })
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  useEffect(()=>{ 
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000)
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
  poly2.position.z = 60
  poly2.position.setX(15)

  const polyTexture3 = new THREE.TextureLoader().load(basketball)
  const material3 = new THREE.MeshStandardMaterial( { 
    map: polyTexture3
  } )
  const poly3 = new THREE.Mesh( geometry, material3 )
  
  scene.add(poly3)
  poly3.position.z = 90
  poly3.position.setX(0)



  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(10, 10, 10)

  const ambientLight = new THREE.AmbientLight(0xffffff)

  scene.add(ambientLight)

  const lightHelper = new THREE.PointLightHelper(pointLight)
  const gridHelper = new THREE.GridHelper(200, 50)
  // scene.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera, renderer.domElement)

  function newStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial( { 
      color: 0x00ffff, 
      roughness: 0.5,
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
    poly.rotation.x += 0.01
    poly.rotation.y += 0.005
    poly.rotation.z += 0.01
    poly2.rotation.x += -0.01
    poly2.rotation.y += -0.005
    poly2.rotation.z += -0.01
    poly3.rotation.x += 0.01
    poly3.rotation.y += 0.005
    poly3.rotation.z += 0.01
    camera.position.z = top * -0.1
    camera.position.x = top * -0.02
    camera.rotation.y = top * -0.02
  }

  document.body.onscroll = cameraScroll

  function animate() {
    requestAnimationFrame( animate )
    poly.rotation.x += 0.01
    poly.rotation.y += 0.005
    poly.rotation.z += 0.01
    poly2.rotation.x += -0.01
    poly2.rotation.y += -0.005
    poly2.rotation.z += -0.01
    poly3.rotation.x += 0.01
    poly3.rotation.y += 0.005
    poly3.rotation.z += 0.01

    controls.update()

    renderer.render( scene, camera )
  }

  animate()
},[])



  return (
    <>

<body>

      <header>
        <h1>devin mullin</h1>
        <h4>software engineer</h4>
      </header>
      <section>
        <strong>skills:</strong>
        <br/>
        - JavaScript, React, three.js, Ruby, SQL, PowerShell
        <br/>
        - Rails, Vite, Postman, Sinatra, SQLite, ActiveRecord, JIRA, Ubuntu, Git, Windows Server
        </section>
        <section>
            <strong>about:</strong>
            <br/>
            - New Orleans => Austin
            <br/>
            - former System Administrator / current IT guy
            <br/>
            - big on gaming, basketball, and horror movies
            <br/>
            - comedy writer, former variety show host
        </section>
        <section>
          <strong>projects:</strong>
        </section>
    
    <section>
    <strong>contact:</strong>
  <form className="form" onSubmit={onSubmit}>
    <textarea
    type='text'
    className='input'
    name='from_name'
    placeholder='your name'
    value={toSend.from_name}
    onChange={handleChange}
  />
  <br/>
  <textarea
    type='text'
    name='reply_to'
    className='input'
    placeholder='your email'
    value={toSend.reply_to}
    onChange={handleChange}
  />
  <br/>
  <textarea
    type='text'
    name='message'
    className='message'
    wrap="soft"
    placeholder='your message...'
    value={toSend.message}
    onChange={handleChange}
  />
  <br/>
  <button className="button" type='submit'>Submit</button>
</form>
      </section>
<section>
<div className="icons">
      <br/>
      <BsLinkedin className="icon" onClick={()=>window.open("https://www.linkedin.com/in/devin-mullin-753104113/")} style={{cursor: "pointer"}}/>
      <br/>
      <BsGithub className="icon" onClick={()=>window.open("https://github.com/devin-mullin")} style={{cursor: "pointer"}}/>
      <br/>
    </div>
</section>
    </body>
</>
  )
}

export default App
