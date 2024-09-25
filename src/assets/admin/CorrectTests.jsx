import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SidebarToggle from '/src/components/jsx/SidebarTogle';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';
import '/src/components/css/admin/Dashboard.css';

const CorrectTests = () => {

return(
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Correct Tests</title>
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
        "\n        .sidebar {\n            width: 250px;\n        }\n\n        .form-card {\n            background-color: #ffffff;\n            padding: 20px;\n            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n            border-radius: 10px;\n            margin-bottom: 20px;\n            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n        }\n\n        .form-card:hover {\n            transform: translateY(-5px);\n            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);\n        }\n\n        .test-content-list,\n        .test-question-list {\n            list-style-type: none;\n            padding: 0;\n            margin: 0;\n            background-color: #fff;\n            border-radius: 10px;\n            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);\n        }\n\n        .test-content-list li,\n        .test-question-list li {\n            padding: 15px;\n            border-bottom: 1px solid #ddd;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            background-color: #f9f9f9;\n            transition: background-color 0.3s ease, transform 0.2s ease-in-out;\n            border-radius: 8px;\n            cursor: pointer;\n        }\n\n        .test-content-list li:hover,\n        .test-question-list li:hover {\n            background-color: #f1f1f1;\n            transform: translateY(-3px);\n        }\n\n        .test-content-list li.active,\n        .test-question-list li.active {\n            background-color: #e0f7fa;\n            border-color: #00bcd4;\n        }\n\n        .test-content-list li:last-child,\n        .test-question-list li:last-child {\n            border-bottom: none;\n        }\n\n        .form-group label {\n            font-weight: 500;\n            margin-bottom: 5px;\n        }\n\n        .form-group select,\n        .form-group input,\n        .form-group textarea {\n            display: block;\n            width: 100%;\n            border-radius: 8px;\n            font-size: 16px;\n            margin-top: 5px;\n        }\n\n        .form-group select:focus,\n        .form-group input:focus,\n        .form-group textarea:focus {\n            border-color: #007bff;\n            box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);\n        }\n\n        .form-group select {\n            background-color: #f8f9fa;\n        }\n\n        .question-options {\n            margin-bottom: 15px;\n        }\n\n        .form-check {\n            margin-bottom: 10px;\n            display: flex;\n            align-items: center;\n        }\n\n        .form-check-input {\n            margin-right: 10px;\n        }\n\n        .question-specific-form {\n            max-width: 600px;\n            background: #fff;\n            border-radius: 12px;\n        }\n\n        .form-group {\n            margin-bottom: 16px;\n        }\n\n\n\n        .option-container.active {\n            background-color: #e0f7fa;\n            border-color: #00bcd4;\n        }\n\n        .form-control {\n            border: 1px solid #ced4da;\n            border-radius: 8px;\n            font-size: 16px;\n            color: #333;\n            width: 100%;\n            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n            transition: border-color 0.3s, box-shadow 0.3s;\n        }\n\n        .form-control:focus {\n            outline: none;\n            border-color: #00bcd4;\n            box-shadow: 0 0 8px rgba(0, 188, 212, 0.3);\n        }\n\n        .btn-custom {\n            width: 100px;\n            height: 40px;\n            font-size: 18px;\n            border-width: 2px;\n            border-radius: 8px;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n\n        .btn-check:checked+.btn-custom {\n            background-color: #e9ecef;\n            border-color: #007bff;\n        }\n\n        .btn-check {\n            position: absolute;\n            opacity: 0;\n            pointer-events: none;\n        }\n\n        .option-container.selected div {\n            border: solid 2px #00d42a;\n            border-color: #00d42a;\n        }\n    "
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
              <Link to="/ManageTests" className="nav-link ">
                <i className="fas fa-clipboard" /> Manage Tests
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/CorrectTests" className="nav-link active"> 
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
          <Link to="/Loginteacher" className="nav-link">
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
        {/* Left Column */}
        <div className="left-column col-md-6">
          {/* Test Selection */}
          <div className="form-card mb-4">
            <div className="form-group">
              <label htmlFor="testSelect">Select Test</label>
              <select id="testSelect" className="form-control">
                <option value="" disabled="" selected="">
                  Select a test
                </option>
                <option value="test1">Test One</option>
                <option value="test2">Test Two</option>
                <option value="test3">Test Three</option>
              </select>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n                        tr th {\n                            white-space: nowrap;\n                        }\n                    "
            }}
          />
          {/* Student List */}
          <div className="form-card mb-4 w-100 table-responsive">
            <table className="table w-100">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Status</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Awaiting Grade</td>
                  <td>-</td>
                  <td>
                    <button className="btn btn-success w-100 btn-sm">
                      Correct
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>Graded</td>
                  <td>85%</td>
                  <td>
                    <button className="btn btn-info w-100 btn-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td>Michael Johnson</td>
                  <td>Not Attempted</td>
                  <td>-</td>
                  <td>
                    <button
                      className="btn btn-secondary w-100 btn-sm"
                      disabled="yes"
                    >
                      Correct
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Results Submission Form */}
          <div className="form-card mt-4">
            <h5>Publish Exam Results</h5>
            <form id="resultsForm">
              <div className="form-group">
                <label htmlFor="testSelectResults">Select Test</label>
                <select id="testSelectResults" className="form-control">
                  <option value="" disabled="" selected="">
                    Select a test
                  </option>
                  <option value="test1">Test One</option>
                  <option value="test2">Test Two</option>
                  <option value="test3">Test Three</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="statusSelect">Status</label>
                <select id="statusSelect" className="form-control">
                  <option value="grading">Grading</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="averageGrade">Average Grade</label>
                <input
                  type="number"
                  id="averageGrade"
                  className="form-control"
                  min={0}
                  max={100}
                  step={1}
                  placeholder="Enter average grade"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Publish Results
              </button>
            </form>
          </div>
        </div>
        {/* Right Column */}
        <div className="right-column col-md-6">
          {/* Grading Form */}
          <div className="form-card">
            <h5>Correct Student&apos;s Answer</h5>
            <form id="gradeForm">
              <div className="form-group">
                <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  id="studentName"
                  className="form-control"
                  readOnly="yes"
                  defaultValue="John Doe"
                />
              </div>
              {/* Question 1: Multiple Choice */}
              <div className="form-group">
                <label>1. What is the capital of France?</label>
                <div className="form-group">
                  <div className="option-container selected" data-option={1}>
                    <span className="checkmark" />
                    <div className="form-control">option 1</div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="option-container" data-option={2}>
                    <span className="checkmark" />
                    <div className="form-control">option 1</div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="option-container" data-option={3}>
                    <span className="checkmark" />
                    <div className="form-control">option 1</div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="option-container" data-option={4}>
                    <span className="checkmark" />
                    <div className="form-control">option 1</div>
                  </div>
                </div>
              </div>
              {/* Question 2: True/False */}
              <div className="form-group">
                <label>
                  2. Humans can breathe underwater without any equipment.
                </label>
                <div className="btn-group w-100" role="group">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-custom w-50 active"
                    data-answer="true"
                  >
                    ✔ True
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-custom w-50"
                    data-answer="false"
                  >
                    ✖ False
                  </button>
                </div>
              </div>
              {/* Question 3: Short Answer */}
              <div className="form-group">
                <label htmlFor="shortAnswer">
                  11. Describe the process of photosynthesis.
                </label>
                <textarea
                  id="shortAnswer"
                  className="form-control"
                  rows={4}
                  placeholder="Student's answer here..."
                  readOnly="yes"
                  defaultValue={"Lorem ipsum dolor sit amet."}
                />
              </div>
              {/* Question 4: Essay */}
              <div className="form-group">
                <label htmlFor="essayAnswer">
                  12. Explain the impact of climate change on polar bears.
                </label>
                <textarea
                  id="essayAnswer"
                  className="form-control"
                  rows={6}
                  placeholder="Student's essay here..."
                  readOnly="yes"
                  defaultValue={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  }
                />
              </div>
              {/* Feedback and Grade */}
              <div className="form-group">
                <label htmlFor="teacherFeedback">Teacher&apos;s Feedback</label>
                <textarea
                  id="teacherFeedback"
                  className="form-control"
                  rows={3}
                  placeholder="Write feedback here..."
                  defaultValue={""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="studentGrade">Grade</label>
                <input
                  type="number"
                  id="studentGrade"
                  className="form-control"
                  min={0}
                  max={100}
                  step={1}
                  placeholder="Enter grade"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Submit Grade
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

export default CorrectTests