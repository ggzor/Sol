import * as SVG from 'svg.js'
import { computePosition } from '../animation/GSAPUtils'
import { IVisual } from '../IVisual'

export class VisualBase implements IVisual {
    element: HTMLElement
    group: SVG.G

    constructor(readonly parent: SVG.Container) {
        this.group = parent.group()
        this.element = document.getElementById(this.group.id()) as HTMLElement
    }

    getPosition() {
        return computePosition(this.element)
    }

    remove(): void {
        this.parent.removeElement(this.group)
    }
}
