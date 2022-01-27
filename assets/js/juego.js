/**
 * C = Clubs.
 * D = Diamonds.
 * H = Hearts.
 * S = Spades.
 */

const blackJack = (() => {
    'use strict';

    let deck = [];
    const tipos = [ 'C', 'D', 'H', 'S' ],
        especiales = [ 'A', 'J', 'Q', 'K' ];

    let puntosJugadores = [];

    // Referencias HTML.
    const btnNuevo = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        puntosHTML = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');

    // Se inicia el juego.
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for ( let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    const crearDeck = () => {

        deck = [];

        for( let i = 2; i <=10; i++ ) {
            for( let tipo of tipos) {
                deck.push( i + tipo );
            }
        }

        for( let tipo of tipos ) {
            for( let especial of especiales ) {
                deck.push( especial + tipo );
            }
        }

        return _.shuffle(deck);

    }

    const pedirCarta = () => {

        if ( deck.length === 0 ) {
            alert('Ya no hay más cartas en la baraja, inicia un juego nuevo.');
            throw 'No hay más cartas en la baraja.'; 
        }

        return deck.pop();

    }

    const valorCarta = ( carta ) => {

        const valor = carta.substring( 0, carta.length - 1 );

        return isNaN( valor )
            ? ( valor === 'A' ) ? 11 : 10
            : valor * 1

    }

    //Turno: 0 primer jugador, el último jugador es la computadora.
    const sumarPuntos = ( carta, turno ) => {

        puntosJugadores[ turno ] += valorCarta( carta );
        puntosHTML[ turno ].innerText = puntosJugadores[ turno ];

        return puntosJugadores[ turno ];

    }

    const mostrarCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');

        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );

        divCartasJugadores[ turno ].append( imgCarta );

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {

            if ( puntosComputadora === puntosMinimos ) {
                alert( 'Empate, nadie gana :/' );
            } else if( puntosMinimos > 21 ) {
                alert( 'Computadora gana. :(' );
            } else if (( puntosComputadora > 21 ) && ( puntosComputadora > puntosMinimos )) {
                alert( 'Ganaste!!! :D' );
            } else {
                alert( 'Computadora gana. :(' );
            }

        }, 100);

    }

    // Turno de la computadora.
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();

            puntosComputadora = sumarPuntos( carta, puntosJugadores.length - 1 );
            mostrarCarta( carta, puntosJugadores.length - 1 );
            
        } while (( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ));

        determinarGanador();

    };


    // Eventos

    btnPedir.addEventListener( 'click', () => {

        const carta = pedirCarta();

        const puntosJugador = sumarPuntos( carta, 0 );
        mostrarCarta( carta, 0 );

        if ( puntosJugador > 21 ) {

            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {

            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora( puntosJugador );

        }

    });

    btnDetener.addEventListener( 'click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugadores[ 0 ] );

    });

    btnNuevo.addEventListener( 'click', () => {
        inicializarJuego();
    })

    return {
        nuevoJuego: inicializarJuego
    }

})();

