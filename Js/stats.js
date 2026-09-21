

import { mostrarNotificacion , mostrarError } from "./notificacion.js"
import { getCookie } from "./util.js";

    const API_URL = window.APP_CONFIG.API_URL;
   
   let stats_cache=null
   export function init_stats(){

      const COLORES = {
    azul: "#2f6df6",
    azulClaro: "#8bb0fb",
    verde: "#27ae60",
    rojo: "#e74c3c",
    naranja: "#f39c12",
    morado: "#9b59b6"
    };

    
    let data_dias = null

    /* ---- generador de datos falsos según el rango de días ---- */

   function generarDatosMock(dias,ventas_por_dias) {
    
    
    const puntos = dias === 8 ? 7 : dias === 30 ? 30 : 12;
    const esAnual = dias === 365;

    
    const ventasPorDia = [];
    let totalVentas = 0;
    let totalIngresos = 0;
    let totalCostos = 0;

    let ventas=0
    let costos= 0
    let ingresos= 0

    for (let i = 0; i < puntos; i++) {

        ventas=parseFloat( ventas_por_dias.stats[0][i]?.ventas_totales_diarios) || 0;
        costos=parseFloat(ventas_por_dias.stats[0][i]?.costos_totales_diarios) || 0;
        ingresos=parseFloat(ventas_por_dias.stats[0][i]?.ingresos_totales_diarios) || 0

        if(esAnual){
              ventas=parseFloat(ventas_por_dias.stats[3][i]?.ventas) || 0;
              costos=parseFloat(ventas_por_dias.stats[3][i]?.costos) || 0;
              ingresos=parseFloat(ventas_por_dias.stats[3][i]?.ingresos) || 0

        
         }
         

        totalVentas += ventas  ;
        totalCostos += costos;
        totalIngresos += ingresos - costos;
        

        ventasPorDia.push({
            etiqueta: esAnual
                ? `Mes ${i + 1}`
                : `Día ${i + 1}`,
            ventas:ventas,
            ingresos:ingresos,
            costos:costos
        });
    }

    const productos=[]
    ventas_por_dias.stats[2].forEach(data => {
        productos.push({
            nombre : data.nombre_producto || "producto", 
            cantidad : data.unidades_vendidas || "1"

        })
    })


    const metodosPago = {
        Yape: ventas_por_dias.stats[1].count_yape,
        Efectivo: ventas_por_dias.stats[1].count_efectivo
    };

    return {
        ventasPorDia,
        productos,
        metodosPago,
        totalVentas,
        totalIngresos,
        totalCostos,
        ticketPromedio: totalIngresos / totalVentas
    };
   }

/* ---- referencias a las instancias de Chart (para poder destruirlas) ---- */

let chartVentasDia = null;
let chartMetodosPago = null;
let chartIngresosCostos = null;
let chartTopProductos = null;

function destruirGraficas() {
    [chartVentasDia, chartMetodosPago, chartIngresosCostos, chartTopProductos]
        .forEach(chart => chart && chart.destroy());
}

/* ---- actualizar tarjetas resumen ---- */

function actualizarTarjetas(data) {

    console.log(data)

    document.getElementById("stat-ventas").textContent = data.totalVentas;

    document.getElementById("stat-ingresos").textContent =
        `S/.${data.totalIngresos.toFixed(2)}`;

    document.getElementById("stat-ticket").textContent =
        `S/.${data.ticketPromedio.toFixed(2)}`;

    document.getElementById("stat-top-producto").textContent =
        data.productos[0].nombre;
}

/* ---- crear/actualizar las 4 gráficas ---- */

function renderGraficas(data) {

    destruirGraficas();

    console.log(data)

    /* Ventas por día (barras) */
    chartVentasDia = new Chart(document.getElementById("chart-ventas-dia"), {
        type: "bar",
        data: {
            labels: data.ventasPorDia.map(d => d.etiqueta),
            datasets: [{
                label: "Ventas",
                data: data.ventasPorDia.map(d => d.ventas),
                backgroundColor: COLORES.azul,
                borderRadius: 6,
                maxBarThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: "#eee" } },
                x: { grid: { display: false } }
            }
        }
    });

    /* Métodos de pago (dona) */
    chartMetodosPago = new Chart(document.getElementById("chart-metodos-pago"), {
        type: "doughnut",
        data: {
            labels: Object.keys(data.metodosPago),
            datasets: [{
                data: Object.values(data.metodosPago),
                backgroundColor: [COLORES.morado, COLORES.verde],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } }
        }
    });

    /* Ingresos vs Costos (líneas) */
    chartIngresosCostos = new Chart(document.getElementById("chart-ingresos-costos"), {
        type: "line",
        data: {
            labels: data.ventasPorDia.map(d => d.etiqueta),
            datasets: [
                {
                    label: "Ingresos S/",
                    data: data.ventasPorDia.map(d => d.ingresos.toFixed(2)),
                    borderColor: COLORES.azul,
                    backgroundColor: "rgba(47,109,246,0.1)",
                    tension: 0.35,
                    fill: true
                },
                {
                    label: "Costos S/",
                    data: data.ventasPorDia.map(d => d.costos.toFixed(2)),
                    borderColor: COLORES.rojo,
                    backgroundColor: "rgba(231,76,60,0.08)",
                    tension: 0.35,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } },
            scales: {
                y: { beginAtZero: true, grid: { color: "#eee" } },
                x: { grid: { display: false } }
            }
        }
    });

    /* Top 5 productos (barras horizontales) */
    chartTopProductos = new Chart(document.getElementById("chart-top-productos"), {
        type: "bar",
        data: {
            labels: data.productos.map(p => p.nombre),
            datasets: [{
                label: "Unidades vendidas",
                data: data.productos.map(p => p.cantidad),
                backgroundColor: COLORES.naranja,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { beginAtZero: true, grid: { color: "#eee" } },
                y: { grid: { display: false } }
            }
        }
    });
   }

    /* ---- carga completa de la sección de reportes ---- */

    function cargarReportes(dias) {

        //if(stats_cache){
            //data_dias = generarDatosMock(dias,stats_cache);
            //actualizarTarjetas(data_dias);
            //renderGraficas(data_dias);
            //console.log("stats")
            //return

        //}
       
       fetch(`${API_URL}/stats`,{
            method : 'POST',
            headers: {
                "Content-Type" : "application/json",
                'X-CSRF-TOKEN':getCookie('CSRF-TOKEN')
            },
            credentials : 'include',
            body:JSON.stringify({
                'dias' : dias
            })
       })
       .then(response => response.json())
       .then(data => {
             if(!data.state){
                mostrarError(data.mensaje)
             }
              
             stats_cache=data
             data_dias = generarDatosMock(dias,stats_cache);
             actualizarTarjetas(data_dias);
             renderGraficas(data_dias);
             

            
       })
       
       
     }

     /* ---- selector de rango (7 días / 30 días / 1 año) ---- */

    document.querySelectorAll(".rango-btn").forEach(boton => {
          boton.addEventListener("click", () => {

           document.querySelectorAll(".rango-btn").forEach(b => b.classList.remove("active"));
           boton.classList.add("active");

           cargarReportes(Number(boton.dataset.rango));
        });
    });

    /* carga inicial */
    cargarReportes(30);

   }


