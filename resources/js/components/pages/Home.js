

import React,{ useEffect,useState } from 'react';
import {  Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import {getAuthToken} from '../../helpers';

export default function Home() {
  const navigate=useNavigate();

  

  const [products, setProducts] = useState([]);

  useEffect(()=>{

    if(!getAuthToken()){
      navigate('/login')
   }
   else
   {
    fetchProducts() 
   }

    
},[])

const fetchProducts = async () => {
    await axios.get('http://localhost/mywork/laravel-react-crud/api/records').then(({data})=>{
        setProducts(data)
    });
}

const deleteRecord = async (id) => {
  await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
           if (result.isConfirmed) {
                axios.delete('http://localhost/mywork/laravel-react-crud/api/records/'+id).then(({data})=>{
                console.log(data.message);
                Swal.fire(
                  'Deleted!',
                  data.message,
                  'success'
                )
                fetchProducts()
                }).catch(({response})=>{
                    console.log(response.data.message);  
                });
         }
    })   
}

  return (
    <>
      <h5 className="mt-3">List of records...</h5>  
      <div className="container">
         <div className="row">
             <div className="col-xl-10">
             {
              products.length > 0 && (
              products.map((row, i)=>(
             <div className="card mb-3"  key={i}>
            
                      <div className="card-body d-flex justify-content-around align-items-center">
                          <div className='userdp'>{row.name[0]}</div>
                          <div>{row.name}</div>
                          <div>{row.email}</div>
                          <div>{row.phone}</div>
                          <div><img width="50px" src={`http://localhost/mywork/laravel-react-crud/storage/app/public/record/image/${row.image}`} /></div>
                          <div><Link to={`/edit/${row.id}`}  type="button" className="btn btn-primary">Edit</Link></div>
                          <div><button onClick={()=>deleteRecord(row.id)} type="button" className="btn btn-danger">Delete</button></div>
                      </div>

                </div>
                ))
                )
                }
              
             </div>
         </div>
      </div>
    </>
  )
}
