import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import {Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Spin from '../components/Loading/Spin';
import { serverUrl } from '../utitls/proxy';

type TRegister = {
  name: string;
  email: string;
  password: string;
}


const Register = () => {

  const [formData, setFormData] = useState<TRegister>({
    name: '',
    email: ' ',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: TRegister) => ({
      ...prevState,
      [name]: value,
    }));
  };
 

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       setLoading(true);
       await axios.post(`${serverUrl}/register`,formData);
       toast.success('Register Successfully...');
       setLoading(false);
       navigate('/login');
    } catch (error) {
      console.log(error);
      
      setLoading(false);
      toast.error('Something went wrong!');
    }
  },[formData,navigate])

  // prevent for login user
  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/')
    }
  }, [navigate])
  

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      {loading && <Spin />}
    <Form onSubmit={handleSubmit}>
        <h1 className='mb-3'>Register Form</h1>
        {/* Name */}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" value={formData.name} onChange={handleInputChange} type="name" placeholder="Name" />
      </Form.Group>
      {/* Email */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
       {/* Password */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Password" />
      </Form.Group>

    
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div className='d-flex mt-3'>
        <span className='me-2'>Already Register?</span>
             <Link to={"/login"}>
                 Cleck Here to login
             </Link>
      </div>
    </Form>
    </div>
  )
};

export default Register;