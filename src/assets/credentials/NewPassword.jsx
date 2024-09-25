import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import '/src/components/css/credentials/NewPassword.css';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

	// Configurar opciones de Toastr
	toastr.options = {
		closeButton: false,
		debug: false,
		newestOnTop: false,
		progressBar: true,
		positionClass: 'toast-top-right',
		preventDuplicates: false,
		onclick: null,
		showDuration: '300',
		hideDuration: '1000',
		timeOut: '2000',
		extendedTimeOut: '500',
		showEasing: 'swing',
		hideEasing: 'linear',
		showMethod: 'fadeIn',
		hideMethod: 'fadeOut',
	  };

  const handleResponse = (response) => {
    if (response.data.success) {
      toastr.options.onHidden = () => {
        navigate('/login');
      };
      toastr.success('Password changed successfully!');
    } else {
      toastr.error('Failed to change password.');
    }
  };

/*    // Simulación de una respuesta de API
	const mockApiResponse = {
		data: {
		  success: true,
		},
	  };
	
	  // Llamar a la función de manejo de respuesta con la respuesta simulada
	  handleResponse(mockApiResponse);*/

  const handleSubmit = (event) => {
    event.preventDefault();

	 // Validar que las contraseñas coincidan
	 if (password !== confirmPassword) {
		toastr.error('Passwords do not match.');
		return;
	  }

	setIsSubmitting(true);

    const userData = {
      password,
      confirmPassword
    };

	/* // Simular una solicitud de red con un retraso
	 setTimeout(() => {
		axios.post('/api/auth/new-password', userData)
		  .then(response => {
			handleResponse(response);
		  })
		  .catch(error => {
			toastr.error('An error occurred.');
			setIsSubmitting(false);
		  });
	  }, 2000); // 2 segundos de retraso para simular la solicitud*/

    axios.post('/api/auth/new-password', userData)
      .then(response => {
        handleResponse(response);
      })
      .catch(error => {
        toastr.error('An error ocurred');
        setIsSubmitting(false);
      });
  };

  const togglePasswordVisibility = (fieldId) => {
	if (fieldId === 'password') {
	  setPasswordVisible(!passwordVisible);
	} else if (fieldId === 'confirmPassword') {
	  setConfirmPasswordVisible(!confirmPasswordVisible);
	}
    const field = document.getElementById(fieldId);
    const fieldType = field.type === 'password' ? 'text' : 'password';
    field.type = fieldType;
  };

  const translatePage = async (targetLanguage) => {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    const textsToTranslate = Array.from(elementsToTranslate).map(el => el.innerText);

    try {
      const response = await axios.post(`https://translation.googleapis.com/language/translate/v2`, {
        q: textsToTranslate,
        target: targetLanguage,
        key: 'AIzaSyC5iiQ5z7MjdoN8dFswOxhjqpb0FL7Scqg'
      });

      const translations = response.data.data.translations;
      translations.forEach((translation, index) => {
        elementsToTranslate[index].innerText = translation.translatedText;
      });

      setLanguage(targetLanguage);
    } catch (error) {
      toastr.error('Error translating page:', error);
    }
  };

  return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  {/* page icon */}
  <link rel="icon" type="image/png" href="/src/components/image/icon.png" />
  <title>New Password</title>
  {/* Bootstrap CSS */}
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  {/* FontAwesome CSS */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    crossOrigin="anonymous"
  />
  {/* Toastr CSS */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
  />
  {/* Custom CSS */}
  <link rel="stylesheet" href="/src/components/css/credentials/NewPassword.css" />
  <div className="newpassword-container">
	<div className="forgot-password-container">
		<div className="container">
		<div className="row justify-content-center">
			<div className="card-body">
			<div style={{ display: "flex", justifyContent: "center" }}>
				<img
				src="/src/components/image/logo.png"
				alt="Company Logo"
				className="img-fluid mb-4"
				style={{ maxWidth: 200, textAlign: "center" }}
				/>
			</div>
			<h2 className="card-title text-center no-bold" data-translate>Reset Password</h2>
			<form onSubmit={handleSubmit} method="post" id="registerForm">
				<div className="form-group" data-translate>
				<label className="newpass-label" htmlFor="password">New Password</label>
				<div className="input-group">
					<input
					type={passwordVisible ? 'text' : 'password'}
					className="form-control"
					id="password"
					placeholder="Enter password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					minLength={8}
					required="true"
					/>
					<div className="input-group-append">
					<span className="input-group-text">
						<i className={passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}
						id="togglePassword"
						onClick={() => togglePasswordVisibility('password')}/>
					</span>
					</div>
				</div>
				</div>
				<div className="form-group" data-translate>
				<label className="newpass-label" htmlFor="confirmPassword">Confirm Password</label>
				<div className="input-group">
					<input
					type={confirmPasswordVisible ? 'text' : 'password'}
					className="form-control"
					id="confirmPassword"
					placeholder="Confirm password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					minLength={8}
					required="true"
					/>
					<div className="input-group-append">
					<span className="input-group-text">
						<i className={confirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}
						id="toggleConfirmPassword"
						onClick={() => togglePasswordVisibility('confirmPassword')}/>
					</span>
					</div>
				</div>
				</div>
				<button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
				{isSubmitting ? (
						<>
							<i className="fa-solid fa-spinner fa-spin" /> Submitting...
						</>
					) : (
						<>  
							<i className="fa-solid fa-key" /> Submit
						</>
					)} 
				</button>
			</form>
			</div>
		</div>
		</div>
	</div>
  </div>
  <Helmet>
	{/* Bootstrap JS */}
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

	{/* Bootstrap JS and dependencies */}
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

	{/* Toastr JS */}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  </Helmet>
</>
  );
};

export default NewPassword;