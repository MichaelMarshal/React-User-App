import React, {useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { forgotPassword, confirmForgotPassword} from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const ForgotPassword = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [otp, setOTP] = useState(0);
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

    const onChangeOtp = (e) => {
        const otpChanged = e.target.value;
        setOTP(otpChanged);
    };

    const handleForgotPasswordInitialization = (e) => {

        e.preventDefault();

        forgotPassword(username).then( (response) => {
            console.log('forgot Password initiated');
            setInitialized(true);
        }).catch((err) => {
            console.log('forgot password initiation failed');
        });
    }

    const handleResetPassword = (e) => {

        e.preventDefault();

        confirmForgotPassword(username, otp, password).then( (response) => {
            console.log('confirmForgotPassword  initiated');
            window.location.href = '/login';
        }).catch((err) => {
            console.log('confirmForgotPassword  initiation failed');
        });
    }


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

                <Form onSubmit={handleForgotPasswordInitialization} ref={form}>
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
                    {initialized && (
                    <div className="form-group" >
                        <label htmlFor="otp">OTP</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="otp"
                            value={otp}
                            onChange={onChangeOtp}
                            validations={[required]}
                        />
                    </div>)}
                    {initialized && (
                    <div className="form-group" >
                        <label htmlFor="password">New Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    )}
                    {!initialized && (
                    <div className="form-group submit-button">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit Forgot Password</span>
                        </button>
                    </div>
                        )}
                    {initialized && (
                    <div className="form-group submit-button">
                        <button className="btn btn-primary btn-block" onClick={handleResetPassword} disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Reset Password</span>
                        </button>
                    </div>
                        )}
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

export default ForgotPassword;
