import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import '/src/components/css/credentials/ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('en');

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

  const handleSubmit = (event) => {
    event.preventDefault();

	const userData = {
		email
	}

    axios.post('/api/auth/forgot-password', userData)
      .then(response => {
        toastr.success('A password reset link has been sent to your email!');
      })
      .catch(error => {
        toastr.error('Error sending recovery email.');
      });
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
  <title>Forgot Password</title>
  <link rel="icon" type="/image/png" href="/src/components/image/icon.png" />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    crossOrigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
  />
  <link rel="stylesheet" href="/src/components/css/credentials/ForgotPassword.css" />
  <div className="forpassword-container">
	<div className="forgot-password-container">
		<img src="/src/components/image/logo.png" alt="HWAI Technology Logo" />
		<h2 className='card-title text-center no-bold' data-translate>Reset Password</h2>
		<form onSubmit={handleSubmit} id="forgotPasswordForm">
		<div className="form-group" data-translate>
			<label className="forgot-label" htmlFor="email">Email</label>
			<input
			type="email"
			className="form-control"
			id="email"
			placeholder="Enter email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required="true"
			/>
		</div>
		<button type="submit" className="btn btn-primary">
			<i className="fa-solid fa-envelope" /> Send Reset Link
		</button>
		</form>
		<div style={{ marginTop: 10 }}>
			<Link to="/loginstudent">
			<i className="fa-solid fa-arrow-left" /> Back to Login
			</Link>
		</div>
		<div className="footer">
		<a href="#">Privacy Policy</a> | All rights reserved © 2024
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

export default ForgotPassword;