import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../helpers";
export default function Register() {
    const navigate = useNavigate();

    useEffect(() => {
        if (getAuthToken()) {
            navigate("/");
        }
    }, []);

    const initiaData = {
        name: "",
        email: "",
        password: "",
        errors: {
            nameError: "",
            emailError: "",
            passwordError: "",
        },
    };

    console.log("initiaData", initiaData);
    const [registerData, setRegisterData] = useState(initiaData);
    console.log("registerData", registerData);
    const registerHandle = (e) => {
        e.preventDefault();
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };
    const registerForm = async (e) => {
        e.preventDefault();
        console.log(registerData);
        await axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/api/register", registerData)
                .then(({ data }) => {
                    if (data.status === 200) {
                        setRegisterData(initiaData);
                        Swal.fire({
                            icon: "success",
                            text: data.message,
                        });
                    } else {
                        let errors = {
                            nameError: data.validation_error.name,
                            emailError: data.validation_error.email,
                            passwordError: data.validation_error.password,
                        };
                        setRegisterData({ ...registerData, errors: errors });
                    }
                })
                .catch((response) => {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error",
                    });
                });
        });
    };

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-xl-6">
                        <h4>Register</h4>
                        <form onSubmit={registerForm}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="name"
                                    name="name"
                                    onChange={registerHandle}
                                    value={registerData.name}
                                />
                                <span>{registerData.errors.nameError}</span>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="username"
                                    name="email"
                                    onChange={registerHandle}
                                    value={registerData.email}
                                />
                                <span>{registerData.errors.emailError}</span>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="password"
                                    name="password"
                                    onChange={registerHandle}
                                    value={registerData.password}
                                />
                                <span>{registerData.errors.passwordError}</span>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary mt-3"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
