import { mostrarNotificacion , mostrarError } from "./notificacion.js"
import { getUser , getCookie, apiFetch, verify_answer_fetch } from "./util.js";
const API_URL = window.APP_CONFIG.API_URL;

let eventos_actuales=[]
let productos_sell_cache=null
export let ventas_totales_cache;
export let ingresos_totales_diarios_cache;


function registrarEvento(elemento, evento, funcion) {
    elemento.addEventListener(evento, funcion);

    eventos_actuales.push({
        elemento: elemento,
        evento: evento,
        funcion: funcion
    });
}

export async function init_Ventas(){
     const user = await getUser();


     async function obtenerProductos(){
       
       if(productos_sell_cache){
           obtenerProductosHTML(productos_sell_cache)
           return
          
       }

       const data = await apiFetch('productos',{
           method : 'GET',
          
       })
       
       if(!verify_answer_fetch(data)){
           return
       }

       productos_sell_cache=data
       obtenerProductosHTML(productos_sell_cache)

    
       }

       obtenerProductos();

}

function obtenerProductosHTML(data){
    const select_product= document.getElementById("product-select")
    data.forEach(data => {
            select_product.insertAdjacentHTML('beforeend' ,
            `<option value="${data.id_producto}" data-price_sell="${data.precio_venta}" data-name="${data.nombre_producto}" data-category="${data.nombre_categoria}" data-price="${data.precio}"  data-stock="${data.stock}" >${data.nombre_producto} - S/${data.precio} </option>`
            )
    })

}





function limpiar_Productos(){
    const select_product= document.getElementById("product-select")
    select_product.innerHTML = `<option value="" disabled selected>Seleccione un producto</option>`;
    obtenerProductos()

}


   


/* AGREGAR PRODUCTO */

 const productSelect = document.getElementById("product-select");
    const addProductButton = document.getElementById("add-product");
    const saleItems = document.getElementById("sale-items");
const btnConfirmarVenta = document.querySelector(".btn-confirmar-venta");
    
    const productCount = document.getElementById("product-count");
    const totalProducts = document.getElementById("total-products");
    const saleTotal = document.getElementById("sale-total");

    let sale = [];



function addProduct(){

    const option = productSelect.options[productSelect.selectedIndex];

    if (!option.value) {
        return;
    }

    const id = option.value;
    const name = option.dataset.name;
    const price_cost = Number(option.dataset.price);
    const price_sell = Number(option.dataset.price_sell)
    const stock = Number(option.dataset.stock);
    const category=option.dataset.category;

    

    if(stock == 0){
        mostrarError("No hay stock en este producto");
        return;
    }


    // Buscar si ya existe
    const existingProduct = sale.find(product => product.id === id);

    if (existingProduct) {

        if (existingProduct.quantity < existingProduct.stock) {
            existingProduct.quantity++;
        }

    } else {

        sale.push({
            id: id,
            name: name,
            price_cost: price_cost,
            price_sell: price_sell,
            stock: stock,
            quantity: 1
        });

    }

    renderSale();

    productSelect.value = "";

}


registrarEvento(addProductButton,"click", addProduct)



/* MOSTRAR PRODUCTOS */

function renderSale() {

    saleItems.innerHTML = "";
    

    if (sale.length === 0) {

        saleItems.innerHTML = `
            <div class="empty-sale">
                <div class="empty-icon">🛒</div>
                <p>No hay productos agregados</p>
                <span>Agrega un producto para comenzar la venta.</span>
            </div>
        `;

        updateSummary();
        return;
    }


    sale.forEach(product => {

        const subtotal = product.price_sell * product.quantity;

        const subcosto = product.price_cost * product.quantity;

        const item = document.createElement("div");

        item.classList.add("sale-item");

        item.innerHTML = `

            <div class="product-info">

                <span class="product-name">
                    ${product.name}
                </span>

                <span class="product-stock">
                    Stock disponible: ${product.stock}
                </span>

            </div>


            <span class="product-price" id="precio-costo">
                S/.${product.price_cost.toFixed(2)}
            </span>

            <span class="product-price" id="precio-venta">
                S/.${product.price_sell.toFixed(2)}
            </span>


            <div class="quantity-control">

                <button
                    class="decrease"
                    data-id="${product.id}"
                >
                    −
                </button>

                <span class="quantity-value" data-value="${product.quantity}">
                    ${product.quantity}
                </span>

                <button
                    class="increase"
                    data-id="${product.id}"
                >
                    +
                </button>

            </div>


            <span class="product-subtotal" data-value="${subtotal.toFixed(2)}">
                S/.${subtotal.toFixed(2)}
            </span>

            <span class="product-subtotal cost hidden" data-value="${subcosto.toFixed(2)}">
                S/.${subcosto.toFixed(2)}
            </span>


            <button
                class="delete-product"
                data-id="${product.id}"
            >
                ×
            </button>

        `;

        saleItems.appendChild(item);

    });

    updateSummary();
}


