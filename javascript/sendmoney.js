const inputMonto = document.getElementById("montoenviar");
const formEnviar = document.getElementById("enviocontacto");
const btntransferir = document.getElementById("btntransferir");
const barra = document.getElementById("barratransferencia");
const lista = document.getElementById("listadecontactos");

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
  const btncerrar = document.getElementById("btncierre");

  btncerrar.addEventListener("click", () => {
    cerrarcontacto();
    function cerrarcontacto() {
      popup.classList.add("d-none");
    }
  });
}

/*Buscador de contacto */
$("#buscar").on("input", function () {
  const buscador = $(this).val().toLowerCase();

  $("#listadecontactos li").each(function () {
    const listatexto = $(this).text().toLowerCase();

    $(this).toggle(listatexto.includes(buscador));
  });
});

$(function () {
  const $buscar = $("#buscar");
  const $datalist = $("#sugerenciascontacto");
  const $lista = $("#listadecontactos");

  if (!$buscar.length || !$lista.length || !$datalist.length) return;

  function listasugerencias() {
    const nombres = $lista
      .find(".nombreDeContacto")
      .map(function () {
        return $(this).text().trim();
      })
      .get()
      .filter(Boolean);

    const seen = new Set();
    const unicos = [];
    nombres.forEach((n) => {
      const k = n.toLowerCase();
      if (!seen.has(k)) {
        seen.add(k);
        unicos.push(n);
      }
    });

    $datalist.empty();
    unicos.forEach((n) => {
      $datalist.append(`<option value="${n}"></option>`);
    });
  }

  function seleccionarContacto(nombre) {
    const nLower = nombre.trim().toLowerCase();

    const $item = $lista
      .find(".list-group-item")
      .filter(function () {
        return (
          $(this).find(".nombreDeContacto").text().trim().toLowerCase() ===
          nLower
        );
      })
      .first();

    if ($item.length) $item.trigger("click");
  }

  listasugerencias();

  $buscar.on("input", function () {
    const texto = $(this).val().toLowerCase();
    $lista.find("li").each(function () {
      const contenido = $(this).text().toLowerCase();
      $(this).toggle(contenido.includes(texto));
    });
  });

  $buscar.on("change", function () {
    if (this.value.trim()) seleccionarContacto(this.value);
  });
});

/* Formula de - balance */

formEnviar.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const montoCont = Number(inputMonto.value);
  let saldo = leerSaldo();

  if (isNaN(montoCont) || montoCont <= 0) {
    mostrarMensaje("Ingrese un monto válido", "warning");
    return;
  }
  if (montoCont > saldo) {
    mostrarMensaje("Saldo insuficiente para realizar la operación.", "danger");
    return;
  }

  saldo = Math.max(0, saldo - montoCont);
  localStorage.setItem("saldo", saldo);

  inputMonto.value = "";

  agregarmov(
    "transferencia",
    `transferencia enviada a ${contactoselec}: ${montoCont}`,
  );
  mostrarMensaje("Transferencia realizada");
  rendermov("all");
});

/* Mostrar saldo*/

const saldoactual = $("#mostrarsaldo");

function mostrarMonto() {
  const saldovista = localStorage.getItem("saldo") || 0;
  $("#mostrarsaldo").text(`Saldo disponible: $${saldovista}`);
}
$(function () {
  mostrarMonto();
});
/* Barra de transferencia */

lista.addEventListener("click", (e) => {
  const li = e.target.closest(".list-group-item");
  if (!li) return;

  document.getElementById("barratransferencia")?.classList.remove("d-none");
});

/* Transferir a contacto */

/*Selección del contacto */


let contactoselec = null;


  lista.addEventListener("click", (e) => {
    const li = e.target.closest(".list-group-item");
    if (!li) return;

    document
      .querySelectorAll("#listadecontactos .list-group-item")
      .forEach((item) => item.classList.remove("active"));

    li.classList.add("active");

    contactoselec =
      li.querySelector(".nombreDeContacto")?.textContent.trim() || "contacto";
    document.getElementById("enviocontacto")?.classList.remove("d-none");
  });
