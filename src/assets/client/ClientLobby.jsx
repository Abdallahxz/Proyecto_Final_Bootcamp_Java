import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';
import '/src/components/css/admin/Dashboard.css';

function ClientLobby (){
	const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);

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

    const getCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses');
        const courses = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        setCourses(courses);
      } catch (error) {
        toastr["error"]("Failed to fetch courses", "Error");
      }
    };

    const getMessages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses/messages');
        const messages = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        setMessages(messages);
      } catch (error) {
        toastr["error"]("Failed to fetch messages", "Error");
      }
    };

    getCourses();
    getMessages();
  }, []);

return (

    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Home Page</title>
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="description" content="Admin Dashboard" />
  <meta name="keywords" content="Admin Dashboard" />
  <meta name="author" content="Admin Dashboard" />
  <link rel="icon" type="image/png" href="/image/icon.png" />
  <link href="/css/lib/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="/css/lib/all.min.css" />
  <link href="/css/dashboard.css" rel="stylesheet" />
  {/* Toastr CSS */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n      /* تحسين شكل الإشعارات */\n      .notification-icon {\n        font-size: 1.5rem;\n        margin-right: 10px;\n      }\n      .list-group-item {\n        display: flex;\n        align-items: center;\n        border: 0;\n        border-bottom: 1px solid #ddd;\n        transition: background-color 0.3s ease;\n      }\n      .list-group-item:hover {\n        background-color: #f8f9fa;\n      }\n      .notification-title {\n        font-size: 1.1rem;\n        font-weight: bold;\n        color: #343a40;\n      }\n      .notification-time {\n        font-size: 0.9rem;\n        color: #6c757d;\n      }\n      .notification-text {\n        font-size: 1rem;\n        color: #495057;\n        margin-top: 5px;\n      }\n      .list-group-item .fa {\n        color: #007bff; /* لون الأيقونات */\n      }\n      /* تحسين شكل بطاقة الدورة */\n      .ag-courses_item {\n        background-color: #ffffff;\n        border-radius: 10px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        margin-bottom: 20px;\n        overflow: hidden;\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n      }\n      .ag-courses_item:hover {\n        transform: translateY(-5px);\n        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);\n      }\n      .ag-courses-item_image {\n        width: 100%;\n        height: 200px; /* يمكنك تعديل الارتفاع حسب الحاجة */\n        object-fit: cover;\n      }\n      .ag-courses-item_content {\n        padding: 15px;\n      }\n      .ag-courses-item_title {\n        font-size: 1.2rem;\n        font-weight: bold;\n        color: #343a40;\n        margin-bottom: 10px;\n      }\n      .ag-courses-item_date-box {\n        font-size: 1rem;\n        color: #6c757d;\n      }\n      .progress-bar {\n        height: 6px;\n      }\n\n      /* تحسين شكل الأيقونات في الدورات التدريبية */\n      .course-icon {\n        font-size: 2rem; /* حجم الأيقونة */\n        color: #007bff; /* لون الأيقونة */\n        position: absolute;\n        width: 45px;\n        height: 40px;\n        z-index: 1; /* اجعل الأيقونة تظهر فوق المحتوى */\n        background-color: #ffffff;\n        padding: 3px 2.5px; ;\n        border-radius: 0 0 10px 0;\n      }\n\n      /* تحسين شكل الأيقونات في الامتحانات */\n      .exam-icon {\n        font-size: 2rem; /* حجم الأيقونة */\n        color: #dc3545; /* لون الأيقونة للامتحانات */\n        position: absolute;\n        width: 45px;\n        height: 40px;\n        z-index: 1; /* اجعل الأيقونة تظهر فوق المحتوى */\n        background-color: #ffffff;\n        padding: 3px 2.5px; ;\n        border-radius: 0 0 10px 0;\n      }\n\n      /* ضبط مكان الأيقونة داخل بطاقة الدورة أو الامتحان */\n      .ag-courses_item {\n        position: relative; /* اجعل العنصر بالنسبة للأيقونة */\n      }\n    "
    }}
  />
  {/* Navbar */}
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">
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
        <li className="nav-item active">
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
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>
  {/* Main Content */}
  <div className="container-fluid mt-4">
    <div className="row">
      {/* Left Section: Courses */}
      <div className="col-md-8">
        <div className="dashboard-container-card">
          { courses.length > 0 ? 
            courses.map(course => (
              <div className="ag-courses_item" key={course.id}>
                <i className="fas fa-laptop-code course-icon"></i>
                <img
                  src="/src/components/image/courses/course_1.webp"
                  alt={course.name}
                  className="ag-courses-item_image"
                />
                <div className="ag-courses-item_content">
                  <div className="ag-courses-item_title">{course.name}</div>
                  <div className="ag-courses-item_date-box">
                    Start: <span className="ag-courses-item_date">{course.startDate}</span>
                  </div>
                  <div className="btn-group my-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ maxWidth: '100px' }}
                      onClick={() => window.location.href = `/client/course.html?id=${course.id}`}
                      aria-label={`More information about ${course.name}`}
                    >
                      More info
                    </button>
                  </div>
                </div>
              </div>
            ))
            : <p>No courses yet!</p>
          }
        </div>
      </div>
      {/* Right Section: Sidebar for Notifications */}
      <div className="col-md-4">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <i className="fas fa-bell" /> Latest Notifications
          </div>
          <ul className="list-group list-group-flush">
            {/* Notification 1 */}
            <li className="list-group-item">
              <i className="fas fa-tools notification-icon" />
              <div>
                <div className="notification-title">System Update</div>
                <small className="notification-time">
                  12 Aug 2024, 10:00 AM
                </small>
                <p className="notification-text">
                  The system will undergo maintenance on 15th Aug. Expect
                  downtime.
                </p>
              </div>
            </li>
            {/* Notification 2 */}
            <li className="list-group-item">
              <i className="fas fa-book-open notification-icon" />
              <div>
                <div className="notification-title">New Course Available</div>
                <small className="notification-time">
                  10 Aug 2024, 03:30 PM
                </small>
                <p className="notification-text">
                    Introduction to AI course is now available.
                </p>
              </div>
            </li>
            {/* Add more notifications as needed */}
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div id="courses">
        
      </div>
      <ul id="notifications" className="list-group">
        {messages.map(message => (
          <li className="list-group-item" key={message.id}>
            <i className="fas notification-icon"></i>
            <div>
              <div className="notification-title">{message.subject}</div>
              <small className="notification-time">{message.date}</small>
              <p className="notification-text">{message.body}</p>
            </div>
          </li>
        ))}
      </ul>
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

export default ClientLobby