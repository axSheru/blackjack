/**
 * C = Clubs.
 * D = Diamonds.
 * H = Hearts.
 * S = Spades.
 */

let deck = [];
const tipos = [ 'C', 'D', 'H', 'S' ];
const especiales = [ 'A', 'J', 'Q', 'K' ];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias HTML.

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const puntuacionJugador = document.querySelector('#puntuacionJugador');
const puntuacionComputadora = document.querySelector('#puntuacionComputadora');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const crearDeck = () => {

    for( let i = 2; i <=10; i++ ) {
        for( tipo of tipos) {
            deck.push( i + tipo );
        }
    }

    for( let tipo of tipos ) {
        for( let especial of especiales ) {
            deck.push( especial + tipo );
        }
    }

    deck = _.shuffle(deck);

    return deck;

}

crearDeck();

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        alert('Ya no hay más cartas en la baraja, inicia un juego nuevo.');
        throw 'No hay más cartas en la baraja.'; 
    }

    const carta = deck.pop();
    return carta;

}

const valorCarta = ( carta ) => {

    const valor = carta.substring( 0, carta.length - 1 );

    return isNaN( valor )
        ? ( valor === 'A' ) ? 11 : 10
        : valor * 1

}

// Turno de la computadora.
const turnoComputadora = ( puntosMinimos ) => {

    do {

        const carta = pedirCarta();

        puntosComputadora += valorCarta( carta );
        puntuacionComputadora.innerText = puntosComputadora;

        const imgCarta = document.createElement('img');

        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );

        divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }
        
    } while (( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ));

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

};


// Eventos

btnPedir.addEventListener( 'click', () => {

    const carta = pedirCarta();

    puntosJugador += valorCarta( carta );
    puntuacionJugador.innerText = puntosJugador;

    const imgCarta = document.createElement('img');

    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add( 'carta' );

    divCartasJugador.append( imgCarta );

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

    turnoComputadora( puntosJugador );

});

