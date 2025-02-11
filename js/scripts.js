document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            
            buttons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const targetSection = document.getElementById(button.getAttribute('data-target'));
            targetSection.classList.add('active');
        });
    });

    document.querySelectorAll("input, textarea").forEach(element => {
        element.addEventListener("focus", function() {
            this.select();
        });
    });

    let periodoContribucion = document.getElementById("periodoContribucion");
    periodoContribucion.value = 72;

    const fechaActual = new Date();

    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const año = fechaActual.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${año}`;

    let fechaInicio = document.getElementById("fechaInicio");
    fechaInicio.value = fechaFormateada;

    let montoContribucion = document.getElementById("montoContribucion");
    montoContribucion.value = 200;

    let pagoInicial = document.getElementById("pagoInicial");
    pagoInicial.value = 0;

    let numeroContribuyentes = document.getElementById("numeroContribuyentes");
    numeroContribuyentes.value = 5000;

    let tasaNominalAnual = document.getElementById("tasaNominalAnual");
    tasaNominalAnual.value = 2;

    let edadInicial = document.getElementById("edadInicial");
    edadInicial.value = 35;

    calcularClick();

    decimalesYFormato();
});

document.getElementById('calcular').addEventListener('click', function (event) {
    event.preventDefault();

    const tabDatos = document.getElementById('tabDatos');
    calcularClick();
    tabDatos.click();
});

const calcularClick = () => {
    let contribucionMensual = document.getElementById("contribucionMensual");
    contribucionMensual.value = montoContribucion.value * numeroContribuyentes.value;

    let contribucionTotal = document.getElementById("contribucionTotal");
    contribucionTotal.value = ((montoContribucion.value * periodoContribucion.value) + Number(pagoInicial.value)) * numeroContribuyentes.value;

    let edadFinal = document.getElementById("edadFinal");
    edadFinal.value = Number(edadInicial.value) + (periodoContribucion.value / 12);

    let porcentajeCosto1 = document.getElementById("porcentajeCosto1");
    porcentajeCosto1.value = 5;
    let valorCosto1 = document.getElementById("valorCosto1");
    valorCosto1.value = (porcentajeCosto1.value / 100) * contribucionTotal.value;

    let porcentajeRendimientoOperador = document.getElementById("porcentajeRendimientoOperador");
    porcentajeRendimientoOperador.value = 0.50;

    actualizarTotales();
}

document.getElementById('agregarCosto').addEventListener('click', function (event) {
    event.preventDefault();

    agregarFila("tablaBody");
});

const agregarFila = (nombreTabla) => {
    let tbody = document.getElementById(nombreTabla); // Seleccionamos el cuerpo de la tabla

    if (!tbody) {
        console.error("No se encontró el tbody en la tabla.");
        return;
    }

    let nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
                <td><input type="text" class="form-control input-text formato-monto" value="Nombre Costo"></td>
                <td><input type="number" class="form-control input-decimal text-end porcentaje formato-monto" onblur="calcularValor(this)"></td>
                <td><input type="text" class="form-control input-decimal text-end valorTotal formato-monto" readonly></td>
            `;

    tbody.appendChild(nuevaFila);
}

const recalcularRendimientoOperador = () => {
    actualizarTotales();
    decimalesYFormato();
}

const calcularValor = (input) => {
    let contribucionTotal = document.getElementById("contribucionTotal");

    const contribucionTotalNumero = Number(contribucionTotal.value.replace(/\./g, '').replace(',', '.'));
    let porcentaje = parseFloat(input.value) || 0;
    let baseTotal = parseFloat(contribucionTotalNumero);
    let valorTotal = (baseTotal * (porcentaje / 100.00)).toFixed(2);

    let fila = input.closest("tr");
    let inputValorTotal = fila.querySelector(".valorTotal");

    inputValorTotal.value = parseFloat(valorTotal);
    actualizarTotales();
    decimalesYFormato();
}

const actualizarTotales = () => {
    let totalPorcentaje = 0;
    let totalValor = 0;

    // Sumar todos los valores de porcentaje
    document.querySelectorAll(".porcentaje").forEach(input => {
        totalPorcentaje += parseFloat(input.value) || 0;
    });

    // Sumar todos los valores de "Valor Total"
    document.querySelectorAll(".valorTotal").forEach(input => {
        totalValor += parseFloat(input.value) || 0;
    });

    // Actualizar los valores en la fila "Totales"
    document.getElementById("porcentajeCostoTotal").value = totalPorcentaje.toFixed(2) + "%";
    document.getElementById("valorCostoTotal").value = totalValor.toFixed(2);

    copiarInfoIndividual();
    copiarInfoGrupal();

    generarTablaIndividual();
    generarTablaGrupal();
    decimalesYFormato();
    formatoNumerico();
}

