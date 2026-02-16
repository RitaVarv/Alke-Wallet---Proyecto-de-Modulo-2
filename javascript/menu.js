//* Elementos del Menu principal *//

const balanceElemento = document.getElementById("balance");
const btniradeposito = document.getElementById("btniradeposito");
const btnenviar = document.getElementById("btnenviar");
const btnmovimientos = document.getElementById("btnmovimientos");



function redirigirA(texto, destino) {
  const mensaje = document.getElementById("mensaje");
  const mensajetexto = document.getElementById("mensajetexto");

  if (!mensaje || !mensajetexto) return;
  mensajetexto.textContent = texto;
  mensaje.classList.remove("d-none");

  setTimeout(() => {
    window.location.href = destino;
  }, 500);
}

if (balanceElemento) {
  const saldo = leerSaldo();
  balanceElemento.textContent = `$${saldo}`;
}

if (btniradeposito) {
  btniradeposito.addEventListener("click", () => {
    redirigirA("Redirigiendo a Depositos", "deposit.html");
  });
}

if (btnenviar) {
  btnenviar.addEventListener("click", () => {
    redirigirA("Redirigiendo a Transferencias", "sendmoney.html");
  });
}

if (btnmovimientos) {
  btnmovimientos.addEventListener("click", () => {
    redirigirA("Redirigiendo a Movimientos", "transactions.html");
  });
}
const btncomprar = document.getElementById("btncompra");

btncomprar.addEventListener("click", () => {
  const monto = Math.floor(Math.random() * 9000) + 1000;
  let saldo = Number(localStorage.getItem("saldo")) || 60000;

  if (monto > saldo || saldo === 60000) {
    mostrarMensaje("Saldo insuficiente para realizar la compra", "danger");
    return;
  }
  saldo = Math.max(0, saldo - monto);
  localStorage.setItem("saldo", saldo);

  agregarmov("compra", `Compra realizada por: $${monto}`);
  rendermov("all");

  mostrarMensaje(`Compra realizada con éxito: $${monto}`, "warning");

  setTimeout(function () {
    window.location.href = "menu.html";
  }, 1000);
});
