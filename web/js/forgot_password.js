$(document).ready(function () {
    // Configurar opciones de Toastr
    var toastr = window["toastr"];
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // Manejar el envío del formulario de recuperación de contraseña
    $('#recover-password-form').submit(function (event) {
        event.preventDefault();
        const email = $('#email').val();

        // Aquí puedes agregar la lógica para enviar el correo de recuperación
        // Por ejemplo, una llamada AJAX a tu servidor
        $.ajax({
            url: '/api/recover-password', // Cambia esta URL por la de tu endpoint
            method: 'POST',
            data: { email: email },
            success: function (response) {
                toastr.success('A password reset link has been sent to your email!');
            },
            error: function (error) {
                toastr.error('Error sending recovery email.');
            }
        });
    });
});