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


const btnMostrarPelicula = document.getElementById('btnMostrarPelicula');
const peliculaCaratula = document.getElementById("imgCaratula");
const elementosPelicula = document.getElementById("elementos-pelicula")



    btnMostrarPelicula.addEventListener('click', () => {
        const pelicula = removeMovieDeck(movieDeck);

        elementosPelicula.innerHTML= ""
        if (pelicula) {
            // Actualiza la imagen con la película seleccionada
            peliculaCaratula.src = `assets/movies/${pelicula}.jpg`;
            
        } else {
            alert('No quedan más películas disponibles');
        }
    });


const btnAdivina = document.getElementById('btnAdivina');
const contenedor = document.getElementById('elementos-pelicula');

btnAdivina.addEventListener('click', () => {
    if (elementDeck.length === 0) {
        alert("No quedan más recursos");
        return;
    }

    const recurso = elementDeck.pop(); 
    const div = document.createElement("div");
    div.classList.add("elemento");

    const img = document.createElement("img");
    img.classList.add("recurso");
    img.src = `assets/characters/${recurso}.jpg`;

    div.appendChild(img);
    contenedor.appendChild(div);
});