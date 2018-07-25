import { Vector } from '../geometry/Vector'

export function computePosition(element: HTMLElement): Vector {
    const elem: any = element
    const transform = elem._gsTransform
    const existsTransform = transform !== undefined

    return existsTransform ? new Vector(transform.x, transform.y) : Vector.zero
}
