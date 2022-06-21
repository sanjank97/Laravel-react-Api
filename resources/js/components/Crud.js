import React, { useEffect,useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Addrecord from "./pages/Addrecord";
import Editrecord from "./pages/Editrecord";
import UserLogin from "./pages/UserLogin";
import Register from "./pages/Register";
import PageNotFound from "./pages/404page";
import "bootswatch/dist/materia/bootstrap.min.css";
import {getAuthToken} from '../helpers'
import axios from "axios";
axios.defaults.baseURL = "http://localhost/mywork/laravel-react-crud";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = getAuthToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

function Crud() {
    

    return (
        <BrowserRouter basename="/mywork/laravel-react-crud">
            <Navbar />
            <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Addrecord />} />
                <Route path="/edit/:id" element={<Editrecord />} />
                <Route path="/login" element={<UserLogin/>} />
                <Route path="/register" element={<Register />} />    
                <Route path="*" element={<PageNotFound />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default Crud;

if (document.getElementById("crud")) {
    ReactDOM.render(<Crud />, document.getElementById("crud"));
}
