import React, { useState } from 'react';
import './App.css';

import Axios from 'axios';

function App() {

  const [usernameReg, setUsernameReg] = useState(""); 
  const [passwordReg, setPasswordReg] = useState(""); 

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const [loginStatus, setLoginStatus] = useState("");

  //Register Function
  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response)
    })
  };

  //Login Function
  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
     
      if(response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);

      }
      
    })
  };

  return (
    <div className="App">
     
     <div className="Registration">
       <h1>Registration</h1>
       <label>Username:</label>
       <input type="text"
       onChange={ (e) => {
         setUsernameReg(e.target.value);
       } }
       />
       <label>Password:</label>
       <input type="password"
        onChange={ (e) => {
          setPasswordReg(e.target.value);
        } }
        />
       <button onClick={register} >Register</button>

     </div>
     <div className="Login">
       <h1>Login</h1>
       <input type="text" placeholder="Login" 
        onChange={ (e) => {
          setUsername(e.target.value);
        } } />     
       <input type="text" placeholder="Password"  onChange={ (e) => {
         setPassword(e.target.value);
       } } />     
       <button onClick={login} >Login</button>
     </div>

     <h1>{loginStatus}</h1>

    </div>
  );
}

export default App;
