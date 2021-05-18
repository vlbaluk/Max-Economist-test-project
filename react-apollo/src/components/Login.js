import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { AUTH_TOKEN } from '../constants';
import {Alert} from "react-bootstrap";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $signUpInput: SignUpInput
  ) {
    signup(signUpInput: $signUpInput
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $loginInput: LoginInput
  ) {
     login(loginInput: $loginInput) {
       token
     }
   }
`;

const Login = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
    errors: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
        loginInput: {
            email: formState.email,
            password: formState.password
        }
    },
    onCompleted: ({ login }) => {
        if(login){
            localStorage.setItem(AUTH_TOKEN, login.token);
        }
        console.log(login.token);
      history.push('/search');
        history.go(0)
    },
    onError: ({graphQLErrors, networkError, operation, forward }) => {
        alert('Error: '+graphQLErrors[0].message);
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
        signUpInput: {
            email: formState.email,
            password: formState.password
        }
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      history.push('/search');
        history.go(0)

    },
      onError: ({graphQLErrors, networkError, operation, forward }) => {
          alert('Error: '+graphQLErrors[0].message);
      }
  });

    const validate = () => {
        let errors = {};
        let isValid = true;


        if (!formState.email) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }

        if (typeof formState.email !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(formState.email)) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!formState.password || formState.password.length<5) {
            isValid = false;
            errors["password"] = "Please enter your password. Should contain at least 5 symbols";
        }

        setFormState({
            ...formState,
            errors: errors
        })

        return isValid;
    }

  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={()=>{
           if(!validate())
               return ;
              return formState.login  ? login() : signup()}}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>

        {formState.errors && Object.keys(formState.errors).length > 0 && <Alert  variant="danger">
            <div>{formState.errors && <>{formState.errors.email}
            <br/>
                {formState.errors.password}
                </>}</div>

        </Alert>}

    </div>
  );
};

export default Login;
