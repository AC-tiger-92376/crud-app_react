
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ResultPage from './Pages/ResultPage';
import AboutPage from './Pages/AboutPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='resultPage' element={<ResultPage/>}></Route> 
        <Route path='aboutMe' element={<AboutPage/>}></Route>
      </Routes>
    </>  
  );
}

export default App;