const copiarInfoIndividual = () => {
    const periodoContribucion = document.getElementById("periodoContribucion");
    let idCopia = `${periodoContribucion.id}Individual`;
    let inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${periodoContribucion.value}`;
    }

    const montoContribucion = document.getElementById("montoContribucion");
    idCopia = `${montoContribucion.id}Individual`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${montoContribucion.value}`;
    }

    inputCopia = document.getElementById("contribucionTotalMesIndividual");

    if (inputCopia) {
        inputCopia.value = `${montoContribucion.value}`;
    }

    const numeroContribuyentes = document.getElementById("numeroContribuyentesIndividual");
    numeroContribuyentes.value = 1;

    const pagoInicial = document.getElementById("pagoInicial");
    idCopia = `${pagoInicial.id}Individual`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${pagoInicial.value}`;
    }

    const tasaNominalAnual = document.getElementById("tasaNominalAnual");
    idCopia = `${tasaNominalAnual.id}Individual`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${tasaNominalAnual.value}%`;
    }

    const fechaInicio = document.getElementById("fechaInicio");
    idCopia = `${fechaInicio.id}Individual`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${fechaInicio.value}`;
    }
}

const copiarInfoGrupal = () => {
    const periodoContribucion = document.getElementById("periodoContribucion");
    let idCopia = `${periodoContribucion.id}Grupal`;
    let inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${periodoContribucion.value}`;
    }

    const numeroContribuyentes = document.getElementById("numeroContribuyentes");
    const montoContribucion = document.getElementById("montoContribucion");
    idCopia = `${montoContribucion.id}Grupal`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${montoContribucion.value}`;
    }

    inputCopia = document.getElementById("contribucionTotalMesGrupal");

    if (inputCopia) {
        inputCopia.value = `${montoContribucion.value * numeroContribuyentes.value}`;
    }

    idCopia = `${numeroContribuyentes.id}Grupal`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${numeroContribuyentes.value}`;
    }

    const pagoInicial = document.getElementById("pagoInicial");
    idCopia = `${pagoInicial.id}Grupal`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${pagoInicial.value}`;
    }

    const tasaNominalAnual = document.getElementById("tasaNominalAnual");
    idCopia = `${tasaNominalAnual.id}Grupal`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${tasaNominalAnual.value}%`;
    }

    const fechaInicio = document.getElementById("fechaInicio");
    idCopia = `${fechaInicio.id}Grupal`;
    inputCopia = document.getElementById(idCopia);

    if (inputCopia) {
        inputCopia.value = `${fechaInicio.value}`;
    }
}

const decimalesYFormato = () => {
    document.querySelectorAll('.input-decimal').forEach(input => {
        const ajustarDecimales = () => {
            if (input.value && !isNaN(input.value)) {
                const numero = input.value;
                input.value = numero;

                if (input.type === 'text') {
                    input.value = Number(numero).toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                }
            }
        };

        input.addEventListener('blur', ajustarDecimales);

        ajustarDecimales.call(input);
    });
}

