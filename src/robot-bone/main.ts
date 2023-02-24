import { Tween, update } from "@tweenjs/tween.js";
import { AnimationMixer, Clock, SpotLight, Vector2 } from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MainCamera, MainRenderer, MainScene } from "../core";
import { MeshFactory } from "../meshFactory";

const camera = MainCamera.instance
const renderer = MainRenderer.instance
const scene = MainScene.instance

camera.position.set(-30, 40, 30)
camera.lookAt(scene.position)

scene.add(camera)

renderer.mount()

const plane = MeshFactory.createLambertPlane({
    width: 60, height: 40,
    widthSegments: 1,
    heightSegments: 1,
    color: 0xffffff
})

plane.mesh.rotation.x = -0.5 * Math.PI
plane.mesh.position.set(0, 0, 0)

plane.mount()



const spotLight = new SpotLight(0xFFFFFF)
spotLight.position.set(-40, 40, -15)
spotLight.castShadow = true
spotLight.shadow.mapSize = new Vector2(1024, 1024)
spotLight.shadow.camera.far = 130
spotLight.shadow.camera.near = 40
scene.add(spotLight)


const loader = new GLTFLoader()
let mixer: AnimationMixer | null = null
loader.loadAsync('/robot2.gltf')
.then(model => {
    model.scene.scale.set(5, 5, 5)
    model.scene.position.set(0, 0, 0)
    model.scene.rotateY(Math.PI / -2)
    scene.add(model.scene)

    mixer = new AnimationMixer(model.scene)


    model.animations.forEach((animation, i) => {
        mixer!.clipAction(animation).play()
    })

    const tween = new Tween({ index: 0 })
    .to({ index: Math.PI * 2 }, 5000)
    .onUpdate((t) => {
        const direction = Math.cos(t.index) > 0 ? -1 : 1

        model.scene.position.set(Math.sin(t.index) * -15, 0, 0)
        model.scene.rotation.set(0, Math.PI / 2 * direction, 0)
    })
    .repeat(Infinity)

    tween.start()
})



const cameraControls = new TrackballControls(camera, renderer.domElement)
const clock = new Clock()
function render() {
    cameraControls.update()
    
    update()
    if (mixer) {
        const delta = clock.getDelta()
        mixer.update(delta)
    }

    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

render()