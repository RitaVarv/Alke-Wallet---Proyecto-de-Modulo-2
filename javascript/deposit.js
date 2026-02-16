//* Elementos de deposito *//

const montoInput = document.getElementById("monto");
const $alertdeposit = $("#alertadeposito");

const formDeposito = document.getElementById("formDeposit");

formDeposito.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const monto = Number(montoInput.value);

  function mostrarMensaje(mensaje, tipo) {
    $alertdeposit.removeClass("d-none")
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
      window.location.href = "deposit.html";
    }, 1000);

    return;
  }

  mostrarMensaje("Ingrese un monto válido", "danger");
});

$(function () {
  const ultimo = localStorage.getItem("ultimodeposito");

  if (ultimo)
    $("#ultimodeposito").text(`Último depósito realizado: $${ultimo}`);
});
