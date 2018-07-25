import { makeDOMDriver, p, section } from '@cycle/dom'
import { run } from '@cycle/run'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import * as es from 'date-fns/locale/es'
import filter from 'lodash/filter'
import map from 'lodash/map'
import 'materialize-css/sass/materialize.scss'
import xs from 'xstream'
import { applyAnimations } from './animations'
import { putStars } from './stars'
import './styles/all.scss'

type DiffUnit = 's' | 'm' | 'h' | 'd' | 'M' | 'Y'

function main() {
    const initialDate = new Date('2018-02-26T10:00:00-06:00')
    const keys: DiffUnit[] = ['Y', 'M', 'd', 'h', 'm', 's']

    return {
        DOM: xs.periodic(1000).map(() => {
            const now = new Date()
            const texts = filter(
                map(keys, unit => distanceInWordsStrict(initialDate, now, { locale: es, unit })),
                t => !t.startsWith('0')
            )

            const nodes = map(texts, (t, i) => {
                const classes: Record<string, boolean> = {}

                classes[`counter-${i + 1}`] = true

                return p({ class: classes }, t)
            })

            return section({ class: { 'counters': true } }, nodes)
        })
    }
}

const drivers = {
    DOM: makeDOMDriver('.counters')
}

run(main, drivers)
putStars()
applyAnimations()
