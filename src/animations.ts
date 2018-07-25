import { Power3, TweenMax } from 'gsap';

export function applyAnimations() {
    const opacidadMaxima = 0.6;
    if (document.body.clientWidth > 768) {
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
        TweenMax.to('#ardilla, #contenedorCorazon, #paquetito', 1, { opacity: opacidadMaxima, delay: 2 })
    }

    TweenMax.to('#corazon', opacidadMaxima, { fill: '#1E4E83', yoyo: true, repeat: -1, delay: 5, repeatDelay: 5 })


    function addShowOnHover(id: string) {
        const elemento = document.getElementById(id) as HTMLElement
        elemento.onmouseenter = () => TweenMax.to(`#${id}`, 1, { opacity: 1 })
        elemento.onmouseleave = () => TweenMax.to(`#${id}`, 1, { opacity: opacidadMaxima })
    }

    addShowOnHover('ardilla')
    addShowOnHover('contenedorCorazon')
    addShowOnHover('paquetito')
}
