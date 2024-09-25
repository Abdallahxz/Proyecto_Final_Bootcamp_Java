import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';

function ClientCourses (){
	const [lessons, setLessons] = useState([]);
	const [currentLessonId, setCurrentLessonId] = useState(null);
	const [currentCourseId, setCurrentCourseId] = useState(null);
  
	useEffect(() => {
	  const url = new URL(window.location.href);
	  const courseId = url.searchParams.get("id");
	  const lessonId = url.searchParams.get("lid");
  
	  if (!courseId) {
		const courseCard = document.getElementById("main-content");
		if (courseCard) {
		  courseCard.classList.add("d-none");
		}
	  } else {
		viewCourse(courseId);
  
		if (lessonId) {
		  showLessonById(lessonId);
		}
	  }
  
	  document.getElementById("next-button").addEventListener("click", handleNextLesson);
	  document.getElementById("prev-button").addEventListener("click", handlePrevLesson);
  
	  return () => {
		document.getElementById("next-button").removeEventListener("click", handleNextLesson);
		document.getElementById("prev-button").removeEventListener("click", handlePrevLesson);
	  };
	}, []);
  
	const viewCourse = async (id) => {
	  try {
		setCurrentCourseId(id);
  
		let response = await fetch(`http://localhost:8000/api/courses/${id}`);
		let course = await response.json();
  
		document.getElementById("course-title").innerHTML = course.name;
		document.getElementById("description").innerHTML = course.description;
		document.getElementById("duration").innerHTML = " Duration: " + course.duration + " Weeks";
		document.getElementById("members").innerHTML = course.students + " Students";
  
		let lessonsResponse = await fetch(`http://localhost:8000/api/courses/${id}/lessons`);
		let lessons_response = await lessonsResponse.json();
  
		let lessonItems = document.getElementById("course-index");
		lessonItems.innerHTML = "";
		setLessons([]); 
  
		lessons_response.forEach((lesson) => {
		  setLessons(prevLessons => [...prevLessons, lesson.id]);
		  let lessonItem = `
			<li>
			  <a class="" data-lesson-id="${lesson.id}" href="#" onClick={(e) => showLesson(e, lesson.id)}>${lesson.title}</a>
			</li>
		  `;
		  lessonItems.innerHTML += lessonItem;
		});
  
		if (lessons_response.length > 0) {
		  setCurrentLessonId(lessons_response[0].id);
		  showLessonById(lessons_response[0].id);
		}
  
	  } catch (error) {
		document.getElementById("main-content").innerHTML = "An error occurred while fetching the course.";
		console.error("Error fetching course:", error);
	  }
	};
  
	const showLessonById = async (lid) => {
	  setCurrentLessonId(lid);
  
	  let newUrl = `http://abdallah.com/client/course.html?id=${currentCourseId}&lid=${lid}`;
	  window.history.pushState(null, '', newUrl);
  
	  try {
		let response = await fetch(`http://localhost:8000/api/lessons/${lid}`);
		if (!response.ok) {
		  throw new Error("Internet server error");
		}
  
		let lesson = await response.json();
  
		document.getElementById("lesson-title").innerHTML = lesson.title;
		document.getElementById("lesson-content").innerHTML = lesson.content;
	  } catch (error) {
		console.error("Error:", error);
	  }
	};
  
	const showLesson = (event, lid) => {
	  event.preventDefault();
	  showLessonById(lid);
	};
  
	const handleNextLesson = (event) => {
	  event.preventDefault();
	  let currentIndex = lessons.indexOf(currentLessonId);
	  if (currentIndex < lessons.length - 1) {
		let nextLessonId = lessons[currentIndex + 1];
		showLessonById(nextLessonId);
	  }
	};
  
	const handlePrevLesson = (event) => {
	  event.preventDefault();
	  let currentIndex = lessons.indexOf(currentLessonId);
	  if (currentIndex > 0) {
		let prevLessonId = lessons[currentIndex - 1];
		showLessonById(prevLessonId);
	  }
	};

    return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accessible Course Content</title>
  <meta name="description" content="Advanced Python Programming Course" />
  <meta name="keywords" content="Python, Programming, Advanced Course" />
  <meta name="author" content="Course Dashboard" />
  <link rel="icon" type="image/png" href="/image/icon.png" />
  <link href="/src/components/css/lib/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="/src/components/css/lib/all.min.css" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n      /* الخلفية العامة */\n      body {\n        background-color: #f3f4f6;\n        color: #3d3d3d;\n        font-size: 1rem;\n        line-height: 1.6;\n      }\n\n      /* تحسين العرض */\n      .container-fluid {\n        padding: 0 20px;\n      }\n\n      /* تصميم القائمة الجانبية */\n      .sidebar-client {\n        background-color: #ffffff;\n        padding: 20px;\n        border-radius: 10px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        position: sticky;\n        height: fit-content;\n      }\n\n      .sidebar-client h4 {\n        font-size: 1.4rem;\n        font-weight: bold;\n        margin-bottom: 20px;\n        color: #00509e;\n      }\n\n      .sidebar-client ul {\n        list-style: none;\n        padding: 0;\n      }\n\n      .sidebar-client ul li {\n        margin-bottom: 10px;\n      }\n\n      .sidebar-client ul li a {\n        color: #00509e;\n        text-decoration: none;\n        font-size: 1.1rem;\n        display: block;\n        padding: 10px;\n        border-radius: 5px;\n        transition: background-color 0.3s ease;\n      }\n\n      .sidebar-client ul li a.active {\n        background-color: #ff6f00;\n        color: #fff;\n      }\n\n      .sidebar-client ul li a:hover {\n        background-color: #ff6f00;\n        color: #fff;\n      }\n\n\n      .sidebar-client ul li a.exam.active {\n        background-color: #c9302c;\n      }\n\n      /* تصميم بطاقة الدورة */\n      .course-card {\n        display: flex;\n        align-items: center;\n        padding: 20px;\n        background-color: #ffffff;\n        border-radius: 10px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        margin-bottom: 20px;\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n      }\n\n      .course-card:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n      }\n\n      .course-card img {\n        width: 120px;\n        border-radius: 10px;\n        margin-right: 20px;\n      }\n\n      .course-card-body h3 {\n        font-size: 1.5rem;\n        margin-bottom: 10px;\n        color: #00509e;\n      }\n\n      .course-card-body p {\n        font-size: 1.1rem;\n        margin-bottom: 0;\n        color: #3d3d3d;\n      }\n\n      .course-stats {\n        display: flex;\n        gap: 20px;\n        margin-top: 10px;\n        font-size: 1rem;\n      }\n\n      .course-stats div {\n        display: flex;\n        align-items: center;\n      }\n\n      .course-stats i {\n        margin-right: 5px;\n        color: #ff6f00;\n      }\n\n      /* محتوى الدرس */\n      .lesson-content {\n        padding: 20px;\n        background-color: #ffffff;\n        border-radius: 10px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        margin-bottom: 20px;\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n      }\n\n      .lesson-content:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n      }\n\n      .lesson-content h4 {\n        font-size: 1.4rem;\n        margin-bottom: 15px;\n        color: #343a40;\n      }\n\n      .lesson-content p {\n        font-size: 1.1rem;\n        line-height: 1.6;\n        margin-bottom: 0;\n      }\n\n      .lesson-content img {\n        max-width: 100%;\n        height: auto;\n        margin: 20px 0;\n        border-radius: 5px;\n      }\n\n      .lesson-content code {\n        display: block;\n        padding: 10px;\n        background-color: #f8f9fa;\n        border: 1px solid #dee2e6;\n        border-radius: 5px;\n        font-size: 1rem;\n        overflow-x: auto;\n        margin: 20px 0;\n      }\n\n      .lesson-content a {\n        color: #007bff;\n        text-decoration: none;\n        transition: color 0.3s ease;\n      }\n\n      .lesson-content a:hover {\n        color: #0056b3;\n      }\n\n      /* أزرار التنقل */\n      .navigation-buttons {\n        display: flex;\n        justify-content: space-between;\n        margin-top: 20px;\n      }\n\n      .navigation-buttons a {\n        text-decoration: none;\n        padding: 10px 20px;\n        border-radius: 5px;\n        font-size: 1.1rem;\n        color: #ffffff;\n        transition: background-color 0.3s ease;\n      }\n\n      .navigation-buttons .previous {\n        background-color: #007bff;\n      }\n\n      .navigation-buttons .next {\n        background-color: #28a745;\n      }\n\n      .navigation-buttons .previous:hover {\n        background-color: #0056b3;\n      }\n\n      .navigation-buttons .next:hover {\n        background-color: #218838;\n      }\n\n      /* Media Queries for Responsiveness */\n      @media (max-width: 1200px) {\n        .course-card {\n          flex-direction: column;\n          align-items: flex-start;\n        }\n\n        .course-card img {\n          margin-bottom: 15px;\n        }\n\n        .course-stats {\n          flex-direction: column;\n          align-items: flex-start;\n          gap: 10px;\n        }\n      }\n\n      @media (max-width: 768px) {\n        /* عند عرض أصغر من 768px */\n        .row {\n          display: flex;\n          flex-direction: column-reverse;\n        }\n\n        .course-card-body h3 {\n          font-size: 1.3rem;\n        }\n\n        .lesson-content h4 {\n          font-size: 1.2rem;\n        }\n\n        body {\n          font-size: 0.9rem;\n        }\n      }\n\n      @media (max-width: 576px) {\n        .navbar-brand img {\n          width: 25px;\n          height: 25px;\n        }\n\n        .form-inline {\n          flex-direction: column;\n        }\n\n        .form-inline input {\n          margin-bottom: 10px;\n        }\n\n        .course-card-body p {\n          font-size: 1rem;\n        }\n\n        .lesson-content p {\n          font-size: 1rem;\n        }\n\n        .container-fluid {\n          padding: 0 10px;\n        }\n      }\n    "
    }}
  />
  {/* Navbar */}
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/">
      <img
        src="/src/components/image/10.png"
        width={30}
        height={30}
        className="d-inline-block align-top"
        alt="Logo"
      />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/ClientLobby" className="nav-link" >
            Home{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ClientExam" className="nav-link" >
            Exam
          </Link>
        </li>
      </ul>
      <form className="form-inline d-flex justify-content-between flex-nowrap my-2 my-lg-0">
        <input
          className="form-control mr-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
  {/* Main Content */}
  <div className="container-fluid mt-4">
    <div className="row justify-content-between">
      {/* Left Section: Sidebar (الفهرس) */}
      <div className="container col-md-3 sidebar-client">
        <h4>Course Index</h4>
        <ul>
          <li>
            <a className="active" href="#">
              Introduction
            </a>
          </li>
          <li>
            <a href="#">Lesson 1: Basics</a>
          </li>
          <li>
            <a href="#">Lesson 2: Advanced Topics</a>
          </li>
          <li>
            <a href="#">Lesson 3: Final Project</a>
          </li>
          {/* قسم الامتحانات */}
          <li>
            <a className="exam active" href="#">
              Exam 1: Basics Review
            </a>
          </li>
          <li>
            <a className="" href="#">
              Exam 2: Advanced Topics
            </a>
          </li>
        </ul>
      </div>
      {/* Right Section: Course Content */}
      <div className="col-md-9">
        {/* Course Card */}
        <div className="course-card mb-3">
          <img src="/src/components/image/courses/course_1.webp" alt="Course Image" />
          <div className="course-card-body">
            <h3>Advanced Programming in Python</h3>
            <p>
              This course provides an in-depth look into advanced Python topics
              such as metaclasses, decorators, and concurrency.
            </p>
            <div className="course-stats">
              <div>
                <i className="fas fa-users" /> 1.2K Students
              </div>
              <div>
                <i className="fas fa-clock" /> Duration: 6 Weeks
              </div>
            </div>
          </div>
        </div>
        {/* Lesson Content */}
        <div className="lesson-content">
          <h4>Lesson 1: Python Basics</h4>
          <p>
            This lesson covers the fundamental aspects of Python programming
            including syntax, variables, and control structures. Let&apos;s delve
            deeper into these concepts:
          </p>
          <img
            src="https://francescricart.com/wp-content/uploads/2018/07/rgb.jpg"
            alt="Python Basics Image"
          />
          <p>
            Python is known for its simple and readable syntax. Here’s an
            example of basic Python syntax:
          </p>
          <code>
            # This is a comment
            <br />
            print(Hello, World!)
            <br />
            x = 5<br />
            y = 10
            <br />
            print(x + y)
          </code>
          <p>
            For more details, you can visit the
            <a
              href="https://docs.python.org/3/tutorial/index.html"
              target="_blank"
            >
              official Python tutorial
            </a>
            .
          </p>
          <p>
            Make sure to check out the following resources to enhance your
            learning:
          </p>
          <ul>
            <li>
              <a href="https://realpython.com/" target="_blank">
                Real Python
              </a>
              - Tutorials and articles on Python programming.
            </li>
            <li>
              <a
                href="https://www.codecademy.com/learn/learn-python-3"
                target="_blank"
              >
                Codecademy
              </a>
              - Interactive Python courses.
            </li>
            <li>
              <a href="https://www.kaggle.com/learn/python" target="_blank">
                Kaggle Learn
              </a>
              - Python courses focused on data science.
            </li>
          </ul>
          <p>
            Don&apos;t forget to practice coding regularly to master Python. Happy
            coding!
          </p>
        </div>
        {/* Navigation Buttons */}
        <div className="navigation-buttons my-3">
          <a href="#" id="prev-button" className="previous">
            Previous
          </a>
          <a href="#" id="next-button" className="next">
            Next
          </a>
        </div>
      </div>
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
</>



    )



}

export default ClientCourses