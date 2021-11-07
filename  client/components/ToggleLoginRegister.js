import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useState } from 'react';
import { loginFormMC, signUpFormMC } from '../mc/';
import styled from 'styled-components';

const ToggleLoginRegister = () => {
  /**
   * Declare default component state variables
   */
  const [forms, setForms] = useState({
    signup: false,
    login: true,
  });

  /**
   * Handler for switching states between signup and login
   */
  const handleForm = () => {
    setForms(prevState => ({
      signup: !prevState.signup,
      login: !prevState.login,
    }));
  };

  const renderToggle = () => {
    if (forms.signup) {
      return (
        <>
          {loginFormMC.loginTitleHeader}{' '}
          <RedLink>{loginFormMC.loginText}</RedLink>
        </>
      );
    }
    return (
      <>
        {signUpFormMC.signUpText1} <RedLink>{signUpFormMC.signUpText2}</RedLink>
      </>
    );
  };

  return (
    <>
      {forms.login && <LoginForm />}
      {forms.signup && <SignUpForm />}
      <br />
      <StyledToggleButton onClick={() => handleForm()}>
        {renderToggle()}
      </StyledToggleButton>
    </>
  );
};

const StyledToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
`;

const RedLink = styled.span`
  color: ${props => props.theme.colour.red};
`;
export default ToggleLoginRegister;
