import React from 'react';
import { object, string, array, boolean } from 'yup';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function NavBarModal({ closeModal }) {
  const chatSchema = Yup.object({
    chatName: Yup.string().required('Required').max(30),
    chatDescription: Yup.string().max(50, 'Maximum length reached'),
    securityLevel: Yup.string().oneOf(['open', 'sensitive', 'top secret'], 'Choose one'),
    listOfUsers: Yup.array().max(10, 'Maximum of 10 users allowed').required('Need users to create'),
    generalRead: Yup.boolean().default(true),
    generalWrite: Yup.boolean().default(true),
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-black bg-opacity-50 w-full h-full fixed"></div>
      <div className="bg-white p-8 rounded shadow-md z-10">
        <h1 className="text-2xl font-bold mb-4 text-black">Create Chat</h1>
        <Formik
          initialValues={{
            chatName: '',
            chatDescription: '',
            securityLevel: '',
            listOfUsers: [],
            generalRead: true,
            generalWrite: true,
          }}
          validationSchema={chatSchema}
          onSubmit={(values) => {
            console.log(values);
            closeModal();
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="chatName" className="text-sm text-black font-semibold">
                  Chat Name
                </label>
                <Field
                  type="text"
                  id="chatName"
                  name="chatName"
                  className="border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.chatName && touched.chatName ? (
                  <div className="text-red-500">{errors.chatName}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label htmlFor="chatDescription" className="text-sm text-black font-semibold">
                  Chat Description
                </label>
                <Field
                  type="text"
                  id="chatDescription"
                  name="chatDescription"
                  className="border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.chatDescription && touched.chatDescription ? (
                  <div className="text-red-500">{errors.chatDescription}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label htmlFor="securityLevel" className="text-sm text-black font-semibold">
                  Security Level
                </label>
                <Field
                  as="select"
                  id="securityLevel"
                  name="securityLevel"
                  className="border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="" label="Select Security Level" />
                  <option value="open" label="Open" />
                  <option value="sensitive" label="Sensitive" />
                  <option value="top secret" label="Top Secret" />
                </Field>
                {errors.securityLevel && touched.securityLevel ? (
                  <div className="text-red-500">{errors.securityLevel}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label htmlFor="listOfUsers" className="text-sm text-black font-semibold">
                  List of users
                </label>
                <Field
                  type="text"
                  id="listOfUsers"
                  name="listOfUsers"
                  className="border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.listOfUsers && touched.listOfUsers ? (
                  <div className="text-red-500">{errors.listOfUsers}</div>
                ) : null}
              </div>

              <div className="flex items-center">
                <Field
                  type="checkbox"
                  id="generalRead"
                  name="generalRead"
                  className="mr-2"
                />
                <label htmlFor="generalRead" className="text-sm text-black">
                  General Read
                </label>
              </div>

              <div className="flex items-center">
                <Field
                  type="checkbox"
                  id="generalWrite"
                  name="generalWrite"
                  className="mr-2"
                />
                <label htmlFor="generalWrite" className="text-sm text-black">
                  General Write
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-2"
              >
                Create
              </button>

              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              >
                Close
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default NavBarModal;
