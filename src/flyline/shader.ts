import { Tween, update } from '@tweenjs/tween.js';
import { BufferGeometry, CatmullRomCurve3, Color, Float32BufferAttribute, Group, Points, Scene, ShaderMaterial, Vector3 } from 'three'
import { FlyBase, FlyLineBegin2End, LineOption } from './base'

export class FlyShaderLine extends FlyBase {
    scene: Scene;
    data: FlyLineBegin2End[]
    cycle: number
    routeColor: string
    flyColor: string
    group: Group

    constructor(scene: Scene, data: FlyLineBegin2End[], option?: LineOption) {
        super()

        this.scene = scene
        this.data = data
        this.group = new Group()
        this.cycle = option?.cycle || 2000
        this.routeColor = option?.routeColor || '#00ffff'
        this.flyColor = option?.flyColor || '#ffff00'
        this.scene.add(this.draw())
        this.animate()

    }

    animate() {
        update()
        requestAnimationFrame(() => this.animate())
    }

    draw(): Group {
        this.data.map(data => {
            const startPoint = data.begin
            const endPoint = data.end
            const curveH = data.height

            const begin = new Vector3(startPoint[0], 0, startPoint[0])
            const end = new Vector3(endPoint[0], 0, endPoint[1])
            const len = begin.distanceTo(end)

            const pointInLine = [
                begin,
                new Vector3(
                    (startPoint[0] + endPoint[0]) / 2,
                    curveH,
                    (startPoint[1] + endPoint[1]) / 2
                ),
                end
            ]

            const lineCurve = new CatmullRomCurve3(pointInLine)
            const points = lineCurve.getPoints(1000)

            const indexList: number[] = []
            const positionList: number[] = []

            points.forEach((item, index) => {
                indexList.push(index)
            })

            const geometry = new BufferGeometry().setFromPoints(points)
            geometry.setAttribute('aIndex', new Float32BufferAttribute(indexList, 1))

            const material = new ShaderMaterial({
                uniforms: {
                    uColor: {
                        value: new Color(this.flyColor)
                    },
                    uTime: {
                        value: 0
                    },
                    uLength: {
                        value: points.length,
                    },
                },
                vertexShader: `
                attribute float aIndex;

                uniform float uTime;
                uniform vec3 uColor;

                varying float vSize;

                void main() {
                    vec4 viewPosition = viewMatrix * modelMatrix *vec4(position, 1);
                    gl_Position = projectionMatrix * viewPosition;

                    if (aIndex < uTime + 100.0 && aIndex > uTime - 100.0) {
                        vSize = (aIndex + 100.0 - uTime) / 60.0;
                    }

                    gl_PointSize = vSize;
                }
                `,

                fragmentShader: `
                varying float vSize;
                uniform vec3 uColor;

                void main() {
                    if (vSize <= 0.0) {
                        gl_FragColor = vec4(1, 0, 0, 0);
                    } 
                    else {
                        gl_FragColor = vec4(uColor, 1);
                    }
                }
                `,
                transparent: true,
            })

            this.group.add(new Points(geometry, material))

            const tween = new Tween({ index: 0 })
                .to({ index: 1000 }, this.cycle)
                .onUpdate(t => {
                    const id = Math.ceil(t.index)
                    material.uniforms.uTime.value = id
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