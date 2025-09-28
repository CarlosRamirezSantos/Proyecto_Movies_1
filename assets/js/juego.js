const NMOVIES = 5;
const NELEMENTSPMOVIE = 3;

// Crea y mezcla el deck de películas
const getMoviesDeck = () => {
    let movieDeck = [];
    for (let i = 1; i <= NMOVIES; i++) {
        // Aseguramos formato con dos dígitos (01, 02, 03...)
        const num = String(i).padStart(2, '0');
        movieDeck.push(num + "M");
    }
    return _.shuffle(movieDeck);
};

// Crea y mezcla el deck de elementos (recursos)
const getElementsDeck = () => {
    let elementDeck = [];
    for (let i = 1; i <= NMOVIES; i++) {
        const num = String(i).padStart(2, '0');
        for (let j = 1; j <= NELEMENTSPMOVIE; j++) {
            elementDeck.push(num + "C" + j);
        }
    }
    return _.shuffle(elementDeck);
};

// Inicializamos los decks mezclados
let movieDeck = getMoviesDeck();
let elementDeck = getElementsDeck();

// Función para sacar una película del deck (el último)
const removeMovieDeck = (deck) => {
    if (deck.length === 0) return null;
    return deck.pop();
};

// Escuchar el evento click del botón "Mostrar película"
document.addEventListener('DOMContentLoaded', () => {
    const btnMostrarPelicula = document.getElementById('btnMostrarPelicula');
    const peliculaCaratula = document.getElementById('pelicula-caratula');

    btnMostrarPelicula.addEventListener('click', () => {
        const pelicula = removeMovieDeck(movieDeck);
        if (pelicula) {
            // Actualiza la imagen con la película seleccionada
            peliculaCaratula.innerHTML = `
                <img class="elemento" src="assets/movies/${pelicula}.jpg" alt="Película">
            `;
        } else {
            alert('No quedan más películas disponibles');
        }
    });
});
