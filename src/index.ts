import { div, MainDOMSource, makeDOMDriver } from '@cycle/dom'
import { run } from '@cycle/run'
import xs from 'xstream';

interface IDrivers {
    DOM: MainDOMSource
}

function main(sources: IDrivers) {
    return {
        DOM: xs.of(
            div(['Testing'])
        )
    }
}

const drivers = {
    DOM: makeDOMDriver('#app')
}

run(main, drivers)
