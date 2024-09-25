import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SidebarToggle from '/src/components/jsx/SidebarTogle';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';
import '/src/components/css/admin/Dashboard.css';

const Messages = () => {
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

        fetch("http://localhost:8000/api/courses")
            .then((response) => response.json())
            .then((data) => {
                const coursesList = document.querySelector(".courses-list");
                if (coursesList) {
                    coursesList.innerHTML = "";
                    data.forEach((course) => {
                        const courseItem = `
                            <div class="courses-item" tabindex="0" aria-labelledby="course${course.id}">
                                <div class="radio-container">
                                    <input class="form-check-input" type="radio" name="course" id="course${course.id}" value="${course.id}" aria-label="Select ${course.name}">
                                </div>
                                <div class="courses-item-content">
                                    <h5 class="card-title" id="course${course.id}">${course.name}</h5>
                                    <p class="card-text">Start Date: <span class="courses-item-date">${course.startDate}</span></p>
                                </div>
                            </div>
                        `;
                        coursesList.innerHTML += courseItem;
                    });
                }
            })
            .catch((error) => console.error("Error fetching courses:", error));

        async function sendMessage() {
            const subject = document.getElementById("messageSubject").value;
            const body = document.getElementById("messageBody").value;
            const selectedCourseInput = document.querySelector('input[name="course"]:checked');

            if (!selectedCourseInput) {
                toastr["error"]("Please select a course.", "Error");
                return;
            }

            const selectedCourse = selectedCourseInput.value;
            const messageData = {
                subject: subject,
                body: body,
                courseId: selectedCourse,
            };

            try {
                const response = await fetch("http://localhost:8000/api/courses/send-message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(messageData),
                });

                if (response.ok) {
                    toastr["success"]("Message sent successfully!", "Success");
                    document.getElementById("messageSubject").value = "";
                    document.getElementById("messageBody").value = "";
                } else {
                    toastr["error"]("Failed to send message.", "Error");
                }
            } catch (error) {
                toastr["error"]("Failed to send message.", "Error");
            }
        }

        const sendMessageButton = document.getElementById("send-message");
        if (sendMessageButton) {
            sendMessageButton.addEventListener("click", sendMessage);
        }

        return () => {
            if (sendMessageButton) {
                sendMessageButton.removeEventListener("click", sendMessage);
            }
        };
    }, []);

    return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Messages</title>
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
  <link href="/css/lib/bootstrap.min.css" rel="stylesheet" />
  {/* FontAwesome CSS */}
  <link rel="stylesheet" href="/src/components/css/lib/bootstrap.min.css" />
  {/* Toastr CSS */}
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
        '\n      .dashboard-container {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 20px;\n        /* إضافة مساحة بين العناصر */\n      }\n\n      .courses-list {\n        flex: 1;\n        display: flex;\n        flex-direction: column;\n        gap: 20px;\n        /* إضافة مساحة بين العناصر */\n      }\n\n      .courses-item {\n        display: flex;\n        align-items: center;\n        padding: 15px;\n        border: 1px solid #ddd;\n        border-radius: 8px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        background-color: #fff;\n        position: relative;\n        transition: box-shadow 0.3s, transform 0.3s;\n      }\n\n      .courses-item:hover {\n        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\n        transform: translateY(-2px);\n        /* رفع العنصر قليلاً عند التمرير فوقه */\n      }\n\n      .courses-item-content {\n        padding-left: 15px;\n        flex: 1;\n        /* يجعل العنصر المحتوى يأخذ المساحة المتاحة */\n      }\n\n      .courses-item .card-title {\n        margin: 0;\n        font-size: 1.2rem;\n        /* تحسين حجم النص */\n      }\n\n      .courses-item .card-text {\n        margin: 0;\n        font-size: 0.9rem;\n        /* تحسين حجم النص */\n        color: #666;\n        /* تباين اللون */\n      }\n\n      .radio-container {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        /* تأكيد أن هذا العنصر لا يتقلص */\n      }\n\n      .radio-container input[type="radio"] {\n        cursor: pointer;\n        appearance: none;\n        border: 2px solid #007bff;\n        border-radius: 50%;\n        width: 24px;\n        height: 24px;\n        outline: none;\n        transition: background-color 0.3s, border-color 0.3s;\n        margin-right: 10px;\n        background-color: #fff;\n      }\n\n      .radio-container input[type="radio"]:checked {\n        background-color: #007bff;\n        border-color: #0056b3;\n        background-image: url("/src/components/image/check-solid.svg");\n        background-size: 14px;\n        background-position: center;\n        background-repeat: no-repeat;\n      }\n\n      /* Responsive Design */\n      @media (max-width: 768px) {\n        .dashboard-container {\n          flex-direction: column;\n        }\n\n        .courses-list {\n          margin-right: 0;\n        }\n      }\n\n      .form-container {\n        background-color: #ffffff;\n        /* استخدام خلفية بيضاء للنموذج */\n        padding: 20px;\n        border-radius: 8px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        min-height: 300px;\n        /* زيادة ارتفاع النموذج قليلاً */\n        border: 1px solid #ddd;\n        max-width: 100%;\n        /* التأكد من ملاءمة النموذج لشاشة العرض */\n        /* إضافة مسافة من الأعلى */\n      }\n\n      .form-container h3 {\n        margin-bottom: 20px;\n        font-size: 1.5rem;\n        /* تحسين حجم الخط */\n        color: #333;\n        /* استخدام لون نص واضح */\n      }\n\n      .form-group {\n        margin-bottom: 20px;\n        /* إضافة مسافة بين الحقول */\n      }\n\n      .form-group label {\n        font-weight: 600;\n        color: #333;\n        margin-bottom: 5px;\n        /* إضافة مسافة أسفل التسمية */\n        display: block;\n      }\n\n      .form-control {\n        border: 1px solid #ddd;\n        border-radius: 4px;\n        padding: 10px;\n        font-size: 1rem;\n        /* تحسين حجم النص داخل الحقول */\n        box-sizing: border-box;\n        width: 100%;\n      }\n\n      .form-control:focus {\n        border-color: #007bff;\n        /* تغيير لون الحدود عند التركيز */\n        box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);\n        /* تحسين التأثير عند التركيز */\n      }\n\n      .btn-primary {\n        background-color: #007bff;\n        border: none;\n        color: #fff;\n        padding: 10px 20px;\n        font-size: 1rem;\n        border-radius: 4px;\n        cursor: pointer;\n        transition: background-color 0.3s, box-shadow 0.3s;\n        display: block;\n        width: 100%;\n        text-align: center;\n      }\n\n      .btn-primary:hover {\n        background-color: #0056b3;\n        /* تحسين لون الخلفية عند التمرير */\n        box-shadow: 0 4px 8px rgba(230, 229, 229, 0.4);\n        /* تحسين الظل عند التمرير */\n      }\n\n      .btn-primary {\n        border-radius: 5px;\n        background-color: #0056b3;\n        /* لون خلفية داكن أكثر */\n        color: #ffffff;\n        /* لون النص أبيض */\n      }\n\n      .btn-success {\n        background-color: #1e7e34;\n        /* خلفية خضراء */\n        color: #ffffff;\n        /* نص أبيض */\n      }\n\n      .btn-primary:hover {\n        box-shadow: 0 4px 8px rgba(230, 229, 229, 0.4);\n      }\n    '
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
              <Link to="/CorrectTests" className="nav-link"> 
                <i className="fas fa-check-circle" /> Correct Tests
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Messages" className="nav-link active">
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
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <h2 className="donotcross">Send Message</h2>
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
      <div className="dashboard-container">
        {/* Courses List */}
        <div className="courses-list col-md-7">
          {/* Courses Item */}
          <div
            className="courses-item"
            tabIndex={0}
            aria-labelledby="course1"
          ></div>
          <div className="courses-item" tabIndex={0} aria-labelledby="course4">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                name="course"
                id="course4"
                defaultValue="course4"
                aria-label="Select Web Development Bootcamp course"
              />
            </div>
            <div className="courses-item-content">
              <h5 className="card-title" id="course4">
                Web Development Bootcamp
              </h5>
              <p className="card-text">
                Start Date:{" "}
                <span className="courses-item-date">01.02.2023</span>
              </p>
            </div>
          </div>
        </div>
        {/* Send Message Form */}
        <div className="form-container col-md-5">
          <h3>Send Message to Selected Course</h3>
          <form>
            <div className="form-group">
              <label htmlFor="messageSubject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="messageSubject"
                placeholder="Enter message subject"
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="messageBody">Message Body</label>
              <textarea
                className="form-control"
                id="messageBody"
                rows={5}
                placeholder="Enter your message"
                aria-required="true"
                defaultValue={""}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              aria-label="Send Message"
              id="send-message"
            >
              Send Message
            </button>
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

export default Messages