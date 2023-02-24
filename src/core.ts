import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'

export class MainScene extends Scene {
    private static ins: MainScene
    static get instance () {
        return MainScene.ins || (MainScene.ins = new MainScene())
    }

    private constructor() {
        super()
    }
}

export class MainCamera extends PerspectiveCamera {
    private static ins: MainCamera
    static get instance () {
        return MainCamera.ins || (MainCamera.ins = new MainCamera())
    }


    private constructor() {
        super(30, Util.screenRatio, 0.1, 1000)
    }
}

export class MainRenderer extends WebGLRenderer {
    private static ins: MainRenderer
    static get instance () {
        return MainRenderer.ins || (MainRenderer.ins = new MainRenderer())
    }


    private constructor() {
        super({
            antialias: true
        })
        this.setClearColor(0x000000)
        // this.setClearAlpha(0)
        this.setSize(globalThis.innerWidth, globalThis.innerHeight)
    }
    
    mount() {
        document.body.appendChild(this.domElement)   
    }
}


export class Util {
    static fullWidth = globalThis.innerWidth
    static fullHeight = globalThis.innerHeight
    static screenRatio = Util.fullWidth / Util.fullHeight
}