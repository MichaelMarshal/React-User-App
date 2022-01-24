import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {login} from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const onChangeUsername = (e) => {
        const usernameChanged = e.target.value;
        setUsername(usernameChanged);
    };

    const onChangePassword = (e) => {
        const passwordChanged = e.target.value;
        setPassword(passwordChanged);
    };

    const handleLogin = (e) => {

        e.preventDefault();

         setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            let user = {
                username,
                password
            }
            login(user).then( (response) => {
                console.log('i got it here : ', response);
                setLoading(false);
                localStorage.setItem('accessToken', response.signInUserSession.accessToken.jwtToken);
                localStorage.setItem('idToken', response.signInUserSession.idToken.jwtToken);
                localStorage.setItem('refreshToken', response.signInUserSession.refreshToken.token);
                localStorage.setItem('username', response.username);
                console.log('attributes : ', response.attributes);
                localStorage.setItem('user', JSON.stringify(response.attributes));
                window.location.href = '/profile';
            }).catch((err) => {
                console.log('error occured : ', err);
                setLoading(false);
            });

            console.log('it finished');

        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    <a href='/forgotPassword'>Forgot Password?</a>
                    <div className="form-group submit-button">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default Login;
