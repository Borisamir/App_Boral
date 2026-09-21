

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
                <h2>43</h2>
            </div>

            <div class="card">
                <span>Ingresos</span>
                <h2>S/.12,340</h2>
            </div>

        </section>

        <section class="table">

            <div class="table-header">

                <input
                    type="text"
                    placeholder="Buscar producto..."
                >

                <select>
                    <option>Todas las categorías</option>
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
<div id="notificacion" class="notificacion">
    <span class="icono">✓</span>
    <div>
        <strong id="titulo-mensaje">Producto agregado</strong>
        <p id="mensaje">El producto se agregó correctamente.</p>
    </div>
</div>
<div id="notificacionError" class="notificacion error">
    <span class="icono">✕</span>

    <div>
        <strong>Error</strong>
        <p id="mensajeError">No se pudo agregar el producto.</p>
    </div>
</div>