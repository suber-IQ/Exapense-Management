import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import {Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Spin from '../components/Loading/Spin';
import { toast } from 'react-toastify';
import { serverUrl } from '../utitls/proxy';



type TLogin = {
  email: string;
  password: string;
}


const Login = () => {
  const [formData, setFormData] = useState<TLogin>({
    email: ' ',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: TLogin) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setLoading(true);
       const { data } = await axios.post(`${serverUrl}/login`,formData);
        toast.success('Register Successfully...');
        localStorage.setItem("user",JSON.stringify({...data.user, password: ''}));
        setLoading(false);
        navigate('/');
     } catch (error) {
       setLoading(false);
       toast.error('Something went wrong!');
     }
  },[formData,navigate]);

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
        <h1 className='mb-3'>Login Form</h1>
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
        Login
      </Button>
      <div className='d-flex mt-3'>
        <span className='me-2'>Not Create Accont?</span>
             <Link to={"/register"}>
                 Cleck Here to register
             </Link>
      </div>
    </Form>
    </div>
  )
};

export default Login;