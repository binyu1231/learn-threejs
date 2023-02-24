import { BasicBox, BasicBoxOption, BasicPlane, BasicPlaneOption, BasicSphere, BasicSphereOption, LambertBox, LambertBoxOption, LambertPlane, LambertPlaneOption, LambertSphere, LambertSphereOption } from './mesh';

export class MeshFactory {
    static createBasicPlane(option: BasicPlaneOption) {
        return new BasicPlane(option)
    }

    static createBasicBox(option: BasicBoxOption) {
        return new BasicBox(option)
    }

    static createBasicSphere(option: BasicSphereOption) {
        return new BasicSphere(option)
    }

    static createLambertPlane(option: LambertPlaneOption) {
        return new LambertPlane(option)
    }

    static createLambertBox(option: LambertBoxOption) {
        return new LambertBox(option)
    }

    static createLambertSphere(option: LambertSphereOption) {
        return new LambertSphere(option)
    }
}