/* EVENTOS DE CANTIDAD Y ELIMINAR */



registrarEvento(saleItems,"click",saleItemsEvent);


function saleItemsEvent(e){
    const id = e.target.dataset.id;

    if (!id) {
        return;
    }


    /* AUMENTAR */

    if (e.target.classList.contains("increase")) {

        const product = sale.find(product => product.id === id);

        if (product.quantity < product.stock) {
            product.quantity++;
        }

    }


    /* DISMINUIR */

    if (e.target.classList.contains("decrease")) {

        const product = sale.find(product => product.id === id);

        if (product.quantity > 1) {
            product.quantity--;
        }

    }


    /* ELIMINAR */

    if (e.target.classList.contains("delete-product")) {

        sale = sale.filter(product => product.id !== id);

    }

    renderSale();

}


/* ACTUALIZAR RESUMEN */

function updateSummary() {

    let quantity = 0;
    let total = 0;

    sale.forEach(product => {

        quantity += product.quantity;

        total += product.price_sell * product.quantity;

    });


    totalProducts.textContent = quantity;

    productCount.textContent =
        `${sale.length} ${sale.length === 1 ? "producto" : "productos"}`;

    saleTotal.textContent =
        `S/.${total.toFixed(2)}`;
}



const btn_register_sell = document.getElementById("finish-sale")

registrarEvento(btn_register_sell , "click" , register_temporal_sell)


function register_temporal_sell(){

    let venta_texto=document.getElementById("sale-total").innerHTML

    const venta_total = parseFloat(venta_texto.replace("S/." , "").trim())

    console.log(venta_total)

    if(Number.isNaN(venta_total) || venta_total <= 0){
        mostrarError("Eliga un Producto");
        return;
    }

    
   
    
    const metodo_pago = document.getElementById("metodo-pago").value

    
    
    if(!metodo_pago){
        mostrarError("Debe haber un metodo de pago elegido");
        return;
    }

    fetch(`${API_URL}/register `, {
          method : 'POST',
          credentials: "include",
          headers: {
            "Content-Type" : "application/json",
            'X-CSRF-TOKEN':getCookie('CSRF-TOKEN')
          },
          body : JSON.stringify({
             total_sell : venta_total,
             pay_method : metodo_pago,
             
             
          })
    })
    .then(response => response.json())
    .then(data => {
        if(!data.state){
            mostrarError(data.mensaje)
            return;
        }
        RegistrarVenta()
        btnConfirmarVenta.dataset.id_sell = data.id_sell
        
    })
}


const metodoPago = document.getElementById("metodo-pago");

registrarEvento(metodoPago , 'change' , metodoPagoEvent)


function metodoPagoEvent(event){

    
    
    const qrYape = document.getElementById("qr-yape");

    

    const metodo = metodoPago.value;


    if (metodo === "Yape") {

        qrYape.classList.add("mostrar");

    } else {

        qrYape.classList.remove("mostrar");

    }

}





const modalVenta = document.getElementById("modal-confirmar-venta");

const btnCerrarModal = document.getElementById("cerrar-modal-venta");

const btnCancelarVenta = document.getElementById("cancelar-venta");



const modalTotalVenta = document.getElementById("modal-total-venta");

const modalPagoInfo = document.getElementById("modal-pago-info");



