import React, {useEffect, useState} from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register/index";
import Login from "./pages/Login/index";
import ErrorPage from "./pages/ErrorPage/index";
import Home from "./pages/Home/index";

function App() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(function(){
    if(localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  }, [])
  function ProtectedRoute({ audentificated, children }) {
    if (!audentificated) {
      navigate("/login");
    }
    return children;
  }

  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          index
          element={
            <ProtectedRoute audentificated={token ? true : false}>
              <Home></Home>
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
