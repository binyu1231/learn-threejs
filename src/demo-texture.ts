import { AmbientLight, AxesHelper, Mesh, MeshStandardMaterial, SphereGeometry, SpotLight, TextureLoader } from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { MainCamera, MainRenderer, MainScene } from './core'
import { MeshFactory } from './meshFactory'


const camera = MainCamera.instance
const renderer = MainRenderer.instance
const scene = MainScene.instance

camera.position.set(-30, 40, 30)
camera.lookAt(scene.position)

scene.add(camera)

scene.add(new AxesHelper(20))



var ambient = new AmbientLight(0xffffff)
scene.add(ambient)

renderer.mount()

const cameraControls = new TrackballControls(camera, renderer.domElement)


function render() {
    cameraControls.update()
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}


const textureLoader = new TextureLoader()

textureLoader.loadAsync('/avatar.jpg')
.then(tx => {
    const material = new MeshStandardMaterial({
        map: tx,
        // metalness: 0.2,
        // roughness: 0.07
    })

    const geometry = new SphereGeometry(3, 20, 20)

    const mesh = new Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)

})
.then(render)
