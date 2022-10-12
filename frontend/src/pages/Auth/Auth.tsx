import React, { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import "./Auth.scss";

const Auth: React.FC = () => {

    const [isSignIn, setIsSignIn] = useState(true);

    const handlerOnChangeAuthMode = () => {
        setIsSignIn(prev => !prev);
    }

    return (
        <div className="auth-container">
            <div className="auth">
                <h1 className="auth__title">{isSignIn ? "Sign In" : "Sign Up"}</h1>
                {isSignIn ? (
                    <SignIn />
                ) : (
                    <SignUp />
                )}
                {isSignIn ? (
                    <span className="auth__switch">Don't have an account? <a onClick={handlerOnChangeAuthMode}>Sign Up</a></span>
                ) : (
                    <span className="auth__switch">Have an account? <a onClick={handlerOnChangeAuthMode}>Sign In</a></span>
                )}
            </div>
        </div>
    )
}

export default Auth;