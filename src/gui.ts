import { GUI } from 'dat.gui'

const gui = new GUI()

enum ControlType {
    rotationSpeed = 'rotationSpeed',
    bouncingSpeed = 'bouncingSpeed',
}

// const { rotationSpeed, bouncingSpeed } = controls
export const controls = {
    [ControlType.rotationSpeed]: 0.02,
    [ControlType.bouncingSpeed]: 0.03
}

gui.add(controls, ControlType.rotationSpeed, 0, 0.5, 0.1) // control field, min, max, step
gui.add(controls, ControlType.bouncingSpeed, 0, 0.5, 0.1)