const generarTablaIndividual = () => {
    let filasIndividual = "";
    let filaTotalesIndividual = "";
    let edadActual = 0;
    let edadAnterior = 0;
    let contribucionAcumulada = 0;
    let sumaInteresesIndividual = 0;
    let interesPorAnioIndividual = new Map();
    let sumaTotalInteresIndividual = 0;

    let porcentajeCostoTotal = document.getElementById("porcentajeCostoTotal");
    const costoOperacionTotal = parseFloat(porcentajeCostoTotal.value) / 100;

    let porcentajeRendimientoOperador = document.getElementById("porcentajeRendimientoOperador");
    const porcentajeRendimientoOperadorNumero = Number(porcentajeRendimientoOperador.value.replace(',', '.'));
    const rendimientoOperadorTotal = porcentajeRendimientoOperadorNumero / 100.00;

    let costoOperacion = Number(costoOperacionTotal) * Number(montoContribucion.value);
    let rendimientoOperador = rendimientoOperadorTotal * parseFloat(montoContribucion.value);

    for (let i = 1; i <= periodoContribucion.value; i++) {
        edadActual = Math.floor(Number(edadInicial.value) + ((i - 1) / 12));

        const filaEdad = (edadActual !== edadAnterior)
            ? `<td style="text-align: center" rowspan="12">${edadActual}</td>`
            : "";

        edadAnterior = edadActual;

        if (i === 1) {
            contribucionAcumulada = (parseFloat(montoContribucion.value) + parseFloat(pagoInicial.value)).toFixed(2);
        }
        
        let c0 = contribucionAcumulada - costoOperacion - rendimientoOperador;
        let cf = c0 * (1 + (tasaNominalAnual.value / 100)) ** (1 / 12);
        let interes = cf - c0;

        if (i > 1) {
            contribucionAcumulada = (Number(montoContribucion.value) + cf).toFixed(2);
            c0 = contribucionAcumulada - costoOperacion - rendimientoOperador;
            cf = c0 * (1 + (tasaNominalAnual.value / 100)) ** (1 / 12);
            interes = cf - c0;
        }

        const columnaVacia = (i === 1)
            ? `<td style="text-align: center" rowspan="${periodoContribucion.value}"></td>`
            : "";

        const anioCalculo = (i % 12 === 1)
            ? `<td style="text-align: center" rowspan="12">${(edadActual + 1) - edadInicial.value}</td>`
            : "";

        const contribucionTotales = generarCeldaAnual(i, montoContribucion.value * 12);
        const costoOperacionTotales = generarCeldaAnual(i, costoOperacion * 12);
        const rendimientoOperadorTotales = generarCeldaAnual(i, rendimientoOperador * 12);

        sumaInteresesIndividual += interes;
        const interesTotales = (i % 12 === 1)
            ? `<td style="text-align: center" rowspan="12" id="valAnio${(edadActual + 1) - edadInicial.value}" class="formato-monto">0</td>`
            : "";

        if (i % 12 === 0) {
            interesPorAnioIndividual.set(`valAnio${(edadActual + 1) - edadInicial.value}`, sumaInteresesIndividual);
            sumaInteresesIndividual = 0;
        }

        filasIndividual += `
            <tr>
                <td style = "text-align: center">${i}</td>
                ${filaEdad}
                <td style = "text-align: right" class="formato-monto">${contribucionTotalMesIndividual.value}</td>
                <td style = "text-align: right" class="formato-monto">${contribucionAcumulada}</td>
                <td style = "text-align: right" class="formato-monto">${costoOperacion}</td>
                <td style = "text-align: right" class="formato-monto">${rendimientoOperador}</td>
                <td style = "text-align: right" class="formato-monto">${c0}</td>
                <td style = "text-align: right" class="formato-monto">${cf}</td>
                <td style = "text-align: right" class="formato-monto">${interes}</td>
                ${columnaVacia}
                ${anioCalculo}
                ${contribucionTotales}
                ${costoOperacionTotales}
                ${rendimientoOperadorTotales}
                ${interesTotales}
            </tr>`;
    }

    document.getElementById('tablaIndividual').innerHTML = filasIndividual;

    interesPorAnioIndividual.forEach(function (valor, clave) {
        let valAnios = document.getElementById(clave);
        valAnios.innerText = valor.toFixed(2);

        sumaTotalInteresIndividual += valor;
    });

    const totalContribucionesIndividual = (Number(montoContribucion.value) * Number(periodoContribucion.value)).toFixed(2);
    const totalesCostoOperacion = (Number(costoOperacion) * Number(periodoContribucion.value)).toFixed(2);
    const totalesrendimientoOperador = (Number(rendimientoOperador) * Number(periodoContribucion.value)).toFixed(2);
    const totalesAcumuladoCuentaIndividual = (Number(totalContribucionesIndividual) - Number(totalesCostoOperacion) - Number(totalesrendimientoOperador) + Number(sumaTotalInteresIndividual)).toFixed(2);

    let parametrosPromocion = {};
    parametrosPromocion.totalesAcumuladoCuentaIndividual = totalesAcumuladoCuentaIndividual;
    parametrosPromocion.totalesrendimientoOperador = sumaTotalInteresIndividual;
    parametrosPromocion.totalContribucionesIndividual = totalContribucionesIndividual;

    filaTotalesIndividual += `
            <tr>
                <td style = "text-align: center">Totales</td>
                <td style = "text-align: right" class="formato-monto">${totalContribucionesIndividual}</td>
                <td style = "text-align: right" class="formato-monto">${totalesCostoOperacion}</td>
                <td style = "text-align: right" class="formato-monto">${totalesrendimientoOperador}</td>
                <td style = "text-align: right" class="formato-monto">${sumaTotalInteresIndividual}</td>
                <td style = "text-align: right" class="formato-monto">${totalesAcumuladoCuentaIndividual}</td>
            </tr>`;
    document.getElementById('tablaIndividualTotales').innerHTML = filaTotalesIndividual;

    inicializarPromocionIndividual(parametrosPromocion);
}

