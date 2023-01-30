import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home/Home';
import New from './Pages/New/New';
import List from './Pages/List/List';
import Details from './Pages/Details/Details';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import MainLayout from './Pages/MainLayout/MainLayout';
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react';





function App() {
  const [userData, setUserData] = useState(null)
  function saveUserData() {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  
  }, [])
  
  let logout=()=>{
    localStorage.removeItem('token');
    setUserData(null);
    return <Navigate to='/login' />
  }
  function ProtectedRoute(props) {
    if (localStorage.getItem("token")) {
      return props.children
      
    } else {
      return <Navigate to="/login"/>
      
    }
    
  }

  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<ProtectedRoute><Home logout={logout} userData={userData}/></ProtectedRoute>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login saveUserData={saveUserData}/>}/>
          <Route path="new" element={<ProtectedRoute><New logout={logout}/></ProtectedRoute>}/>
          <Route path="list" element={<ProtectedRoute><List logout={logout}/></ProtectedRoute>}/>
          <Route path='home' element={<ProtectedRoute><Home logout={logout} userData={userData}/></ProtectedRoute>}/>
          <Route path="details" element={<ProtectedRoute><Details userData={userData} logout={logout}/></ProtectedRoute>}/>
        </Route>
        <Route path='*' element={<div className='vh-100 w-100 d-flex justify-content-center align-items-center'><h1>NOT FOUND</h1></div>}/>


      </Routes>
      </BrowserRouter>
    </div>
    </>

  );
}

export default App;
