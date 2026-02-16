/*Función de mensajes */

function mostrarMensaje(texto, tipo = "success") {
  const mensaje = document.getElementById("mensaje");
  const mensajetexto = document.getElementById("mensajetexto");

  if (!mensaje || !mensajetexto) return;
  mensaje.classList.remove(
    "aler-danger",
    "alert-priority",
    "alert-warning",
    "alert-success",
  );
  mensajetexto.textContent = texto;
  mensaje.classList.add(`alert-${tipo}`);
  mensaje.classList.remove("d-none");

  setTimeout(() => {
    mensaje.classList.add("d-none");
  }, 1000);
}

/* Función de saldo */

function leerSaldo() {
  const saldoGuardado = localStorage.getItem("saldo");
  return saldoGuardado === null ? 60000 : Number(saldoGuardado);
}
