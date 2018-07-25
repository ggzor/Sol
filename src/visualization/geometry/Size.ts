export class Size {
    static readonly zero: Size = new Size(0, 0);

    constructor(readonly width: number, readonly height: number) { }

    toString(): string {
        return `w: ${this.width}, h: ${this.height}`
    }
}
