import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SidebarToggle from '/src/components/jsx/SidebarTogle';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import CKEditorComponent from '/src/components/jsx/CKEditorComponent';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';
import '/src/components/css/admin/Dashboard.css';
import '/src/components/css/CKEditorStyles.css'

const ManageCourses = () => {
  let [editorData, setEditorData] = useState('');

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
      hideMethod: "fadeOut",
    };

    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:8000/api/courses');
        const courses = await response.json();
        const coursesList = document.getElementById('courseSelect');
        coursesList.innerHTML = ''; // Clear the list before appending

        if (courses.length === 0) {
          coursesList.innerHTML = '<option value="">No courses found</option>';
        } else {
          coursesList.innerHTML = '<option selected hidden value="">Select a course</option>';
        }

        courses.forEach((course) => {
          let courseItem = `<option value="${course.id}">${course.name}</option>`;
          coursesList.innerHTML += courseItem;
        });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();

    async function viewCourse(id) {
      try {
        const courseId = id;
        let response = await fetch(`http://localhost:8000/api/courses/${courseId}`);
        let course = await response.json();

        let lessons = await fetch(`http://localhost:8000/api/courses/${courseId}/lessons`);
        let lessons_response = await lessons.json();

        document.getElementById("courseTitle").innerHTML = course.name;
        document.getElementById("description").innerHTML = course.description;
        document.getElementById("members").innerHTML = course.students;
        document.getElementById("lessons").innerHTML = course.startDate;

        let lessonItems = lessons_response.map((lesson) => {
          return `
            <li>
              <span>${lesson.title}</span>
              <span>${lesson.date}</span>
              <div>
                <button type="button" data-lesson-id="${lesson.id}" aria-label="Edit lesson show-lesson" class="btn btn-sm btn-primary btn-action">show</button>
              </div>
            </li>
          `;
        }).join('');

        document.getElementById("courseContentList").innerHTML = lessonItems;

        document.querySelectorAll('.btn-action').forEach(button => {
          button.addEventListener('click', async () => {
            const lessonId = button.getAttribute('data-lesson-id');
            console.log(lessonId);
            showLesson(lessonId);
          });
        });
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }

    const handleCourseChange = (event) => {
      const selectedCourseId = event.target.value;
      viewCourse(selectedCourseId);
    }

    const courseSelect = document.getElementById("courseSelect");
    courseSelect?.addEventListener("change", handleCourseChange);

    const handleSubmit = async (event) => {
      event.preventDefault();

      const lessonTitle = document.getElementById("lessonTitle").value;
      const lessonDescription = document.getElementById("lessonDescription").value;
      const lessonDate = document.getElementById("lessonDate").value;
      const courseId = document.getElementById("courseSelect").value;
      const lessonContent = editorData;

      console.log(lessonContent);
      const lessonData = {
        title: lessonTitle,
        description: lessonDescription,
        date: lessonDate,
        content: lessonContent,
      };

      try {
        const response = await fetch(`http://localhost:8000/api/lessons/${courseId}/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lessonData),
        });

        if (!response.ok) {
          throw new Error("internet server error");
        }

        viewCourse(document.getElementById("courseSelect").value);
        toastr["success"]("Lesson added successfully!", "Success");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    document.querySelector(".add-lesson-form form").addEventListener("submit", handleSubmit);

    async function showLesson(lessonId) {
      try {
        const response = await fetch(`http://localhost:8000/api/lessons/${lessonId}`);
        const lesson = await response.json();

        // تفريغ البيانات الحالية
        setEditorData("");

        // ضبط الحقول بنجاح من البيانات القادمة
        document.getElementById("lessonTitle").value = lesson.title;
        document.getElementById("lessonDescription").value = lesson.description;
        document.getElementById("lessonDate").value = lesson.date;
        document.getElementById("update-lesson").setAttribute("data-lesson-id", lesson.id);
        document.getElementById("remove-lesson").setAttribute("data-lesson-id", lesson.id);

        // ضبط محتوى CKEditor
        setEditorData(lesson.content);  // يتم ضبط المحتوى هنا
      } catch (error) {
        console.error("Error:", error);
      }
    }


    const handleUpdateLesson = async (event) => {
      const lessonId = event.target.getAttribute("data-lesson-id");
      const lessonTitle = document.getElementById("lessonTitle").value;
      const lessonDescription = document.getElementById("lessonDescription").value;
      const lessonDate = document.getElementById("lessonDate").value;
      const lessonContent = editorData;
      const courseId = document.getElementById("courseSelect").value;

      const lessonData = {
        title: lessonTitle,
        description: lessonDescription,
        date: lessonDate,
        content: lessonContent,
      };

      console.log(lessonData);
      try {
        const response = await fetch(`http://localhost:8000/api/lessons/${lessonId}/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lessonData),
        });

        if (!response.ok) {
          throw new Error("");
        }

        viewCourse(document.getElementById("courseSelect").value);
        toastr["success"]("Lesson updated successfully!", "Success");
      } catch (error) {
        toastr["error"]("internet server error", error);
      }
    };

    const handleRemoveLesson = async (event) => {
      const lessonId = event.target.getAttribute('data-lesson-id');
      try {
        const response = await fetch(`http://localhost:8000/api/lessons/${lessonId}/delete`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Delete failed');
        }

        toastr.success('Lesson removed successfully!', 'Success');
        viewCourse(document.getElementById("courseSelect").value);
      } catch (error) {
        toastr.error('Error deleting lesson', error.message || error);
      }
    };


    document.getElementById("update-lesson").addEventListener("click", handleUpdateLesson);
    document.getElementById("remove-lesson").addEventListener("click", handleRemoveLesson);

    // Cleanup function to remove event listeners
    return () => {
      courseSelect?.removeEventListener("change", handleCourseChange);
      document.querySelector(".add-lesson-form form").removeEventListener("submit", handleSubmit);
      document.getElementById("update-lesson").removeEventListener("click", handleUpdateLesson);
      document.getElementById("remove-lesson").removeEventListener("click", handleRemoveLesson);
    };

  }, [editorData]);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mange Course</title>
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
      {/* Toastr CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
      />
      {/* Custom CSS */}
      <link href="/src/components/css/admin/Dashboard.css" rel="stylesheet" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n      .sidebar {\n        width: 250px;\n      }\n\n      .course-card {\n        border: none;\n        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n        overflow: hidden;\n        background: linear-gradient(135deg, #6e8efb, #a777e3);\n        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;\n        color: white;\n      }\n\n      .course-card:hover {\n        transform: translateY(-10px);\n        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);\n      }\n\n      .course-card img {\n        width: 100%;\n        height: 200px;\n        object-fit: cover;\n        border-bottom: 4px solid white;\n      }\n\n      .course-card-body {\n        padding: 20px;\n        text-align: center;\n      }\n\n      .course-card h5 {\n        font-size: 1.5rem;\n        font-weight: bold;\n        margin-bottom: 10px;\n        color: #fff;\n        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n      }\n\n      .course-card p {\n        margin-bottom: 0;\n        color: #eaeaea;\n      }\n\n      .course-stats {\n        margin-top: 15px;\n        display: flex;\n        justify-content: space-around;\n        font-size: 0.875rem;\n        color: #ddd;\n      }\n\n      .course-stats i {\n        margin-right: 5px;\n      }\n\n      .btn-primary {\n        border-radius: 5px;\n        background-color: #0056b3;\n        /* لون خلفية داكن أكثر */\n        color: #ffffff;\n        /* لون النص أبيض */\n      }\n\n      .btn-success {\n        background-color: #1e7e34;\n        /* خلفية خضراء */\n        color: #ffffff;\n        /* نص أبيض */\n      }\n\n      .btn-primary:hover {\n        box-shadow: 0 4px 8px rgba(230, 229, 229, 0.4);\n      }\n\n      .course-content-list {\n        list-style-type: none;\n        padding: 0;\n        margin: 0;\n        background-color: #fff;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n      }\n\n      .course-content-list li {\n        padding: 10px;\n        border-bottom: 1px solid #ddd;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        background-color: #f9f9f9;\n        transition: background-color 0.3s ease;\n      }\n\n      .course-content-list li:hover {\n        background-color: #f1f1f1;\n      }\n\n      .course-content-list li:last-child {\n        border-bottom: none;\n      }\n\n      .add-lesson-form {\n        background-color: #ffffff;\n        padding: 20px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        transition: transform 0.2s ease-in-out;\n      }\n\n      .add-lesson-form:hover {\n        transform: scale(1.02);\n      }\n\n      .form-control {\n        margin-bottom: 15px;\n      }\n\n      .btn-block {\n        width: 100%;\n      }\n\n      .btn-action {\n        margin-right: 10px;\n      }\n\n      .btn-action:last-child {\n        margin-right: 0;\n      }\n    "
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
                  <Link to="/Dashboard" className="nav-link">
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
                  <Link to="/ManageCourses" className="nav-link active">
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
            <h2 className="donotcross">Manage Course</h2>
            {/* Sidebar Toggle Button */}
            <button
              id="sidebarToggleDesktop"
              className="btn btn-light btn-sm sidebar-toggle-btn"
              aria-label="Toggle sidebar"
            >
              <i className="fas fa-bars" />
            </button>
          </div>
          {/* Courses Management */}
          <div className="row">
            {/* Left Section */}
            <div className="col-md-6">
              {/* Course Selection */}
              <div className="form-group">
                <label htmlFor="courseSelect">Select a Course</label>
                <select id="courseSelect" className="form-control" />
              </div>
              {/* Course Card */}
              <div className="course-card mb-3">
                <img src="/src/components/image/courses/course_1.webp" alt="Course Image" />
                <div className="course-card-body">
                  <h3 id="courseTitle">Course Title</h3>
                  <p id="description">Some brief description of the course.</p>
                  <div className="course-stats">
                    <div>
                      <i className="fas fa-user-friends" />
                      <span id="members">50 Members </span>
                    </div>
                    <div>
                      <i className="fas fa-book" />
                      <span id="lessons">Lesson Date</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Course Content Index */}
              <h4>Content Index</h4>
              <ul id="courseContentList" className="course-content-list">
                {/* Add more list items as needed */}
              </ul>
            </div>
            {/* Right Section */}
            <div className="col-md-6">
              {/* Add Lesson Form */}
              <div className="add-lesson-form">
                <h5>Add New Lesson</h5>
                <form>
                  <div className="form-group">
                    <label htmlFor="lessonTitle">Lesson Title</label>
                    <input
                      type="text"
                      id="lessonTitle"
                      className="form-control"
                      placeholder="Enter lesson title"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lessonDescription">Lesson Description</label>
                    <textarea
                      id="lessonDescription"
                      className="form-control"
                      rows={4}
                      placeholder="Enter lesson description"
                      required=""
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lessonDate">Lesson Date</label>
                    <input
                      type="date"
                      id="lessonDate"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <p>Lesson Content</p>
                  <CKEditorComponent
                    data={editorData}
                    className="App"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log("Editor content:", data);
                      setEditorData(data);
                    }}
                  />


                  <button type="submit" className="btn btn-success btn-block">
                    Add Lesson
                  </button>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      type="button"
                      className="btn btn-danger btn-block btn-action mr-1"
                      aria-label="Remove course"
                      id="remove-lesson"
                    >
                      Remove Lesson
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning btn-block m-0"
                      aria-label="Update course"
                      id="update-lesson"
                    >
                      Update Lesson
                    </button>
                  </div>
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
        <script src="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"></script>
      </Helmet>
      <SidebarToggle />
    </>
  )
}

export default ManageCourses