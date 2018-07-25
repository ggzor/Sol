import { Vector } from './Vector'

export class Rect {
    constructor(
        readonly x: number, readonly y: number,
        readonly width: number, readonly height: number) { }

    leftTop(): Vector {
        return new Vector(this.left(), this.top())
    }

    left(): number {
        return this.x
    }

    right(): number {
        return this.x + this.width
    }

    top(): number {
        return this.y
    }

    bottom(): number {
        return this.y + this.height
    }
}
