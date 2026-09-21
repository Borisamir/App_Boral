
    <body class="content">

        <header>
            <div>
                <h1>Reportes</h1>
                <p>Consulta el rendimiento de tu negocio.</p>
            </div>

            <div class="rango-selector">
                <button class="rango-btn" data-rango="7">7 días</button>
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





