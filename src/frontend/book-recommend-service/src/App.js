import { Route, Routes } from 'react-router-dom';
import './styles/index.css';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import SurveyIntroPage from './pages/SurveyIntroPage';
import SearchPage from './pages/SearchPage';
import PersonalPage from './pages/PersonalPage';
import { SearchProvider } from './contexts/SearchContext';
import SignUpPage from './pages/SignUpPage';
import BookDetailPage from './pages/BookDetailPage';
import AccessRequiredRoute from './routes/AccessRequiredRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Routes>
        <Route path='/intro' element={<IntroPage/>}/>
          <Route element={<AccessRequiredRoute auth={false}/>}>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/surveyintro' element={<SurveyIntroPage/>}/>
            <Route path='/survey' element={<SurveyPage/>}/>
          </Route>
          <Route element={<AccessRequiredRoute auth={true}/>}>
            <Route path='/home/*' element={<HomePage/>}/>
            <Route path='/home/search' element={<SearchPage/>}/>
            <Route path='/home/personal' element={<PersonalPage/>}/>
            <Route path='/bookDetail/:id' element={<BookDetailPage/>}/>
          </Route>
          
        </Routes>
      </SearchProvider>
    </AuthProvider>
      
  );
}

export default App;
