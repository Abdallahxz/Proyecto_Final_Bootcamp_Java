import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function ClientExam (){
	const [submitted, setSubmitted] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
  
	const handleRadioClick = (event) => {
	  if (submitted) return;
	  const radio = event.target.querySelector('input[type="radio"]');
	  if (!radio.checked) {
		radio.checked = true;
		setSelectedAnswer(radio.value);
	  }
	};
  
	const handleSubmit = () => {
	  setSubmitted(true);
	  document.querySelector('.options-container').classList.add('submitted');
  
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
  
	  const respuestaCorrecta = '7 days';
  
	  const opcion1 = document.getElementById('option1').parentElement;
	  const opcion2 = document.getElementById('option2').parentElement;
	  const opcion3 = document.getElementById('option3').parentElement;
	  const opcion4 = document.getElementById('option4').parentElement;
  
	  opcion1.classList.remove('correcta', 'incorrecta');
	  opcion2.classList.remove('correcta', 'incorrecta');
	  opcion3.classList.remove('correcta', 'incorrecta');
	  opcion4.classList.remove('correcta', 'incorrecta');
  
	  if (respuestaCorrecta === '3 days') opcion1.classList.add('correcta');
	  if (respuestaCorrecta === '5 days') opcion2.classList.add('correcta');
	  if (respuestaCorrecta === '7 days') opcion3.classList.add('correcta');
	  if (respuestaCorrecta === "Can't be determined") opcion4.classList.add('correcta');
  
	  if (selectedAnswer !== respuestaCorrecta) {
		if (selectedAnswer === '3 days') opcion1.classList.add('incorrecta');
		if (selectedAnswer === '5 days') opcion2.classList.add('incorrecta');
		if (selectedAnswer === '7 days') opcion3.classList.add('incorrecta');
		if (selectedAnswer === "Can't be determined") opcion4.classList.add('incorrecta');
	  }
	};

    return(
        <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exam Results</title>
  <link rel="icon" type="image/png" href="/image/icon.png" />
  {/* Bootstrap CSS */}
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  {/* Font Awesome CSS */}
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    rel="stylesheet"
  />
  {/* Toastr CSS */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n     \n      /* Timer Styles */\n      .timer {\n        background-color: #007bff;\n        color: white;\n        padding: 10px 20px;\n        border-radius: 20px;\n        font-size: 1.2rem;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        overflow: hidden;\n      }\n\n      .timer i {\n        margin-right: 10px;\n        animation: spin 2s infinite linear;\n      }\n\n      @keyframes spin {\n        from {\n          transform: rotate(0deg);\n        }\n\n        to {\n          transform: rotate(360deg);\n        }\n      }\n\n      .timer .time-left {\n        font-weight: bold;\n      }\n\n      .question-number.current {\n        background-color: #007bff;\n        color: white;\n      }\n\n      .profile-container {\n        text-align: center;\n        margin-bottom: 20px;\n      }\n\n\n\n      .profile-container h6 {\n        margin-bottom: 5px;\n        font-weight: bold;\n        color: #e5e5e5;\n      }\n\n \n    "
    }}
  />
  <div className="container-fluid">
    <div className="row mt-4">
      <div className="col-md-3">
        {/*logo */}
        <div>
          <img src="/src/components/image/logo.png" alt="Website Logo" width="100%" />
          <hr />
        </div>
        {/* Sidebar for Profile, Chapters, and Question Navigation */}
        <div className="sidebar-container">
          {/* Profile Section */}
          <div className="profile-container">
            <img
              src="https://via.placeholder.com/80"
              alt="Student Profile Picture"
            />
            <h6>Student Name</h6>
            <p>Grade: 10</p>
          </div>
          {/* Question Navigation */}
          <div className="chapter-list">
            <h5>Questions</h5>
            <div className="d-flex flex-wrap">
              <div className="question-number">1</div>
              <div className="question-number current">2</div>
              <div className="question-number">3</div>
              <div className="question-number">4</div>
              <div className="question-number">5</div>
              <div className="question-number">6</div>
              <div className="question-number">7</div>
              <div className="question-number">8</div>
              <div className="question-number">9</div>
              <div className="question-number">10</div>
              {/* Add more question numbers here */}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9" style={{ paddingLeft: 5 }}>
        {/* Question Container */}
        <div className="question-container">
          {/* Timer */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="h4-clientexam">
              10th Social Exam
              <span className="badge badge-warning">Mock Exam</span>
            </h4>
            <div className="timer">
              <i className="fas fa-clock" />
              <span className="time-left">19:01</span>
            </div>
          </div>
          <div className="question-card" id="question_data">
            {/* Question and Options */}
            <h5>Question: 2</h5>
            <p>
              10 women can complete the work in 7 days, and 10 children take 14
              days to complete the work. How many days will 5 women and 10
              children take to complete the work?
            </p>
            {/* Options */}
            <div className="options-container">
              <div className="custom-radio" onClick={handleRadioClick}>
                <input
                  type="radio"
                  name="respuesta"
                  id="option1"
                  defaultValue="3 days"
                />
                <label htmlFor="option1" id="labelOpcion1">
                  3 days
                </label>
              </div>
              <div className="custom-radio" onClick={handleRadioClick}>
                <input
                  type="radio"
                  name="respuesta"
                  id="option2"
                  defaultValue="5 days"
                />
                <label htmlFor="option2" id="labelOpcion2">
                  5 days
                </label>
              </div>
              <div className="custom-radio" onClick={handleRadioClick}>
                <input
                  type="radio"
                  name="respuesta"
                  id="option3"
                  defaultValue="7 days"
                />
                <label htmlFor="option3" id="labelOpcion3">
                  7 days
                </label>
              </div>
              <div className="custom-radio" onClick={handleRadioClick}>
                <input
                  type="radio"
                  name="respuesta"
                  id="option4"
                  defaultValue="Can't be determined"
                />
                <label htmlFor="option4" id="labelOpcion4">
                  Can&apos;t be determined
                </label>
              </div>
            </div>
            {/* Navigation Buttons */}
            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-danger ">back</button>
              <button className="btn btn-primary ">Save &amp; Next</button>
              <button id="submitBtn" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style
      dangerouslySetInnerHTML={{
        __html:
          '\n  \n  .h4-clientexam {\n      color: #343a40;\n      font-size: 1.8rem;\n      font-weight: bold;\n  }\n\n  \n  .question-container {\n      background-color: white;\n      border-radius: 20px;\n      padding: 30px;\n      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n      margin-bottom: 25px;\n  }\n  \n  .options-container .custom-radio {\n      background-color: #f8f9fa;\n      padding: 20px;\n      border-radius: 15px;\n      margin-bottom: 15px;\n      transition: all 0.3s ease;\n      display: flex;\n      align-items: center;\n      cursor: pointer;\n      border: 2px solid transparent;\n  }\n  \n  .options-container:not(.submitted) .custom-radio:hover {\n      background-color: #e2e6ea;\n      transform: translateY(-5px);\n      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  }\n  \n  .options-container .custom-radio.active {\n      background-color: #4d74ff;\n      color: white;\n      border-color: #4d74ff;\n  }\n  \n  .options-container input[type="radio"] {\n      transform: scale(1.3);\n      margin-right: 15px;\n  }\n  \n\n  \n  .btn {\n      border-radius: 50px;\n      text-transform: uppercase;\n      font-weight: bold;\n      transition: all 0.3s ease;\n      margin: 0 5px;\n  }\n  \n  .btn-custom:hover {\n      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);\n      transform: translateY(-5px);\n  }\n  \n  .btn-info {\n      background-color: #17a2b8;\n      border: none;\n  }\n  \n  .btn-info:hover {\n      background-color: #138496;\n  }\n\n  \n  .sidebar-container {\n      background: linear-gradient(135deg, #99abbe, #c2cdd9);\n      padding: 25px;\n      border-radius: 20px;\n      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n      margin-bottom: 25px;\n  }\n  \n\n  \n  .chapter-list button:hover {\n      transform: scale(1.2);\n      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);\n      background-color: #4e73df;\n      color: white;\n  }\n  \n  .profile-container img {\n      border-radius: 50%;\n      width: 100px;\n      height: 100px;\n      margin-bottom: 15px;\n      border: 3px solid #000000;\n  }\n  \n  .question-number {\n      background-color: #f8f9fa;\n      padding: 15px;\n      border-radius: 50%;\n      width: 55px;\n      height: 55px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin: 8px;\n      font-weight: bold;\n      font-size: 1.4rem;\n      cursor: pointer;\n      transition: all 0.3s ease;\n  }\n  \n  .question-number.current {\n      background-color: #ff914d;\n      color: white;\n  }\n  \n  .question-number:hover {\n      transform: scale(1.02);\n      box-shadow: 0 6px 15px rgba(28, 200, 138, 0.2);\n  }\n\n  .correcta {\n  background-color: #28a745 !important; /* Verde para respuestas correctas */\n  border-color: #28a745 !important;\n}\n\n.incorrecta {\n  background-color: #dc3545 !important; /* Rojo para respuestas incorrectas */\n  border-color: #dc3545 !important;\n}\n\n\n    '
      }}
    />   
  </div>
  <Helmet>
	{/* Bootstrap JS */}
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

	{/* jQuery */}
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

	{/* Popper.js */}
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>

	{/* Toastr JS */}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  </Helmet>
</>
    )

}

export default ClientExam