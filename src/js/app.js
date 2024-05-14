document.addEventListener("DOMContentLoaded", function() {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
});

function navegacionFija() {
    const header = document.querySelector(".header");
    const festival = document.querySelector(".sobre-festival");

    window.addEventListener("scroll", () => {
        if(festival.getBoundingClientRect().bottom < 1) { // en cuanto lo pasemos fijamos barra
            header.classList.add("fixed");
        }
        else {
            header.classList.remove("fixed");
        }
    });
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    const NUM_IMAGENES = 16;
    
    for(let i=1; i<=NUM_IMAGENES; i++) {
        const imagen = document.createElement("IMG");
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = "Imagen galería";
        imagen.addEventListener("click", () => mostrarImagen(i)); // porque hay que pasar argumento
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = "Imagen galería";
    
    // const cerrarBtn = document.createElement("BUTTON");
    // cerrarBtn.textContent = "X";
    // cerrarBtn.classList.add("btn-cerrar");
    // cerrarBtn.addEventListener("click", cerrarModal);

    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.addEventListener("click", cerrarModal);
    modal.appendChild(imagen);
    // modal.appendChild(cerrarBtn);

    const body = document.querySelector("body");
    body.classList.add("overflow-hidden"); // evitar el scroll
    body.appendChild(modal);
}

function cerrarModal() {
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden"); // permitimos scroll
    
    const modal = document.querySelector(".modal");
    modal.classList.add("fade-out");
    setTimeout(() => {
        modal?.remove();
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".navegacion-principal a");

        let sectionActualId = "";
        sections.forEach( section => {
            const sectionTop = section.offsetTop; // distancia con el top del body
            const sectionHeight = section.clientHeight; // tamaño del section
            if(window.scrollY >= (sectionTop - sectionHeight/3)) {
                sectionActualId = section.id; // si he sobrepasado la mayor parte de la section
            }
        });

        navLinks.forEach( link => {
            if(link.getAttribute("href") === `#${sectionActualId}`) {
                link.classList.add("active");
            }
            else {
                link.classList.remove("active");
            }
        });
    });
}