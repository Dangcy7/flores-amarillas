const jardin = document.getElementById("jardin");
const mensaje = document.getElementById("mensaje");

let iniciado = false;
let cantidadFlores = 0;
const maxFlores = 25;

jardin.addEventListener("pointerdown", iniciarJardin);

function iniciarJardin(evento) {
    if (evento.target.closest("#mensaje")) return;

    // La primera vez que toca, iniciamos la animación
    if (!iniciado) {
        iniciado = true;

        crearFlor();

        mensaje.innerHTML = `
            <p>Espera...</p>
        `;

        llenarJardin();
    }
}

function llenarJardin() {
    const intervalo = setInterval(() => {

        if (cantidadFlores >= maxFlores) {
            clearInterval(intervalo);

            mostrarMensaje();

            return;
        }

        crearFlor();

    }, 250);
}

function crearFlor() {
    const flor = document.createElement("div");

    flor.className = "flor";

    flor.innerHTML = `
    <div class="flor-cabeza">
        <div class="petalo p1"></div>
        <div class="petalo p2"></div>
        <div class="petalo p3"></div>
        <div class="petalo p4"></div>
        <div class="petalo p5"></div>
        <div class="petalo p6"></div>
        <div class="centro"></div>
    </div>

    <div class="tallo"></div>
`;

    // Posición horizontal aleatoria
    const posicionX = 5 + Math.random() * 90;

    flor.style.left = `${posicionX}%`;

    const profundidad = Math.random();

 flor.style.top = `calc(82% + ${profundidad * 60}px)`;

    // Tamaño aleatorio
    const escala = 0.5 + profundidad * 0.8;
    const inclinacion = -4 + Math.random() * 8;
    const duracion = 2.5 + Math.random() * 2;

    flor.style.setProperty("--inclinacion", `${inclinacion}deg`);
    flor.style.setProperty("--duracion", `${duracion}s`);
    


    flor.style.setProperty("--escala", escala);
    flor.style.zIndex = Math.floor(1 + profundidad * 5);

    jardin.appendChild(flor);
    flor.addEventListener("animationend", () => {
    flor.classList.add("crecida");
});
    

    cantidadFlores++;
}

function mostrarMensaje() {
    mensaje.classList.remove("final");
    mensaje.style.opacity = "0";

    setTimeout(() => {
        mensaje.innerHTML = `
            <p>
                Te iba a comprar tus flores amarillas,
            </p>

            <p>
                pero preferí perder horas de mi valioso tiempo
                para darte todas las flores que quieras. 🌻
            </p>

            <p>
                Gracias por ser mi mejor amiga Eli.
            </p>
        `;

        mensaje.classList.add("final");

        setTimeout(() => {
            const ultimo = document.createElement("p");
            ultimo.textContent = "Babosa";
            mensaje.appendChild(ultimo);
        }, 5000);

    }, 1500);
}