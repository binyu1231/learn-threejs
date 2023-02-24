import { BoxGeometry, BufferGeometry, Material, Mesh, MeshBasicMaterial, MeshBasicMaterialParameters, MeshLambertMaterial, MeshLambertMaterialParameters, PlaneGeometry, SphereGeometry } from 'three'
import { MainScene } from './core'



class BaseMesh {
    geometry!: BufferGeometry
    meterial!: Material
    mesh!: Mesh

    mount() {
        MainScene.instance.add(this.mesh)
    }

    protected initMesh() {
        this.mesh = new Mesh(this.geometry, this.meterial)
    }
}

export interface BaseGeometryOption {
    width?: number,
    height?: number,
    widthSegments?: number,
    heightSegments?: number,
}

export interface BasicPlaneOption extends BaseGeometryOption, MeshBasicMaterialParameters {}

export class BasicPlane extends BaseMesh {
    geometry: PlaneGeometry
    meterial: MeshBasicMaterial
    constructor(option: BasicPlaneOption) {
        super()
        const { width, height, widthSegments, heightSegments, ...meterialOption } = option
        this.geometry = new PlaneGeometry(width, height, widthSegments, heightSegments)
        this.meterial = new MeshBasicMaterial(meterialOption)
        this.initMesh()
    }   
}

export interface BasicBoxOption extends BaseGeometryOption, MeshBasicMaterialParameters {
    depth?: number
    depthSegments?: number
}

export class BasicBox extends BaseMesh {
    geometry: BoxGeometry
    meterial: MeshBasicMaterial
    
    constructor(option: BasicBoxOption) {
        super()
        const { width, height, depth, widthSegments, heightSegments, depthSegments, ...meterialOption } = option

        this.geometry = new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
        this.meterial = new MeshBasicMaterial(meterialOption)
        this.initMesh()
    }
}

export interface BasicSphereOption extends Omit<BaseGeometryOption, 'width' | 'height'>, MeshBasicMaterialParameters {
    radius?: number,
    phiStart?: number,
    phiLength?: number,
    thetaStart?: number,
    thetaLength?: number,
}



export class BasicSphere extends BaseMesh {
    geometry: SphereGeometry
    meterial: MeshBasicMaterial
    
    constructor(option: BasicSphereOption) {
        super()
        const { radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, ...meterialOption } = option

        this.geometry = new SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
        this.meterial = new MeshBasicMaterial(meterialOption)
        this.initMesh()
    }
}

export interface LambertPlaneOption extends BaseGeometryOption, MeshLambertMaterialParameters {}

export class LambertPlane extends BaseMesh {
    geometry: PlaneGeometry
    meterial: MeshLambertMaterial
    constructor(option: LambertPlaneOption) {
        super()
        const { width, height, widthSegments, heightSegments, ...meterialOption } = option
        this.geometry = new PlaneGeometry(width, height, widthSegments, heightSegments)
        this.meterial = new MeshLambertMaterial(meterialOption)
        this.initMesh()
    }   
}

export interface LambertBoxOption extends BaseGeometryOption, MeshLambertMaterialParameters {
    depth?: number
    depthSegments?: number
}

export class LambertBox extends BaseMesh {
    geometry: BoxGeometry
    meterial: MeshLambertMaterial
    
    constructor(option: LambertBoxOption) {
        super()
        const { width, height, depth, widthSegments, heightSegments, depthSegments, ...meterialOption } = option

        this.geometry = new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
        this.meterial = new MeshLambertMaterial(meterialOption)
        this.initMesh()
    }
}

export interface LambertSphereOption extends Omit<BaseGeometryOption, 'width' | 'height'>, MeshLambertMaterialParameters {
    radius?: number,
    phiStart?: number,
    phiLength?: number,
    thetaStart?: number,
    thetaLength?: number,
}

export class LambertSphere extends BaseMesh {
    geometry: SphereGeometry
    meterial: MeshLambertMaterial
  
    constructor(option: LambertSphereOption) {
        super()
        const { radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength, ...meterialOption } = option

        this.geometry = new SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
        this.meterial = new MeshLambertMaterial(meterialOption)
        this.initMesh()
    }
}