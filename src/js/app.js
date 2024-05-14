document.addEventListener("DOMContentLoaded", function() {
    crearGaleria();
});

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