const generarCeldaAnual = (i, valor, decimales = 2) =>
    (i % 12 === 1) ? `<td style="text-align: center" rowspan="12" class="formato-monto">${valor.toFixed(decimales)}</td>` : "";

const generarTablaGrupal = () => {
    let filasGrupal = "";
    let filaTotalesGrupal = "";
    let edadActual = 0;
    let edadAnterior = 0;
    let contribucionAcumulada = 0;
    let sumaInteresesGrupal = 0;
    let interesPorAnioGrupal = new Map();
    let sumaTotalInteresGrupal = 0;

    let porcentajeCostoTotal = document.getElementById("porcentajeCostoTotal");
    const costoOperacionTotal = parseFloat(porcentajeCostoTotal.value) / 100;

    let porcentajeRendimientoOperador = document.getElementById("porcentajeRendimientoOperador");
    const porcentajeRendimientoOperadorNumero = Number(porcentajeRendimientoOperador.value.replace(',', '.'));
    const rendimientoOperadorTotal = porcentajeRendimientoOperadorNumero / 100.00;

    const contribucionTotalMesGrupalNumero = Number(contribucionTotalMesGrupal.value.replace(',', '.'));

    let costoOperacion = Number(costoOperacionTotal) * Number(contribucionTotalMesGrupalNumero);
    let rendimientoOperador = parseFloat(rendimientoOperadorTotal) * parseFloat(contribucionTotalMesGrupalNumero);

    for (let i = 1; i <= periodoContribucion.value; i++) {
        edadActual = Math.floor(Number(edadInicial.value) + ((i - 1) / 12));

        const filaEdad = (edadActual !== edadAnterior)
            ? `<td style="text-align: center" rowspan="12">${edadActual}</td>`
            : "";

        edadAnterior = edadActual;

        if (i === 1) {
            contribucionAcumulada = (Number(contribucionTotalMesGrupalNumero) + Number(pagoInicial.value)).toFixed(2);
        }

        let c0 = contribucionAcumulada - costoOperacion - rendimientoOperador;
        let cf = c0 * (1 + (tasaNominalAnual.value / 100)) ** (1 / 12);
        let interes = cf - c0;

        if (i > 1) {
            contribucionAcumulada = (Number(contribucionTotalMesGrupalNumero) + cf).toFixed(2);
            c0 = contribucionAcumulada - costoOperacion - rendimientoOperador;
            cf = c0 * (1 + (tasaNominalAnual.value / 100)) ** (1 / 12);
            interes = cf - c0;
        }

        const columnaVacia = (i === 1)
            ? `<td style="text-align: center" rowspan="${periodoContribucion.value}" class="formato-monto"></td>`
            : "";

        const anioCalculo = (i % 12 === 1)
            ? `<td style="text-align: center" rowspan="12">${(edadActual + 1) - edadInicial.value}</td>`
            : "";

        const contribucionTotales = generarCeldaAnual(i, contribucionTotalMesGrupalNumero * 12);
        const costoOperacionTotales = generarCeldaAnual(i, costoOperacion * 12);
        const rendimientoOperadorTotales = generarCeldaAnual(i, rendimientoOperador * 12);

        sumaInteresesGrupal += interes;
        const interesTotales = (i % 12 === 1)
            ? `<td style="text-align: center" rowspan="12" id="valAnioGrupal${(edadActual + 1) - edadInicial.value}" class="formato-monto">0</td>`
            : "";

        if (i % 12 === 0) {
            interesPorAnioGrupal.set(`valAnioGrupal${(edadActual + 1) - edadInicial.value}`, sumaInteresesGrupal);
            sumaInteresesGrupal = 0;
        }
        
        filasGrupal += `
            <tr>
                <td style = "text-align: center">${i}</td>
                ${filaEdad}
                <td style = "text-align: right" class="formato-monto">${contribucionTotalMesGrupal.value}</td>
                <td style = "text-align: right" class="formato-monto">${contribucionAcumulada}</td>
                <td style = "text-align: right" class="formato-monto">${costoOperacion}</td>
                <td style = "text-align: right" class="formato-monto">${rendimientoOperador}</td>
                <td style = "text-align: right" class="formato-monto">${c0}</td>
                <td style = "text-align: right" class="formato-monto">${cf}</td>
                <td style = "text-align: right" class="formato-monto">${interes}</td>
                ${columnaVacia}
                ${anioCalculo}
                ${contribucionTotales}
                ${costoOperacionTotales}
                ${rendimientoOperadorTotales}
                ${interesTotales}
            </tr>`;
    }

    document.getElementById('tablaGrupal').innerHTML = filasGrupal;

    interesPorAnioGrupal.forEach(function (valor, clave) {
        let valAnios = document.getElementById(clave);
        valAnios.innerText = valor.toFixed(2);

        sumaTotalInteresGrupal += valor;
    });

    const totalContribucionesGrupal = (Number(contribucionTotalMesGrupalNumero) * Number(periodoContribucion.value)).toFixed(2);
    const totalesCostoOperacion = (Number(costoOperacion) * Number(periodoContribucion.value)).toFixed(2);
    const totalesrendimientoOperador = (Number(rendimientoOperador) * Number(periodoContribucion.value)).toFixed(2);
    const totalesAcumuladoCuentaGrupal = (Number(totalContribucionesGrupal) - Number(totalesCostoOperacion) - Number(totalesrendimientoOperador) + Number(sumaTotalInteresGrupal)).toFixed(2);
    const numeroContribuyentes = document.getElementById("numeroContribuyentes");

    let parametrosgrupal = {};
    parametrosgrupal.numeroContribuyentes = numeroContribuyentes.value;
    parametrosgrupal.contribucionTotalMesGrupal = contribucionTotalMesGrupalNumero;
    parametrosgrupal.totalesrendimientoOperador = sumaTotalInteresGrupal;
    parametrosgrupal.totalesAcumuladoCuentaGrupal = totalesAcumuladoCuentaGrupal;

    filaTotalesGrupal += `
            <tr>
                <td style = "text-align: center">Totales</td>
                <td style = "text-align: right" class="formato-monto">${totalContribucionesGrupal}</td>
                <td style = "text-align: right" class="formato-monto">${totalesCostoOperacion}</td>
                <td style = "text-align: right" class="formato-monto">${totalesrendimientoOperador}</td>
                <td style = "text-align: right" class="formato-monto">${sumaTotalInteresGrupal.toFixed(2)}</td>
                <td style = "text-align: right" class="formato-monto">${totalesAcumuladoCuentaGrupal}</td>
            </tr>`;
    document.getElementById('tablaGrupalTotales').innerHTML = filaTotalesGrupal;

    inicializarPromocionGrupal(parametrosgrupal);
}

