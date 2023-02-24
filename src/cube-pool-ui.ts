import { GUI } from 'dat.gui'
import { Mesh, Scene } from 'three'
import { MainScene } from './core'
import { MeshFactory } from './meshFactory'

enum ControlType {
    rotationSpeed = 'rotationSpeed',
    numberOfObjects = 'numberOfObjects',
    addCube = 'addCube',
    removeCube = 'removeCube',
    outputObjects = 'outputObjects',

}

export const controls = {
    [ControlType.rotationSpeed]: 0.02,
    [ControlType.numberOfObjects]: 0,
    [ControlType.addCube]: function () {
        const scene = MainScene.instance
        const size = Math.ceil(Math.random() * 3)
        // const color = 0xff0000 // Math.random() * 0xffffff
        const color = Math.random() * 0xffffff
        const cube = MeshFactory.createLambertBox({
            width: size, height: size, depth: size,
            color
        })
        cube.mesh.castShadow = true
        cube.mesh.name = 'cube-' + scene.children.length
        cube.mesh.position.set(
            Math.round(Math.random() * 60) - 30,
            Math.round(Math.random() * 5) + 2,
            Math.round(Math.random() * 40) - 20,
        )

        cube.mount()
        controls.numberOfObjects = scene.children.length

    },
    [ControlType.removeCube]: function () {
        const scene = MainScene.instance
        const allChildren = scene.children
        const lastChild = allChildren[allChildren.length - 1]
        if (lastChild instanceof Mesh && lastChild.name.startsWith('cube')) {
            scene.remove(lastChild)
            controls.numberOfObjects = scene.children.length
        }

    },
    [ControlType.outputObjects]: function () {
        console.log(MainScene.instance.children.length)
    }
}

const gui = new GUI()

gui.add(controls, ControlType.rotationSpeed, 0, 0.5)
gui.add(controls, ControlType.addCube)
gui.add(controls, ControlType.removeCube)
gui.add(controls, ControlType.numberOfObjects).listen
gui.add(controls, ControlType.outputObjects)
