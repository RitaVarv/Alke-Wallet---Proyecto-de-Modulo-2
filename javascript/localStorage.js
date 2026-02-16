/* Función para agregar al historial*/



function agregarmov(tipo, texto) {
    const movs = JSON.parse(localStorage.getItem(movimientosrecord) || "[]");

    movs.push({
        tipo,
        texto,
        fecha: Date.now()
    });

    localStorage.setItem(movimientosrecord, JSON.stringify(movs));
}

//* Historial de movimientos *//

const movimientosrecord = "movimientos"

function agregarmov(tipo, texto) {
    const movs = JSON.parse(localStorage.getItem(movimientosrecord) || "[]");

    movs.push({
        tipo,
        texto,
        fecha: Date.now()
    });

    localStorage.setItem(movimientosrecord, JSON.stringify(movs));
}

function rendermov(filtro = "all") {
    const $ul = $("#listamovimientos");
    if ($ul.length === 0) return;

    const movs = JSON.parse(localStorage.getItem(movimientosrecord) || "[]");

    let filtros = movs;
    if (filtro !== "all") {
        filtros = movs.filter(m => m.tipo === filtro);
    }

    $ul.empty();

    if (filtros.length === 0) {
        $ul.append(`
            <li class="list-group-item text-muted"> No se han realizado movimientos.</li>`);
        return;
    }
    filtros
        .reverse()
        .slice(0, 10)
        .forEach(m => {
            const fecha = new Date(m.fecha).toLocaleString("es-CL");

            $ul.append(`
            <li class="list-group-item"> 
            ${fecha} - ${m.texto}
            </li>`);
        });
}

$(function () {
    rendermov($("#movTipo").val());

    $("#movTipo").on("change", function () {
        rendermov($(this).val());
    });
})