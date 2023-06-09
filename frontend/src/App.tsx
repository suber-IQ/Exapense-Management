import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";



const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
};


export function ProtectedRoutes(props: any){
  if(localStorage.getItem("user")){
    return props.children
  }else{
    return <Navigate to={'/login'} />
  }
}

export default App;
