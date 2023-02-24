import { Group, Scene } from "three"

export interface FlyLineBegin2End {
    begin: number[]
    end: number[]
    height: number
}

export abstract class FlyBase {
    abstract scene: Scene
    abstract data: Array<FlyLineBegin2End>
    abstract group: Group

    abstract draw(): Group
    abstract remove(): void
    abstract animate(): void
}


export function genFlyLine() {
    const data: FlyLineBegin2End[] = [
        { begin: [0, 0], end: [10, 0], height: 10 },
        { begin: [0, 0], end: [-20, 0], height: 10 },
        { begin: [0, 0], end: [15, 15], height: 10 },
    ]
    return data
}

export interface LineOption {
    routeColor?: string
    flyColor?: string
    cycle: number
}