export function mostrarNotificacion(titulo,mensaje) {

    const notificacion = document.getElementById("notificacion");

    document.getElementById("titulo-mensaje").innerHTML=titulo
    document.getElementById("mensaje").innerHTML=mensaje
    notificacion.classList.add("mostrar");

    setTimeout(() => {
        notificacion.classList.remove("mostrar");
    }, 3000);
}

export function mostrarError(mensaje = "No se pudo agregar el producto.") {

    const notificacion = document.getElementById("notificacionError");
    const mensajeElement = document.getElementById("mensajeError");

    mensajeElement.textContent = mensaje;

    notificacion.classList.add("mostrar");

    setTimeout(() => {
        notificacion.classList.remove("mostrar");
    }, 3000);
}