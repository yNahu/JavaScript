/*
Consigna del desafio:
    variables
    funciones para estructurar la logica
    condiciones (if- else- switch)
    uso de un ciclo

    utilizar PROMPT para que se ingresen los datos
    utilizar CONFIRM - ALERT
    ciclo WHILE
    El operador SWITCH

*/
let mensajeCosto = ""
const mensajeInicial = "Ingresa el codigo de la prenda a consultar: \n" +
                        "a) Bermuda playera \n" +
                        "b) Remera casual \n" +
                        "c) Pantalon de jean \n" +
                        "d) Camisa office \n"

function preguntarPrecios() {
    let seleccion = prompt(mensajeInicial).toLowerCase // convierte a minuscula
    
    if (seleccion !== "a" && seleccion !== "b" && seleccion !== "c" && seleccion !== "d") {
        alert("debes ingresar un codigo valido, por favor")
    } else {

    switch(seleccion) {
        case "a":
            mensajeCosto = "La bermuda cuesta $ 2900"
            break
        case "b":
            mensajeCosto = "La remera cuesta $ 4100"
            break
        case "c":
            mensajeCosto = "El pantalon cuesta $ 8700"
            break
        case "d":
            mensajeCosto = "La camisa cuesta $ 10800"
            break
        default:
            console.error("Algo se ropmio, no deberias ver este mensaje.")
        }
        alert(mensajeCosto)
    }
    const respuesta = confirm("¿Deseas conocer otro precio?")
    while(respuesta) {
        preguntarPrecios()
    }
}