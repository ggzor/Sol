import { combineLatest, Observable } from 'rxjs'
import { distinctUntilChanged, flatMap, map, startWith, timestamp, windowToggle, withLatestFrom } from 'rxjs/operators'

import { Vector } from '../geometry/Vector'

import { IDraggable } from './IDraggable'

export function positionsFrom(draggable: IDraggable): Observable<Vector> {
    return draggable.move.pipe(
        withLatestFrom(draggable.start),
        windowToggle(draggable.start, _ => draggable.end),
        flatMap(w => w),
        map(m => m[0].minus(m[1]))
    )
}

export function isDragging({ start, end }: IDraggable) {
    return combineLatest([start, end.pipe(startWith(null))].map(o => o.pipe(timestamp())))
        .pipe(
            map(l => {
                const [press, release] = l

                if (release.value != null) {
                    return press.timestamp > release.timestamp
                } else {
                    return press.value != null
                }
            }),
            startWith(false),
            distinctUntilChanged()
        )
}
