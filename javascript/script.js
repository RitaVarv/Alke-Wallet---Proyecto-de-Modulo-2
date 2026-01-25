
//*elementos del log in*//

$(function () {
    const $formulario = $("#loginform");
    const $usuarioInput = $("#email");
    const $contraseñaInput = $("#password");
    const $alertlogin = $("#alertlog")



    $formulario.on("submit", function (e) {
        e.preventDefault();

        const usuario = $usuarioInput.val().trim();
        const contraseña = $contraseñaInput.val().trim();

        $alertlogin.removeClass("d-none alert-danger alert-success")

        if (usuario !== "usuario@ejemplo.com" || contraseña !== "password") {
            $alertlogin
                .addClass("alert-danger")
                .text("Credenciales erroneas, intente nuevamente.")
            return;
        }
        else if (usuario === "usuario@ejemplo.com" || contraseña === "password") {
            $alertlogin
                .addClass("alert-success")
                .text("Inicio de sesión exitoso.")

            setTimeout(function () {
                window.location.href = "menu.html"
            }, 1000);
        }


    })

})

//* Elementos del Menu principal *//

const balanceElemento = document.getElementById("balance")
const btniradeposito = document.getElementById("btniradeposito");
const btnenviar = document.getElementById("btnenviar");
const btnmovimientos = document.getElementById("btnmovimientos")

function leerSaldo() {
    const saldoGuardado = localStorage.getItem("saldo");
        return saldoGuardado === null ? 60000: Number(saldoGuardado)
}

function redirigirA(texto, destino) {
    const mensaje = document.getElementById("mensaje");
    const mensajetexto = document.getElementById("mensajetexto")

    if (!mensaje || !mensajetexto) return;
    mensajetexto.textContent = texto;
    mensaje.classList.remove("d-none");

    setTimeout(() => {
        window.location.href = destino;
    }, 500);
}

if (balanceElemento) {
    const saldo = leerSaldo ();
    balanceElemento.textContent = `$${saldo}`;
}

if (btniradeposito) {
    btniradeposito.addEventListener("click", () => {
        redirigirA("Redirigiendo a Depositos", "deposit.html");
    })
}

if (btnenviar) {
    btnenviar.addEventListener("click", () => {
        redirigirA("Redirigiendo a Transferencias", "sendmoney.html");
    })
}

if (btnmovimientos) {
    btnmovimientos.addEventListener("click", () => {
        redirigirA("Redirigiendo a Movimientos", "transactions.html");
    })
}
const btncomprar = document.getElementById("btncompra");

if (btncomprar) {
    btncomprar.addEventListener("click", () => {
        const monto = Math.floor(Math.random() * 9000) + 1000;
        let saldo = Number(localStorage.getItem("saldo")) || 60000;

        if (monto > saldo || saldo === 60000) {
            mostrarMensaje("Saldo insuficiente para realizar la compra", "danger")
            return;
        }
        saldo = Math.max(0, saldo - monto);
        localStorage.setItem("saldo", saldo);

        agregarmov("compra", `Compra realizada por: $${monto}`);
        rendermov("all");

        mostrarMensaje(`Compra realizada con éxito: $${monto}`, "success")

        setTimeout(function () {
            window.location.href = ("menu.html");
        }, 1000);
    })
}


//* Elementos de deposito *//

const formDeposito = document.getElementById("formDeposit");

function mostrarMensaje(texto,tipo = "success") {
    const mensaje = document.getElementById("mensaje");
    const mensajetexto = document.getElementById("mensajetexto")

    if (!mensaje || !mensajetexto)return;
    mensaje.classList.remove("aler-danger", "alert-priority", "alert-warning", "alert-success" )
    mensajetexto.textContent = texto;
    mensaje.classList.add(`alert-${tipo}`)
    mensaje.classList.remove("d-none");

    setTimeout(() => {
        mensaje.classList.add("d-none");
    }, 1000);
}

const montoInput = document.getElementById("monto");
const $alertdeposit = $("#alertadeposito")


