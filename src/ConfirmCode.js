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



const confirmCode = (code)=> {

  
  Auth.confirmSignUp("srushtipanchal2021@gmail.com", code, {
      forceAliasCreation: true

  }).then(data => console.log(data))
    .catch(err => console.log(err));
    
}
    
function App() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Signup Form</h3>
          <Formik
            initialValues={{name: '',email:'', password:''}}
            onSubmit={(values) => { 
              console.log("values,", values)
              confirmCode(values.code)
            }}
          >
            <Form>
              <Field name="code" placeholder="Enter conformation code" />
              <button type="submit" >Signup</button>
            </Form>
          </Formik>
        </header>
      </div>
    );
  }
  
  export default App;
  