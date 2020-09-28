import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import '../stylesheets/login.scss';
import createUser from '../services/create_user';
import logUser from '../services/log_user';
import {Link, useHistory} from 'react-router-dom';

const Login = (props:any) => {
  let history = useHistory();
  const[newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const[fielsComplete, setFieldsComplete] = useState(false);
  const[formerUser, setFormerUser] = useState({
    email: '',
    password: '',
  });

useEffect (() => {
    validateData(newUser);
    }
, [newUser]);

  //Validates that all data in register fields are completed
  const validateData = (user:any) => {
    let completeFields = 0;
    Object.entries(user).forEach(([key, value]) => {
      if (value !== '') {
        completeFields++;
      }
    })
    if(completeFields === Object.keys(user).length) {
      setFieldsComplete(true);
    } else {
      setFieldsComplete(false);
    }
    return completeFields;
  }

  //Register data input by user in newUSer
  const handleRegisterData = (ev:any) => {
    let data = ev.currentTarget.value;
    let inputField = ev.currentTarget.id;
    setNewUser((prevState) => {
      return {
          ...prevState,
          [inputField]: data,
        }
    })
  }

  //
  const handleNewRegister = () => {
    let id = '';
    if(fielsComplete) {
      createUser(newUser)
      .then((result) => id =result)
      .then(() => {
        setFormerUser({email: newUser.email, password: newUser.password})
      })
      .then(() => {
        history.push('/main');
      })
    }
    return id;
  }

  //Register data input by user in formerUser
  const handleLogInData = (ev:any) => {
    let data = ev.currentTarget.value;
    let inputField = ev.currentTarget.id;
    setFormerUser((prevState) => {
    return {
        ...prevState,
        [inputField]: data,
      }
    })
  }
  const handleLogIn = () => {
      logUser(formerUser)
      .then((data) =>{
      }).then(() => {
        history.push('/main');
      })
  }


  return (
    <div className="userRegister">
    <div className="register">
      <h2>Register now</h2>
      <div className="formContainer">
        <form className="form">
        <div>
            <label htmlFor="Name">Name</label>
            <input id="name" type="text" placeholder="Name" required onChange={handleRegisterData}/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Email" required onChange={handleRegisterData}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required onChange={handleRegisterData}/>
          </div>
        </form>
      </div>
        <Button variant="contained" className="logButton" color="primary" onClick={handleNewRegister}>Register
        </Button>
        <Link to="/main">
        </Link>
    </div>
        <div className="log">
        <h2>Login</h2>
        <div className="formContainer">
          <form className="form">
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Email" required onChange={handleLogInData}/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" onChange={handleLogInData}required/>
            </div>
          </form>
        </div>
        <Button variant="contained" className="logButton"color="primary" onClick={handleLogIn}>Log in</Button>
      </div>
    </div>
  );
  }

export default Login;