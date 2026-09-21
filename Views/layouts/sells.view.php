

    <section class="sales-section">

    <div class="sales-header">
        <div>
            <h1>Ventas</h1>
            <p>Registra y administra las ventas de tu negocio.</p>
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
                    Agregar
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
                    <span>Precio</span>
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
                <option value="yape">Yape</option>
                <option value="efectivo">Efectivo</option>
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
                    src="/img/qr-yape.png" 
                    alt="Código QR de Yape"
                >
            </div>

            <p class="qr-instruction">
                Escanea el QR desde la aplicación Yape.
            </p>

        </div>

    </div>

</div>

</section>
    

</html>

