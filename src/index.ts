import { makeDOMDriver, p, section } from '@cycle/dom'
import { run } from '@cycle/run'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import * as es from 'date-fns/locale/es'
import { Power3, TweenMax } from 'gsap';
import filter from 'lodash/filter'
import map from 'lodash/map'
import 'materialize-css/sass/materialize.scss'
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
    DOM: makeDOMDriver('#app')
}

run(main, drivers)

for (let i = 2; i <= 6; i++) {
    TweenMax.to(`#sol${i}`, 3 + i * 1, {
        y: '-=10',
        ease: Power3.easeOut,
        repeat: -1,
        yoyo: true,
        yoyoEase: Power3.easeOut
    })
}

setTimeout(() => TweenMax.to('.counters', 1, { opacity: 0.8 }), 2000)
