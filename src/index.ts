import { makeDOMDriver, p, section } from '@cycle/dom'
import { run } from '@cycle/run'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import * as es from 'date-fns/locale/es'
import { Power3, TweenMax } from 'gsap';
import filter from 'lodash/filter'
import map from 'lodash/map'
import 'materialize-css/sass/materialize.scss'
import xs from 'xstream'
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
TweenMax.to('#ardilla, #contenedorCorazon, #paquetito', 1, { opacity: 0.8, delay: 2 })
TweenMax.to('#corazon', 0.8, { fill: '#1E4E83', yoyo: true, repeat: -1, delay: 5, repeatDelay: 5 })
