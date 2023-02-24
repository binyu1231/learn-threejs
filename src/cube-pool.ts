import { AmbientLight, AxesHelper, FogExp2, Mesh, MeshLambertMaterial, SpotLight } from 'three'
import { MainCamera, MainRenderer, MainScene, Util } from './core'
import { MeshFactory } from './meshFactory'
import './cube-pool-ui'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { controls } from './cube-pool-ui'

const camera = MainCamera.instance
const renderer = MainRenderer.instance
const scene = MainScene.instance


scene.fog = new FogExp2(0xffffff, 0.01)


camera.position.set(-30, 40, 30)
camera.lookAt(scene.position)




scene.add(camera)

renderer.mount()

const plane = MeshFactory.createLambertPlane({
    width: 60,
    height: 40,
    widthSegments: 1,
    heightSegments: 1,
    color: 0xffffff
})

plane.mesh.rotation.x = -0.5 * Math.PI
plane.mesh.position.set(0, 0, 0)
plane.mesh.receiveShadow = true

plane.mount()

const ambimentLight = new AmbientLight(0x3c3c3c)

scene.add(ambimentLight)

const spotLight = new SpotLight(0xffffff, 1.2, 150, 120)
spotLight.position.set(-40, 60, -10)
spotLight.castShadow = true
scene.add(spotLight)

const axes = new AxesHelper(20)
scene.add(axes)

const cameraControls = new TrackballControls(camera, renderer.domElement)

// 覆盖场景的所有对象的材质
scene.overrideMaterial = new MeshLambertMaterial({ color: 0xff0000 }) 
function render() {
    cameraControls.update()
    scene.traverse(obj => {
        if (obj instanceof Mesh && obj.name.startsWith('cube')) {
            const { rotationSpeed } = controls
            const { x, y, z } = obj.rotation
            obj.rotation.set(x + rotationSpeed, y + rotationSpeed, z + rotationSpeed)
        }
    })
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

render()
