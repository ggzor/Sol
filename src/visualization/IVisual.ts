import { Vector } from './geometry/Vector'

export interface IVisual {
    readonly element: HTMLElement
    getPosition(): Vector
}
