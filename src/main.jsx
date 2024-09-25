import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '/src/App.jsx';
import LoginTeacher from '/src/assets/credentials/LoginTeacher.jsx';
import LoginStudent from '/src/assets/credentials/LoginStudent.jsx';
import Register from '/src/assets/credentials/Register.jsx';
import ForgotPassword from '/src/assets/credentials/ForgotPassword.jsx';
import NewPassword from '/src/assets/credentials/NewPassword.jsx';
import HomePage from '/src/assets/HomePage.jsx';
import Dashboard from '/src/assets/admin/Dashboard.jsx';
import ProfileAdmin from '/src/assets/admin/ProfileAdmin.jsx';
import CoursesAdmin from '/src/assets/admin/CoursesAdmin.jsx'
import ManageCourses from '/src/assets/admin/ManageCourses.jsx'
import ManageTests from '/src/assets/admin/ManageTests.jsx'
import CorrectTests from '/src/assets/admin/CorrectTests.jsx'
import Messages from '/src/assets/admin/Messages.jsx'
import ClientLobby from '/src/assets/client/ClientLobby.jsx'
import ClientCourses from '/src/assets/client/ClientCourses.jsx'
import ClientExam from '/src/assets/client/ClientExam.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
		<Route index path="/" element={<HomePage />} />
        <Route path="/app" element={<App />} />
		<Route path="/loginteacher" element={<LoginTeacher />} />
		<Route path="/loginstudent" element={<LoginStudent />} />
		<Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
		<Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profileAdmin" element={<ProfileAdmin />} />
        <Route path="/coursesAdmin" element={<CoursesAdmin />} />
        <Route path="/manageCourses" element={<ManageCourses />} />
        <Route path="/manageTests" element={<ManageTests />} />
        <Route path="/correctTests" element={<CorrectTests />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/clientLobby" element={<ClientLobby />} />
        <Route path="/clientCourses" element={<ClientCourses />} />
        <Route path="/clientExam" element={<ClientExam />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);