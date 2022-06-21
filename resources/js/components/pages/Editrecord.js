import React ,{ useEffect,useState }from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import {getAuthToken} from '../../helpers';
import Swal from 'sweetalert2'
export default function Editrecord() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [oldimage,setOldImage]=useState();
  const navigate = useNavigate();
  const { id } = useParams()
  const [validationError,setValidationError] = useState({})


  useEffect(()=>{
    if(!getAuthToken()){
      navigate('/login')
   }
   else
   {
    fetchProduct()
   }
   
  },[])

  const fetchProduct = async () => {
    await axios.get('http://localhost/mywork/laravel-react-crud/api/records/'+id+'/edit').then(({data})=>{
    console.log(data);
    const {name,email,phone,image}=data
    setName(name);
    setEmail(email);
    setPhone(phone);
    setOldImage(image);
  });

}
const updateRecord=async(e)=>{
  e.preventDefault();
  const formData = new FormData()
  formData.append('_method','PATCH');
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  if(image!==null){
    formData.append('image', image);

  }
  await axios.post('http://localhost/mywork/laravel-react-crud/api/records/'+id,formData).then(({data})=>{
    setValidationError("");
    console.log(data.message);
    Swal.fire({
      icon:"success",
      text:data.message
    });
    navigate("/");
    //fetchProduct();
    
  }).catch(({response})=>{
    if(response.status===422)
    {
      console.log(response.data.errors);
      setValidationError(response.data.errors);
    }
    else
    {
      Swal.fire({
        text:response.data.message,
        icon:"error"
      })
      console.log(response.data.message);
    }
  });
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
                     <form onSubmit={updateRecord}>
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
                          <div className="form-group">
                              <div>{oldimage}</div>
                          </div>
                      
                          <button type="submit" className="btn btn-primary mt-3" >Update</button>
                    </form>
                </div>
            </div>

        </div>
       
        
      </>
      
  )
}


