import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
function App() {
  return (
    <div className="App"> 
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
