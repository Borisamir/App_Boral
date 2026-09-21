
export function getCookie(name){
        const value = `; ${document.cookie}`
        console.log(value)
        const parts =value.split(`; ${name}=`)
        if(parts.length == 2){
            return decodeURIComponent(parts.pop().split(';').shift())
        }
        return null
}



export function getUser() {
         return fetch('http://localhost:8000/me' , {credentials : "include"})
                .then(res => {  
                    return res.json()
                })
             
}


        
