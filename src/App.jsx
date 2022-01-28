import { useEffect, useState } from 'react'
import './App.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import medusa from './pics/medusa.jpg'
import test from './pics/test.jpg'
import vwave from './pics/vwave.jpg'
import basketball from './pics/basketball.jpg'
import { BsLinkedin, BsGithub, BsMedium, BsFileText } from 'react-icons/bs'
import { send } from 'emailjs-com';
import DevinMullinResume from "/src/DevinMullinResume.pdf"

function App() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if(window.innerWidth > 1450){
      setIsDesktop(true)
    } else {
      setIsDesktop(false)
    }
  },[]);


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
        console.log(response);
        alert(`processing your message, ${toSend.from_name}. i'll get back to you soon!`);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
      else {
       alert('please completely fill out the form so we can actually talk!')
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

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000)
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
  const texture = new THREE.TextureLoader().load(vwave)

  useEffect(()=>{ 

  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  document.body.appendChild( renderer.domElement)

  function render() {
  TWEEN.update()
  renderer.render( scene, camera )
  }



  const polyTexture = new THREE.TextureLoader().load(medusa)
  const geometry = new THREE.SphereBufferGeometry(3, 26, 26)
  const material = new THREE.MeshBasicMaterial( { 
    map: polyTexture
  } )
  const poly = new THREE.Mesh( geometry, material )
  
  scene.add(poly)
  poly.position.z = 0
  poly.position.setX(-10)
  camera.position.z = 2

  const polyTexture2 = new THREE.TextureLoader().load(test)
  const material2 = new THREE.MeshBasicMaterial( { 
    map: polyTexture2
  } )
  const poly2 = new THREE.Mesh( geometry, material2 )
  
  scene.add(poly2)
  poly2.position.z = 8
  poly2.position.setX(15)

  const polyTexture3 = new THREE.TextureLoader().load(basketball)
  const material3 = new THREE.MeshBasicMaterial( { 
    map: polyTexture3
  } )
  const poly3 = new THREE.Mesh( geometry, material3 )
  
  scene.add(poly3)
  poly3.position.z = 17
  poly3.position.setX(-15)

  const ambientLight = new THREE.AmbientLight(0xffffff)

  scene.add(ambientLight)

  const controls = new OrbitControls(camera, renderer.domElement)


  const sphereMaterial = new THREE.PointsMaterial({
    size: 0.019,
    color: 0x00ffff
  })
  const particlesGeometry = new THREE.BufferGeometry;
  const particlesCount = 20000
  const position = new Float32Array(particlesCount * 3)
  for(let p = 0; p < particlesCount * 3; p++) {
    position[p] = (Math.random() - 0.5) * 50
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

  const particlesMesh = new THREE.Points(particlesGeometry, sphereMaterial)
  particlesMesh.position.z = 5
  scene.add(particlesMesh)

 const particlesMesh2 = new THREE.Points(particlesGeometry, sphereMaterial)
 particlesMesh2.position.z = 50
 scene.add(particlesMesh2)

  function cameraScroll(){ 
    const top = document.body.getBoundingClientRect().top
    TWEEN.update()
    poly.rotation.x += 0.01
    poly.rotation.y += 0.005
    poly.rotation.z += 0.01
    poly2.rotation.x += -0.01
    poly2.rotation.y += -0.005
    poly2.rotation.z += -0.01
    poly3.rotation.x += 0.01
    poly3.rotation.y += 0.005
    poly3.rotation.z += 0.01
    if(isDesktop === true){
      particlesMesh.rotation.z += 0.009
      particlesMesh.rotation.y += 0.009
      particlesMesh2.rotation.z += 0.009
      particlesMesh2.rotation.y += 0.009
      camera.position.z = top * -0.0095
      camera.position.x = top * -0.0025
      camera.rotation.y = top * -0.0025
    } else {
      particlesMesh.rotation.z += 0.003
      particlesMesh.rotation.y += 0.003
      particlesMesh2.rotation.z += 0.003
      particlesMesh2.rotation.y += 0.003
      camera.position.z = top * -0.015
      camera.position.x = top * -0.0025
      camera.rotation.y = top * -0.0025
    }

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
    if(isDesktop === true){
      particlesMesh.rotation.z += 0.0009
      particlesMesh.rotation.y += 0.0009
      particlesMesh2.rotation.z += 0.0009
      particlesMesh2.rotation.y += 0.0009
    } else {
      particlesMesh.rotation.z += 0.0005
      particlesMesh.rotation.y += 0.0005
      particlesMesh2.rotation.z += 0.0005
      particlesMesh2.rotation.y += 0.0005
    }
    controls.update()
    
    render()
  }

      animate()
},[])
  
window.addEventListener( 'resize', onWindowResize, false );

		
function onWindowResize() {
  
  camera.aspect = window.innerWidth/ window.innerHeight;

  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  scene.background = texture
}

  return (
<body>
    
      <header>
        <h1>Devin Mullin</h1>
        <h4>software developer</h4>
      </header>
      <section>
        <div className="icons">
          <br/>
          <BsLinkedin 
            className="icon" 
            onClick={()=>window.open("https://www.linkedin.com/in/devin-mullin/")}
            alt="LinkedIn" 
            style={{cursor: "pointer"}}/>
          <span>
             
          </span>
          <BsGithub 
            className="icon" 
            onClick={()=>window.open("https://github.com/devin-mullin")} 
            alt="GitHub"
            style={{cursor: "pointer"}}/>
          <span>
             
          </span>
          <BsMedium 
            className="icon" 
            onClick={()=>window.open("https://medium.com/@dmullinator")} 
            alt="Medium"
            style={{cursor: "pointer"}}/>
          <span>
             
          </span>
          <BsFileText
            className="icon" 
            onClick={()=>window.open(DevinMullinResume)} 
            alt="Resume"
            style={{cursor: "pointer"}}/>
      </div>
    </section>
      <section>
        <strong>skills:</strong>
        <br/>
        <br/>
        ◻ React, JavaScript, Ruby on Rails, PowerShell
        <br/>
        <br/>
        ◻ three.js, Sinatra, SQLite, PostgreSQL, ActiveRecord
        <br/>
        <br/>
        ◻ Postman, JIRA, Ubuntu, Git, Windows Server
        </section>
        <section>
          <strong>projects:</strong>
          <br />
          <br />
          <div className="project"> 
          <strong><a className="link" href="https://devyleague.netlify.app/"
          target="_blank" rel="noopener noreferrer">devyleague fantasy basketball</a>
          <br/></strong>GitHub: <span> </span> 
          <a className="link" href="https://github.com/devin-mullin/basketball-frontend"
          target="_blank" rel="noopener noreferrer">frontend</a><span> | </span>
          <a className="link" href="https://github.com/devin-mullin/basketball-trade-fantasy-backend"
          target="_blank" rel="noopener noreferrer">backend</a>
          <br/><a className="link" href="https://www.youtube.com/watch?v=08BQZd9fZko"
          target="_blank" rel="noopener noreferrer">demo</a>  
          <br/>
          <br/>
          frontend built with React, Redux Toolkit, YouTube's API, & a blend of custom CSS + React-Bootstrap
          <br/>
          <br/>
          backend built with Ruby on Rails, ActiveRecord, PostgreSQL, & JWT auth
          <br/>
          <br/>
          roadmap includes mobile responsive design, user league creation, trade functionality, head-to-head user matchups, & live game score / injury updates 
          <br/>
          <br/>
          note: I'm building this because I love basketball, & I don't currently have the means or wherewithal to create an NBA 2K alternative, lol 
          </div>
          <br/>
          <div className="project"> 
          <strong><a className="link" href="https://fervent-torvalds-d8a56c.netlify.app/"
          target="_blank" rel="noopener noreferrer">react-ionary</a></strong>
          <br/>
          <span>GitHub: </span>
          <a className="link" href="https://github.com/devin-mullin/phase-2-project-dictionary/tree/main/dictionary-phase-2"
          target="_blank" rel="noopener noreferrer">frontend</a>
          <br/>
          partnered with <a className="link" href="https://www.linkedin.com/in/scott-donnan/"
          target="_blank" rel="noopener noreferrer">Scott Donnan</a>
          <br/>
          <br/>
          built with React, Styled Components, & the Merriam-Webster Dictionary API
          <br/>
          <br/>
          dictionary app ideated with the intention of getting practice with deeply nested resources, as well as accessibility functionality (specifically the word pronunciation feature) 
          </div>
          <br/>
          <div className="project"> 
          <strong>hades run tracker</strong>
          <br/>
          <span>GitHub: </span>
          <a className="link" href="https://github.com/devin-mullin/P3-FrontEnd"
          target="_blank" rel="noopener noreferrer">frontend</a><span> | </span> 
          <a className="link" href="https://github.com/UncleDadMom/phase-3-sinatra-react-project"
          target="_blank" rel="noopener noreferrer">backend</a>
          <br/>
          partnered with <a className="link" href="https://www.linkedin.com/in/patrick-wu-7a5194b8/"
          target="_blank" rel="noopener noreferrer">Patrick Wu</a>
          <br/>
          <br/>
          frontend built with React, backend built with Ruby/Sinatra
          <br/>
          <br/>
          a run tracker for the incredibly popular & critically-acclaimed game Hades (I still need to play it!)
          <br/>
          </div>
          <br/>
          <div className="project"> 
          <strong>this website</strong>
          <br/>
          <br/>
          built with React, three.js, & custom CSS. 
          <br/>
          <br/>
          roadmap includes interactive background animation and a music player - still experimental, check out some of the progress <a className="link" href="https://amazing-liskov-1d721d.netlify.app"
          target="_blank" rel="noopener noreferrer"><strong>here</strong></a>
          <br/>
          <br/>
          note: audiovisual section is being tweaked at least weekly. the intent here is to practice three.js & to eventually create a sort of abstract art project that makes me go "whoa, that's cool"
          </div>
          <br/>
        </section>
        <section>
          <strong>experience:</strong>
          <br/>
          <br/>
          <div className="project">
          <strong>DM Digital, LLC</strong> | Owner
          <br/>
          2020 - present
          <br/>
          </div>
          <br/>
          <div className="project">
          <strong>Testronic</strong> | QA Technician
          <br/>
          Mar 2021 - Aug 2021
          <br/>
          </div>
          <br/>
          <div className="project">
          <strong>Mullin Landscape</strong> | System Administrator
          <br/>
          2015 - 2020
          <br/>
          </div>     
        </section>
        <section>
            <strong>about:</strong>
            <br/>
            <br/>
            ◻ New Orleans => Austin
            <br/>
            <br/>
            ◻ figuring how to live above sea level
            <br/>
            <br/>
            ◻ 7+ years in tech, lifelong 'computer guy' 
            <br/>
            <br/>
            ◻ avid learner of knowledge, top 1% wikipedia reader, current stack overflow lurker, future stack overflow commenter
            <br/>
            <br/>
            ◻ big on gaming, basketball, and sci-fi / western / horror films
            <br/>
            <br/>
            ◻ comedy writer, former variety show host, former (& sometimes current) amateur music producer
        </section>
    
    <section>
    <strong>contact:</strong>
    <br/>
    <br/>
  <form onSubmit={onSubmit}>
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
    placeholder="let's have a conversation"
    value={toSend.message}
    onChange={handleChange}
  />
  <br/>
  <button className="button" type='submit'>Submit</button>
</form>
      </section>

    </body>
  )
}

export default App