const inicializarPromocionIndividual = (parametrosPromocion) => {
    const valorPasajesIndividual = document.getElementById("valorPasajesIndividual");
    valorPasajesIndividual.value = 1000;
    const valorTourIndividual = document.getElementById("valorTourIndividual");
    valorTourIndividual.value = 500;
    const valorHospedajeIndividual = document.getElementById("valorHospedajeIndividual");
    valorHospedajeIndividual.value = 500;
    const valorCenaIndividual = document.getElementById("valorCenaIndividual");
    valorCenaIndividual.value = 500;

    const porcentajePasajesIndividual = document.getElementById("porcentajePasajesIndividual");
    porcentajePasajesIndividual.value = 10;
    const porcentajeTourIndividual = document.getElementById("porcentajeTourIndividual");
    porcentajeTourIndividual.value = 10;
    const porcentajeHospedajeIndividual = document.getElementById("porcentajeHospedajeIndividual");
    porcentajeHospedajeIndividual.value = 10;
    const porcentajeCenaIndividual = document.getElementById("porcentajeCenaIndividual");
    porcentajeCenaIndividual.value = 10;

    const descuentoPasajesIndividual = document.getElementById("descuentoPasajesIndividual");
    descuentoPasajesIndividual.value = (valorPasajesIndividual.value * porcentajePasajesIndividual.value) / 100;
    const descuentoTourIndividual = document.getElementById("descuentoTourIndividual");
    descuentoTourIndividual.value = (valorTourIndividual.value * porcentajeTourIndividual.value) / 100;
    const descuentoHospedajeIndividual = document.getElementById("descuentoHospedajeIndividual");
    descuentoHospedajeIndividual.value = (valorHospedajeIndividual.value * porcentajeHospedajeIndividual.value) / 100;
    const descuentoCenaIndividual = document.getElementById("descuentoCenaIndividual");
    descuentoCenaIndividual.value = (valorCenaIndividual.value * porcentajeCenaIndividual.value) / 100;

    const totalRedBeneficiosIndividual = document.getElementById("totalRedBeneficiosIndividual");
    totalRedBeneficiosIndividual.value = Number(descuentoPasajesIndividual.value) + Number(descuentoTourIndividual.value) + Number(descuentoHospedajeIndividual.value) + Number(descuentoCenaIndividual.value);

    const periodoContribucionPromocionalIndividual = document.getElementById("periodoContribucionPromocionalIndividual");
    periodoContribucionPromocionalIndividual.value = periodoContribucion.value;

    const montoContribucionPromocionalIndividual = document.getElementById("montoContribucionPromocionalIndividual");
    montoContribucionPromocionalIndividual.value = montoContribucion.value;

    const pagoInicialPromocionalIndividual = document.getElementById("pagoInicialPromocionalIndividual");
    pagoInicialPromocionalIndividual.value = pagoInicial.value;

    const tasaNominalAnualPromocionalIndividual = document.getElementById("tasaNominalAnualPromocionalIndividual");
    tasaNominalAnualPromocionalIndividual.value = tasaNominalAnual.value;

    const fechaInicioPromocionalIndividual = document.getElementById("fechaInicioPromocionalIndividual");
    fechaInicioPromocionalIndividual.value = fechaInicio.value;

    const contribucionTotalPromocionalIndividual = document.getElementById("contribucionTotalPromocionalIndividual");
    contribucionTotalPromocionalIndividual.value = parametrosPromocion.totalContribucionesIndividual;

    const rendimientoPromocionalIndividual = document.getElementById("rendimientoPromocionalIndividual");
    rendimientoPromocionalIndividual.value = parametrosPromocion.totalesrendimientoOperador.toFixed(2);

    const acumuladoEnCuentaPromocionalIndividual = document.getElementById("acumuladoEnCuentaPromocionalIndividual");
    acumuladoEnCuentaPromocionalIndividual.value = parametrosPromocion.totalesAcumuladoCuentaIndividual;

    const totalRedBeneficiosPromocionalIndividualCopia = document.getElementById("totalRedBeneficiosPromocionalIndividualCopia");
    totalRedBeneficiosPromocionalIndividualCopia.value = totalRedBeneficiosIndividual.value;

    const rendimientoTotalClientePromocionalIndividual = document.getElementById("rendimientoTotalClientePromocionalIndividual");
    rendimientoTotalClientePromocionalIndividual.value = (Number(totalRedBeneficiosIndividual.value) + Number(acumuladoEnCuentaPromocionalIndividual.value)).toFixed(2);

}

