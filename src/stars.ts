import { TweenMax } from 'gsap'
import { toast } from 'materialize-css'
import { merge, of } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import * as SVG from 'svg.js'
import { fromVisualWithMouseAndTouch } from './visualization/manipulation/Draggable'
import { positionsFrom } from './visualization/manipulation/Dragging'
import { applyMovement, Movement } from './visualization/manipulation/Movement'
import { tappingOf } from './visualization/manipulation/Tapping'
import { VisualBase } from './visualization/svg/VisualBase'

export function putStars() {
    const container = document.getElementById('stars') as HTMLElement
    const canvas = SVG('stars')
    canvas.addClass('stars')

    const isLargeScreen = document.body.clientWidth > 769
    const size = 14
    const starSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}">
<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
</svg>`

    const background = document.getElementById('background') as HTMLElement

    let count = 0

    tappingOf(background).pipe(debounceTime(100)).subscribe(pos => {
        const star = new VisualBase(canvas)
        const elem = star.group.svg(starSVG).fill('white').addClass('star')
        const html = document.getElementById(elem.id()) as HTMLElement

        if (isLargeScreen) {
            elem.opacity(0)
            TweenMax.to(html, 1, { opacity: 0.6 })
        }

        count++
        messageIfCount(count, 4, 'Te amo, mi Solecita')
        messageIfCount(count, 7, 'Gracias por todo, mi niña')
        messageIfCount(count, 17, 'Tenías esta edad <3')
        messageIfCount(count, 18, 'Y yo esta ;)')
        messageIfCount(count, 20, 'Asturias')
        messageIfCount(count, 25, 'Ya no hay más mensajes ocultos')
        messageIfCount(count, 30, '¡Niña!')
        messageIfCount(count, 40, '¡Paquetito obstinado!')
        messageIfCount(count, 55, 'No encontrarás algo más ;)')
        messageIfCount(count, 74, '¿Te quieres casar conmigo?', 10e9, 'light-blue darken-3')


        merge(positionsFrom(fromVisualWithMouseAndTouch(container, star)).pipe(
            map(p => (isLargeScreen ? [p, 0.3] : p) as Movement)
        ), of(pos))
            .subscribe(applyMovement(v => ({ x: v.x, y: v.y }))(star.element))
    })
}

function messageIfCount(count: number, equalsTo: number, msg: string, duration = 15000, color: string = '') {
    if (count === equalsTo) {
        toast({ html: msg, displayLength: duration, classes: color });
    }
}
