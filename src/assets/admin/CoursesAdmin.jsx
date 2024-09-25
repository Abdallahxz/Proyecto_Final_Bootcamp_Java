import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SidebarToggle from '/src/components/jsx/SidebarTogle';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import $ from 'jquery';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';
import '/src/components/css/admin/Dashboard.css';

function CoursesAdmin (){
  async function addCourse(event) {
    event.preventDefault();

    const name = document.getElementById('courseTitle').value;
    const description = document.getElementById('description').value;
    const duration = document.getElementById('duration').value;
    const students = document.getElementById('students').value;
    const startDate = document.getElementById('startDate').value;

    const courseData = {
        name: name,
        description: description,
        duration: duration,
        students: students,
        startDate: startDate
    };

    try {
        $.ajax({
            url: "http://localhost:8000/api/courses",
            type: "POST",
            data: JSON.stringify(courseData),
            contentType: "application/json",
            success: function(response) {
                toastr["success"]("Course added successfully!", "Success");
                fetchCourses(); // Refresh the courses list
                document.getElementById('courseTitle').value = "";
                document.getElementById('description').value = "";
                document.getElementById('duration').value = "";
                document.getElementById('students').value = "";
                document.getElementById('startDate').value = "";
                document.getElementById('remove-course').setAttribute('data-course-id', null);
                document.getElementById('update-course').setAttribute('data-course-id', null);
            },
            error: function(xhr, status, error) {
                toastr["error"]("Course not added!", "Error");
            }
        });
    } catch (error) {
        toastr["error"]("Course not added!", "Error");
    }
}

async function viewCourse(id) {
  try {
      let response = await fetch(`http://localhost:8000/api/courses/${id}`);
      let course = await response.json();

      document.getElementById('courseTitle').value = course.name;
      document.getElementById('description').value = course.description;
      document.getElementById('duration').value = course.duration;
      document.getElementById('students').value = course.students;
      document.getElementById('startDate').value = course.startDate;
      document.getElementById('remove-course').setAttribute('data-course-id', course.id);
      document.getElementById('update-course').setAttribute('data-course-id', course.id);
  } catch (error) {
      console.error("Error fetching course:", error);
  }
}

async function removeCourse() {
  const courseId = document.getElementById('remove-course').getAttribute('data-course-id');
  try {
      $.ajax({
          url: `http://localhost:8000/api/courses/${courseId}`,
          type: "DELETE",
          success: function(response) {
              toastr["success"]("Course removed successfully!", "Success");
              fetchCourses(); // Refresh the courses list
              document.getElementById('courseTitle').value = '';
              document.getElementById('description').value = '';
              document.getElementById('duration').value = '';
              document.getElementById('students').value = '';
              document.getElementById('startDate').value = '';
              document.getElementById('remove-course').setAttribute('data-course-id', null);
              document.getElementById('update-course').setAttribute('data-course-id', null);
          },
          error: function(xhr, status, error) {
              toastr["error"]("Course not removed!", "Error");
          }
      });
  } catch (error) {
      toastr["error"]("Course not removed!", "Error");
  }
}

async function updateCourse() {
  const courseId = document.getElementById('update-course').getAttribute('data-course-id');
  const name = document.getElementById('courseTitle').value;
  const description = document.getElementById('description').value;
  const duration = document.getElementById('duration').value;
  const students = document.getElementById('students').value;
  const startDate = document.getElementById('startDate').value;

  const courseData = {
      name: name,
      description: description,
      duration: duration,
      students: students,
      startDate: startDate
  };

  try {
      $.ajax({
          url: `http://localhost:8000/api/courses/${courseId}`,
          type: "PUT",
          data: JSON.stringify(courseData),
          contentType: "application/json",
          success: function(response) {
              toastr["success"]("Course updated successfully!", "Success");
              document.getElementById('courseTitle').value = '';
              document.getElementById('description').value = '';
              document.getElementById('duration').value = '';
              document.getElementById('students').value = '';
              document.getElementById('startDate').value = '';
              document.getElementById('remove-course').setAttribute('data-course-id', null);
              document.getElementById('update-course').setAttribute('data-course-id', null);
              fetchCourses(); // Refresh the courses list
          },
          error: function(xhr, status, error) {
              toastr["error"]("Course not updated!", "Error");
          }
      });
  } catch (error) {
      toastr["error"]("Course not updated!", "Error");
  }
}

	useEffect(() => {
        toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: true,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "2000",
            extendedTimeOut: "500",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        };

        async function fetchCourses() {
            try {
                let response = await fetch("http://localhost:8000/api/courses");
                let courses = await response.json();

                const coursesList = document.querySelector('.courses-list');
                coursesList.innerHTML = ''; // Clear the list before appending

                courses.forEach(course => {
                    let courseItem = `
                        <div class="courses-item">
                            <h5 class="courses-item-title">${course.name}</h5>
                            <p>Duration: ${course.duration} weeks</p>
                            <p>${course.description}</p>
                            <a href="javascript:void(0)" data-course-id="${course.id}" class="btn btn-primary mt-2 view-course">More Info</a>
                        </div>
                    `;
                    coursesList.innerHTML += courseItem;
                });
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }
        fetchCourses()

        //document.addEventListener('DOMContentLoaded', fetchCourses);
        //document.getElementById('add-course').addEventListener('click', addCourse);
        //document.getElementById('remove-course').addEventListener('click', removeCourse);
        //document.getElementById('update-course').addEventListener('click', updateCourse);
    }, []);

return(
<>
<meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Courses</title>
  {/* تفعيل متصفح Edge لتحسين الأداء */}
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  {/*meta Description*/}
  <meta name="description" content="Admin Dashboard" />
  {/* meta keyword */}
  <meta name="keywords" content="Admin Dashboard" />
  {/* meta author */}
  <meta name="author" content="Admin Dashboard" />
  {/* Page icon */}
  <link rel="icon" type="image/png" href="/image/icon.png" />
  {/* Bootstrap CSS */}
  <link href="/src/components/css/lib/bootstrap.min.css" rel="stylesheet" />
  {/* FontAwesome CSS */}
  <link rel="stylesheet" href="/src/components/css/lib/all.min.css" />
  {/* Custom CSS */}
  <link href="/src/components/css/admin/Dashboard.css" rel="stylesheet" />
  {/* Toastr CSS */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n        .courses-list,\n        .form-container {\n            flex: 1;\n        }\n\n        .courses-item {\n            margin-bottom: 20px;\n            padding: 15px;\n            border: 1px solid #ddd;\n            border-radius: 5px;\n            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n            background-color: #fff;\n            transition: box-shadow 0.3s;\n        }\n\n        .courses-item:hover {\n            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n        }\n\n        .form-container {\n            background-color: #f8f9fa;\n            padding: 20px;\n            border-radius: 5px;\n            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n            max-height: fit-content;\n            /* Ensures container height matches content */\n        }\n\n        .form-container h3 {\n            margin-bottom: 20px;\n        }\n\n        .form-group label {\n            font-weight: bold;\n        }\n\n        .btn-primary {\n            border-radius: 5px;\n            background-color: #0056b3;\n            /* لون خلفية داكن أكثر */\n            color: #ffffff;\n            /* لون النص أبيض */\n        }\n\n        .btn-success {\n            background-color: #1e7e34;\n            /* خلفية خضراء */\n            color: #ffffff;\n            /* نص أبيض */\n        }\n\n\n        .btn-primary:hover {\n            box-shadow: 0 4px 8px rgba(230, 229, 229, 0.4);\n        }\n\n        .btn-block {\n            width: 100%;\n        }\n\n        .btn-spacing {\n            margin-right: 10px;\n            /* Space between buttons */\n        }\n\n        .input-group-text {\n            background-color: #e9ecef;\n            border-right: 0;\n     height: 100%\n     }\n\n        .custom-file-input:lang(en)~.custom-file-label::after {\n            content: "Browse";\n        }\n\n        /* Custom styling for file input */\n        .custom-file-input {\n            cursor: pointer;\n        }\n\n        /* Ensure sufficient contrast */\n        .btn-info,\n        .btn-danger,\n        .btn-warning {\n            color: #fff;\n            /* Ensure text color is accessible */\n        }\n    '
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
              <Link to="/CoursesAdmin" className="nav-link active">
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="donotcross">Courses</h2>
        {/* Sidebar Toggle Button */}
        <button
          id="sidebarToggleDesktop"
          className="btn btn-light btn-sm sidebar-toggle-btn"
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars" />
        </button>
      </div>
      {/* Dashboard Container */}
      <div className="dashboard-container row">
        {/* Courses List */}
        <div className="courses-list col-md-6">
          {/* Courses Item */}
          <div className="courses-item">
            <h5 className="courses-item-title">
              Advanced Programming in Python
            </h5>
            <p>
              Start Date: <span className="courses-item-date">10.12.2022</span>
            </p>
            <div className="progress" aria-label="Course progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "60%" }}
                aria-valuenow={60}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="60% completed"
              ></div>
            </div>
            <a href="#" className="btn btn-primary mt-2">
              More Info
            </a>
          </div>
          {/* Repeat for other courses */}
        </div>
        {/* Add Course Form */}
        <div className="form-container col-md-6">
          <h3>Add New Course</h3>
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend ">
                <span className="input-group-text">Upload Image</span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-label="Upload image"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="courseTitle">Course Title</label>
              <input
                type="text"
                className="form-control"
                id="courseTitle"
                placeholder="Enter course title"
                aria-label="Course title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                aria-label="Start date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Estimated Duration (weeks)</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                placeholder="Enter duration in weeks"
                aria-label="Estimated duration"
              />
            </div>
            <div className="form-group">
              <label htmlFor="students">Number of Students</label>
              <input
                type="number"
                className="form-control"
                id="students"
                placeholder="Enter number of students"
                aria-label="Number of students"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Course Description</label>
              <textarea
                className="form-control"
                id="description"
                rows={3}
                placeholder="Enter course description"
                aria-label="Course description"
                defaultValue={""}
              />
            </div>
            <button
              type="button"
              id="add-course"
              className="btn btn-primary btn-block mb-2"
              onClick={addCourse}
            >
              {" "}
              Add Course
            </button>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                type="button"
                className="btn btn-danger btn-block btn-action mr-1"
                aria-label="Remove course"
                id="remove-course"
              >
                {" "}
                Remove Course
              </button>
              <button
                type="button"
                id="update-course"
                className="btn btn-warning btn-block m-0"
                aria-label="Update course"
                onClick={removeCourse}
              >
                Update Course
              </button>
            </div>
          </form>
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

export default CoursesAdmin