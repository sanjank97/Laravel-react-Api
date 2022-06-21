import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {getAuthToken} from '../../helpers';

export default function UserLogin() {
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[validationError,setValidationError]=useState({});
const navigate = useNavigate();

useEffect(()=>{
  if(getAuthToken())
  { 

   navigate('/');
  }

},[])



const loginForm=async(e)=>{
    e.preventDefault();
    const formData=new FormData();

    formData.append('email',email);
    formData.append('password',password);
    console.log(formData);
    await axios.get("/sanctum/csrf-cookie").then((response) => {
    axios.post('/api/userlogin', formData).then(({data})=>{
    if(data.status===200)
    {
      localStorage.setItem('username',data.username);
      localStorage.setItem('token',data.token);  
      console.log(data);
      Swal.fire({
        icon:"success",
        text:data.message
      });
       navigate("/");
    }
    else
    {
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid Credentail',
      })
    }}).catch(({response})=>{
        if(response.status==422)
        {
          console.log(response.data.errors);
          setValidationError(response.data.errors);
        }
        else
        {
            console.log(response.data.message);
        }

    })
  })

}

  return (
        <>
            <div className="container">
                <div className="row mt-5">
                    
                    <div className="col-xl-6">
                        <h4>UserLogin</h4>
                        <div className="form-wrapper">
                        {
                          Object.keys(validationError).length > 0 && (
                            <div className="row">
                              <div className="col-12">
                                <div className="alert alert-danger">
                                  <ul className="mb-3">
                                    {
                                      Object.entries(validationError).map(([key, value])=>(
                                        <li key={key}>{value}</li>   
                                      ))
                                    }
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )
                        }
                    </div>
                       <form onSubmit={loginForm}>            
                         <div className="form-group">
                             <input type="email" className="form-control" placeholder="username" name="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}
                           />
                          </div>
                          <div className="form-group">
                             <input type="password" className="form-control" placeholder="password" name="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} />
                          </div>
                          <button type="submit" className="btn btn-primary mt-3" >Login</button>
                        </form>
                   </div>
               </div>
           </div>

        </>
  );
}