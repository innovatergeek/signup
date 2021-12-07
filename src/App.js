import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import{ Formik, Form, Field } from 'formik';
import Amplify, { Auth } from 'aws-amplify';
import GoogleLogin from 'react-google-login';


Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: "us-east-2:a262d486-b121-47bd-9817-114bd098d4aa",
        
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'us-east-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_RZDMFeya8',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '38o997k3s7a264on74km615tec',   
        
        
    }
});
const signin = ({email, password}, setUser)=> {

  Auth.signIn(email, password).then(user => {
    console.log('success',user)
    setUser(user)
  }
  )
   .catch(err => console.log(err));

}

const confirmCode = (values, user) => {

  Auth.confirmSignIn(
    user,
    values.code,
    "SMS_MFA"
).then(console.log)
 .catch(console.error)


}
    
function App() {
  const [user, setUser ] = useState(null)
  if(user){
    return <div className="App">
      <h3>ConfirmSignin form</h3>
        <Formik
        initialValues={{code:''}}
        onSubmit={(values) => { 
            console.log("values,", values)
            confirmCode(values, user)
        }}
      >
          <Form>
            <Field name="code" placeholder="Enter email" />
            <button type="submit" >Signin</button>  
          </Form>
        </Formik>
        </div>
  }
  return (
    <div className="App">
      
        <h3>Signin Form</h3>
        <Formik
          initialValues={{name: '',email:'', password:''}}
          onSubmit={(values) => { 
            console.log("values,", values)
            signin(values, setUser)
          }}
        >
          <Form>
            <Field name="email" type="email" placeholder="Enter email" />
             <Field name="password" type="password" placeholder= "Enter password" />
            <button type="submit" >Signin</button>
          </Form>
        </Formik>
      
    </div>
  ); 
  
}

export default App;
