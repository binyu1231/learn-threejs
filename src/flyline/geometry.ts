import { BufferAttribute, BufferGeometry, CatmullRomCurve3, Color, Group, Line, LineBasicMaterial, Mesh, Object3D, Scene, Vector3 } from 'three'
import { FlyBase, FlyLineBegin2End, LineOption } from './base'
import { Tween, update } from '@tweenjs/tween.js'

export class FlyGeometryLine extends FlyBase {
    data: FlyLineBegin2End[]
    cycle: number
    routeColor: string
    flyColor: string
    group: Group
    scene: Scene

    constructor(scene: Scene, data: FlyLineBegin2End[], option?: LineOption) {
        super()
        this.scene = scene
        this.data = data
        this.routeColor = option?.routeColor || '#00FFFF'
        this.flyColor = option?.flyColor || '#ff0000'
        this.cycle = option?.cycle || 2000
        this.group = new Group()

        scene.add(this.draw())
        this.animate()
    }

    getPoints(data: FlyLineBegin2End) {
        
        const startPoint = data.begin
        const endPoint = data.end
        const curveH = data.height

        const pointInLine = [
            new Vector3(startPoint[0], 0, startPoint[0]),
            new Vector3(
                (startPoint[0] + endPoint[0]) / 2,
                curveH,
                (startPoint[1] + endPoint[1]) / 2,
            ),
            new Vector3(endPoint[0], 0, endPoint[1])
        ]

        const curve = new CatmullRomCurve3(pointInLine)
        const points = curve.getSpacedPoints(100)

        return points
    }

    // 创建轨迹线
    createFixedLine(points: Vector3[]) {
        return new Line(
            new BufferGeometry().setFromPoints(points),
            new LineBasicMaterial({ color: this.routeColor })
        )
    }

    createMoveLine(points: Vector3[], length: number) {
        const onlinePoints = points.slice(0, length)
        const flyLineGeometry = new BufferGeometry()
        flyLineGeometry.setFromPoints(onlinePoints)

        const colorArr: number[] = []
        const startColor = new Color(this.routeColor)
        const endColor = new Color(this.flyColor)

        onlinePoints.forEach((p, i) => {
            const { r, g, b } = startColor.lerp(endColor, i / 5)            
            colorArr.push(r, g, b)
        })

        flyLineGeometry.setAttribute('color', new BufferAttribute(new Float32Array(colorArr), 3))
        flyLineGeometry.attributes.position.needsUpdate = true

        const material = new LineBasicMaterial({
            vertexColors: true
        })

        return new Line(flyLineGeometry, material)
    }

    draw(): Group {
        this.data.map((line) => {
            const points = this.getPoints(line)
            // const fixedLine = this.createFixedLine(points)
            const movedLine = this.createMoveLine(points, 10)

            this.group.add(
                // fixedLine, 
                movedLine
            )

            const tween = new Tween({ index: 0 })
            .to({ index: 100 }, this.cycle)
            .onUpdate((t) => {
                const movedLineGeometry = movedLine.geometry
                const id = Math.ceil(t.index)
                const currPoints = points.slice(id, id + 10)
                movedLineGeometry && movedLineGeometry.setFromPoints(currPoints)
                movedLineGeometry.attributes.position.needsUpdate = true
            })
            .repeat(Infinity)


            tween.start()
        })
        return this.group
    }

    animate(): void {
        update()
        requestAnimationFrame(() => this.animate())
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