import { Tween, update } from '@tweenjs/tween.js'
import { CatmullRomCurve3, Group, Scene, Vector3, TubeGeometry, TextureLoader, RepeatWrapping, MeshBasicMaterial, Mesh } from 'three'
import { FlyBase, FlyLineBegin2End, LineOption } from './base'
import textureImg from './arrow.png'


export class FlyTextureLine extends FlyBase {
    scene: Scene
    data: FlyLineBegin2End[]
    cycle: number
    group: Group

    constructor(scene: Scene, data: FlyLineBegin2End[], option?: LineOption) {
        super()
        this.scene = scene
        this.data = data
        this.group = new Group()
        this.cycle = option?.cycle || 2000
        this.scene.add(this.draw())
        this.animate()
    }

    animate(): void {
        update()
        requestAnimationFrame(() => this.animate())
    }

    draw(): Group {
        this.data.map(data => {
            const startPoint = data.begin
            const endPoint = data.end
            const curveH = data.height

            const pointInline = [
                new Vector3(startPoint[0], startPoint[0]),
                new Vector3(
                    (startPoint[0] + endPoint[0]) / 2,
                    curveH,
                    (startPoint[1] + endPoint[1]) / 2,
                ),
                new Vector3(endPoint[0], 0, endPoint[1]),
            ]

            const lineCurve = new CatmullRomCurve3(pointInline)
            const geometry = new TubeGeometry(lineCurve, 100, 1, 2, false)

            const textloader = new TextureLoader()
            const texture = textloader.load(textureImg)
            texture.repeat.set(2, 7) // 跟图片设置方向
            texture.rotation = - Math.PI / 2 // 根据图片设置方向
            texture.needsUpdate = true
            texture.wrapS = RepeatWrapping
            texture.wrapT = RepeatWrapping

            const material = new MeshBasicMaterial({
                map: texture,
                transparent: true
            })

            this.group.add(new Mesh(geometry, material))

            let tween = new Tween({ x: 0 })
                .to({ x: 100 }, this.cycle)
                .onUpdate((t) => {
                    texture.offset.y -= 0.01 // 根据图片设置 x, y 和方向
                })
                .repeat(Infinity)

            tween.start()
        })

        return this.group
    }

    setVisible(visible: boolean) {
        this.group.visible = visible
    }

    remove() {
        this.scene.remove(this.group)
        this.group.children.forEach((ch: any) => {
            ch.geometry.dispose()
            ch.material.dispose()
        })
    }
}