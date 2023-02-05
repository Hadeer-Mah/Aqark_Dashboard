import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../../contexts/axiosInstance';

const NewPassword = () => {
    const {pasToken} = useParams();
    let newToken = pasToken.slice(6,)
    console.log(newToken);
    const [errorMsg, seterrorMsg] = useState('');
    let navigate = useNavigate();

    const [oldPas, setOldPas] = useState({
        "new_password_1": "string",
        "new_password_2": "string"
    })
    let getValue=(e)=>{
        let newPas={...oldPas};
        newPas[e.target.name] = e.target.value;
        setOldPas(newPas);
      }
      async function pasChanged(){
        try {const {data}= await axiosInstance({
            url: 'api/users/reset-password/',
            method: 'post',
            data: oldPas,
            params:{
                token: newToken
            }
            })
          console.log(" response",data);
          alert('passwored changed successfuly')
           navigate('/login')
          }catch(err){
            console.log(err);
            seterrorMsg(err.message)
          }
      }
    let submitForm=(e)=>{
        e.preventDefault();   
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
                <input type="password" className='form-control' placeholder='new Password' name='new_password_1' onChange={getValue}/>
                </div>
                <div className="mb-2">
                <input type="password" className='form-control' placeholder='Re-Type Password' name='new_password_2' onChange={getValue}/>
                </div>
                <button className='w-100 text-white border-0 py-2 rounded-2 bg-danger'> Change Password </button>
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

export default NewPassword