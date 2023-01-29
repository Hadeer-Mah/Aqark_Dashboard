import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import New from './Pages/New/New';
import List from './Pages/List/List';


function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new" element={<New/>}/>
        <Route path="/list" element={<List/>}/>

      </Routes>
      </BrowserRouter>
    </div>
    </>

  );
}

export default App;
