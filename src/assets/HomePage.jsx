import React from 'react';
import { Helmet } from 'react-helmet';

function HomePage (){

return (

<>


  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HWAI Technology</title>
  <meta name="description" content="Online Courses" />
  <meta name="keywords" content="Online Courses" />
  <meta name="author" content="Online Courses" />
  <link rel="icon" type="image/png" href="/image/icon.png" />
  {/* Bootstrap CSS */}
  <link
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    rel="stylesheet"
  />
  {/* FontAwesome CSS */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    crossOrigin="anonymous"
  />


  {/* Navbar */}
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#home" aria-label="Go to Home">
      <img
        src="/src/components/image/7.png"
        width="100%"
        height={35}
        alt="Online Courses Logo"
      />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#home">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#services">
            {" "}
            Services
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#courses">
            {" "}
            Courses
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#meetus">
            {" "}
            Meet Us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#contact">
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  </nav>

     {/* <!-- Header Section --> */}
     <header id="home" className="jumbotron text-center bg-primary-custom text-white" style={{paddingBottom: "100px"}}>
      <div className="container">
        <h1 className="display-4">Closing gaps, transforming lives.</h1>
          <p className="lead">
          Start now and enhance your skills in any field you desire.
          </p>
                    
        <a href="/loginteacher" className="btn btn-custom btn-lg btn-spacing">I'm a teacher</a>
	
		<a href="/loginstudent" className="btn btn-custom btn-lg">I'm a student</a>
      </div>
  
    </header>
  {/* SVG Wave for Top */}
  <img
    src="/src/components/image/mobile-top-slider.png"
    className="w-100"
    style={{ height: 100, marginTop: "-90px" }}
    alt=""
  />
  {/* About Us Section */}
  <section id="about" className="container my-5">
    <h2 className="text-center text-primary-custom mb-4">About Us</h2>
    <p className="text-center">
      We are an educational platform that offers a wide variety of online
      courses in different fields. Our goal is to empower individuals to develop
      their skills and access new opportunities through remote learning.
    </p>
  </section>
  {/* Our Services Section */}
  <section id="services" className="bg-light py-5">
    <div className="container">
      <h2 className="text-center text-primary-custom mb-4">Services</h2>
      <div className="row">
        <div className="col-md-4 text-center">
          <i className="fas fa-laptop-code fa-3x text-primary-custom mb-3" />
          <h2>Programming Courses</h2>
          <p>We offer advanced courses in various programming languages.</p>
        </div>
        <div className="col-md-4 text-center">
          <i className="fas fa-chart-line fa-3x text-primary-custom mb-3" />
          <h2>Data Analysis</h2>
          <p>Learn how to analyze data and extract valuable insights.</p>
        </div>
        <div className="col-md-4 text-center">
          <i className="fas fa-brain fa-3x text-primary-custom mb-3" />
          <h2>Artificial Intelligence</h2>
          <p>Explore AI techniques and how to apply them in projects.</p>
        </div>
      </div>
    </div>
  </section>
  {/* Our Courses Section */}
  <section id="courses" className="container my-5">
    <h2 className="text-center text-primary-custom mb-4">Courses</h2>
    <div className="row">
      <div className="col-md-4 ag-courses_item">
        <div className="card">
          <img src="/src/components/image/python.png" className="card-img-top" alt="Foto Curso Web" />
          <div className="card-body">
            <h3 className="card-title">Python for everybody</h3>
            <p className="card-text">
			A beginner-friendly course teaching the fundamentals of programming with Python, including data analysis and working with databases.
            </p>
            <div className="text-center d-flex justify-content-end">
              <a href="#" className="btn btn-custom">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 ag-courses_item">
        <div className="card">
            <img src="/src/components/image/MSL-Reactive-Maintenance.webp" className="card-img-top" alt="Foto Analisis de datos" />
          <div className="card-body">
            <h3 className="card-title">Full Stack with React</h3>
            <p className="card-text">
			A comprehensive course on full-stack web development using React, focusing on building dynamic web apps and integrating front-end with back-end technologies like Node.js and MongoDB.
            </p>
            <div className="text-center d-flex justify-content-end">
              <a href="#" className="btn btn-custom">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 ag-courses_item">
        <div className="card ">
        <img src="/src/components/image/java.jpeg" className="card-img-top" alt="Foto Curso IA " />
          <div className="card-body">
            <h3 className="card-title">Java Programming</h3>
            <p className="card-text">
			This course covers the basics of Java programming with a focus on object-oriented programming principles, problem-solving, and application development.
            </p>
            <div className="text-center d-flex justify-content-end">
              <a href="#" className="btn btn-custom">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Who We Are Section */}
  <section id="meetus" className="py-5">
    <div className="container text-center">
      <h2 className="mb-4 text-primary-custom">Meet Us</h2>
      <p>
        We are a team of Junior programmers and this is our project, a platform
        where you can learn programming in a dynamic way.
      </p>
      <div className="row">
        <div className="col-md-4 ag-courses_item">
          <div className="card">
            <img src="/src/components/image/dani2.jpg" className="card-img-top" alt=" FotoDani" style={{ width: '100%', height: 'auto' }}/>
            <div className="card-body">
              <p className="card-title">Daniel Robledo Sánchez</p>
              <p className="card-text">"Programming is the art of bringing ideas to life."</p>
              <div className="centered-div">
                <a href="https://www.linkedin.com/in/drobsan/" className="btn btn-custom btn-spacing"><i className="fa-brands fa-linkedin" /> </a>
				<a href="https://github.com/DaniRob035" className="btn btn-custom"><i className="fa-brands fa-github" /> </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 ag-courses_item">
          <div className="card">
            <img src="/src/components/image/sufi2.jpg" className="card-img-top" alt="Foto Sufian" />
            <div className="card-body">
              <p className="card-title">Sufián Zaghdad El Amani</p>
              <p className="card-text">"Every line of code is a brushstroke on the digital canvas."</p>
              <div className="centered-div">
				<a href="https://www.linkedin.com/in/sufin99/" className="btn btn-custom btn-spacing"><i className="fa-brands fa-linkedin" /> </a>
				<a href="https://github.com/sufin99" className="btn btn-custom"><i className="fa-brands fa-github" /> </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 ag-courses_item">
          <div className="card">
            <img src="/src/components/image/abdallah2.jpg" className="card-img-top" alt="Foto Abdallah" />              
            <div className="card-body">
              <p className="card-title">Abdallah Asaad Hammoud</p>
              <p className="card-text">"Every problem is an opportunity; let code lead to innovation!"</p>
              <div className="centered-div">
				<a href="https://www.linkedin.com/in/abdallah-asaad-hammoud-ba51a0310/" className="btn btn-custom btn-spacing"><i className="fa-brands fa-linkedin" /> </a>
				<a href="https://github.com/Abdallahxz" className="btn btn-custom"><i className="fa-brands fa-github" /> </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Contact Us Section */}
  <section id="contact" className="bg-light py-5">
    <div className="container">
      <h2 className="text-center text-primary-custom mb-4">Contact Us</h2>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Your Name"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Your Email"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputMessage">Message</label>
          <textarea
            className="form-control"
            id="inputMessage"
            rows={4}
            placeholder="Write your message here"
            defaultValue={""}
          />
        </div>
        <div className="text-center d-flex justify-content-end">
          <button type="submit" className="btn btn-custom">
            Send
          </button>
        </div>
      </form>
    </div>
  </section>
  <style
  dangerouslySetInnerHTML={{
    __html:
      "\n        .navbar {\n            position: fixed;\n            top: 0;\n            width: 100%;\n            z-index: 1030;\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        }\n\n        body {\n            padding-top: 59px;\n        }\n\n        /* Custom Colors */\n        .bg-primary-custom {\n            background-color: #0056b3;\n            /* Custom Blue */\n        }\n\n        .text-primary-custom {\n            color: #0056b3;\n            /* Custom Blue for Text */\n        }\n\n        .btn-custom {\n            background-color: #cc5800;\n            /* Darker Orange for better contrast */\n            color: white;\n        }\n\n        .btn-custom:hover {\n            background-color: #b94e00;\n            /* Darker Orange on Hover */\n        }\n        p.card-title {\n  font-weight: bold;\n}\n\n   .btn-spacing {\n                 margin-right: 15px;\n                  }\n "
  }}
/>
          {/*<!-- Footer -->*/}
      <footer className="bg-dark text-white py-3 text-center">
        <div className="container">
            <p className="mb-0">&copy; 2023 Online Courses. All rights reserved.</p>
        </div>
    </footer>
	<Helmet>
	{/* Bootstrap JS */}
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

	{/* Bootstrap JS and dependencies */}
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

	{/* Toastr JS */}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  </Helmet>
</>

)

}

export default HomePage