function RegistrarVenta(){

    

    
    const total = document.getElementById("sale-total").textContent;

    
    const metodoPago = document.getElementById("metodo-pago").value;


   
    modalTotalVenta.textContent = total;


    
    modalPagoInfo.innerHTML = "";


    

    if (metodoPago === "yape") {

        modalPagoInfo.innerHTML = `
            <div class="modal-yape">

                <h3>Pago con Yape</h3>

                <p>
                    Escanea el código QR para realizar el pago.
                </p>

                <img
                    src="/img/qr-yape.png"
                    class="modal-qr"
                    alt="Código QR de Yape"
                >

            </div>
        `;

    }


    

    else if (metodoPago === "efectivo") {

        modalPagoInfo.innerHTML = `
            <div class="modal-efectivo">

                <h3>Pago en efectivo</h3>

                <p>
                    El pago se realizará en efectivo.
                </p>

            </div>
        `;

    }


    // Mostrar modal
    modalVenta.classList.add("active");

}



function cerrar_Registro_Venta(){
   

    modalVenta.classList.remove("active");
}

registrarEvento(btnCerrarModal,"click" , cerrar_Registro_Venta)
registrarEvento(btnCancelarVenta,"click" , cerrar_Registro_Venta)




registrarEvento(btnConfirmarVenta, "click", confirmarVenta);


function confirmarVenta(e){

    const productos = [];

    const elementos = document.querySelectorAll(".delete-product");
    const elementos_cantidad = document.querySelectorAll(".quantity-value");
    const elementos_precio_subtotal = document.querySelectorAll(".product-subtotal");
    const elementos_costo_subtotal = document.querySelectorAll(".cost")
    
    

    elementos.forEach((elemento, index) => {

          productos.push({
            id_sell : parseInt(e.target.dataset.id_sell),
            quantity: parseInt(elementos_cantidad[index].dataset.value),
            subtotal_sell: parseFloat(elementos_precio_subtotal[index].dataset.value),
            subcost_sell: parseFloat(elementos_costo_subtotal[index].dataset.value),
            id_producto: parseInt(elemento.dataset.id),
            
            
         });

    });

    fetch(`${API_URL}/confirm_register` , {
         method : 'POST',
         credentials: "include",
         headers: {
            "Content-Type" : "application/json",
            'X-CSRF-TOKEN':getCookie('CSRF-TOKEN')
          },
         body : JSON.stringify({ 
            productos: productos,
            user_id : user.data.user_id
         })

    })
    .then(response => response.json())
    .then(data => {
        if(!data.state){
            mostrarError(data.mensaje)
            return;
        }
        ventas_totales_cache=null;
        ingresos_totales_diarios_cache = null
        mostrarNotificacion("Venta Registrada" , "La venta se ha registrado correctamente.")
        actualizar_cache_ventas_products()
        limpiar_Carrito()
        limpiar_Productos()
        cerrar_Registro_Venta()
       
        
    })


   }


function limpiar_Carrito(){
    const saleItems = document.getElementById("sale-items");
    saleItems.innerHTML=""
    const elemento_div=document.createElement("div")
    elemento_div.innerHTML = `
            <div class="empty-icon">🛒</div>
            <p>No hay productos agregados</p>
            <span>Agrega un producto para comenzar la venta.</span>
    `;
    elemento_div.classList.add("empty-sale");
    saleItems.appendChild(elemento_div)
    document.getElementById("sale-total").innerHTML="S/.0.00"
    document.getElementById("total-products").innerHTML="0"

}

function actualizar_cache_ventas_products(){
       const venta_texto=document.getElementById("sale-total").innerHTML
       const venta_total = parseFloat(venta_texto.replace("S/." , "").trim())
       ventas_totales_cache+=1
       ingresos_totales_diarios_cache+=venta_total
       console.log(ventas_totales_cache)
       console.log(ingresos_totales_diarios_cache)


}




export function destroy_Ventas(){

    eventos_actuales.forEach(({ elemento, evento, funcion }) => {

        elemento.removeEventListener(
            evento,
            funcion
        );

    });

    eventos_actuales = [];

}
