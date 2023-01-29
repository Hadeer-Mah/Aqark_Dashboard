import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import New from './Pages/New/New';
import List from './Pages/List/List';
import Details from './Pages/Details/Details';
import Register from './Pages/Register/Register';




function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="new" element={<New/>}/>
          <Route path="list" element={<List/>}/>
          <Route path="details" element={<Details/>}/>
        </Route>
        {/* <Route path="/new" element={<New/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/details" element={<Details/>}/> */}


      </Routes>
      </BrowserRouter>
    </div>
    </>

  );
}

export default App;
