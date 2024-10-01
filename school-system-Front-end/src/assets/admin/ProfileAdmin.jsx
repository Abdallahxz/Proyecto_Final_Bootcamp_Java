import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SidebarToggle from '/src/components/jsx/SidebarTogle';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import '/src/components/css/lib/bootstrap.min.css';
import '/src/components/css/lib/all.min.css';
import '/src/components/css/admin/Dashboard.css';

const ProfileAdmin = () => {
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

    console.log(localStorage.getItem('token'));

    axios.get('http://localhost:8000/api/auth/profile', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => {
        const user = response.data.user;
        console.log(user);
        document.getElementById('FirstName').value = user.first_name;
        document.getElementById('LastName').value = user.last_name;
        document.getElementById('Age').value = user.age;
        document.getElementById('Email').value = user.email;
      })
      .catch(error => {
        console.error("There was an error fetching the profile!", error);
      });

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const oldPassword = document.getElementById('Password').value;
        const newPassword = document.getElementById('ConfirmPassword').value;
        if (oldPassword === newPassword) {
          toastr["error"]("New password cannot be the same as old password", "Error");
          return;
        }

        const passwordData = {
          oldPassword,
          newPassword
        };

        axios.put('http://localhost:8000/api/auth/profile', passwordData, {
          headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.data.success) {
              toastr["success"](response.data.message, "Success");
              document.getElementById('Password').value = '';
              document.getElementById('ConfirmPassword').value = '';
            } else {
              toastr["error"](response.data.message, "Error");
            }
          })
          .catch(error => {
            console.error("There was an error updating the profile!", error);
            toastr["error"]("There was an error updating the profile!", "Error");
          });
      });
    }

  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Profile</title>
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
      {/* Toastr CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        .profile-container {\n            margin: 20px 0;\n            border-radius: 10px;\n            background-color: #ffffff;\n            /* Updated to improve contrast */\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n            padding: 20px;\n        }\n\n        .profile-picture-card {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            padding: 20px;\n            border-radius: 10px;\n            background-color: #f8f9fa;\n            /* Light background for better contrast */\n        }\n\n        .profile-picture {\n            width: 150px;\n            height: 150px;\n            border-radius: 50%;\n            object-fit: cover;\n            margin-bottom: 20px;\n            border: 5px solid #fff;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n\n\n        .profile-form-card {\n            padding: 20px;\n            border-radius: 10px;\n            background-color: #f8f9fa;\n            /* Light background for better contrast */\n        }\n\n        .profile-form .form-group {\n            margin-bottom: 15px;\n margin-right: 0px;\n        }\n\n        .profile-form label {\n            font-weight: bold;\n            color: #333;\n            /* Ensure label text is visible */\n        }\n\n        .profile-form input {\n            width: 100%;\n            padding: 10px;\n            border: 1px solid #ced4da;\n            border-radius: 5px;\n            transition: border-color 0.3s;\n        }\n\n        .profile-form input:focus {\n            border-color: #80bdff;\n            outline: none;\n        }\n\n        .btn-group {\n            display: flex;\n            justify-content: flex-end;\n            width: 100%;\n        }\n\n        /* استعلام الوسائط للتصميمات ذات الشاشات الصغيرة (أقل من 768 بكسل) */\n        @media (max-width: 768px) {\n            .profile-container {\n                flex-direction: column;\n                align-items: center;\n            }\n\n            .profile-picture-card,\n            .profile-form-card {\n                width: 100%;\n                margin-bottom: 20px;\n            }\n        }\n\n        /* استعلام الوسائط لشاشات أصغر (أقل من 360 بكسل) */\n        @media (max-width: 360px) {\n            .btn {\n                display: flex;\n                justify-content: center;\n                padding: 10px;\n                /* يمكنك تعديل هذا لتناسب حجم الأيقونة */\n            }\n\n            .btn .fas {\n                margin-right: 0;\n                /* إزالة المسافة بين الأيقونة والنص */\n            }\n\n            .btn .btn-text {\n                display: none;\n                /* إخفاء النص */\n            }\n        }\n\n        .btn-primary {\n            border-radius: 5px;\n            background-color: #0056b3;\n            /* لون خلفية داكن أكثر */\n            color: #ffffff;\n            /* لون النص أبيض */\n        }\n\n        .btn-success {\n            background-color: #1e7e34;\n            /* خلفية خضراء */\n            color: #ffffff;\n            /* نص أبيض */\n        }\n\n\n        .btn-primary:hover {\n            box-shadow: 0 4px 8px rgba(230, 229, 229, 0.4);\n        }\n    "
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
                    <Link to="/Dashboard" className="nav-link">
                      <i className="fas fa-home" /> Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/ProfileAdmin" className="nav-link active">
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
                <Link to="/" className="nav-link">
                  <i className="fas fa-sign-out-alt" /> Logout
                </Link>
              </div>
            </div>
          </nav>
          {/* Main Content */}
          <main className="main-content flex-grow-1 p-4">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <h2 className="donotcross">Profile</h2>
              {/* Sidebar Toggle Button */}
              <button
                id="sidebarToggleDesktop"
                className="btn btn-light btn-sm sidebar-toggle-btn"
                aria-label="Toggle sidebar"
              >
                <i className="fas fa-bars" />
              </button>
            </div>
            <div className="profile-container row justify-content-around">
              {/* Picture Card */}
              <div className="profile-picture-card col-md-3">
                <img
                  src="/src/components/image/user.png"
                  alt="Profile Picture"
                  className="profile-picture"
                />
                <button
                  className="btn change-picture-btn btn-block btn-primary"
                  aria-label="Change Profile Picture"
                >
                  <i className="fas fa-camera" />{" "}
                  <span className="btn-text">Change Picture</span>
                </button>
                <button
                  className="btn save-picture-btn btn-block btn-success"
                  aria-label="Save Profile Picture"
                >
                  <i className="fas fa-save" />{" "}
                  <span className="btn-text">Save Picture</span>
                </button>
              </div>

              {/* Form Card */}
              <div className="profile-form-card col-md-8">
                <form id='profileForm' className="profile-form">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="FirstName">First Name</label>
                      <input
                        type="text"
                        id="FirstName"
                        className="form-control"
                        placeholder="First Name"
                        aria-required="true"
                        disabled
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="LastName">Last Name</label>
                      <input
                        type="text"
                        id="LastName"
                        className="form-control"
                        placeholder="Last Name"
                        aria-required="true"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="Age">Age</label>
                      <input
                        type="number"
                        id="Age"
                        className="form-control"
                        placeholder="Age"
                        aria-required="true"
                        disabled
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="Email">Email Address</label>
                      <input
                        type="email"
                        id="Email"
                        className="form-control"
                        placeholder="Email Address"
                        aria-required="true"
                        disabled 
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="Password">Password</label>
                      <input
                        type="password"
                        id="Password"
                        className="form-control"
                        placeholder="Password"
                        aria-required="true"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="ConfirmPassword">New Password</label>
                      <input
                        type="password"
                        id="ConfirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="btn-group">
                    <button type="submit" className="btn btn-warning btn-block">
                      <i className="fas fa-save" /> Save Changes
                    </button>
                  </div>
                </form>
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
  )
}

export default ProfileAdmin