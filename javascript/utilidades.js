/*Función de mensajes */

function mostrarMensaje(texto) {
  const mensaje = document.getElementById("mensaje");
  const mensajetexto = document.getElementById("mensajetexto");

  if (!mensaje) return;
  
  mensajetexto.textContent = texto;
  
  $("#mensaje").modal({
    backdrop:false,
    show:true
  });
  setTimeout(() => {
  $("#mensaje").modal("hide");
  }, 1500);
}

/* Función de saldo */

function leerSaldo() {
  const saldoGuardado = localStorage.getItem("saldo");
  return saldoGuardado === null ? 60000 : Number(saldoGuardado);
}
