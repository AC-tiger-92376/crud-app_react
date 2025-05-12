
import { Route, Routes } from 'react-router-dom';
import AddStudentPage from './Pages/AddStudentPage';
import ResultPage from './Pages/ResultPage';
import AboutPage from './Pages/AboutPage';
import WelcomePage from './Pages/WelcomePage';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import './App.css'
import ProtectedRoute from './Components/ProtectedRoute';


function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
        <Route path="addPage" element={<ProtectedRoute><AddStudentPage /></ProtectedRoute>} />
        <Route path="resultPage" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        <Route path="aboutMe" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
      </Routes>
    </>  
  );
}

export default App;
