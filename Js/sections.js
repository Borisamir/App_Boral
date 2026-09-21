


import { destroyProducts , initProducts} from "./products.js"
import { init_Ventas , destroy_Ventas } from "./sells.js"
import { init_stats} from "./stats.js"


export function seccion_bienvenida(){

    destroyProducts()
    destroy_Ventas()

    const content=document.querySelector(".content")

    content.innerHTML=""

        content.insertAdjacentHTML('beforeend' , 
            `
            <section class="welcome-section">

           <div class="welcome-card">

           <div class="welcome-content">

            <span class="welcome-label">PANEL DE ADMINISTRACIÓN</span>

            <h1>
                ¡Bienvenido a <strong>BoralPanel</strong>!
            </h1>

            <p>
                Administra tu negocio de forma sencilla.
                Revisa tus productos, registra ventas y controla
                tu inventario desde un solo lugar.
            </p>

            <div class="welcome-actions">
                <a href="#productos" class="welcome-primary route" id="go-products">
                    Ver productos
                </a>
                <a href="#ventas" class="welcome-secondary route" id="go-sales">
                    Registrar venta
                </a>
                
            </div>

        </div>

        <div class="welcome-illustration">

            <div class="illustration-circle">
                📊
            </div>

            <a href="#productos" class="floating-card card-products route">
                <span>📦</span>
                <div>
                    <strong>Productos</strong>
                    <small>Gestiona tu inventario</small>
                </div>
            </a>

            <a href="#ventas"class="floating-card card-sales route">
                <span>🛒</span>
                <div>
                    <strong>Ventas</strong>
                    <small>Registra tus ventas</small>
                </div>
            </a>

        </div>

    </div>


    <div class="quick-access">

        <div class="quick-header">
            <div>
                <h2>Accesos rápidos</h2>
                <p>Accede rápidamente a las funciones principales.</p>
            </div>
        </div>


        <div class="quick-grid">

            <a href="#productos" class="quick-card route" id="quick-products">

                <div class="quick-icon products-icon">
                    📦
                </div>

                <div>
                    <h3>Productos</h3>
                    <p>Administra tu inventario</p>
                </div>

                <span class="quick-arrow">→</span>

            </a>


            <a href="#ventas" class="quick-card route" id="quick-sales">

                <div class="quick-icon sales-icon">
                    🛒
                </div>

                <div>
                    <h3>Ventas</h3>
                    <p>Registra una nueva venta</p>
                </div>

                <span class="quick-arrow">→</span>

            </a>


            


            <a href="#estadisticas" class="quick-card route" id="quick-reports">

                <div class="quick-icon reports-icon">
                    📈
                </div>

                <div>
                    <h3>Reportes</h3>
                    <p>Consulta el rendimiento</p>
                </div>

                <span class="quick-arrow">→</span>

            </a>

        </div>

            
            
            
            
            
            
            
            
            
            
            
            `)

        
        
}


export function seccion_productos(){
    destroy_Ventas()
    const content=document.querySelector(".content")

    console.log("seccionproductos")

    content.innerHTML=""
      
    content.insertAdjacentHTML('beforeend' , 
        `
        <header>

            <div>
                <h1>Productos</h1>
                <p>Administra el inventario de tu negocio.</p>
            </div>

            <button id="btnNuevoProducto">+ Nuevo Producto</button>

        </header>

        <section class="cards">

            <div class="card">
                <span>Total Productos</span>
                <h2 id="total"></h2>
            </div>

            <div class="card">
                <span>Sin Stock</span>
                <h2 id="sin-stock"></h2>
            </div>

            <div class="card">
                <span>Ventas Hoy</span>
                <h2 id="ventas_hoy"></h2>
            </div>

            <div class="card">
                <span>Ingresos Brutos Hoy</span>
                <h2 id="ingresos_hoy"></h2>
            </div>

        </section>

        <section class="table">

            <div class="table-header">

                <input
                    type="text"
                    placeholder="Buscar producto..."
                    id="buscador"
                >

                <select id="buscador-resultado">
                    <option value="productos">Producto</option>
                    <option value="marca">Marca</option>
                    <option value="categoria">Categoria</option>
                    <option value="estado">Estado</option>
                </select>

            </div>

            <table>

                <thead>

                    <tr>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>

                </thead>

                <tbody id="productos">
                    
                </tbody>
            </table>

        </section>
        <!-- MODAL NUEVO PRODUCTO/EDITAR PRODUCTO -->
        <div id="modalProducto" class="modal">
            <div id="modalContenido" class="modal-content">
             
            </div>
        </div>



</div>

        
        `



    )

    initProducts()
}

