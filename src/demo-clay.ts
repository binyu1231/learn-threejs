import { AmbientLight, AxesHelper, SpotLight, Vector2 } from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MainCamera, MainRenderer, MainScene } from './core'
import { MeshFactory } from './meshFactory'


const camera = MainCamera.instance
const renderer = MainRenderer.instance
const scene = MainScene.instance

camera.position.set(-30, 40, 30)
camera.lookAt(scene.position)

scene.add(camera)

// scene.add(new AxesHelper(20))


// const spotLight = new SpotLight(0xFFFFFF)
// spotLight.position.set(-40, 40, -15)
// spotLight.castShadow = true
// spotLight.shadow.mapSize = new Vector2(1024, 1024)
// spotLight.shadow.camera.far = 130
// spotLight.shadow.camera.near = 40
// scene.add(spotLight)


// const plane = MeshFactory.createLambertPlane({
//     width: 60, height: 20, color: 0xFFFFFF
// })

// plane.mesh.rotation.x = -0.5 * Math.PI
// plane.mesh.position.set(15, 0, 0)
// plane.mesh.receiveShadow = true

// plane.mount()

const sphere2 = MeshFactory.createLambertSphere({
    radius: 3, widthSegments: 20, heightSegments: 20,
    color: 0x7777ff
})
sphere2.mesh.position.set(12, 3, -5)
// sphere2.mesh.castShadow = true
sphere2.mount()

// var ambient = new AmbientLight(0xffffff)
// scene.add(ambient)

renderer.mount()

const cameraControls = new TrackballControls(camera, renderer.domElement)


function render() {
    cameraControls.update()
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

const loader = new GLTFLoader()

loader.loadAsync('/clay/planter_pot_clay_1k.gltf')
.then((model) => {
    console.log(model)
    model.scene.scale.set(10, 10, 10)
    model.scene.position.set(0, 0, 0)
    scene.add(model.scene)
})
.then(render)
