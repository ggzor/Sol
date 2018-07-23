import { div, h1, makeDOMDriver } from '@cycle/dom'
import { run } from '@cycle/run'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import * as es from 'date-fns/locale/es'
import filter from 'lodash/filter'
import map from 'lodash/map'
import xs from 'xstream'
import '../src/styles/default.scss'
import '../src/styles/layout.scss'

type DiffUnit = 's' | 'm' | 'h' | 'd' | 'M' | 'Y'

function main() {
    const initialDate = new Date('2018-02-26T12:00:00-06:00')
    const keys: DiffUnit[] = ['Y', 'M', 'd', 'h', 'm', 's']

    return {
        DOM: xs.periodic(1000).map(() => {
            const now = new Date()
            const texts = filter(
                map(keys, unit => distanceInWordsStrict(initialDate, now, { locale: es, unit })),
                t => !t.startsWith('0')
            )

            return div(map(texts, t => h1(t)))
        })
    }
}

const drivers = {
    DOM: makeDOMDriver('#app')
}

run(main, drivers)