export function seccion_ventas(){

    destroyProducts()

    const content=document.querySelector(".content")

    content.innerHTML=""

    content.insertAdjacentHTML('beforeend' ,
        `
        <section class="sales-section">

       <div class="sales-header">
            <div>
              <h1>Ventas</h1>
              <p>Registra las ventas de tu negocio.</p>
           </div>

        </div>


       <div class="sales-container">

        <!-- AGREGAR PRODUCTO -->
        <div class="add-product">
            <div class="add-product-header">
                <h2>Agregar producto</h2>
                <span>Selecciona los productos para esta venta</span>
            </div>

            <div class="product-selector">

                <input
                    type="text"
                    id="search-product"
                    placeholder="Buscar producto..."
                >

                <select id="product-select">
                    <option value="">Seleccionar producto</option>
                </select>

                <button id="add-product">
                    Agregar Producto
                </button>

            </div>
        </div>


        <!-- PRODUCTOS DE LA VENTA -->
        <div class="sale-products">

            <div class="products-header">
                <h2>Productos de la venta</h2>
                <span id="product-count">0 productos</span>
            </div>

            <div class="products-table">

                <div class="table-head">
                    <span>Producto</span>
                    <span>Precio Costo</span>
                    <span>Precio Venta</span>
                    <span>Cantidad</span>
                    <span>Subtotal</span>
                    <span></span>
                </div>

                <div id="sale-items">

                    <!-- Los productos se agregarán aquí -->

                    <div class="empty-sale">
                        <div class="empty-icon">🛒</div>
                        <p>No hay productos agregados</p>
                        <span>Agrega un producto para comenzar la venta.</span>
                    </div>

                </div>

            </div>

        </div>


        <!-- RESUMEN -->
        <div class="sale-summary">

            <div>
                <span>Total de productos</span>
                <strong id="total-products">0</strong>
            </div>

            <div class="total-price">
                <span>Total</span>
                <strong id="sale-total">S/.0.00</strong>
            </div>

            <button id="finish-sale">
                Registrar Venta
            </button>

        </div>

         <div class="payment-section">

    <div class="payment-header">
        <div>
            <h2>Método de pago</h2>
            <p>Selecciona cómo se realizará el pago.</p>
        </div>
    </div>

    <div class="payment-content">

        <div class="payment-select-container">

            <label for="metodo-pago">
                Método de pago
            </label>

            <select id="metodo-pago">
                <option value="">Seleccionar método de pago</option>
                <option value="Yape">Yape</option>
                <option value="Efectivo">Efectivo</option>
            </select>

        </div>

        <div id="qr-yape" class="qr-yape">

            <div class="qr-header">
                <span class="qr-icon">▣</span>

                <div>
                    <h3>Pago con Yape</h3>
                    <p>Escanea el código QR para realizar el pago.</p>
                </div>
            </div>

            <div class="qr-container">
                <!-- Reemplaza esta imagen por tu QR -->
                <img 
                    src="" 
                    alt="Código QR de Yape"
                >
            </div>

            <p class="qr-instruction">
                Escanea el QR desde la aplicación Yape.
            </p>
            <p class ="qr-instruction">
               Numero de celular
            </p>

        </div>

    </div>

    <!-- MODAL CONFIRMAR VENTA -->
<div id="modal-confirmar-venta" class="modal-venta">

    <div class="modal-venta-content">

        <button id="cerrar-modal-venta" class="modal-close">
            ×
        </button>

        <div class="modal-icon">
            ✓
        </div>

        <h2>Confirmar venta</h2>

        <p class="modal-description">
            Verifica los datos antes de registrar la venta.
        </p>

        <!-- TOTAL -->
        <div class="modal-total">
            <span>Total de la venta</span>
            <strong id="modal-total-venta">S/.0.00</strong>
        </div>

        <!-- INFORMACIÓN DEL MÉTODO -->
        <div id="modal-pago-info" class="modal-pago-info">

            <!-- Se llenará mediante JavaScript -->

        </div>

        <div>
        
        </div>

        <!-- BOTONES -->
        <div class="modal-buttons">

            <button id="cancelar-venta" class="btn-cancelar">
                Cancelar
            </button>

            <button id="confirmar-venta" class="btn-confirmar-venta">
                Confirmar venta
            </button>

        </div>

    </div>

</div>

    

</section>
    


        `



    )
    init_Ventas();

}

export function seccion_estadisticas(){

    const content=document.querySelector(".content")

    content.innerHTML=""

    content.insertAdjacentHTML('beforeend' ,
        `
        <body class="content">

            <header>
                <div>
                   <h1>Reportes</h1>
                   <p>Consulta el rendimiento de tu negocio.</p>
                </div>

               <div class="rango-selector">
                  <button class="rango-btn" data-rango="8">7 días</button>
                  <button class="rango-btn active" data-rango="30">30 días</button>
                  <button class="rango-btn" data-rango="365">1 año</button>
               </div>
        </header>

        <section class="cards">

            <div class="card">
                <span>Ventas totales</span>
                <h2 id="stat-ventas">0</h2>
            </div>

            <div class="card">
                <span>Ingresos totales</span>
                <h2 id="stat-ingresos">S/.0.00</h2>
            </div>

            <div class="card">
                <span>Ticket promedio</span>
                <h2 id="stat-ticket">S/.0.00</h2>
            </div>

            <div class="card">
                <span>Producto más vendido</span>
                <h2 id="stat-top-producto">-</h2>
            </div>

        </section>

        <section class="charts-grid">

            <div class="chart-card chart-wide">
                <div class="chart-card-header">
                    <h3>Ventas por día</h3>
                    <span>Cantidad de ventas registradas</span>
                </div>
                <canvas id="chart-ventas-dia"></canvas>
            </div>

            <div class="chart-card">
                <div class="chart-card-header">
                    <h3>Métodos de pago</h3>
                    <span>Distribución de ventas</span>
                </div>
                <canvas id="chart-metodos-pago"></canvas>
            </div>

            <div class="chart-card chart-wide">
                <div class="chart-card-header">
                    <h3>Ingresos vs Costos</h3>
                    <span>Comparativa mensual</span>
                </div>
                <canvas id="chart-ingresos-costos"></canvas>
            </div>

            <div class="chart-card">
                     <div class="chart-card-header">
                         <h3>Top 5 productos</h3>
                        <span>Más vendidos</span>
                     </div>
                   <canvas id="chart-top-productos"></canvas>
            </div>

        </section>

       </body>
    


        `



    )

    init_stats();

}