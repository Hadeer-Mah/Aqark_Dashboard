import { Cached } from '@mui/icons-material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axiosInstance from '../../contexts/axiosInstance';

const ForgotPassword = () => {
    const [errorMsg, seterrorMsg] = useState('');
    const [loadBtn, setloadBtn] = useState(false);
    const [errorList, setErrorList] = useState([])
    let navigate = useNavigate();

    const [oldPas, setOldPas] = useState({
        "old_password": "string",
        "new_password_1": "string",
        "new_password_2": "string"
    })
    let getValue=(e)=>{
        let newPas={...oldPas};
        newPas[e.target.name] = e.target.value;
        setOldPas(newPas);
      }
      async function pasChanged(){
        try {const {data}= await axiosInstance.patch('api/users/change-password/', oldPas )
          console.log(" response",data);
          alert('passwored changed successfuly')
           navigate('/login')
          }catch(err){
            console.log(err);
          }
      }
    let submitForm=(e)=>{
        e.preventDefault();   
        // setloadBtn(true);
        pasChanged();
    }


    
  return (
    <>
    <div className="register bg-dark text-white">
        <div className="container">
          <div className="row w-75 mx-auto login d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <form onSubmit={submitForm}>
              <div className="form-group w-100 text-center">
                <h4 className='pb-2'>Change Password</h4>
                {errorMsg? <div className="alert alert-danger">{errorMsg}</div>: ''}
                <div className="mb-2">
                <input type="password" className={errorList.filter((ele) => ele.context.label=='old_password')[0]? 'border border-danger form-control':'form-control'} placeholder='old password' name='old_password' onChange={getValue}/>
                {errorList.filter((ele) => ele.context.label=='old_password')[0]?.message}
                </div>
                <div className="mb-2">
                <input type="password" className={errorList.filter((ele) => ele.context.label=='new_password_1')[0]? 'border border-danger form-control':'form-control'} placeholder='new Password' name='new_password_1' onChange={getValue}/>
                {errorList.filter((ele) => ele.context.label=='new_password_1')[0]?.message}
                </div>
                <div className="mb-2">
                <input type="password" className={errorList.filter((ele) => ele.context.label=='new_password_2')[0]? 'border border-danger form-control':'form-control'} placeholder='Re-Type Password' name='new_password_2' onChange={getValue}/>
                {errorList.filter((ele) => ele.context.label=='new_password_2')[0]?.message}
                </div>
                <button className='w-100 text-white border-0 py-2 rounded-2 bg-danger'> {loadBtn? <Cached/>: 'Change Password'}</button>
                <hr/>
              </div>
              </form>
              
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default ForgotPassword