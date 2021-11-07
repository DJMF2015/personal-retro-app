import React, { useState, memo } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import styled from 'styled-components';
import { loginFormMC, globalMC } from '../mc/index';
import { Envelope, Lock } from '@styled-icons/fa-solid';
import StyledButton from './StyledButton';

/**
 * Component for the form allowing the user to log in.
 * @returns HTML for the login form styled with styled-components
 */
const LoginForm = () => {
  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const onChangeHandler = e => {
    setFieldValues(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegisterHandler = async event => {
    event.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: fieldValues.email,
        password: fieldValues.password,
      });

      if (result.error) {
        console.log('Error:' + result.error);
        setErrorMessage(result.error);
      }
    } catch (err) {
      console.log('error : ' + err);
    }
  };

  return (
    <>
      <StyleHeader>
        {loginFormMC.loginTitleHeader} <br />
        {loginFormMC.loginText}.
      </StyleHeader>
      <form onSubmit={onRegisterHandler}>
        <FieldContainer>
          <EnvelopeIcon size={'2em'} />
          <StyleInputEmail
            id='full-name'
            type='text'
            placeholder={globalMC.emailPlaceholder}
            name='email'
            error={errorMessage}
            onChange={e => onChangeHandler(e)}
          />
        </FieldContainer>
        <FieldContainer>
          <LockIcon size={'2em'} />
          <StyleInputPassword
            id='password'
            type='password'
            placeholder={globalMC.passwordPlaceholder}
            name='password'
            error={errorMessage}
            onChange={e => onChangeHandler(e)}
          />
        </FieldContainer>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <ButtonContainer>
          <StyledButton type='submit' name='loginFormBtn'>
            {loginFormMC.loginText}
          </StyledButton>
        </ButtonContainer>
        
      </form>
    </>
  );
};

export default memo(LoginForm);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

/**
 * Styling for Login form component elements - Email
 */
const StyleInputEmail = styled.input`
  border: 1px solid
    ${props =>
      props.error ? props.theme.colour.error : props.theme.colour.black};
  margin-bottom: 10px;
  height: 3rem;
  width: 100%;
  padding: 0.5em 4em;
  @media (max-width: 450px) {
    width: 19rem;
  }
`;
/**
 * Styling for Login form component elements - Password
 */
const StyleInputPassword = styled.input`
  border: 1px solid
    ${props =>
      props.error ? props.theme.colour.error : props.theme.colour.black};
  margin-bottom: 10px;
  height: 3rem;
  width: 100%;
  padding: 0.5em 4em;
  @media (max-width: 450px) {
    width: 19rem;
  }
`;
/**
 * Styling for Login form component elements - Header
 */
const StyleHeader = styled.h1`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 35px;
`;

/**
 * Styling for Login form component elements - Form fields
 */
const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

/**
 * Styling for Login form component elements - Error message
 */
const ErrorMessage = styled.div`
  color: ${props => props.theme.colour.error};
  margin-bottom: 1em;
  width: 22rem;
  font-style: italic;
  font-size: 0.9em;
  @media (max-width: 450px) {
    width: 19rem;
  }
`;

const LockIcon = styled(Lock)`
  color: ${props => props.theme.colour.black};
  margin-left: 0.5em;
  padding-bottom: 0.5em;
  height: 2em;
  position: absolute;
`;
const EnvelopeIcon = styled(Envelope)`
  color: ${props => props.theme.colour.black};
  margin-left: 0.5em;
  padding-bottom: 0.5em;
  height: 2em;
  position: absolute;
`;
