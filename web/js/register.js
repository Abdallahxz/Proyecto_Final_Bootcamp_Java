$(document).ready(function () {
    // set toastr options
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
        // لا نضع onHidden هنا
    };

    // Toggle Password Visibility
    $('#togglePassword').click(function () {
        const passwordField = $('#password');
        const passwordFieldType = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', passwordFieldType);
        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    // Toggle Confirm Password Visibility
    $('#toggleConfirmPassword').click(function () {
        const confirmPasswordField = $('#confirmPassword');
        const confirmPasswordFieldType = confirmPasswordField.attr('type') === 'password' ? 'text' : 'password';
        confirmPasswordField.attr('type', confirmPasswordFieldType);
        $(this).toggleClass('fa-eye fa-eye-slash');
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

    // Form submission
    $('#registerForm').submit(function (e) {
        e.preventDefault();

		const age = document.getElementById('age').value;
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();

		if (age < 0) {
            toastr.error('Age cannot be negative.');
            return;
        }
		
        if (password !== confirmPassword) {
            toastr.error('Passwords do not match!');
            return;
        }

        const userData = {
            name: $('#firstName').val(),
            lastName: $('#lastName').val(),
            age: $('#age').val(),
            email: $('#email').val(),
            password: password
        };

        const registerButton = $('button[type="submit"]');

        // Disable the button and show spinner
        registerButton.prop('disabled', true);
        registerButton.html('<i class="fas fa-spinner fa-spin"></i> Registering...');

        $.ajax({
            url: 'http://localhost:8000/api/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function (response) {
                if (response.success == true) {
                    toastr.options.onHidden = function () {
                        window.location.href = "login_en.html";
                    };
                    toastr["success"]("Registration successful!", "Success");
                }
                // Enable the button again and remove spinner
                registerButton.prop('disabled', false);
                registerButton.html('Register');
            },
            error: function (xhr, status, error) {
                if (xhr.status == 0) {
                    toastr.options.onHidden = null;
                    toastr["error"]("Please check your internet connection", "Error");
                } else {
                    toastr.options.onHidden = null;
                    toastr["error"](xhr.responseJSON.message, "Error");

                    // Enable the button again and remove spinner
                
                }
                registerButton.prop('disabled', false);
                registerButton.html('Register');
            }
        });
    });
});
