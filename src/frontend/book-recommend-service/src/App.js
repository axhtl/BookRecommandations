import { Route, Routes } from 'react-router-dom';
import './styles/index.css';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';

function App() {
  return (
    <Routes>
      <Route path='/intro' element={<IntroPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/survey' element={<SurveyPage/>}/>
    </Routes>
  );
}

export default App;
