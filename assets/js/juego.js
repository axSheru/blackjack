/**
 * C = Clubs.
 * D = Diamonds.
 * H = Hearts.
 * S = Spades.
 */

let deck = [];
const tipos = [ 'C', 'D', 'H', 'S' ];
const especiales = [ 'A', 'J', 'Q', 'K' ];

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

pedirCarta();

