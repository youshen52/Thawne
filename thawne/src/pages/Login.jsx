import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import API_CONFIG from '../config/api';

async function loginUser(credentials) {
  return fetch(API_CONFIG.endpoints.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
}

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
    <div className="login-wrapper">
      <h1>Please Log In</h1>
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
