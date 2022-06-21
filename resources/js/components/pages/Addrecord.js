import React ,{ useState,useEffect }from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {getAuthToken} from '../../helpers';
export default function Addrecord() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image,setImage] =useState();
  const [validationError,setValidationError] = useState({})
  const navigate = useNavigate();
 
 useEffect(()=>{
  if(!getAuthToken()){
    navigate('/login')
 }
},[])



  const createProduct = async (e) => {
  e.preventDefault();
  const formData = new FormData()
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('image', image);

  await axios.post('http://localhost/mywork/laravel-react-crud/api/records', formData).then(({data})=>{

    console.log(data);
    Swal.fire({
      icon:"success",
      text:data.message
    });
    setValidationError("");
    setName("");
    setEmail("");
    setPhone("");
    setImage("");
    navigate("/");
  }).catch(({response})=>{
    if(response.status===422){
       setValidationError(response.data.errors); 
    }else{
      setValidationError("");
      Swal.fire({
        text:response.data.message,
        icon:"error"
      })
      console.log(response.data.message) 
    }
    })
  }
  
  return (
      <>
        <div className="container">
       
            <div className="row mt-5">
                <div className="col-xl-10">
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
                     <form onSubmit={createProduct}>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter name" name="name" value={name} onChange={(event)=>{
                              setName(event.target.value)
                            }} />
                          </div>
                          <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter email" name="email" value={email} onChange={(event)=>{
                              setEmail(event.target.value)
                            }} />
                          </div>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter phone" name="phone" value={phone} onChange={(event)=>{
                              setPhone(event.target.value)
                            }}/>
                          </div>
                          <div className="form-group">
                                <input type="file" className="form-control" name="image"  onChange={(event)=>{
                              setImage(event.target.files[0])
                            }} />
                          </div>
                      
                          <button type="submit" className="btn btn-primary mt-3" >Submit</button>
                    </form>
                </div>
            </div>

        </div>
       
        
      </>
      
  )
}


