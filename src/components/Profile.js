import React, {useEffect, useRef, useState} from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Popup from "./Popup";
import {changePassword} from "../services/auth.service";
import UserService from "../services/user.service";
import {fullWidth} from "validator/es/lib/isFullWidth";

const Profile = () => {
    useEffect(() => {
        UserService.getUsers().then(
            (response) => {
                console.log('use effect triggered');
                setData(JSON.parse(response.data.body).Items);
            },
            (error) => {
                console.log('error occured : ', error);
                const _content =
                    (error.response && error.response.data) ||
                    error.toString();
            }
        );
    }, []);
    const form = useRef();
    const checkBtn = useRef();
    const [data, setData] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [quote, onChangeQuote] = useState("");
    const [imgURL, onChangeImgURL] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
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
    const { user: currentUser } = useSelector((state) => state.auth);
    const accessToken = localStorage.getItem('idToken');
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
               togglePopup();
            }).catch( (err) => {
                console.log('failure in password change : ', err);
            });
        }

    }
    const handleQuoteAddingChange = (e) => {
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            changePassword(oldPassword, newPassword).then( (response) => {
               console.log('password changed successfully : ', response);
               togglePopup();
            }).catch( (err) => {
                console.log('failure in password change : ', err);
            });
        }

    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const createRecord = () => {
        setIsAddOpen(!isAddOpen);
    }
    return (
        <div className="container">
            <div className="float-end">
                <input
                    type="button"
                    value="Change Password"
                    onClick={togglePopup}
                />
                {isOpen && <Popup
                    content={<>
                        <div >
                            <div className="popupHeader"><b>Change Password</b></div>
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
                                    </Form>
                                </div>
                            </div>
                        </div>

                    </>}
                    handleClose={togglePopup}
                />}
            </div>
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
            <div className="float-end" >
                <button onClick={createRecord}><i className="fa fa-plus" /></button>
                {isAddOpen && <Popup
                    content={<>
                        <div >
                            <div className="popupHeader"><b>Add Quote to User</b></div>
                            <div className="col-md-12">
                                <div className="card card-container align-left">
                                    <img
                                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                        alt="profile-img"
                                        className="profile-img-card"
                                    />

                                    <Form onSubmit={handleQuoteAddingChange} ref={form}>
                                        <div className="form-group">
                                            <label htmlFor="quote">Quote</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="quote"
                                                value={quote}
                                                onChange={onChangeQuote}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="imgURL">Image URL</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="imgURL"
                                                value={imgURL}
                                                onChange={onChangeImgURL}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group submit-button">
                                            <button className="btn btn-primary btn-block" disabled={loading}>
                                                {loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                <span>Submit</span>
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>

                    </>}
                    handleClose={createRecord}
                />}
            </div>
            <div className="col-md-12">
                <table className="vw100">
                    <tbody>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>quote</th>
                        <th>image</th>
                    </tr>
                    {data.map(row => {
                        return (
                            <tr>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.quote}</td>
                                <td>{row.image}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;
