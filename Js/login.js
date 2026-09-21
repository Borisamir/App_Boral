
import { mostrarNotificacion , mostrarError } from "./notificacion.js"
import { getCookie } from "./util.js";


let eventos_actuales=[]

function registrarEvento(elemento, evento, funcion) {
    elemento.addEventListener(evento, funcion);

    eventos_actuales.push({
        elemento: elemento,
        evento: evento,
        funcion: funcion
    });
}



document.addEventListener('DOMContentLoaded' , () => {

     
    fetch("http://localhost:8000/productos" , {
          method : 'GET',
          credentials: "include"


    })

    function init_login(){
        
    
       const login_button=document.querySelector(".login-button")
       registrarEvento(login_button,'click',login)

       function login(e){
           
           e.preventDefault();
            const user=document.getElementById("user").value
            const password=document.getElementById("password").value

        if(!user){
            mostrarError("No ingreso un usuario")
            return
        }

        if(!password){
            mostrarError("No ingreso una contraseña")
            return
        }

        fetch("http://localhost:8000/login" , {
            method : 'POST',
            headers:{
                "Content-Type":"application/json",
                'X-CSRF-TOKEN':getCookie('CSRF-TOKEN')
            },
            credentials: "include",
            body:JSON.stringify({
                name_user : user,
                password : password
            })
        })
        .then(request => request.json())
        .then(data => {
            if(!data.state){
                mostrarError(data.error)
                return;
            }
            
            window.location.href="http://localhost:8001/#bienvenida"

        })

       }
    }

    init_login();




})

export function destroyLogin() {

    eventos_actuales.forEach(({ elemento, evento, funcion }) => {

        elemento.removeEventListener(
            evento,
            funcion
        );

    });

    eventos_actuales = [];
}    