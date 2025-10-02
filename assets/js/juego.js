const NMOVIES = 5;
const NELEMENTSPMOVIE = 3;

let intentos = 10;
let peliculasCompletadas = 0;
let actoresCompletados = 0;
let peliculaMostrada = null;
let peliculaCompletada = false;

const btnMostrarPelicula = document.getElementById("btnMostrarPelicula");
const peliculaCaratula = document.getElementById("imgCaratula");
const elementosPelicula = document.getElementById("elementos-pelicula");
const btnAdivina = document.getElementById("btnAdivina");
const contenedorRecursos = document.getElementById("elementos-pelicula");
const zonasDestino = document.querySelectorAll("#pelicula-caratula .elemento");
const peliculasCompletadasContador = document.getElementById(
  "peliculas-completadas"
);
const intentosContador = document.getElementById("intentos");

const getMoviesDeck = () => {

  let movieDeck = [];
  for (let i = 1; i <= NMOVIES; i++) {
    const num = String(i).padStart(2, "0");
    movieDeck.push(num + "M");
  }
  return _.shuffle(movieDeck);
};

const getElementsDeck = () => {

  let elementDeck = [];
  for (let i = 1; i <= NMOVIES; i++) {
    const num = String(i).padStart(2, "0");
    for (let j = 0; j < NELEMENTSPMOVIE; j++) {
      elementDeck.push(num + "C" + j);
    }
  }
  return _.shuffle(elementDeck);
};

let movieDeck = getMoviesDeck();
let elementDeck = getElementsDeck();

const removeMovieDeck = (deck) => {

  if (deck.length === 0) return null;
  return deck.pop();
};

const actualizarContadores = () => {

  peliculasCompletadasContador.textContent = `Películas Completadas ${peliculasCompletadas}`;
  intentosContador.textContent = `Intentos ${intentos}`;
};

const mostrarPelicula = () => {

  btnMostrarPelicula.addEventListener("click", () => {
    if (peliculaMostrada !== null && !peliculaCompletada) {
      alert("Debes completar los personajes antes de cambiar de película.");
      return;
    }

    let peliculaSeleccionada = removeMovieDeck(movieDeck);

    zonasDestino.forEach((zona) => {
      zona.innerHTML = "";
      zona.style.border = "";
    });

    elementDeck = getElementsDeck();

    elementosPelicula.innerHTML = "";

    peliculaMostrada = peliculaSeleccionada;
    peliculaCompletada = false;
    actoresCompletados = 0;

    if (peliculaMostrada) {
      peliculaCaratula.src = `assets/movies/${peliculaMostrada}.jpg`;
    } else {
      alert("No quedan más películas disponibles");
    }
  });
};

const adivinar = () => {

  btnAdivina.addEventListener("click", () => {
    if (elementDeck.length === 0) {
      alert("No quedan más recursos");
      return;
    }

    const recurso = elementDeck.pop();
    const div = document.createElement("div");
    div.classList.add("elemento");

    div.setAttribute("data-id", recurso);
    div.draggable = true;

    const img = document.createElement("img");
    img.classList.add("recurso");
    img.src = `assets/characters/${recurso}.jpg`;

    div.appendChild(img);
    elementosPelicula.appendChild(div);

    activarDragEnRecursos();
  });
};

const activarDragEnRecursos = () => {
    
  const recursos = contenedorRecursos.querySelectorAll(".elemento");
  recursos.forEach((recursoDiv) => {
    recursoDiv.setAttribute("draggable", "true");
    const idRecurso = recursoDiv.getAttribute("data-id");

    recursoDiv.addEventListener("dragstart", (evento) => {
      evento.dataTransfer.setData("resourceId", idRecurso);
      evento.dataTransfer.effectAllowed = "move";
    });

    const img = recursoDiv.querySelector("img");
    if (img) {
      img.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });
    }
  });
};

const onDragOver = (evento) => {

  evento.preventDefault();
  evento.currentTarget.style.backgroundColor = "gray";
};

const onDragLeave = (evento) => {

  evento.currentTarget.style.backgroundColor = "black";
};

const onDrop = (evento) => {

  evento.preventDefault();
  const zona = evento.currentTarget;
  zona.style.backgroundColor = "black";

  const idRecurso = evento.dataTransfer.getData("resourceId");
  if (!idRecurso || !peliculaMostrada) return;

  accionSoltar(zona, idRecurso);
};

const accionSoltar = (zona, idRecurso) => {

  const codigoPelicula = peliculaMostrada.substring(0, 2);
  const codigoRecurso = idRecurso.substring(0, 2);

  if (codigoPelicula === codigoRecurso) {
    zona.innerHTML = `<img class="recurso" src="assets/characters/${idRecurso}.jpg" alt="">`;
    zona.style.border = "3px solid green";

    const recursoOriginal = contenedorRecursos.querySelector(
      `[data-id='${idRecurso}']`
    );
    if (recursoOriginal) recursoOriginal.remove();

    actoresCompletados++;

    if (actoresCompletados === 3) {
      peliculaCompletada = true;
      peliculasCompletadas++;
      actualizarContadores();

      if (peliculasCompletadas === 5) {
        alert("¡Felicidades! Has completado las 5 películas.");
        reiniciarJuego();
      }
    }
  } else {
    zona.style.backgroundColor = "red";
    setTimeout(() => {
      zona.style.backgroundColor = "black";
    }, 1000);

    intentos--;
    actualizarContadores();

    if (intentos == 0) {
      alert("Ohhh, has perdido");
      reiniciarJuego();
    }
  }
};

const manejarYSoltar = () => {
  zonasDestino.forEach((zona) => {
    zona.addEventListener("dragover", onDragOver);
    zona.addEventListener("dragleave", onDragLeave);
    zona.addEventListener("drop", onDrop);
  });
};

const reiniciarJuego = () => {
  intentos = 10;
  peliculasCompletadas = 0;
  actoresCompletados = 0;
  peliculaMostrada = null;
  peliculaCompletada = false;

  movieDeck = getMoviesDeck();
  elementDeck = getElementsDeck();

  peliculaCaratula.src = "";
  elementosPelicula.innerHTML = "";

  zonasDestino.forEach((zona) => {
    zona.innerHTML = "";
    zona.style.border = "";
    zona.style.backgroundColor = "black";
  });

  actualizarContadores();
};

mostrarPelicula();
adivinar();
manejarYSoltar();
