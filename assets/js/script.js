let baraja = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

//Manejo del DOM
const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

//small del html
const puntosHTML = document.querySelectorAll("small");

//inicializar div de jugador y computadora
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

//puntajes
let puntosJugador = 0;
let puntosComputadora = 0;

//Funcion nueva baraja
const crearBaraja = () => {
//Creamos la baraja del 2 al 10
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
        baraja.push(i + tipo);
    }
  }

  //Funcion de las cartas especiales
  for (let especial of especiales) {
    for (let tipo of tipos) {
      baraja.push(especial + tipo);
    }
  }

  //aleatorizamos la baraja para poder jugar
    baraja = _.shuffle(baraja);

};

//Funcion pedir carta
const pedirCarta = () => {
    if (baraja.length === 0) {

        throw "No hay cartas en la baraja";
    }

    //el pop ayuda a sacar la ultima carta
    const carta = baraja.pop();
    return carta;
};

//valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    let puntos = 0;
    if (isNaN(valor)) {
        puntos = valor === "A" ? 11 : 10;
    }else {
        puntos = valor *1;
    }

    return puntos;
};

// funcion de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {
        //todo esto se ejecuta por lo menos una vez
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    //crear y mostrar las cartas para la computadora
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
        break;
    }
    }while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);


    setTimeout(() => {
    //Mensaje de quien gana
    if (puntosComputadora === puntosMinimos) {
    alert("Nadie gana");
    }else if (puntosMinimos > 21) {
        alert("Computadora gana");
    }else if (puntosComputadora > 21) {
        alert("Jugador gana");
    }else {
        alert("Computadora gana");
    }
}, 200);
};



// pedir carta desde el btn
btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    
    // 4C = 4, AC = 11
    puntosJugador = puntosJugador + valorCarta(carta);
    
    puntosHTML[0].innerText = puntosJugador;

    //crear y mostrar las cartas
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);


    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21) {
        btnPedir.disabled = true;
    }
});

btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener("click", () => {
    baraja = [];
    crearBaraja();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})