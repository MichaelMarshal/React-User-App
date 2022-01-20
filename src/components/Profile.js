import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const accessToken = localStorage.getItem('accessToken');
    const userEmail = localStorage.getItem('user');
    const userObj = JSON.parse(currentUser);
    console.log('currentUser : ', currentUser);
    if (!currentUser) {
        return <Navigate to="/login" />;
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
        </div>
    );
};

export default Profile;
