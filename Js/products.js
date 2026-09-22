

import { mostrarNotificacion , mostrarError } from "./notificacion.js"
import { ventas_totales_cache, ingresos_totales_diarios_cache} from "./sells.js"
import { getUser , getCookie , apiFetch , verify_fields, verify_answer_fetch  , API_URL} from "./util.js"



let eventos_actuales=[]

let Datos_Registro_cache=null
let Datos_Productos_cache=null
let Productos_cache=null
let Marcas_cache=null
let Categorias_cache=null

function registrarEvento(elemento, evento, funcion) {
    elemento.addEventListener(evento, funcion);

    eventos_actuales.push({
        elemento: elemento,
        evento: evento,
        funcion: funcion
    });
}




export async function initProducts(){

    const user = await getUser();

    obtenerDatosProductos();
    obtenerProductos();
    actualizar_datos_registroHTML()
    inicializar_datos_registro();
    

    const btnNuevoProducto = document.getElementById("btnNuevoProducto");

   const modalProducto = document.getElementById("modalProducto");
   const modalContenido = document.getElementById("modalContenido");


   const estadoInput = document.getElementById("estado");

   registrarEvento(btnNuevoProducto , "click" , inicializar_btnNuevoProducto);

   function inicializar_btnNuevoProducto(){
       convertir_formulario_nuevo_producto()

        inicializar_datos_formulario();

        inicializar_funciones_formulario();

        inicializar_funcion_stock()

        const btn_guardar = document.getElementById("btn-guardar")

        registrarEvento(btn_guardar , "click" , agregarProducto)
    
        modalProducto.classList.add("active");

   }

   function inicializar_datos_formulario(){
         obtenerCategorias();
         obtenerMarcas();
      }

   

    async function agregarProducto(event){
        event.preventDefault()

        const id= await agregarProducto_fetch()

        if(!id){
            return
        }

        agregarProductoHTML(id)

    }

   async function agregarProducto_fetch(){

         const nombre = document.getElementById("nombre_producto").value
         const precio = document.getElementById("precio").value
         const precio_venta = document.getElementById("precio_venta").value
         const marca = document.getElementById("marca").value
         const stock = document.getElementById("stock").value
         const categoria = document.getElementById("categoria").value
         const estado = document.getElementById("estado").value

         if(!verify_fields({
            Nombre : nombre,
            Precio : precio,
            Precio_Venta : precio_venta,
            Marca : marca,
            Stock : stock,
            Categoria : categoria,
            Estado : estado,
         })){
            return false
         }


         const data = await apiFetch('productos',{
            method: "POST",
            body : JSON.stringify({
             nombre_producto : nombre,
             precio : precio,
             stock : stock ,
             id_categoria : categoria ,
             id_estado : estado,
             id_brand : marca,
             precio_venta : precio_venta,
             user_id : user.data.user_id
           })})
        
        if(!verify_answer_fetch(data,"Producto agregado","El producto se agrego correctamente")){
            return false
        }
        return data.id_producto
        
        
        

    }
    

    

      function sumar_total_productos(){
           const total= parseInt(document.getElementById("total").innerHTML) + 1
           document.getElementById("total").innerHTML=total.toString()
      }

      function restar_total_productos(){
        const total= parseInt(document.getElementById("total").innerHTML) - 1
        document.getElementById("total").innerHTML=total.toString()

      }

      

      function inicializar_funciones_formulario(){
          document.getElementById("btnCerrarModal").addEventListener("click", cerrarModal);
          document.getElementById("btnCancelar").addEventListener("click", cerrarModal);
       }
      function agregarProductoHTML(id){
       const nombre = document.getElementById("nombre_producto").value
       const precio = document.getElementById("precio").value
       const marca=document.getElementById("marca")
       const texto_marca=marca.options[marca.selectedIndex].textContent;

       const stock = document.getElementById("stock").value
    
      const categoria=document.getElementById("categoria")
       const texto_categoria=categoria.options[categoria.selectedIndex].textContent;

      let estado = document.getElementById("estado").value

      let status = null;

       switch(estado){
           case "1":
               status = "ok";
               estado = "Disponible"
               break
           case "2":
               status = "danger"
               estado = "Agotado"
               break
               
       }

       console.log(estado)
       console.log(status)


       const tabla = document.getElementById("productos")
       tabla.insertAdjacentHTML(
                    'beforeend',
                    `<tr id="registro-${id}">
                        <td class="nombre-producto">${nombre}</td>
                        <td class="marca">${texto_marca}</td>
                        <td class="categoria">${texto_categoria}</td>
                        <td class="precio">${precio}</td>
                        <td class="stock">${stock}</td>
                        <td class="state"><span class="status ${status}">${estado}</span></td>
                        <td><button 
                        class="edit"
                        id="edit-${id}"
                        data-id="${id}"
                        data-nombre="${nombre}"
                        data-precio="${precio}"
                        data-stock="${stock}"
                        data-marca="${marca.value}"
                        data-categoria="${categoria.value}"
                        >Editar
                        </button>
                        </td>
                        <td><button 
                        class="delete"
                        id="delete-${id}"
                        data-id="${id}"
                        >Eliminar
                        </button>
                        </td>

                    </tr>`
            )
    sumar_total_productos()

    

}
    















document.addEventListener("click" , (select) => {

    if(select.target.classList.contains("edit")){

        const id=select.target.dataset.id

        convertir_formulario_editar_producto(select);
        inicializar_datos_formulario();
        inicializar_funciones_formulario();
        
        
        inicializar_funcion_stock()

        const btn_Editar=document.getElementById("btn-editar")

        registrarEvento(btn_Editar , "click" , inicializar_btnEditar)

        function inicializar_btnEditar(e){
            e.preventDefault()
            actualizarDatosProductos(id)
            actualizarDatosProductsHTML(id)

        }


        modalProducto.classList.add("active");


        

        

        

    }else if(select.target.classList.contains("delete")){
        

        const id=select.target.dataset.id

        convertir_formulario_eliminar_producto();
        inicializar_funciones_formulario();

        const btn_Delete=document.getElementById("btn-delete")

        registrarEvento(btn_Delete , "click" , inicializar_btnDelete)

        function inicializar_btnDelete(e){
            e.preventDefault()
            eliminarDatosProductos(id);
            eliminarDatosProductosHTML(id);
            restar_total_productos();

        }
        
        modalProducto.classList.add("active");

        

    }

})





// Cerrar formulario
function cerrarModal() {
    modalProducto.classList.remove("active");
    modalContenido.innerHTML="";
}





// Actualizar estado según stock


function actualizar_estado_input(){
    const stock = Number(document.getElementById("stock").value);

    if (stock > 0) {
        document.getElementById("estado").value = 1;
    } else {
        document.getElementById("estado").value = 2;
    }

}









function convertir_formulario_nuevo_producto(){
    modalContenido.insertAdjacentHTML('beforeend',
        `
        <div class="modal-header">
                    <h2 id="titulo-formulario">Nuevo Producto</h2>

                    <button type="button" id="btnCerrarModal" class="btn-cerrar">
                     ×
                    </button>
                </div>

              <form id="formProducto">

            <!-- Nombre -->
               <div class="form-group">
                <label for="nombre_producto">
                    Nombre del producto
                </label>
                <input
                    type="text"
                    id="nombre_producto"
                    name="nombre_producto"
                    placeholder="Ej. Cuaderno A4"
                    required
                >
            </div>
            <!-- Precio -->
            <div class="form-group">
                <label for="precio">
                    Precio
                </label>

                <input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Ej. 120.00"
                    min="0"
                    step="0.01"
                    required
                >
              </div>

              <div class="form-group">
                <label for="precio_venta">
                    Precio Venta
                </label>

                <input
                    type="number"
                    id="precio_venta"
                    name="precio_venta"
                    placeholder="Ej. 150.00"
                    min="0"
                    step="0.01"
                    required
                >
              </div>
            <!-- Stock -->
            <div class="form-group">
                <label for="stock">
                    Stock
                </label>

                <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Ej. 10"
                    min="0"
                    step="1"
                    required
                >
            </div>
            <!-- Marca -->
            <div class="form-group">
                <label for="brand">
                    Marca
                </label>

                <select
                id="marca"
                name ="marca"
                required
                >
                </select>
            </div>
            <!-- Categoría -->
            <div class="form-group">
                <label for="categoria">
                    Categoría
                </label>
                <select
                    id="categoria"
                    name="categoria"
                    required
                >
                </select>
            </div>
            <!-- Estado oculto -->
            <input
                type="hidden"
                id="estado"
                name="estado"
                value=2
            >
            <!-- Botones -->
            <div class="modal-actions">
                <button
                    type="button"
                    id="btnCancelar"
                    class="btn-cancelar"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    class="btn"
                    id="btn-guardar"
                >
                    Guardar Producto
                </button>
            </div>
        </form>
        
        
        
        `

    )
}

function convertir_formulario_editar_producto(select){
    modalContenido.insertAdjacentHTML('beforeend' ,

            `
            <div class="modal-header">
                    <h2 id="titulo-formulario">Editar Producto</h2>

                    <button type="button" id="btnCerrarModal" class="btn-cerrar">
                     ×
                    </button>
                </div>

              <form id="formProducto">

            <!-- Nombre -->
               <div class="form-group">
                <label for="nombre_producto">
                    Nombre del producto
                </label>
                <input
                    type="text"
                    id="nombre_producto"
                    name="nombre_producto"
                    placeholder="Ej. Cuaderno A4"
                    value="${select.target.dataset.nombre}"
                    required
                >
            </div>
            <!-- Precio -->
            <div class="form-group">
                <label for="precio">
                    Precio
                </label>

                <input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Ej. 120.00"
                    min="0"
                    step="1"
                    value="${select.target.dataset.precio}"
                    required
                >
            </div>
            <div class="form-group">
                <label for="precio_venta">
                    Precio Venta
                </label>

                <input
                    type="number"
                    id="precio_venta"
                    name="precio_venta"
                    placeholder="Ej. 150.00"
                    min="0"
                    step="1"
                    value="${select.target.dataset.precio_venta}"
                    required
                >
            </div>
            <!-- Stock -->
            <div class="form-group">
                <label for="stock">
                    Stock
                </label>

                <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Ej. 10"
                    min="0"
                    step="1"
                    value="${select.target.dataset.stock}"
                    required
                >
            </div>
            <!-- Marca -->
            <div class="form-group">
                <label for="brand">
                    Marca
                </label>

                <select
                id="marca"
                name ="marca"
                required
                value="${select.target.dataset.marca}"
                >
                </select>
            </div>
            <!-- Categoría -->
            <div class="form-group">
                <label for="categoria">
                    Categoría
                </label>
                <select
                    id="categoria"
                    name="categoria"
                    required
                    value="${select.target.dataset.categoria}"
                >
                </select>
            </div>
            <!-- Estado oculto -->
            <input
                type="hidden"
                id="estado"
                name="estado"
                value=2
            >
            <!-- Botones -->
            <div class="modal-actions">
                <button
                    type="button"
                    id="btnCancelar"
                    class="btn-cancelar"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    class="btn"
                    id="btn-editar"
                >
                    Editar Producto
                </button>
            </div>
        </form>
            `
         )

}

function convertir_formulario_eliminar_producto(select){
    modalContenido.insertAdjacentHTML('beforeend' ,
        `
        <div class="modal-header">
                <h2 id="titulo-formulario">Eliminar Producto</h2>
                <button type="button" id="btnCerrarModal" class="btn-cerrar">
                 ×
                </button>
         </div>

         <h2>¿Esta Seguro de Eliminar este Producto?</h2>
         
         <div class="modal-actions">
            <button
                type="button"
                id="btnCancelar"
                class="btn-cancelar"
                >
                Cancelar
            </button>
            <button
                type="submit"
                class="btn dangerous-action"
                id="btn-delete"
                >
                Eliminar Producto
            </button>
          </div>
        
        
        
        `

     )

}





function obtenerProductos(){
        if(Productos_cache){
            obtenerProductosHTML(Productos_cache)
            return;
        }
       
       fetch("http://localhost:8000/productos" , {
          method : 'GET',
          credentials: "include"


       })
       .then(response => response.json())
       .then(data => {
            Productos_cache=data
            obtenerProductosHTML(data)
                        
       })

}

function obtenerProductosHTML(data){
            let status;
            data.forEach(data => {

                  switch(data.estado){
                     case 'Disponible':
                          status="ok"
                           break;
                     case 'Agotado':
                          status="danger";
                          break;

                   }

                  const tabla=document.getElementById("productos")
                  tabla.insertAdjacentHTML(
                    'beforeend',
                    `<tr id="registro-${data.id_producto}">
                        <td class="nombre-producto">${data.nombre_producto}</td>
                        <td class="marca">${data.marca}</td>
                        <td class="categoria">${data.nombre_categoria}</td>
                        <td class="precio">${data.precio}</td>
                        <td class="stock">${data.stock}</td>
                        <td class="state"><span class="status ${status}">${data.estado}</span></td>
                        <td><button 
                        class="edit"
                        id="edit-${data.id_producto}"
                        data-id="${data.id_producto}"
                        data-nombre="${data.nombre_producto}"
                        data-precio="${data.precio}"
                        data-precio_venta="${data.precio_venta}"
                        data-stock="${data.stock}"
                        data-marca="${data.id_brand}"
                        data-categoria="${data.id_categoria}"
                        >Editar
                        </button>
                        <td><button 
                        class="delete"
                        id="delete-${data.id_producto}"
                        data-id="${data.id_producto}"
                        >Eliminar
                        </button>
                        </td>
                        </td>
                    </tr>`
                  )

                
            });

}

function obtenerCategorias(){
    if(Categorias_cache){
        obtenerCategoriasHTML(Categorias_cache)
        return
    }

    fetch(`${API_URL}/categoria` , {
        method : 'GET',
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
         Categorias_cache=data
         obtenerCategoriasHTML(Categorias_cache)
    })
}

function obtenerCategoriasHTML(data){
    const categorias=document.getElementById("categoria")
         data.forEach(data => {
             categorias.insertAdjacentHTML('beforeend',
                `
                <option value=${data.id_categoria}>
                        ${data.categoria}
                </option>
                `
             )
         })

}

function obtenerMarcas(){
    if(Marcas_cache){
        obtenerMarcasHTML(Marcas_cache)
        return
    }
    fetch(`${API_URL}/marca `, {
        method : 'GET',
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        Marcas_cache=data
        obtenerMarcasHTML(Marcas_cache)
    })
}

function obtenerMarcasHTML(data){
    const marcas=document.getElementById("marca")
        data.forEach(data => {
            marcas.insertAdjacentHTML('beforeend', 
                `
                <option value=${data.id_brand}>
                        ${data.brand}
                </option>

                `
            )
        })

}

function obtenerDatosProductos(){
    if(Datos_Productos_cache){
        obtenerDatosProductosHTML(Datos_Productos_cache)
        return
    }
    fetch(`${API_URL}/data_products` , {
        method : 'GET',
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        Datos_Productos_cache=data
        obtenerDatosProductosHTML(Datos_Productos_cache)    
    })
}

function obtenerDatosProductosHTML(data){
    document.getElementById("total").innerHTML = data.cantidad_productos;
    document.getElementById("sin-stock").innerHTML = data.cantidad_productos_ws;

}

function actualizarDatosProductos(id){
    const nombre = document.getElementById("nombre_producto").value
    const precio = document.getElementById("precio").value
    const stock = document.getElementById("stock").value
    const categoria = document.getElementById("categoria").value
    const estado = document.getElementById("estado").value
    const marca = document.getElementById("marca").value
    const precio_venta=document.getElementById("precio_venta").value
    
    fetch(`${API_URL}/productos` , {
        method : 'PUT',
        headers: {
            "Content-Type" : "application/json",
            'X-CSRF-TOKEN':getCookie('CSRF-TOKEN')
        },
        credentials: "include",
        
        body : JSON.stringify({
             id_producto : id,
             nombre_producto : nombre,
             precio : precio,
             stock : stock ,
             id_categoria : categoria ,
             id_estado : estado,
             id_brand : marca ,
             precio_venta : precio_venta,
             user_id : user.data.user_id

        })
        

    })
    .then(response => response.json())
    .then(data => {
          if(!data.state){
            console.error(data.error)
            return;
          }
          mostrarNotificacion("Producto editado","El producto se edito correctamente");
          cerrarModal();
          Productos_cache=null
        
      })
}

function actualizarDatosProductsHTML(id){
    const elementos=document.getElementById("registro-"+id).children
        console.log(elementos)
        
        Array.from(elementos).forEach( Element => {

            switch(Element.className){
                case 'nombre-producto':
                      Element.innerHTML=document.getElementById("nombre_producto").value
                      break;
                case 'precio':
                      Element.innerHTML= document.getElementById("precio").value
                      break;
                case 'stock':
                      Element.innerHTML = document.getElementById('stock').value
                      break;
                case 'marca':
                      const marca=document.getElementById("marca")
                      const texto_marca=marca.options[marca.selectedIndex].textContent;

                      Element.innerHTML = texto_marca
                      break; 
                case 'categoria':
                      const categoria=document.getElementById("categoria")
                      const texto_categoria=categoria.options[categoria.selectedIndex].textContent;
                      Element.innerHTML = texto_categoria
                      break;
                case 'state':
                      const estado=document.getElementById("estado").value

                      const sin_stock=parseInt(document.getElementById("sin-stock").innerHTML)
                      console.log(sin_stock)
                      switch(estado){
                        case "1":
                            console.log("1")
                            Element.firstChild.innerHTML="Disponible"
                            if(Element.firstChild.classList.contains("danger")){
                                Element.firstChild.classList.add("ok")
                                Element.firstChild.classList.remove("danger")
                                document.getElementById("sin-stock").innerHTML=sin_stock-1
                            }
                            break;
                        case "2":
                            console.log("2")
                            Element.firstChild.innerHTML="Agotado"
                            if(Element.firstChild.classList.contains("ok")){
                                Element.firstChild.classList.add("danger")
                                Element.firstChild.classList.remove("ok")
                                document.getElementById("sin-stock").innerHTML=sin_stock+1
                            }
                            break;

                            
                      }
                      
            }


        })
    
    const data_boton=document.getElementById("edit-" + id)
    data_boton.dataset.nombre=document.getElementById("nombre_producto").value
    data_boton.dataset.precio=document.getElementById("precio").value
    data_boton.dataset.stock=document.getElementById("stock").value
    data_boton.dataset.marca=document.getElementById("marca").value
    data_boton.dataset.categoria=document.getElementById("categoria").value

}


function eliminarDatosProductos(id){
    fetch(`${API_URL}/productos` , {
        method : 'DELETE',
        headers:{
            'Content-Type': "application/json",
            'X-CSRF-TOKEN':getCookie('CSRF-TOKEN')
        },
        credentials: "include",
        body:JSON.stringify({
            id_producto:id,
            user_id : user.data.user_id
        })
    })
    .then(response => response.json())
    .then(data => {
        if(!data.state){
            console.error(data.error)
            return;
          }
          mostrarNotificacion("Producto eliminado","El producto se elimino correctamente");
          cerrarModal();
          Productos_cache=null

    })
}


function eliminarDatosProductosHTML(id){
    const registro_id=document.getElementById("registro-"+id)
    registro_id.innerHTML=" "
    registro_id.remove()

}

function inicializar_funcion_stock(){
    const stock = document.getElementById("stock")

    registrarEvento(stock , "input" , actualizar_estado_input)
}


function inicializar_datos_registro(){
    if(Datos_Registro_cache){
        inicializar_datos_registroHTML(Datos_Registro_cache)
        return
    }

    fetch(`${API_URL}/data_register`,{
        method: 'GET',
        credentials : 'include'
    })
    .then(response => response.json())
    .then(data => {
        if(!data.state){
            mostrarError(data.mensaje)
            return
        }
        Datos_Registro_cache=data
        inicializar_datos_registroHTML(data)





    })
}

function inicializar_datos_registroHTML(data){
    document.getElementById("ventas_hoy").innerHTML=data.ventas_hoy
    document.getElementById("ingresos_hoy").innerHTML='S/ ' +data.ingresos_totales_hoy

}

function actualizar_datos_registroHTML(){
    
    if(!Datos_Registro_cache){
        return
    }

    if(ventas_totales_cache){
    
        Datos_Registro_cache.ventas_hoy=Datos_Registro_cache.ventas_hoy + ventas_totales_cache
    }

    if(ingresos_totales_diarios_cache){
        
        Datos_Registro_cache.ingresos_totales_hoy=parseFloat(parseFloat(Datos_Registro_cache.ingresos_totales_hoy) + ingresos_totales_diarios_cache).toFixed(2)
        
    }
}




const buscador= document.getElementById("buscador")

const Filtro=document.getElementById("buscador-resultado")

buscador.addEventListener("input" , evento_buscador)
Filtro.addEventListener('change' , estado_buscador)

function evento_buscador(event){
    event.preventDefault();

    let productos_filtrados;
    console.log(Productos_cache)

    switch(Filtro.value){
        case 'productos':
            productos_filtrados=Productos_cache.filter(elemento => elemento.nombre_producto.toLowerCase().includes(event.target.value.toLowerCase()))
            filtrar_productos(productos_filtrados)
            break;
        case 'marca':
            productos_filtrados=Productos_cache.filter(elemento => elemento.marca.toLowerCase().includes(event.target.value.toLowerCase()))
            filtrar_productos(productos_filtrados)
            break;
        case 'categoria':
            productos_filtrados=Productos_cache.filter(elemento => elemento.nombre_categoria.toLowerCase().includes(event.target.value.toLowerCase()))
            filtrar_productos(productos_filtrados)
            break;
        case 'estado':
            
            productos_filtrados=Productos_cache.filter(elemento => elemento.estado.toLowerCase().includes(event.target.value.toLowerCase()))
            filtrar_productos(productos_filtrados)
            break;

            
        
    }
};

function estado_buscador(){
    if(Filtro.value === "estado"){
        cambiar_buscador_select()
        agregar_funcion_select_estado()
        return;
    }

    cambiar_buscador_input();
    agregar_function_input();

    

    
    

    

}
function cambiar_buscador_select(){
    const buscador=document.getElementById("buscador")
    buscador.remove()
    const select=document.createElement('select')

    select.id="buscador"

    const opcionDisponible = document.createElement('option');
    opcionDisponible.value = 'Disponible';
    opcionDisponible.textContent = 'Disponible';

    const opcionAgotado = document.createElement('option');
    opcionAgotado.value = 'Agotado';
    opcionAgotado.textContent = 'Agotado';

    select.appendChild(opcionDisponible);
    select.appendChild(opcionAgotado);

    const tabla=document.querySelector(".table-header")
    tabla.prepend(select)

}


function agregar_funcion_select_estado(){
    const select_buscador=document.getElementById("buscador")
    const productos_filtrados=Productos_cache.filter(elemento => elemento.estado.toLowerCase().includes('disponible'))
    filtrar_productos(productos_filtrados)
    select_buscador.addEventListener('change' , ejecutar_filtro_select)

}

function ejecutar_filtro_select(event){
    const productos_filtrados=Productos_cache.filter(elemento => elemento.estado.toLowerCase().includes(event.target.value.toLowerCase()))
    filtrar_productos(productos_filtrados)

}


function cambiar_buscador_input(){
    const buscador=document.getElementById("buscador")
    buscador.remove()
    const input=document.createElement('input')

    input.id="buscador"
    input.placeholder="Buscar producto..."
    input.type="text"

    const tabla=document.querySelector(".table-header")
    tabla.prepend(input)

}

function agregar_function_input(){
    const input_buscador=document.getElementById("buscador")
    input_buscador.addEventListener("input" , evento_buscador)

}



function filtrar_productos(productos_filtrados){
    const tabla=document.getElementById("productos");
    tabla.innerHTML="";
    
            

    

    productos_filtrados.forEach(data => {
        let status;
        switch(data.estado){
                     case 'Disponible':
                          status="ok"
                           break;
                     case 'Agotado':
                          status="danger";
                          break;

                   }
        tabla.insertAdjacentHTML('beforeend',
        `<tr id="registro-${data.id_producto}">
             <td class="nombre-producto">${data.nombre_producto}</td>
                        <td class="marca">${data.marca}</td>
                        <td class="categoria">${data.nombre_categoria}</td>
                        <td class="precio">${data.precio}</td>
                        <td class="stock">${data.stock}</td>
                        <td><span class="status ${status}">${data.state.estado}</span></td>
                        <td><button 
                        class="edit"
                        id="edit-${data.id_producto}"
                        data-id="${data.id_producto}"
                        data-nombre="${data.nombre_producto}"
                        data-precio="${data.precio}"
                        data-stock="${data.stock}"
                        data-marca="${data.id_brand}"
                        data-categoria="${data.id_categoria}"
                        >Editar
                        </button>
                        <td><button 
                        class="delete"
                        id="delete-${data.id_producto}"
                        data-id="${data.id_producto}"
                        >Eliminar
                        </button>
                        </td>
                        </td>
                    </tr>`

    )

    })
    

}
}




export function destroyProducts() {

    eventos_actuales.forEach(({ elemento, evento, funcion }) => {

        elemento.removeEventListener(
            evento,
            funcion
        );

    });

    eventos_actuales = [];
}
