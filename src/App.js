import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Favoris from './pages/Favoris.js';




function App() {
  return (
    // <div className="App">
      
        <Routes>
          <Route  index element={<Home />} />
          <Route path="/favoris" element={<Favoris />} />
        </Routes >
      

    // </div>
  );
}

export default App;
