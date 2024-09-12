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
	
	const languageSelect = document.getElementById('languageSelect');

    // Cambiar el idioma cuando se seleccione una opción
    languageSelect.addEventListener('change', function () {
        const selectedLanguage = languageSelect.value;
        const currentPath = window.location.pathname;

        // Redirigir a la página correspondiente según el idioma seleccionado
        if (selectedLanguage === 'en') {
            window.location.href = currentPath.replace('_es', '_en');
        } else if (selectedLanguage === 'es') {
            window.location.href = currentPath.replace('_en', '_es');
        }

        // Actualizar la bandera mostrada en el seleccionador
        const selectedOption = languageSelect.options[languageSelect.selectedIndex];
        languageSelect.style.backgroundImage = `url(${selectedOption.getAttribute('data-icon')})`;
    });

    // Establecer el valor del selector según el idioma actual
    if (window.location.pathname.includes('_es')) {
        languageSelect.value = 'es';
    } else {
        languageSelect.value = 'en';
    }

    // Inicializar la bandera mostrada en el seleccionador
    const selectedOption = languageSelect.options[languageSelect.selectedIndex];
    languageSelect.style.backgroundImage = `url(${selectedOption.getAttribute('data-icon')})`;

});