const inicializarPromocionGrupal = (parametrosPromocion) => {
    const valorPasajesGrupal = document.getElementById("valorPasajesGrupal");
    valorPasajesGrupal.value = 1000;
    const valorTourGrupal = document.getElementById("valorTourGrupal");
    valorTourGrupal.value = 500;
    const valorHospedajeGrupal = document.getElementById("valorHospedajeGrupal");
    valorHospedajeGrupal.value = 500;
    const valorCenaGrupal = document.getElementById("valorCenaGrupal");
    valorCenaGrupal.value = 500;

    const porcentajePasajesGrupal = document.getElementById("porcentajePasajesGrupal");
    porcentajePasajesGrupal.value = 10;
    const porcentajeTourGrupal = document.getElementById("porcentajeTourGrupal");
    porcentajeTourGrupal.value = 10;
    const porcentajeHospedajeGrupal = document.getElementById("porcentajeHospedajeGrupal");
    porcentajeHospedajeGrupal.value = 10;
    const porcentajeCenaGrupal = document.getElementById("porcentajeCenaGrupal");
    porcentajeCenaGrupal.value = 10;

    const descuentoPasajesGrupal = document.getElementById("descuentoPasajesGrupal");
    descuentoPasajesGrupal.value = (valorPasajesGrupal.value * porcentajePasajesGrupal.value) / 100;
    const descuentoTourGrupal = document.getElementById("descuentoTourGrupal");
    descuentoTourGrupal.value = (valorTourGrupal.value * porcentajeTourGrupal.value) / 100;
    const descuentoHospedajeGrupal = document.getElementById("descuentoHospedajeGrupal");
    descuentoHospedajeGrupal.value = (valorHospedajeGrupal.value * porcentajeHospedajeGrupal.value) / 100;
    const descuentoCenaGrupal = document.getElementById("descuentoCenaGrupal");
    descuentoCenaGrupal.value = (valorCenaGrupal.value * porcentajeCenaGrupal.value) / 100;

    const totalRedBeneficiosGrupal = document.getElementById("totalRedBeneficiosGrupal");
    totalRedBeneficiosGrupal.value = Number(descuentoPasajesGrupal.value) + Number(descuentoTourGrupal.value) + Number(descuentoHospedajeGrupal.value) + Number(descuentoCenaGrupal.value);

    const periodoContribucionPromocionalGrupal = document.getElementById("periodoContribucionPromocionalGrupal");
    periodoContribucionPromocionalGrupal.value = periodoContribucion.value;

    const montoContribucionPromocionalGrupal = document.getElementById("montoContribucionPromocionalGrupal");
    montoContribucionPromocionalGrupal.value = montoContribucion.value;

    const pagoInicialPromocionalGrupal = document.getElementById("pagoInicialPromocionalGrupal");
    pagoInicialPromocionalGrupal.value = pagoInicial.value;

    const numeroContribuyentesPromocionGrupal = document.getElementById("numeroContribuyentesPromocionGrupal");
    numeroContribuyentesPromocionGrupal.value = parametrosPromocion.numeroContribuyentes;

    const tasaNominalAnualPromocionalGrupal = document.getElementById("tasaNominalAnualPromocionalGrupal");
    tasaNominalAnualPromocionalGrupal.value = tasaNominalAnual.value;

    const fechaInicioPromocionalGrupal = document.getElementById("fechaInicioPromocionalGrupal");
    fechaInicioPromocionalGrupal.value = fechaInicio.value;

    const rendimientoPromocionalGrupal = document.getElementById("rendimientoPromocionalGrupal");
    rendimientoPromocionalGrupal.value = parametrosPromocion.totalesrendimientoOperador.toFixed(2);

    const totalRedBeneficiosGrupoGrupal = document.getElementById("totalRedBeneficiosGrupoGrupal");
    totalRedBeneficiosGrupoGrupal.value = Number(totalRedBeneficiosGrupal.value) * parametrosPromocion.numeroContribuyentes;

    const totalRedBeneficiosPromocionalGrupalCopia = document.getElementById("totalRedBeneficiosPromocionalGrupalCopia");
    totalRedBeneficiosPromocionalGrupalCopia.value = totalRedBeneficiosGrupoGrupal.value;

    const contribucionMensualPromocionalGrupal = document.getElementById("contribucionMensualPromocionalGrupal");
    contribucionMensualPromocionalGrupal.value = parametrosPromocion.contribucionTotalMesGrupal;

    const contribucionTotalPromocionalGrupal = document.getElementById("contribucionTotalPromocionalGrupal");
    contribucionTotalPromocionalGrupal.value = Number(contribucionMensualPromocionalGrupal.value) * Number(periodoContribucionPromocionalGrupal.value);

    const acumuladoEnCuentaPromocionalGrupal = document.getElementById("acumuladoEnCuentaPromocionalGrupal");
    acumuladoEnCuentaPromocionalGrupal.value = parametrosPromocion.totalesAcumuladoCuentaGrupal;

    const rendimientoTotalClientePromocionalGrupal = document.getElementById("rendimientoTotalClientePromocionalGrupal");
    rendimientoTotalClientePromocionalGrupal.value = (Number(totalRedBeneficiosPromocionalGrupalCopia.value) + Number(acumuladoEnCuentaPromocionalGrupal.value)).toFixed(2);
}

const formatoNumerico = () => {
    let celdas = document.querySelectorAll(".formato-monto");

    celdas.forEach(td => {
        let numero = parseFloat(td.innerText.replace(",", "."));
        
        if (!isNaN(numero)) {
            td.innerText = new Intl.NumberFormat("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(numero);
        }
    });
}