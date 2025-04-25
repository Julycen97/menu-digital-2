document.addEventListener("DOMContentLoaded", () => {
    cargarHeader();

    cargarMenuLibre();

    cargarComidas();

    cargarBebidas();

    animacionDetails();

    cargarFooter();
});

function cargarHeader() {
    const header = document.querySelector(".header");
    const divLogo = document.createElement("div");
    const divNosotros = document.createElement("div");
    const divRedes = document.createElement("div");

    divLogo.id = "logo";
    divNosotros.id = "nosotros";
    divRedes.id = "redes"

    divLogo.innerHTML += `<div id="imgLogo" role="img"></div>`;

    async function cargarTodo() {
        let info;

        await obtenerInfo()
            .then((response) => {
                info = response;

                divNosotros.innerHTML +=
                    `<h1>${info.titulo}</h1>`;

                divRedes.innerHTML +=
                    `<a id="${info.redes[0].nombre}" href="${info.redes[0].instagram}" target="_blank">
                        <i class="bi bi-${info.redes[0].nombre}"></i>
                    </a>
    
                    <a id="${info.redes[1].nombre}" href="${info.redes[1].facebook}" target="_blank">
                        <i class="bi bi-${info.redes[1].nombre}"></i>
                    </a>`;

                header.appendChild(divLogo);
                header.appendChild(divNosotros);
                header.appendChild(divRedes);

            })
            .catch((error) => console.log(error));
    }

    cargarTodo();
}

function cargarMenuLibre() {
    const seccion = document.querySelector(".main > section");

    seccion.innerHTML += `<h2>🍕 Menú Libre 🍜</h2>`;

    async function menuLibre() {
        await obtenerPlatos()
            .then((response) => {
                response.libre.forEach(plato => {
                    seccion.innerHTML +=
                        `<div class="cardMenuLibre">
                        <div id="imgMenuLibre" style="background-image: url(${plato.imagen})" role="img"></div>

                        <div id="tituloDesc">
                            <h3>${plato.nombre}</h3>
                            <p><i>${plato.descripcion}</i></p>
                        </div>

                        <div id="precio">
                            <p>$${plato.precio}</p>
                        </div>
                    </div>`;
                });
            })
    }

    menuLibre();
}

function cargarComidas() {
    const seccion = document.querySelector(".main section:nth-child(2)");
    const iconos = { entradas: "🥟", pizzas: "🍕", sandwiches: "🥪", postres: "🍨" };

    seccion.innerHTML += `<h2>${iconos.entradas} Comidas ${iconos.sandwiches}</h2>`;

    async function comidas() {
        await obtenerPlatos()
            .then((response) => {

                for (const keys in response) {

                    if (keys === "libre" || keys === "aperitivos" || keys === "bebidas") {
                        continue;
                    }

                    const details = document.createElement("details");
                    const summary = document.createElement("summary");
                    let plato = keys[0].toUpperCase() + keys.slice(1);

                    summary.innerHTML += `${iconos[keys]}  ${plato}`;

                    details.appendChild(summary);

                    response[keys].forEach(plato => {
                        details.innerHTML +=
                            `<div class="cardComida">

                            <div id="tituloDesc">
                                <h3>${plato.nombre}</h3>
                                <p><i>${plato.descripcion}</i></p>
                            </div>

                            <div id="precio">
                            <p>$${plato.precio}</p>
                            </div>
                            </div>`;
                    });

                    seccion.appendChild(details);
                }
            })
    }

    comidas();
}

function cargarBebidas() {
    const seccion = document.querySelector(".main section:last-child");
    const iconos = { aperitivos: "🍸", bebidas: "🥂" };

    seccion.innerHTML += `<h2>${iconos.aperitivos} Bebidas ${iconos.bebidas}</h2>`;

    async function bebidas() {
        await obtenerPlatos()
            .then((response) => {

                for (const keys in response) {
                    if (keys === "aperitivos" || keys === "bebidas") {
                        const details = document.createElement("details");
                        const summary = document.createElement("summary");
                        let bebida = keys[0].toUpperCase() + keys.slice(1);

                        summary.innerHTML += `${iconos[keys]}  ${bebida}`;

                        details.appendChild(summary);

                        response[keys].forEach(plato => {
                            details.innerHTML +=
                                `<div class="cardBebida">
                            
                            <div id="tituloDesc">
                            <h3>${plato.nombre}</h3>
                            <p><i>${plato.descripcion}</i></p>
                            </div>
                            
                            <div id="precio">
                            <p>$${plato.precio}</p>
                            </div>
                            </div>`;
                        });

                        seccion.appendChild(details);
                    }
                }
            })
    }

    bebidas();
}

function animacionDetails(){
    const details = document.querySelectorAll("details");

    details.forEach((detail) => {
        detail.addEventListener("click", (e) => {
            if (detail.hasAttribute("abrir")) { // since it's not closed yet, it's open!
                e.preventDefault(); // stop the default behavior, meaning - the hiding
                detail.classList.add("cierre"); // add a class which applies the animation in CSS
            }
        });
    });

    details.forEach((detail) => {
        // when the "close" animation is over
        detail.addEventListener("animationend", (e) => {
            if (e.animationName === "cerrar") {
                detail.removeAttribute("abrir"); // close the element
                detail.classList.remove("cierre"); // remove the animation
            }
        });
    })
}

function cargarFooter(){
    const footer = document.querySelector(".footer");
    const divLogoGrande = document.createElement("div");
    const imgDivLogoGrande = new Image();
    const divInfoLocal = document.createElement("div");
    const divRedesFooter = document.createElement("div");
    const divDerechos = document.createElement("div");

    divLogoGrande.id = "logoGrande";
    divInfoLocal.id = "infoLocal";
    divRedesFooter.id = "redesFooter";
    divDerechos.id = "derechos"

    imgDivLogoGrande.src = "./assets/IMG/logo.png";
    imgDivLogoGrande.alt = "Logo";

    divLogoGrande.appendChild(imgDivLogoGrande);

    async function cargaFooter() {
        let info;

        await obtenerInfo()
            .then((response) => {
                info = response;

                divInfoLocal.innerHTML +=
                    `<p>${info.locales[0].direccion}</p>
                    <p>${info.locales[0].email}</p>
                    <p>${info.locales[0].telefono}</p>`;

                divRedesFooter.innerHTML +=
                    `<a id="${info.redes[0].nombre}" href="${info.redes[0].instagram}" target="_blank">
                        <i class="bi bi-${info.redes[0].nombre}"></i>
                    </a>

                    <a id="${info.redes[1].nombre}" href="${info.redes[1].facebook}" target="_blank">
                        <i class="bi bi-${info.redes[1].nombre}"></i>
                    </a>`;

                divDerechos.innerHTML +=
                    `<p>&copy; Todos los derechos reservados - ${new Date().getFullYear()}</p>`;

                footer.appendChild(divLogoGrande);
                footer.appendChild(divInfoLocal);
                footer.appendChild(divRedesFooter);
                footer.appendChild(divDerechos);

            })
            .catch((error) => console.log(error));
    }

    cargaFooter();
}

function obtenerInfo() {
    return fetch("../assets/JSON/platos.json")
        .then((response) => response.json())
        .then((datos) => {
            return datos.nosotros;
        })
        .catch((error) => console.log(error))
}

function obtenerPlatos() {
    return fetch("../assets/JSON/platos.json")
        .then((response) => response.json())
        .then((datos) => {
            return datos.platos;
        })
        .catch((error) => console.log(error))
}