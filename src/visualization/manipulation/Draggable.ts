import { fromEvent, merge } from 'rxjs'
import { map, tap, throttleTime } from 'rxjs/operators'

import { IVisual } from '../IVisual'
import { IDraggable } from './IDraggable'

import { mouseEventAsVector, touchEventAsVector } from '../geometry/Utils'
import { Vector } from '../geometry/Vector'

const getObservableFromEvent = <T extends Event>(mapper: (event: T) => Vector) =>
    (container: HTMLElement) => (element: HTMLElement | Window) =>
        (eventName: string, preventDefault: boolean = true) => {
            return fromEvent<T>(element, eventName).pipe(
                tap(event => {
                    if (preventDefault) {
                        event.preventDefault()
                    }
                }),
                map(mapper),
                map(v => {
                    const bounds = container.getBoundingClientRect()
                    return v.minus(new Vector(bounds.left, bounds.top))
                })
            )
        }

function adjustToDefaults(d: IDraggable, visual: IVisual): IDraggable {
    return {
        start: d.start.pipe(map(v => v.minus(visual.getPosition()))),
        move: d.move.pipe(throttleTime(10)),
        end: d.end
    }
}

export function fromVisualWithMouse(container: HTMLElement, visual: IVisual): IDraggable {
    const inContainer = getObservableFromEvent(mouseEventAsVector)(container)
    const fromWindow = inContainer(window)

    return adjustToDefaults({
        start: inContainer(visual.element)('mousedown'),
        move: fromWindow('mousemove', false),
        end: fromWindow('mouseup', false)
    }, visual)
}

export function fromVisualWithTouch(container: HTMLElement, visual: IVisual): IDraggable {
    const inContainer = getObservableFromEvent(touchEventAsVector)(container)
    const fromWindow = inContainer(window)
    const notMapped = getObservableFromEvent(() => Vector.zero)(container)(window)

    return adjustToDefaults({
        start: inContainer(visual.element)('touchstart'),
        move: fromWindow('touchmove', false),
        end: merge(
            notMapped('touchend', false),
            notMapped('touchcancel', false)
        )
    }, visual)
}

function mergeDraggables(d1: IDraggable, d2: IDraggable): IDraggable {
    return {
        start: merge(d1.start, d2.start),
        move: merge(d1.move, d2.move),
        end: merge(d1.end, d2.end)
    }
}

export function fromVisualWithMouseAndTouch(container: HTMLElement, visual: IVisual): IDraggable {
    const funcs = [fromVisualWithMouse, fromVisualWithTouch]

    return funcs.map(f => f(container, visual)).reduce(mergeDraggables)
}
