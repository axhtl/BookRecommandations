import { Route, Routes } from 'react-router-dom';
import './styles/index.css';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import SurveyIntroPage from './pages/SurveyIntroPage';
import SearchPage from './pages/SearchPage';
import PersonalPage from './pages/PersonalPage';
import SignUpPage from './pages/SignUpPage';
import BookDetailPage from './pages/BookDetailPage';
import AccessRequiredRoute from './routes/AccessRequiredRoute';
import NoAccessPage from './pages/NoAccessPage';
import AdminPage from './pages/AdminPage';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
          <Routes>
            <Route path='/intro' element={<IntroPage/>}/>
            <Route path='/no-access' element={<NoAccessPage/>}/>
              <Route element={<AdminRoute auth={true}/>}>
                <Route path='/admin' element={<AdminPage/>}/>
              </Route>
              <Route element={<AccessRequiredRoute auth={false}/>}>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/surveyintro' element={<SurveyIntroPage/>}/>
                <Route path='/survey' element={<SurveyPage/>}/>
              </Route>
              <Route element={<AccessRequiredRoute auth={true}/>}>
                <Route path='/home/*' element={<HomePage/>}/>
                <Route path='/home/search' element={<SearchPage/>}/>
                <Route path='/home/personal' element={<PersonalPage/>}/>
                <Route path='/bookDetail' element={<BookDetailPage/>}/>
              </Route>
        </Routes>
      
  );
}

export default App;
