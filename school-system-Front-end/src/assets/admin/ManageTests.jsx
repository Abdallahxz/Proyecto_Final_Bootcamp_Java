import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SidebarToggle from '/src/components/jsx/SidebarTogle';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';
import '/src/components/css/admin/Dashboard.css';

const ManageTests = () => {
  const questionTypeSelectRef = useRef(null);
  const mcqFormRef = useRef(null);
  const writtenFormRef = useRef(null);
  const trueFalseFormRef = useRef(null);

  useEffect(() => {
    const questionTypeSelect = questionTypeSelectRef.current;
    const mcqForm = mcqFormRef.current;
    const writtenForm = writtenFormRef.current;
    const trueFalseForm = trueFalseFormRef.current;

    const handleChange = () => {
      const selectedType = questionTypeSelect.value;

      // Hide all specific forms first
      mcqForm.style.display = 'none';
      writtenForm.style.display = 'none';
      trueFalseForm.style.display = 'none';

      // Show the form that matches the selected type
      if (selectedType === 'mcq') {
        mcqForm.style.display = 'block';
      } else if (selectedType === 'written') {
        writtenForm.style.display = 'block';
      } else if (selectedType === 'trueFalse') {
        trueFalseForm.style.display = 'block';
      }
    };

    questionTypeSelect.addEventListener('change', handleChange);

	// Cleanup event listener on component unmount
    return () => {
		questionTypeSelect.removeEventListener('change', handleChange);
	  };
	}, []);

return(
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Manage Tests</title>
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="description" content="Admin Dashboard" />
  <meta name="keywords" content="Admin Dashboard" />
  <meta name="author" content="Admin Dashboard" />
  <link rel="icon" type="image/png" href="/image/icon.png" />
  <link href="/src/components/css/lib/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="/src/components/css/lib/all.min.css" />
  <link href="/src/components/css/admin/Dashboard.css" rel="stylesheet" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        .sidebar {\n            width: 250px;\n        }\n\n        .form-card {\n            background-color: #ffffff;\n            padding: 20px;\n            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n            border-radius: 10px;\n            margin-bottom: 20px;\n            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n        }\n\n        .form-card:hover {\n            transform: translateY(-5px);\n            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);\n        }\n\n        .test-content-list,\n        .test-question-list {\n            list-style-type: none;\n            padding: 0;\n            margin: 0;\n            background-color: #fff;\n            border-radius: 10px;\n            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);\n        }\n\n        .test-content-list li,\n        .test-question-list li {\n            padding: 15px;\n            border-bottom: 1px solid #ddd;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            background-color: #f9f9f9;\n            transition: background-color 0.3s ease, transform 0.2s ease-in-out;\n            border-radius: 8px;\n        }\n\n        .test-content-list li:hover,\n        .test-question-list li:hover {\n            background-color: #f1f1f1;\n            transform: translateY(-3px);\n        }\n\n        .test-content-list li:last-child,\n        .test-question-list li:last-child {\n            border-bottom: none;\n        }\n\n        .form-group label {\n            font-weight: 500;\n            margin-bottom: 5px;\n        }\n\n        .form-group select,\n        .form-group input,\n        .form-group textarea {\n            display: block;\n            width: 100%;\n            border-radius: 8px;\n            font-size: 16px;\n            margin-top: 5px;\n        }\n\n        .form-group select:focus,\n        .form-group input:focus,\n        .form-group textarea:focus {\n            border-color: #007bff;\n            box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);\n        }\n\n        .form-group select {\n            background-color: #f8f9fa;\n        }\n\n        .question-options {\n            margin-bottom: 15px;\n        }\n\n        .form-check {\n            margin-bottom: 10px;\n            display: flex;\n            align-items: center;\n        }\n\n        .form-check-input {\n            margin-right: 10px;\n        }\n    "
    }}
  />
  <div className="d-flex" style={{ width: "100%", height: "100%" }}>
{/* Sidebar */}
<nav id="sidebar" className="sidebar bg-dark text-light">
      <div className="d-flex flex-column h-100">
        <div className="p-3 flex-grow-1">
          <h4 className="text-center">Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/Dashboard"className="nav-link">
                <i className="fas fa-home" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ProfileAdmin" className="nav-link ">
                <i className="fas fa-user" /> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/CoursesAdmin" className="nav-link">
                <i className="fas fa-book" /> Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ManageCourses" className="nav-link">
                <i className="fas fa-users" /> Manage Course
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ManageTests" className="nav-link active">
                <i className="fas fa-clipboard" /> Manage Tests
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/CorrectTests" className="nav-link"> 
                <i className="fas fa-check-circle" /> Correct Tests
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Messages" className="nav-link">
                <i className="fas fa-envelope" /> Messages
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-3">
          <Link to="/" className="nav-link">
            <i className="fas fa-sign-out-alt" /> Logout
          </Link>
        </div>
      </div>
    </nav>
    {/* Main Content */}
    <main className="main-content flex-grow-1 p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="donotcross">Manage Tests</h2>
        {/* Sidebar Toggle Button */}
        <button
          id="sidebarToggleDesktop"
          className="btn btn-light btn-sm sidebar-toggle-btn"
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars" />
        </button>
      </div>
      {/* Test Management */}
      <div className="row">
        {/* Left Section */}
        <div className="col-md-6">
          {/* Add Test Form */}
          <div className="form-card">
            <div className="form-group">
              <label htmlFor="lessonSelect">
                Select Lesson - for Update or Remove
              </label>
              <select id="lessonSelect" className="form-control" required="">
                <option value="" disabled="" selected="">
                  Select a lesson
                </option>
                <option value="lesson1">Lesson One</option>
                <option value="lesson2">Lesson Two</option>
                <option value="lesson3">Lesson Three</option>
              </select>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="testTitle">Test Title</label>
                <input
                  type="text"
                  id="testTitle"
                  className="form-control"
                  placeholder="Enter test title"
                  required=""
                />
              </div>
              <button type="submit" className="btn btn-success btn-block">
                Add Test
              </button>
              <button
                type="submit"
                className="btn btn-danger btn-block btn-action mr-1"
                aria-label="Remove test"
              >
                {" "}
                Remove Test
              </button>
            </form>
          </div>
          {/* Test Question Index */}
          <div className="form-card">
            <div className="form-group">
              <label>Test Question Index</label>
            </div>
            <ul className="test-question-list">
              <li>
                <span>1. MCQ: Which of the following is...</span>
                <button
                  className="btn btn-sm btn-info btn-action"
                  aria-label="View question"
                >
                  <i className="fas fa-eye" />
                </button>
              </li>
              <li>
                <span>2. True/False: The statement is...</span>
                <button
                  className="btn btn-sm btn-info btn-action"
                  aria-label="View question"
                >
                  <i className="fas fa-eye" />
                </button>
              </li>
              <li>
                <span>3. Written: Explain the...</span>
                <button
                  className="btn btn-sm btn-info btn-action"
                  aria-label="View question"
                >
                  <i className="fas fa-eye" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* Right Section */}
        <div className="col-md-6">
          {/* Add Question Form */}
          <div className="form-card">
            <h5>Add New Question</h5>
            <form id="addQuestionForm">
              <div className="form-group">
                <label htmlFor="questionText">Question Text</label>
                <textarea
                  id="questionText"
                  rows={4}
                  className="form-control"
                  placeholder="Enter your question"
                  required=""
                  defaultValue={""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="questionType">Question Type</label>
                <select id="questionType" className="form-control" ref={questionTypeSelectRef} required="">
                  <option value="" disabled="" selected="">
                    Select question type
                  </option>
                  <option value="mcq">Multiple Choice</option>
                  <option value="written">Written</option>
                  <option value="trueFalse">True/False</option>
                </select>
              </div>
              {/* MCQ Form */}
              <div
                id="mcqForm"
                className="question-specific-form"
				ref={mcqFormRef}
                style={{ display: "none" }}
              >
                <div className="form-group">
                  <label className="option-container">
                    <input type="radio" name="correctOption" defaultValue={1} />
                    <span className="checkmark" />
                    <input
                      type="text"
                      id="mcqOption1"
                      className="form-control option-input"
                      placeholder="Option 1"
                      required=""
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label className="option-container">
                    <input type="radio" name="correctOption" defaultValue={2} />
                    <span className="checkmark" />
                    <input
                      type="text"
                      id="mcqOption2"
                      className="form-control option-input"
                      placeholder="Option 2"
                      required=""
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label className="option-container">
                    <input type="radio" name="correctOption" defaultValue={3} />
                    <span className="checkmark" />
                    <input
                      type="text"
                      id="mcqOption3"
                      className="form-control option-input"
                      placeholder="Option 3"
                      required=""
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label className="option-container">
                    <input type="radio" name="correctOption" defaultValue={4} />
                    <span className="checkmark" />
                    <input
                      type="text"
                      id="mcqOption4"
                      className="form-control option-input"
                      placeholder="Option 4"
                      required=""
                    />
                  </label>
                </div>
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '\n                                .question-specific-form {\n                                    max-width: 600px;\n                                    background: #fff;\n                                    border-radius: 12px;\n                                }\n\n                                .form-group {\n                                    margin-bottom: 16px;\n                                }\n\n                                .option-container {\n                                    display: flex;\n                                    align-items: center;\n                                    position: relative;\n                                    padding: 14px 20px;\n                                    cursor: pointer;\n                                    font-size: 16px;\n                                    border: 2px solid #ddd;\n                                    border-radius: 8px;\n                                    background-color: #ffffff;\n                                    transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;\n                                }\n\n                                .option-container:hover {\n                                    background-color: #eef3f0;\n                                    border-color: #b3cde0;\n                                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n                                }\n\n                                .option-container input[type="radio"] {\n                                    position: absolute;\n                                    opacity: 0;\n                                    cursor: pointer;\n                                    height: 0;\n                                    width: 0;\n                                }\n\n                                .checkmark {\n                                    height: 24px;\n                                    width: 24px;\n                                    background-color: #ececec;\n                                    border-radius: 4px;\n                                    margin-right: 16px;\n                                    display: flex;\n                                    align-items: center;\n                                    justify-content: center;\n                                    border: 2px solid #ceeec7;\n                                    transition: background-color 0.3s, border-color 0.3s;\n                                }\n\n                                .option-container input[type="radio"]:checked~.checkmark {\n                                    background-color: #2ed400;\n                                    border-color: #00d42a;\n                                    background-image: url(\'/image/check-solid.svg\');\n                                    background-size: 14px;\n                                    background-position: center;\n                                    background-repeat: no-repeat;\n                                }\n\n                                .form-control {\n                                    border: 1px solid #ced4da;\n                                    border-radius: 8px;\n                                    font-size: 16px;\n                                    color: #333;\n                                    width: 100%;\n                                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n                                    transition: border-color 0.3s, box-shadow 0.3s;\n                                }\n\n                                .form-control:focus {\n                                    outline: none;\n                                    border-color: #00bcd4;\n                                    box-shadow: 0 0 8px rgba(0, 188, 212, 0.3);\n                                }\n                            '
                }}
              />
              {/* Written Form */}
              <div
                id="writtenForm"
                className="question-specific-form"
				ref={writtenFormRef}
                style={{ display: "none" }}
              >
                {/* Additional fields for Written question if needed */}
              </div>
              {/* True/False Form */}
              <div
                id="trueFalseForm"
                className="question-specific-form row justify-content-between"
				ref={trueFalseFormRef}
                style={{ gap: 10, padding: "0 20px 10px", display: "none" }}
              >
                {/* زر الاختيار True */}
                <input
                  type="radio"
                  className="btn-check"
                  name="options-outlined"
                  id="true-option"
                  autoComplete="off"
                  defaultChecked=""
                />
                <label
                  className="btn btn-outline-success btn-custom w-100"
                  htmlFor="true-option"
                >
                  ✔ True
                </label>
                {/* زر الاختيار False */}
                <input
                  type="radio"
                  className="btn-check"
                  name="options-outlined"
                  id="false-option"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-danger btn-custom w-100"
                  htmlFor="false-option"
                >
                  ✖ False
                </label>
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                .btn-custom {\n                                    width: 100px;\n                                    height: 40px;\n                                    font-size: 18px;\n                                    border-width: 2px;\n                                    border-radius: 8px;\n                                    display: flex;\n                                    justify-content: center;\n                                    align-items: center;\n                                }\n\n                                .btn-check:checked+.btn-custom {\n                                    background-color: #e9ecef;\n                                    border-color: #007bff;\n                                }\n\n                                /* إخفاء المدخلات من نوع الراديو */\n                                .btn-check {\n                                    position: absolute;\n                                    opacity: 0;\n                                    pointer-events: none;\n                                }\n                            "
                }}
              />
              <button type="submit" className="btn btn-success btn-block">
                Add Question
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
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
  <SidebarToggle />
</>
)
}

export default ManageTests