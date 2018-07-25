import { fromEvent, merge, Observable } from 'rxjs'
import { filter, map, timestamp, withLatestFrom } from '../../../node_modules/rxjs/operators'
import { mouseEventAsVector, touchEventAsVector } from '../geometry/Utils'
import { Vector } from '../geometry/Vector'

const getEventFromElement = (element: HTMLElement) => (eventName: string) => {
    return fromEvent(element, eventName).pipe(map(_ => ({})))
}

const tapDifference = 200
function tapping<T, R>(start: Observable<T>, end: Observable<R>): Observable<T> {
    return end.pipe(
        timestamp(),
        withLatestFrom(start.pipe(timestamp())),
        filter(t => {
            const [{ timestamp: endTime }, { timestamp: startTime }] = t

            return startTime < endTime && endTime - startTime < tapDifference
        }),
        map(t => t[1].value)
    )
}

export function mouseTappingOf(element: HTMLElement): Observable<Vector> {
    const getEvent = getEventFromElement(element)

    const start = fromEvent<MouseEvent>(element, 'mousedown').pipe(map(mouseEventAsVector))
    const end = getEvent('mouseup')

    return tapping(start, end)
}

export function touchTappingOf(element: HTMLElement): Observable<Vector> {
    const getEvent = getEventFromElement(element)

    const start = fromEvent<TouchEvent>(element, 'touchstart').pipe(map(touchEventAsVector))
    const end = merge(getEvent('touchend'), getEvent('touchcancel'))

    return tapping(start, end)
}

export function tappingOf(element: HTMLElement): Observable<Vector> {
    return merge(mouseTappingOf(element), touchTappingOf(element))
}
