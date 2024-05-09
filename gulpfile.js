import {src, dest, watch} from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

/* Compila Sass usando la funcion gulpSass utilizando la dependencia de Sass. Es
una forma de decirle que utilice las dependencias de la carpeta node-modules */
const sass = gulpSass(dartSass);

/* Recoge el fichero scss de la ruta especificada, compila usando la funcion anterior
y deja el resultado en la ruta destino */
export function css(done) {
    src("src/scss/app.scss")
        .pipe(sass().on("error", sass.logError)) /* En caso de error mostrarlo en terminal */
        .pipe(dest("build/css"));
    done();
}

export function dev() {
    watch("src/scss/**/*.scss", css);
}