if (formDeposito) {


    formDeposito.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const monto = Number(montoInput.value);


        function mostrarAlerta(mensaje, tipo) {
            $alertdeposit
                .removeClass("d-none")
                .html(`<div class="alert alert-${tipo}" role="alert">
            ${mensaje} </div>`);
        }

        const $leyendadeposito = $("#ultimodeposito");


        if (monto > 0) {
            let saldo = leerSaldo();
            saldo += monto;
            localStorage.setItem("saldo", saldo);

            localStorage.setItem("ultimodeposito", monto);

            montoInput.value = "";

            $leyendadeposito.text(`Último depósito realizado: $${monto}`);

            mostrarMensaje(`Deposito realizado con éxito: $${monto}`, "success");

            agregarmov("deposito", `Deposito realizado: $${monto}`);
            rendermov("all");

            setTimeout(function () {
                window.location.href = "deposit.html"
            }, 1000);

            return;

        }

        mostrarMensaje("Ingrese un monto válido", "danger");
    });

    $(function () {
        const ultimo = localStorage.getItem("ultimodeposito");

        if (ultimo)
            $("#ultimodeposito").text(
                `Último depósito realizado: $${ultimo}`);
    });
}



//* Elementos de contactos *//

const formcontacto = document.getElementById("ingresodecontacto");
const btningresar = document.getElementById("btningresar");
const nombrecontacto = document.getElementById("nombrecontacto");
const cbunumero = document.getElementById("CBU");
const alias = document.getElementById("alias");
const nombrebanco = document.getElementById("nombrebanco");


/*PopUp de crear Contacto*/

const btnagregar = document.getElementById("btnagregar");
const popup = document.getElementById("ingresodecontacto");
if (btnagregar) {
    btnagregar.addEventListener("click", () => {
        abrirpopupcontactonuevo();

        function abrirpopupcontactonuevo() {
            if (!popup) return;

            popup.classList.remove("d-none");
        }
    });
    const btncerrar = document.getElementById("btncierre")

    btncerrar.addEventListener("click", () => {
        cerrarcontacto();
        function cerrarcontacto() {
            popup.classList.add("d-none");

        }
    })
}


/* Transferir a contacto */

const inputMonto = document.getElementById("montoenviar");
const formEnviar = document.getElementById("enviocontacto");
const btntransferir = document.getElementById("btntransferir");
const barra = document.getElementById("barratransferencia")


/*Selección del contacto */

const lista = document.getElementById("listadecontactos");

let contactoselec = null;

if (lista)
    lista.addEventListener("click", (e) => {
        const li = e.target.closest(".list-group-item");
        if (!li) return;


        document.querySelectorAll("#listadecontactos .list-group-item")
            .forEach(item => item.classList.remove("active"));

        li.classList.add("active");

        contactoselec =
            li.querySelector(".nombreDeContacto")?.textContent.trim() || "contacto";
        document.getElementById("enviocontacto")?.classList.remove("d-none");


    })


/*Buscador de contacto */


$("#buscar").on("input", function () {
    const buscador = $(this).val().toLowerCase()

    $("#listadecontactos li").each(function () {
        const listatexto = $(this).text().toLowerCase();

        $(this).toggle(listatexto.includes(buscador));
    });
})



/* Formula de - balance */
if (formEnviar) {
    formEnviar.addEventListener("submit", (evento) => {
        evento.preventDefault();
    

        const montoCont = Number(inputMonto.value);
        let saldo = leerSaldo();
    
        if (isNaN(montoCont) || montoCont <= 0) {
            mostrarMensaje("Ingrese un monto válido", "warning");
            return;
        };
        if (montoCont > saldo) {
            mostrarMensaje("Saldo insuficiente para realizar la operación.", "danger");
            return;
        }
    
        saldo = Math.max(0, saldo - montoCont);
        localStorage.setItem("saldo", saldo);

        inputMonto.value = "";

        agregarmov("transferencia", `transferencia enviada a ${contactoselec}: ${montoCont}`);
        mostrarMensaje("Transferencia realizada");
        rendermov("all");
})}

/* Mostrar saldo*/

const saldoactual = $("#mostrarsaldo")

    function mostrarMonto() {
        const saldovista = localStorage.getItem("saldo") || 0;
        $("#mostrarsaldo").text(`Saldo disponible: $${saldovista}`);
    }
    $(function () {
        mostrarMonto();

    })
    /* Barra de transferencia */

    if (lista)
        lista.addEventListener("click", (e) => {

            const li = e.target.closest(".list-group-item");
            if (!li) return;

            document.getElementById("barratransferencia")?.classList.remove("d-none");
        })

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