import React from "react";
import { Formik, Form, Field } from "formik";

import { useAction } from "../../hooks/redux";

import MailWhitePng1x from "../../assets/img/mail-white1x.png";
import MailWhitePng2x from "../../assets/img/mail-white2x.png";
import LockWhitePng1x from "../../assets/img/lock-white1x.png";
import LockWhitePng2x from "../../assets/img/lock-white2x.png";

const SignIn: React.FC = () => {

    const { userSignIn } = useAction();

    const initialValues = { email: '', password: '' };

    interface errorsProps {
        email?: string;
        password?: string;
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
                return errors;
            }}
            onSubmit={(values, actions) => {
                userSignIn(values.email, values.password);
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
                        <img src={MailWhitePng1x}
                            srcSet={`${MailWhitePng1x} 1x, ${MailWhitePng2x} 2x`} 
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
                        <img src={LockWhitePng1x}
                            srcSet={`${LockWhitePng1x} 1x, ${LockWhitePng2x} 2x`} 
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
                <button type="submit" 
                    className="auth__btn"
                    disabled={isSubmitting}>
                        Sign In
                </button>
            </Form>
       )}
        </Formik>
    );
}

export default SignIn;