import {Auth} from "@aws-amplify/auth";
import React from "react";


export const register = (user) => {

    console.log(' details : ', user );
      return Auth.signUp( {username: user.username, password: user.password, attributes: {email: user.email}}).then( (data) => {
        console.log('signed up : ', data);
        return data;
    }).catch((err) => {
        console.log('error : ', err);
        return err;
    });

};

export const login = (user) => {
    return Auth.signIn({username: user.username, password: user.password}).then( (response) => {
        console.log('logged in successfully : ', response);
        return response;
    }).catch( (err) => {
       console.log('error occurred : ', err);
       return err;
    });
}

const logout = () => {
    console.log('attempt to logout ');
    localStorage.clear();
}

export const changePassword = async (password, newPassword) => {
    const currentUser = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(currentUser, password, newPassword).then((response) => {
        console.log('password change successful : ', response);
    }).catch((err) => {
        console.log('error when changing password : ', err);
    });
}

export const forgotPassword = async (username) => {
    console.log('username : ', username);
    Auth.forgotPassword(username).then((response) => {
        console.log('forgot password was successfull ', response);
    }).catch((err) => {
        console.log('forgot password is unsuccessful ', err);
    });
}

export const confirmForgotPassword = async (username, otp, newPassword) => {
    Auth.forgotPasswordSubmit(username, otp, newPassword).then((response) => {
        console.log('forgot password confirmation step complete : ', response);
    }).catch((err) => {
        console.log('forgot password confirmation step failure : ', err);
    });
}

export default {
    register,
    login,
    logout,
    changePassword,
    forgotPassword,
    confirmForgotPassword
}
