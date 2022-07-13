import React, { useContext } from "react";
import { Formik, Form, Field  } from "formik";

import { ThemeContext } from "../../themes/Themes";

import { useAppDispatch } from "../../hooks/redux";

import { userSignUp } from "../../redux/action-creator/UserActionCreator";

const SignUp:React.FC = () => {

    const dispatch = useAppDispatch();

    const { theme } = useContext(ThemeContext);

    const initialValues = { email: '', password: '', repeatPassword: '' };

    interface errorsProps {
        email?: string;
        password?: string;
        repeatPassword?: string;
    }

    return (
        <Formik 
            initialValues={initialValues}
            validate={values => {

                const errors:errorsProps = {};

                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Required';
                }
                if (!values.repeatPassword) {
                    errors.repeatPassword = 'Required';
                } else if (values.repeatPassword !== values.password) {
                    errors.repeatPassword = 'Passwords must be the same';
                }
                return errors;
            }}
            onSubmit={(values, actions) => {
                dispatch(userSignUp(values.email, values.password));
                actions.setSubmitting(false);
            }}
        >
            {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting
       }) => (
            <Form className="auth__form" onSubmit={handleSubmit}>
                <div className="auth__input">
                    <div className="img-container auth__input--icon">
                        <img src={theme.img.mail.x1}
                            srcSet={`${theme.img.mail.x1} 1x, ${theme.img.mail.x2} 2x`} 
                            alt="mail" />
                    </div>
                    <Field type="email"
                        name="email"
                        className="auth__input--input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Email..." />
                    {errors.email && touched.email && errors.email && (
                        <span className="auth__input--error">{errors.email}</span>
                    )}
                </div>
                <div className="auth__input">
                    <div className="img-container auth__input--icon">
                        <img src={theme.img.lock.x1}
                            srcSet={`${theme.img.lock.x1} 1x, ${theme.img.lock.x2} 2x`} 
                            alt="lock" />
                    </div>
                    <Field type="password"
                        name="password"
                        className="auth__input--input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Password..." />
                    {errors.password && touched.password && errors.password && (
                        <span className="auth__input--error">{errors.password}</span>
                    )}
                </div>
                <div className="auth__input">
                    <div className="img-container auth__input--icon">
                        <img src={theme.img.lock.x1}
                            srcSet={`${theme.img.lock.x1} 1x, ${theme.img.lock.x2} 2x`} 
                            alt="lock" />
                    </div>
                    <Field type="password"
                        name="repeatPassword"
                        className="auth__input--input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.repeatPassword}
                        placeholder="Repeat password..." />
                    {errors.repeatPassword && touched.repeatPassword && errors.repeatPassword && (
                        <span className="auth__input--error">{errors.repeatPassword}</span>
                    )}
                </div>
                <button type="submit" 
                    className="auth__btn"
                    disabled={isSubmitting}>
                        Sign Up
                </button>
            </Form>
       )}
        </Formik>
    );
}

export default SignUp;