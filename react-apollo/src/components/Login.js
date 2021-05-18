import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { AUTH_TOKEN } from '../constants';

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
    name: ''
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
          onClick={formState.login ? login : signup}
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
    </div>
  );
};

export default Login;
