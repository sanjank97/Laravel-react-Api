import React from 'react';
import {  Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
export default function Navbar() {
    const navigate = useNavigate();

      const logoutButton=async(e)=>{
            e.preventDefault();
            await axios.post("/api/logout").then(({ data }) => {
                 console.log(data);
            if(data.status===200)
            {
                localStorage.removeItem('username');
                localStorage.removeItem('token');  
                Swal.fire({
                    icon:"success",
                    text:data.message
                });
                navigate('/login');
            }
            })
      }

         var AuthButton='';
         if(!localStorage.getItem('token'))
         {
            AuthButton=( <>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/register">Register</Link>
                            </li>
                        </>);
         }
         else
         {
            AuthButton=(
                <>
                     <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/add">Addrecord</Link>
                        </li>
                    <li className="nav-item">
                        <button className="btn btn-danger" onClick={logoutButton} >Logout</button>
                    </li>
                </>
            );
         }


  return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">CRUD</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                       
                        {AuthButton}
                       
                    </ul>
                
                    </div>
                </div>
            </nav>
        </>
  );
}