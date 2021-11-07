import styled from 'styled-components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUpFormMC, globalMC } from '../mc/';
import { User } from '@styled-icons/boxicons-solid';
import { Envelope, Lock } from '@styled-icons/fa-solid';
import StyledButton from './StyledButton';

/**
 * Component for the form allowing the user to sign up.
 * @returns HTML for the sign up form styled with styled-components
 */

const postUser = async body => {
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return data;
};

const SignUpForm = () => {
  const router = useRouter();
  const registerUser = async (values, actions) => {
    const body = {
      email: values.email,
      name: values.name,
      password: values.password,
    };

    try {
      const data = await postUser(body);
      if (data.message) {
        actions.setFieldError('email', data.message);
      } else {
        await signIn('credentials', { ...body, redirect: false });
        router.replace('/retros');
      }
      actions.setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Formik Hook to declare initial values, validation criteria and submission action
   */
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, actions) => registerUser(values, actions),
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string()
        .matches(
          /^([a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*)@(and.digital)+$/,
          signUpFormMC.andDigitalValidationMessage
        )
        .email(signUpFormMC.andDigitalValidationMessage)
        .required(signUpFormMC.requiredValidationMessage),
      password: Yup.string()
        .matches(
          /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=(?:.*[!@#$%^&*?()\-_=+{};:,<.>]){1,}).{8,})\S$/,
          signUpFormMC.passwordValidationMessage
        )
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('password')],
          signUpFormMC.passwordsDontMatchValidationMessage
        )
        .required(signUpFormMC.requiredValidationMessage),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <StyleHeader>
        {signUpFormMC.signUpText1} <br />
        {signUpFormMC.signUpText2}.{' '}
      </StyleHeader>
      <form
        onSubmit={e => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FieldContainer>
          <UserIcon />
          <StyleInputName
            id='name'
            type='text'
            name='name'
            placeholder={signUpFormMC.fullNamePlaceholder}
            error={formik.errors.name}
            {...formik.getFieldProps('name')}
          />
        </FieldContainer>
        <ErrorMessage>
          {formik.errors.name && <div>{formik.errors.name}</div>}
        </ErrorMessage>
        <FieldContainer>
          <EnvelopeIcon />
          <StyleInputEmail
            id='email'
            type='text'
            name='email'
            placeholder={globalMC.emailPlaceholder}
            error={formik.errors.email}
            {...formik.getFieldProps('email')}
          />
        </FieldContainer>
        <ErrorMessage>
          {formik.errors.email && <div>{formik.errors.email}</div>}
        </ErrorMessage>
        <FieldContainer>
          <LockIcon />
          <StyleInputCreatePassword
            id='createPassword'
            type='password'
            name='password'
            placeholder={signUpFormMC.newPasswordPlaceholder}
            error={formik.errors.password}
            {...formik.getFieldProps('password')}
          />
        </FieldContainer>

        <ErrorMessage>
          {formik.errors.password && <div>{formik.errors.password}</div>}
        </ErrorMessage>
        <FieldContainer>
          <LockIcon />
          <StyleInputConfirmPassword
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            placeholder={signUpFormMC.confirmPasswordPlaceholder}
            error={formik.errors.confirmPassword}
            {...formik.getFieldProps('confirmPassword')}
          />
        </FieldContainer>

        <ErrorMessage>
          {formik.errors.confirmPassword && (
            <div>{formik.errors.confirmPassword}</div>
          )}
        </ErrorMessage>
        <ButtonContainer>
          <StyledButton type='submit' name='signUpButton'>
            {signUpFormMC.signUpText2}
          </StyledButton>
        </ButtonContainer>
      </form>
    </>
  );
};

export default SignUpForm;

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
const StyleInputCreatePassword = styled.input`
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
const StyleInputConfirmPassword = styled.input`
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
 * Styling for Login form component elements - Input name
 */
const StyleInputName = styled.input`
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
  margin-bottom: 35px;
  font-weight: 500;
`;

/**
 * Styling for Login form component elements - Form fields
 */
const FieldContainer = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * Styling for Login form component elements - Error message
 */
const ErrorMessage = styled.div`
  color: ${props => props.theme.colour.red};
  margin-bottom: 1em;
  width: 22rem;
  font-style: italic;
  font-size: 0.9em;
  @media (max-width: 450px) {
    width: 19rem;
  }
`;

const UserIcon = styled(User)`
  color: ${props => props.theme.colour.black};
  margin-left: 0.5em;
  padding-bottom: 0.5em;
  height: 2em;
  position: absolute;
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
