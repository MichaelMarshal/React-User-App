import axios from "axios";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import {Auth} from "@aws-amplify/auth";
import {Navigate} from "react-router-dom";
import React from "react";

const API_URL = "http:localhost:8000/api/auth";

const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
};

var userPool;

//userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export const register = (user) => {
    var registerRequesBody = {
        Name: 'email',
        Value: user.user.email
    };

  //  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(registerRequesBody);
    console.log(' details : ', user );
      return Auth.signUp( {username: user.user.username, password: user.user.password, attributes: {email: user.user.email}}).then( (data) => {
        console.log('signed up : ', data);
        return data;
    }).catch((err) => {
        console.log('error : ', err);
        return err;
    });
  /*  userPool.signUp(username, password, [attributeEmail], null, function signUpCallback(err, result) {
        if(!err) {
            console.log('registration success response : ', result);
            return result;
        } else {
            console.log('registration failure response : ', err);
            return null
        }
    });*/
   /* return axios.post(API_URL+"register", {
        username : user.username,
        email : user.email,
        password : user.password
    });*/
};

export const login = (user) => {
    return Auth.signIn({username: user.username, password: user.password}).then( (user) => {
        console.log('logged in successfully : ', user);
        //document.location('/profile');
        return user;
    }).catch( (err) => {
       console.log('error occurred : ', err);
       return err;
    });
 /*   return axios.post(API_URL+"login", {
        username,
        password
    }).then((response) => {
        if(response.data) {
            console.log('user logged in successfully : ', response);
        }
        return response.data;
    })*/
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

const forgotPassword = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    Auth.forgotPassword(currentUser.USERNAME).then((response) => {
        console.log('forgot password was successfull ', response);
    }).catch((err) => {
        console.log('forgot password is unsuccessful ', err);
    });
}

const confirmForgotPassword = async (otp, newPassword) => {
    const currentUser = await Auth.currentAuthenticatedUser();
    Auth.forgotPasswordSubmit(currentUser.USERNAME, otp, newPassword).then((response) => {
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
