import React, {useEffect, useRef, useState} from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {changePassword} from "../services/auth.service";
import UserService from "../services/user.service";

const Profile = () => {
    useEffect(() => {
        UserService.getUsers().then(
            (response) => {
                console.log('it tried the api');
                setQuote(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setQuote(_content);
            }
        );
    });
    const form = useRef();
    const checkBtn = useRef();
    const [quote, setQuote] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const onChangeOldPassword = (e) => {
        const OldPassword = e.target.value;
        setOldPassword(OldPassword);
    };

    const onChangeNewPassword = (e) => {
        const NewPassword = e.target.value;
        setNewPassword(NewPassword);
    };
    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const { user: currentUser } = useSelector((state) => state.auth);
    const accessToken = localStorage.getItem('idToken');
    const userEmail = localStorage.getItem('user');
    const userObj = JSON.parse(currentUser);
    console.log('currentUser : ', currentUser);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            changePassword(oldPassword, newPassword).then( (response) => {
               console.log('password changed successfully : ', response);
            }).catch( (err) => {
                console.log('failure in password change : ', err);
            });
        }

    }
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.Username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {accessToken}
            </p>
            <p>
                <strong>Id:</strong> {userObj.sub}
            </p>
            <p>
                <strong>Email:</strong> {userObj.email}
            </p>
            <div className="col-md-12">
                <div className="card card-container align-left">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form onSubmit={handlePasswordChange} ref={form}>
                        <div className="form-group">
                            <label htmlFor="oldPassword">Old Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={onChangeOldPassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={newPassword}
                                onChange={onChangeNewPassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group submit-button">
                            <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Reset</span>
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
            <div className="col-md-12">
                {quote}
            </div>
        </div>

    );
};

export default Profile;
