import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import '/src/components/css/credentials/Register.css';

const Register = () => {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState(0);
	const [email, setEmail] = useState('');
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
			navigate('/');
		  };
		  toastr.success('Register successfully!');
		} else {
		  toastr.error('Failed to change register.');
		}
	  };

  const handleSubmit = (event) => {
    event.preventDefault();

	if (password !== confirmPassword) {
		toastr.error('Passwords do not match.');
		return;
	  }
	
    setIsSubmitting(true);

    const userData = {
	  name,
	  lastName,
	  age,
      email,
      password,
      confirmPassword
    };

	/* // Simular una solicitud de red con un retraso
	 setTimeout(() => {
		axios.post('/api/auth/register', userData)
		  .then(response => {
			handleResponse(response);
		  })
		  .catch(error => {
			toastr.error('An error occurred.');
			setIsSubmitting(false);
		  });
	  }, 2000); // 2 segundos de retraso para simular la solicitud*/
	
    axios.post('http://localhost:8000/api/auth/register', userData)
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
      toastr.error('Error translating page', error);
    }
  };

  return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  {/* page icon */}
  <link rel="icon" type="image/png" href="/src/components/image/icon.png" />
  <title>Register</title>
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
  <link rel="stylesheet" href="/src/components/css/credentials/Register.css" />
  <div className="register-container">
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
			<h2 className="card-title text-center no-bold" data-translate>Register</h2>
			<form onSubmit={handleSubmit} method="post" id="registerForm">
				<div className="form-row">
				<div className="form-group" data-translate>
					<label className="register-label" htmlFor="name">Name</label>
					<input
					type="text"
					maxLength="20"
					className="form-control"
					id="name"
					placeholder="Enter name"
					onChange={(e) => setName(e.target.value)}
					required="true"
					/>
				</div>
				<div className="form-group" data-translate>
					<label className="register-label" htmlFor="lastName">Last Name</label>
					<input
					type="text"
					maxLength="50"
					className="form-control"
					id="lastName"
					placeholder="Enter last name"
					onChange={(e) => setLastName(e.target.value)}
					required="true"
					/>
				</div>
				</div>
				<div className="form-row">
				<div className="form-group" data-translate>
					<label className="register-label" htmlFor="age">Age</label>
					<input
					type="number"
					className="form-control"
					id="age"
					placeholder="Enter age"
					min={10}
					max={80}
					onChange={(e) => setAge(toInt(e.target.value))}
					required="true"
					/>
				</div>
				<div className="form-group" data-translate>
					<label className="register-label" htmlFor="email">Email</label>
					<input
					type="email"
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
					maxLength="50"
					className="form-control"
					id="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required="true"
					/>
				</div>
				</div>
				<div className="form-row">
				<div className="form-group" data-translate>
					<label className="register-label" htmlFor="password">Password</label>
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
					<label className="register-label" htmlFor="confirmPassword">Confirm password</label>
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
				</div>
				<div className="footer">
				<input
					type="checkbox"
					className="form-check-input custom-checkbox"
					id="privacyPolicy"
					required="true"
				/>
				<label className="form-check-label" style={{ color: 'black' }} htmlFor="privacyPolicy">
					I agree with <a href="#" >Privacy Policy</a> | All rights
					reserved © 2024
				</label>
				</div>
				<button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
					{isSubmitting ? (
						<>
							<i className="fa-solid fa-spinner fa-spin" /> Registering...
						</>
					) : (
						<>  
							<i className="fa-solid fa-user" /> Register
						</>
					)}
				</button>
			</form>
			</div>
			<div
			className="card-footer text-center"
			style={{ marginTop: 10, justifyContent: "space-around" }}
			>
			Do you have an account?
			<Link to="/loginteacher">
				{" "}
				Login <i className="fa-solid fa-right-to-bracket" />
			</Link>
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

export default Register;