import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
function App() {
  return (
    <div className="App"> 
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={ <HomePage />} />
      </Routes>
      
    </div>
  );
}

export default App;
