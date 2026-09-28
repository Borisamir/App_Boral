import { mostrarNotificacion , mostrarError } from "./notificacion.js"

export const API_URL = window.APP_CONFIG.API_URL;
export const APP_URL = window.APP_CONFIG.APP_URL;


export function getCookie(name){
        const value = `; ${document.cookie}`
        const parts =value.split(`; ${name}=`)
        if(parts.length == 2){
            return decodeURIComponent(parts.pop().split(';').shift())
        }
        return null
}



export function getUser() {
         return fetch(`${API_URL}/me` , {credentials : "include"})
                .then(res => {  
                    return res.json()
                })
             
}


export async function apiFetch(url , options={}){
    const res = await fetch(`${API_URL}/${url}`,{
         ...options,
         credentials:"include",
         headers :{
                "Content-Type":"application/json",
                'X-CSRF-TOKEN':getCookie('CSRF-TOKEN'),
                 ...options.headers
        }
        
    })


    return await res.json()
}


export function verify_fields(fields = {}){

    let flag= true

    const entries=Object.entries(fields)

    for(const elemento of entries){
        if(!elemento[1]){
            mostrarError("Falta el campo: " + elemento[0])
            flag=false
            break;
        }
    }

    return flag
}

export function verify_answer_fetch_notification(data,title,details){
    if(!data.state){
        mostrarError(data.error)
        return false;
    }
    mostrarNotificacion("Producto agregado","El producto se agrego correctamente");
    return true;

}

export function verify_answer_fetch(data){
    console.log(data)
    if(!data.state){
        console.log("Error")
        return false;
    }
    return true;

}


        
