import { AmbientLight } from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { MainCamera, MainRenderer, MainScene } from "../core";
import { MeshFactory } from "../meshFactory";
import { genFlyLine } from "./base";
import { FlyGeometryLine } from "./geometry";
import { FlyShaderLine } from "./shader";
import { FlyTextureLine } from "./texture";

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

const ambimentLight = new AmbientLight(0x3c3c3c)

scene.add(ambimentLight)


// new FlyGeometryLine(scene, genFlyLine())

// new FlyTextureLine(scene, genFlyLine())

new FlyShaderLine(scene, genFlyLine())



const cameraControls = new TrackballControls(camera, renderer.domElement)

function render() {
    cameraControls.update()
    
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

render()