import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate , useNavigation} from "react-router-dom";
import Home from './Pages/Home/Home';
import New from './Pages/New/New';
import List from './Pages/List/List';
import Details from './Pages/Details/Details';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import MainLayout from './Pages/MainLayout/MainLayout';

import Edit from './Pages/Edit/Edit';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import PasByEmail from './Pages/PasByEmail/PasByEmail';
import NewPassword from './Pages/NewPassword/NewPassword';





function App() {
  
  function ProtectedRoute(props) {
    if (localStorage.getItem("accesstoken")) {
      return props.children
      
    } else {
      return <Navigate to="/login"/>
      
    }
    
  }
  function ProtectedLogin(props) {
    if (!localStorage.getItem("accesstoken")) {
      return props.children
      
    } else {
      return <Navigate to="/home"/>
      
    }
    
  }

  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<ProtectedLogin><Login /></ProtectedLogin>}/>
          <Route path="register" element={<Register />}/>
          <Route path="request" element={<PasByEmail />}/>
          <Route path="api/users/reset-password/:pasToken" element={<NewPassword />}/>


          <Route path="change" element={<ForgotPassword />}/>
          <Route path="new" element={<ProtectedRoute><New /></ProtectedRoute>}/>
          <Route path="list" element={<ProtectedRoute><List /></ProtectedRoute>}/>
          <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="list/details/:id" element={<ProtectedRoute><Details /></ProtectedRoute>}/>
          <Route path="list/edit/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>}/>
        </Route>
        <Route path='*' element={<div className='vh-100 w-100 d-flex justify-content-center align-items-center'><h1>NOT FOUND</h1></div>}/>


      </Routes>
      </BrowserRouter>
    </div>
    </>

  );
}

export default App;
