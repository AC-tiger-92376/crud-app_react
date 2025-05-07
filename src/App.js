
import { Route, Routes } from 'react-router-dom';
import AddStudentPage from './Pages/AddStudentPage';
import ResultPage from './Pages/ResultPage';
import AboutPage from './Pages/AboutPage';
import WelcomePage from './Pages/WelcomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<WelcomePage/>}></Route>
        <Route path='addPage' element={<AddStudentPage/>}></Route>
        <Route path='resultPage' element={<ResultPage/>}></Route> 
        <Route path='aboutMe' element={<AboutPage/>}></Route>
      </Routes>
    </>  
  );
}

export default App;
