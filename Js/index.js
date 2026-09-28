import { seccion_bienvenida , seccion_productos ,  seccion_ventas , seccion_estadisticas} from "./sections.js"
import { getCookie , API_URL , apiFetch , verify_answer_fetch , APP_URL} from "./util.js";
document.addEventListener("DOMContentLoaded" , () => {

    

     
     revisar_ubicacion()
     
     


    document.addEventListener("click" , (e) => {

        

        if(e.target.classList.contains("bar")){
            e.preventDefault();

            const ruta = e.target.getAttribute("href");

            window.location.hash = ruta;

            document.querySelectorAll(".active").forEach( e => {
                e.classList.remove("active")
            })

            if(e.target.classList.contains("titulo")){
                revisar_ubicacion()
                return;
            }

            e.target.classList.add("active")

            revisar_ubicacion()
            
        }else if(e.target.closest(".route")){
            e.preventDefault()
            

            const ruta = e.target.closest(".route");

            window.location.hash = ruta.getAttribute("href");

            revisar_ubicacion()

            

        }
    })
    



    function revisar_ubicacion(){
        const seccion = window.location.hash
    
        switch(seccion){
         case '#bienvenida':
             seccion_bienvenida()
             break;
         case '#productos':
             seccion_productos()
             break;
         case '#ventas':
             seccion_ventas()
             break;
         case '#estadisticas':
             seccion_estadisticas()
             break;
         case '#logout':
             cerrar_sesion()
             break;


         }

    }

    async function cerrar_sesion(){
        const data = await apiFetch('logout',{
            method : 'POST',
        })

        if(!verify_answer_fetch(data)){
            return
        }

        document.cookie='CSRF-TOKEN=; expires=Thu , 01 Jan 1970 00:00:00 GMT ;path=/'
        window.location.href= `${APP_URL}/login `

        
    }

    
})


