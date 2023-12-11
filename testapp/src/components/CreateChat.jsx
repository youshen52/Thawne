import { object, string, number, date} from 'yup';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function CreateChat() {

    const chatSchema = Yup.object({
        chatName: Yup.string().required('Required').max(30),
        chatDescription: Yup.string().max(50, "Maximum length reached"),
        securityLevel: Yup.string().oneOf(['open', 'sensitive', 'top secret'], 'Choose one'),
        listOfUsers: Yup.array.max(10).required('Need users to create'),
        generalRead: Yup.boolean().default(true),
        generalWrite: Yup.boolean().default(true)
    })

    return(
        <>
            <h1>Create Chat</h1>
            <Formik
            initialValues={{
                chatName: '',
                chatDescription: '',
                securityLevel: '',
                listOfUsers: '',
                generalRead: '',
                generalWrite: ''
            }}
            validationSchema={chatSchema}
            onSubmit={values =>{
                console.log(values);
            }}
            >
             {({ errors, touched}) =>(
                <Form>
                    <Field name="Chat Name" />
                    {errors.chatName && touched.chatName ? <div>{errors.chatName}</div> : null}

                    <Field name="Chat Description"/>
                    {errors.chatDescription && touched.chatDescription ? <div>{errors.chatDescription}</div> : null}

                    <Field type="" name="Security Level"/>
                    {errors.securityLevel && touched.securityLevel ? <div>{errors.securityLevel}</div> : null}

                    <Field name="List of Users"/>
                    {errors.listOfUsers && touched.listOfUsers ? <div>{errors.listOfUsers}</div> : null}

                    <Field name="General Read"/>
                    {errors.generalRead && touched.generalRead ? <div>{errors.generalRead}</div> : null}

                    <Field name="Security Write"/>
                    {errors.generalWrite && touched.generalWrite ? <div>{errors.generalWrite}</div> : null}

                    <button type='submit'>Create</button>
                </Form>
             )
             
             }   
            </Formik>
        </>
    );

}

export default CreateChat