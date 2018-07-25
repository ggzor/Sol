export class Vector {
    static readonly zero: Vector = new Vector(0, 0)

    constructor(readonly x: number, readonly y: number) { }

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    negate(): Vector {
        return new Vector(-this.x, -this.y)
    }

    minus(other: Vector): Vector {
        return this.add(other.negate())
    }

    abs(): Vector {
        return new Vector(Math.abs(this.x), Math.abs(this.y))
    }

    squaredLength(): number {
        return (this.x * this.x) + (this.y * this.y)
    }

    length(): number {
        return Math.sqrt(this.squaredLength())
    }

    toString(): string {
        return `x: ${this.x}, y: ${this.y}`
    }
}
