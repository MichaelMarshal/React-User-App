import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import User from "./components/User";

import {loginOutAction, logout} from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Amplify, {Auth} from "aws-amplify";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
           // setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
          //  setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        }
    }, [currentUser]);

    useEffect(() => {
        Amplify.configure({
                region: process.env.REACT_APP_REGION,
                userPoolId: process.env.REACT_APP_USER_POOL_ID,
                userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
        });
    });

    const logOut = () => {
        dispatch(loginOutAction());
    };

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to="/home" className="navbar-brand">
                        User App
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to="/mod" className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                    Profile
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                            <Route exact path='/' element={ <Home />} />
                            <Route exact path='/home' element={ <Home />} />
                            <Route exact path='/login' element={ <Login />} />
                            <Route exact path='/register' element={ <Register />} />
                            <Route exact path="/profile" element={ <Profile />} />
                            <Route path='/boardUser' element={ <User />} />
                            <Route path='/forgotPassword' element={ <ForgotPassword />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
