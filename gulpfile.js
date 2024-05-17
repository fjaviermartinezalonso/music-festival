import path from "path"; // lo toma de nodejs, ya incluido
import fs from "fs"; // ya incluido en node
import {src, dest, watch, series} from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import terser from "gulp-terser";
import sharp from "sharp";

/* Compila Sass usando la funcion gulpSass utilizando la dependencia de Sass. Es
una forma de decirle que utilice las dependencias de la carpeta node-modules */
const sass = gulpSass(dartSass);

export function js(done) {
    src("src/js/app.js")
        .pipe(terser())
        .pipe(dest("build/js"));
    done();
}

/* Recoge el fichero scss de la ruta especificada, compila usando la funcion anterior
y deja el resultado en la ruta destino */
/* Con sourcemaps al inspeccionar el elemento en el navegador dirá a cuál arhivo Sass pertenece */
export function css(done) {
    src("src/scss/app.scss", {sourcemaps: true})
        .pipe(sass( {
            outputStyle: "compressed"
        }).on("error", sass.logError)) /* En caso de error mostrarlo en terminal */
        .pipe(dest("build/css", {sourcemaps: true}));
    done();
}

/* Para reducir el tamaño de las imágenes de la galería en pequeño (thumbnail). 
Usamos sharp, con código nodejs */
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

export function dev() {
    watch("src/scss/**/*.scss", css);
    watch("src/js/*.js", js);
}

/* Ejecuta en serie las siguientes funciones. Como es default no tiene nombre,
se ejecuta al llamar a gulp sin argumentos. La función dev
está al final porque tiene watch */
export default series(crop, js, css, dev);