
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
