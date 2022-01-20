import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const Home = () => {
    const [content, setContent] = useState("");
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {

        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Home;
