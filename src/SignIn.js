import logo from './logo.svg';
import './App.css';
import{ Formik, Form, Field } from 'formik';
import Amplify, { Auth } from 'aws-amplify';


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
        oauth: {
          domain: 'signup.auth.us-east-2.amazoncognito.com',
          redirectSignIn:'http://localhost:3000/',
          redirectSignOut:'https://localhost:3000/',
          responseType:'token'
        }
        
    }
});


const signin = ({email, password})=> {

  Auth.signIn(email, password).than(user => console.log('success',user))
    .catch(err => console.log(err));
}
   
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Signin Form</h3>
        <Formik
          initialValues={{name: '',email:'', password:''}}
          onSubmit={(values) => { 
            console.log("values,", values)
            signin(values)
          }}
        >
          <Form>
            <Field name="email" type="email" placeholder="Enter email" />
             <Field name="password" type="password" placeholder= "Enter password" />
            <button type="submit" >Signin</button>
          </Form>
        </Formik>
      </header>
    </div>
  );
}

export default App;
