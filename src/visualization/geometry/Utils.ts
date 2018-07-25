import { Rect } from './Rect'
import { Size } from './Size'
import { Vector } from './Vector'

export function asRect(size: Size) {
    return new Rect(0, 0, size.width, size.height)
}

export function boundingRect(element: HTMLElement): Rect {
    const { left, top, right, bottom } = element.getBoundingClientRect()
    return new Rect(left, top, right - left, bottom - top)
}

export function mouseEventAsVector(event: MouseEvent): Vector {
    const { clientX, clientY } = event
    return new Vector(clientX, clientY)
}

export function touchEventAsVector(event: TouchEvent): Vector {
    const { clientX, clientY } = event.targetTouches.item(0) as Touch
    return new Vector(clientX, clientY)
}
