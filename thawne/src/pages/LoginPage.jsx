import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { loginUser } from "../api/authApi";


function Login({ setToken }) {
  const initialValues = {
    username: '',
    password: '',
  };

  const loginSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    const token = await loginUser(values);
    setToken(token);
  };

  return (
    <div className="login-wrapper bg-white grid h-screen place-items-center">
      
      <span>Log In</span>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>
              <p>Username</p>
              <Field type="text" name="username" />
            </label>
            <div className="text-red-900">
              <ErrorMessage name="username" component="div" className="custom-error" />
            </div>
          </div>

          <div>
            <label>
              <p>Password</p>
              <Field type="password" name="password" />
            </label>
            <div className="text-red-900">
              <ErrorMessage name="password" component="div" className="custom-error" />
            </div>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
