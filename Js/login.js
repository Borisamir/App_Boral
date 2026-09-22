
import { mostrarNotificacion , mostrarError } from "./notificacion.js"
import { getCookie , API_URL , apiFetch , verify_fields} from "./util.js";


let eventos_actuales=[]

function registrarEvento(elemento, evento, funcion) {
    elemento.addEventListener(evento, funcion);

    eventos_actuales.push({
        elemento: elemento,
        evento: evento,
        funcion: funcion
    });
}



document.addEventListener('DOMContentLoaded' , async () => {

     
    fetch("http://localhost:8000/productos" , {
          method : 'GET',
          credentials: "include"


    })

    async function init_login(){
        
    
       const login_button=document.querySelector(".login-button")
       registrarEvento(login_button,'click',login)

       async function login(e){
           
            
            e.preventDefault();

            const user=document.getElementById("user").value
        
            const password=document.getElementById("password").value
   
            if(!verify_fields({Usuario : user, Contraseña : password})){ 
                return
            }

            await login_fetch(user,password)

       }
    }

    async function login_fetch(user , password){
        const data = await apiFetch('login' , {
            method : 'POST',
            body:JSON.stringify({
                name_user : user,
                password : password
            }),
            

        }) 

        if(!data.state){
            mostrarError(data.error)
            return;
        }
            
        window.location.href="http://localhost:8001/#bienvenida"
    }


    function verify_fields_login(user , password){
        

        if(!user){
            
            mostrarError("No ingreso un usuario")
            return false
        }

        if(!password){
            mostrarError("No ingreso una contraseña")
            return false
        }

        return true

    }

    await init_login();




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