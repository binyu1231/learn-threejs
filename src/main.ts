import { AxesHelper, SpotLight, Vector2 } from 'three'
import { MainCamera, MainRenderer, MainScene } from './core'
import { MeshFactory } from './meshFactory'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { controls } from './gui'

const renderer = MainRenderer.instance
const camera = MainCamera.instance
const scene = MainScene.instance

renderer.mount()
renderer.shadowMap.enabled = true

const plane = MeshFactory.createLambertPlane({
    width: 60, height: 20, color: 0xFFFFFF
})

plane.mesh.rotation.x = -0.5 * Math.PI
plane.mesh.position.set(15, 0, 0)
plane.mesh.receiveShadow = true

plane.mount()


const cube = MeshFactory.createBasicBox({
    width: 4, height: 4, widthSegments: 4, color: 0xFF0000
})
cube.mesh.position.set(-4, 3, 0)
cube.mount()




const sphere = MeshFactory.createBasicSphere({
    radius: 4, widthSegments: 20, heightSegments: 20,
    color: 0x7777ff, wireframe: true,
})
sphere.mesh.position.set(20, 4, 0)
sphere.mount()


// ----

const spotLight = new SpotLight(0xFFFFFF)
spotLight.position.set(-40, 40, -15)
spotLight.castShadow = true
spotLight.shadow.mapSize = new Vector2(1024, 1024)
spotLight.shadow.camera.far = 130
spotLight.shadow.camera.near = 40
scene.add(spotLight)


const cube2 = MeshFactory.createLambertBox({
    width: 4, height: 4, widthSegments: 4, color: 0xFF0000

})
cube2.mesh.position.set(4, 3, 0)
cube2.mesh.castShadow = true
cube2.mount()


const sphere2 = MeshFactory.createLambertSphere({
    radius: 3, widthSegments: 20, heightSegments: 20,
    color: 0x7777ff
})
sphere2.mesh.position.set(12, 3, -5)
sphere2.mesh.castShadow = true
sphere2.mount()


// 
const loader = new GLTFLoader()
loader.loadAsync('/tfb.glb')
.then((model) => {
    console.log('load success')
    const { scene: modelScene } = model
    modelScene.position.set(30, 0, 0)
    modelScene.rotation.y = -0.5 * Math.PI

    scene.add(modelScene)
    renderer.render(scene, camera)
})
.catch(e => {
    console.log('loaded failed.', e)
})


const axes = new AxesHelper(20)
scene.add(axes)

camera.position.set(-30, 40, 30)
camera.lookAt(scene.position)

const trackballControls = new TrackballControls(camera, renderer.domElement)


let step = 0
function renderScene() {
    const { x, y, z } = cube2.mesh.rotation
    const { rotationSpeed, bouncingSpeed } = controls
    cube2.mesh.rotation.set(x + rotationSpeed / 5, y + rotationSpeed / 5, z + rotationSpeed / 5)

    step += bouncingSpeed
    sphere.mesh.position.set(
        20 + 2 * Math.cos(step),
        2 + 2 * Math.abs(Math.sin(step)),
        sphere.mesh.position.z
    )

    trackballControls.update()

    if (step === 10) return
    requestAnimationFrame(renderScene)
    renderer.render(scene, camera)
}

renderScene()

globalThis.addEventListener('resize', function () {
    camera.aspect = globalThis.innerWidth / globalThis.innerHeight
    camera.updateProjectionMatrix() // 防止窗口改变时，图像拉伸

    renderer.setSize(globalThis.innerWidth, globalThis.innerHeight)
})
