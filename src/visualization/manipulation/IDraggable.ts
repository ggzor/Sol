import { Observable } from 'rxjs'
import { Vector } from '../geometry/Vector'

export interface IDraggable {
    readonly start: Observable<Vector>;
    readonly move: Observable<Vector>;
    readonly end: Observable<Vector>;
}
