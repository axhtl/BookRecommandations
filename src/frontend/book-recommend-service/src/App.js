import { Route, Routes } from 'react-router-dom';
import IntroPage from './IntroPage';

function App() {
  return (
    <Routes>
      <Route path='/intro' element={<IntroPage/>}/>
    </Routes>
  );
}

export default App;
