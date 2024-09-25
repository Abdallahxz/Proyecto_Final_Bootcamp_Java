import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SidebarToggle from '/src/components/jsx/SidebarTogle';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';
import '/src/components/css/admin/Dashboard.css';

const Dashboard = () => {
  const userCountRef = useRef(null);
  const examsCountRef = useRef(null);
  const courseCountRef = useRef(null);
  const courseLessonRef = useRef(null);

  useEffect(() => {
    function animateCounter(element, start, end, duration) {
      let startTime = null;

      function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.current.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.current.textContent = end.toLocaleString();
        }
      }

      requestAnimationFrame(updateCounter);
    }

    animateCounter(userCountRef, 0, 1245, 2000);
    animateCounter(examsCountRef, 0, 25, 2000);
    animateCounter(courseCountRef, 0, 15, 2000);
    animateCounter(courseLessonRef, 0, 100, 2000);
  }, []);



  return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard</title>
  {/* تفعيل متصفح Edge لتحسين الأداء */}
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  {/*meta Description*/}
  <meta name="description" content="Admin Dashboard" />
  {/* meta keyword */}
  <meta name="keywords" content="Admin Dashboard" />
  {/* meta author */}
  <meta name="author" content="Admin Dashboard" />
  {/* Page icon */}
  <link rel="icon" type="image/png" href="/src/components/image/icon.png" />
  {/* Bootstrap CSS */}
  <link href="/src/components/css/lib/bootstrap.min.css" rel="stylesheet" />
  {/* FontAwesome CSS */}
  <link rel="stylesheet" href="/src/components/css/lib/all.min.css" />
  {/* Custom CSS */}
  <link href="/src/components/css/admin/Dashboard.css" rel="stylesheet" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    .sidebar {\n      width: 250px;\n    }\n\n    .ag-courses_item {\n      margin-bottom: 20px;\n      padding: 15px;\n      border: 1px solid #ddd;\n      border-radius: 5px;\n      background-color: #fff;\n      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n    }\n\n    .ag-courses-item_title {\n      font-weight: bold;\n    }\n\n    .progress-bar {\n      height: 1.5rem;\n    }\n\n    /* Ensure sufficient contrast */\n    .btn-primary {\n      background-color: #007bff;\n      border: none;\n      color: #fff;\n      /* Ensure text color is accessible */\n    }\n\n    .progress-bar.bg-success {\n      background-color: #28a745;\n    }\n\n    .progress-bar.bg-warning {\n      background-color: #ffc107;\n    }\n\n    .progress-bar.bg-danger {\n      background-color: #dc3545;\n    }\n\n    .picture-card {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      padding: 10px;\n      border-radius: 10px;\n      background-color: #ffffff;\n      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n      width: 100%;\n      max-width: 290px;\n    }\n\n    .picture {\n      width: 150px;\n      height: 150px;\n      border-radius: 50%;\n      object-fit: cover;\n      margin-bottom: 20px;\n      border: 5px solid #ffffff;\n      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n    }\n\n    .total-data-container-card {\n\n      display: flex;\n      justify-content: space-around;\n      align-items: stretch;\n      flex-wrap: wrap;\n      gap: 3px;\n      text-align: center;\n\n    }\n\n    .btn-primary {\n      border-radius: 5px;\n      background-color: #0056b3;\n      /* لون خلفية داكن أكثر */\n      color: #ffffff;\n      /* لون النص أبيض */\n    }\n\n    .btn-success {\n      background-color: #1e7e34;\n      /* خلفية خضراء */\n      color: #ffffff;\n      /* نص أبيض */\n    }\n\n\n    .btn-primary:hover {\n      box-shadow: 0 4px 8px rgba(230, 229, 229, 0.4);\n    }\n\n    .count-container {\n      margin-top: 15px;\n    }\n\n    .data-count {\n      font-size: 2rem;\n      font-weight: bold;\n      color: #007bff;\n      /* Blue color for the counter */\n    }\n\n    .count-label {\n      font-size: 1rem;\n      color: #333;\n    }\n  "
    }}
  />
  <div className="dashboard-container">
	<div className="d-flex" style={{ width: "100%", height: "100%" }}>
		{/* Sidebar */}
		<nav id="sidebar" className="sidebar bg-dark text-light">
      <div className="d-flex flex-column h-100">
        <div className="p-3 flex-grow-1">
          <h4 className="text-center">Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/Dashboard"className="nav-link active">
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
          <Link to="/Loginteacher" className="nav-link">
            <i className="fas fa-sign-out-alt" /> Logout
          </Link>
        </div>
      </div>
    </nav>
		{/* Main Content */}
		<main className="main-content flex-grow-1 p-4">
		{/* Header */}
		<div
			style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center"
			}}
		>
			<h2 className="donotcross">Dashboard</h2>
			{/* Sidebar Toggle Button */}
			<button
			id="sidebarToggleDesktop"
			className="btn btn-light btn-sm sidebar-toggle-btn"
			aria-label="Toggle sidebar"
			>
			<i className="fas fa-bars" />
			</button>
		</div>
		<div className="total-data-container-card">
			<div className="users-picture-card picture-card ">
			<img
				src="/src/components/image/user.png"
				alt="users Picture"
				className="users-picture picture"
			/>
			<div className="user-count-container count-container">
				<div id="userCount" ref={userCountRef} className="user-count data-count">
				0
				</div>
				<div className="user-count-label count-label">Registered Users</div>
			</div>
			</div>
			<div className="course-picture-card picture-card">
			<img
				src="/src/components/image/course.png"
				alt="course Picture"
				className="course-picture picture"
			/>
			<div className="course-count-container count-container">
				<div id="courseCount" ref={courseCountRef} className="course-count data-count">
				0
				</div>
				<div className="course-count-label count-label">Total Courses</div>
			</div>
			</div>
			<div className="lesson-picture-card picture-card">
			<img
				src="/src/components/image/lesson.png"
				alt="lesson Picture"
				className="lesson-picture picture"
			/>
			<div className="lesson-count-container count-container">
				<div id="courseLesson" ref={courseLessonRef} className="lesson-count data-count">
				0
				</div>
				<div className="lesson-count-label count-label">Total lesson</div>
			</div>
			</div>
			<div className="exams-picture-card picture-card ">
			<img
				src="/src/components/image/exam.png"
				alt="exams Picture"
				className="exams-picture picture"
			/>
			<div className="teachers-count-container count-container">
				<div id="examsCount" ref={examsCountRef} className="teachers-count data-count">
				0
				</div>
				<div className="teachers-count-label count-label">
				Registered Exams
				</div>
			</div>
			</div>
		</div>
		{/* Courses */}
		<div className="dashboard-container-card">
			<div className="ag-courses_item p-1">
			<a
				href="#"
				style={{ textDecoration: "none" }}
				className="ag-courses-item_link"
			>
				<div className="ag-courses-item_title">
				Advanced Programming in Python
				</div>
				<div className="ag-courses-item_date-box">
				Start: <span className="ag-courses-item_date">10.12.2022</span>
				</div>
			</a>
			<div
				className="btn-group m-2"
				style={{ display: "flex", justifyContent: "flex-end" }}
			>
				<button
				type="button"
				className="btn btn-primary"
				style={{ maxWidth: 100 }}
				aria-label="More information about Advanced Programming in Python"
				>
				More info
				</button>
			</div>
			<div className="progress" aria-label="Course progress">
				<div
				className="progress-bar bg-success"
				role="progressbar"
				style={{ width: "60%" }}
				aria-valuenow={60}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="60% completed"
				/>
			</div>
			</div>
			<div className="ag-courses_item p-1">
			<a
				href="#"
				style={{ textDecoration: "none" }}
				className="ag-courses-item_link"
			>
				<div className="ag-courses-item_title">
				Introduction to Data Science
				</div>
				<div className="ag-courses-item_date-box">
				Start: <span className="ag-courses-item_date">15.01.2023</span>
				</div>
			</a>
			<div
				className="btn-group m-2"
				style={{ display: "flex", justifyContent: "flex-end" }}
			>
				<button
				type="button"
				className="btn btn-primary"
				style={{ maxWidth: 100 }}
				aria-label="More information about Introduction to Data Science"
				>
				More info
				</button>
			</div>
			<div className="progress" aria-label="Course progress">
				<div
				className="progress-bar bg-warning"
				role="progressbar"
				style={{ width: "50%" }}
				aria-valuenow={50}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="50% completed"
				/>
			</div>
			</div>
			<div className="ag-courses_item p-1">
			<a
				href="#"
				style={{ textDecoration: "none" }}
				className="ag-courses-item_link"
			>
				<div className="ag-courses-item_title">
				UI/Web &amp; Graph Design for Teenagers 11-17 Years Old
				</div>
				<div className="ag-courses-item_date-box">
				Start: <span className="ag-courses-item_date">04.11.2022</span>
				</div>
			</a>
			<div
				className="btn-group m-2"
				style={{ display: "flex", justifyContent: "flex-end" }}
			>
				<button
				type="button"
				className="btn btn-primary"
				style={{ maxWidth: 100 }}
				aria-label="More information about UI/Web & Graph Design for Teenagers 11-17 Years Old"
				>
				More info
				</button>
			</div>
			<div className="progress" aria-label="Course progress">
				<div
				className="progress-bar bg-secondary"
				role="progressbar"
				style={{ width: "80%" }}
				aria-valuenow={80}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="80% completed"
				/>
			</div>
			</div>
			<div className="ag-courses_item p-1">
			<a
				href="#"
				style={{ textDecoration: "none" }}
				className="ag-courses-item_link"
			>
				<div className="ag-courses-item_title">
				Web Development Bootcamp
				</div>
				<div className="ag-courses-item_date-box">
				Start: <span className="ag-courses-item_date">01.02.2023</span>
				</div>
			</a>
			<div
				className="btn-group m-2"
				style={{ display: "flex", justifyContent: "flex-end" }}
			>
				<button
				type="button"
				className="btn btn-primary"
				style={{ maxWidth: 100 }}
				aria-label="More information about Web Development Bootcamp"
				>
				More info
				</button>
			</div>
			<div className="progress" aria-label="Course progress">
				<div
				className="progress-bar bg-danger"
				role="progressbar"
				style={{ width: "90%" }}
				aria-valuenow={90}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="90% completed"
				/>
			</div>
			</div>
		</div>
		</main>
	</div>
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

  );
};

export default Dashboard;
