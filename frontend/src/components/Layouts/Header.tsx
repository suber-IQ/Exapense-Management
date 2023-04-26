import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
export interface IUserHeader{
  _id: string;
  createdAt: string;
  name: string;
  password: string;
  updatedAt: string;
  __v: number;
} 

const Header: React.FC<IUserHeader> = () => {
  const [loginUser, setLoginUser] = useState<IUserHeader>();

   const navigate = useNavigate();
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    if(user){
      setLoginUser(user);
    }
  }, [])

  

  


  const logoutHandler = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    navigate("/login");
  };
  
  return (
    <>
    <Navbar bg="primary" variant="dark">
        <Container>
          <Link to={"/"} className='navbar-brand'>Expanse Management</Link>
          <Nav className="ms-auto">
          <span className='px-2 text-secondary-emphasis text-uppercase'>{loginUser && loginUser.name} </span>
          </Nav>
          <span className="nav-item list-none">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </span>
        </Container>
      </Navbar>
    </>
  );
}

export default Header