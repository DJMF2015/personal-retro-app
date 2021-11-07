// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../pages/index';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import ToggleLoginRegister from '../components/ToggleLoginRegister';
import { signUpFormMC } from '../mc/index';
import { ThemeProvider } from 'styled-components';

jest.useFakeTimers();

/**
 * Test suite for rendering login form component
 */
describe('Rendering login form components', () => {

  const renderLoginForm = () => render(
    <ThemeProvider theme={{ colour: { black: 'black', red: 'red' } }}>
      <LoginForm />
    </ThemeProvider>
  );

  it('renders Email Address form entry', () => {
    const {getAllByPlaceholderText} = renderLoginForm();
    expect(getAllByPlaceholderText('Email address'));
  });

  it('renders Enter Password form entry', () => {
    const {getByPlaceholderText} = renderLoginForm();
    expect(getByPlaceholderText('Password'));
  });

  it('Renders Login button', () => {
    const {getByText} = renderLoginForm();
    expect(getByText('Login'));
  });
});

/**
 * Test suite for rendering signup form component
 */
describe('Rendering signup form components', () => {
  const renderSignUpForm = () => render(
    <ThemeProvider theme={{ colour: { black: 'black', red: 'red' } }}>
      <SignUpForm />
    </ThemeProvider>
  );

  it('renders full name form entry', () => {
    const {getByPlaceholderText} = renderSignUpForm();
    expect(getByPlaceholderText('Full name'));
  });

  it('renders create new password form entry', () => {
    const {getByPlaceholderText} = renderSignUpForm();
    expect(getByPlaceholderText('Create new password'));
  });

  it('renders confirm password form entry', () => {
    const {getByPlaceholderText} = renderSignUpForm();
    expect(getByPlaceholderText('Confirm password'));
  });

  it('Renders Sign Up button', () => {
    const {getByText} = renderSignUpForm();
    expect(getByText('Sign up'));
  });
});

/**
 * Test for render of alt text of logo
 */
describe('Rendering Logo', () => {

  it('find logo by alt text', () => {
    render(<Logo />);
    expect(screen.getByAltText('expand-logo'));
  });
});

describe('Toggles between login and signup component', () => {

  const renderToggleLoginRegister = () => render(
    <ThemeProvider theme={{ colour: { black: 'black', red: 'red' } }}>
      <ToggleLoginRegister />
    </ThemeProvider>
  );

  it('should render toggle button', () => {
    const {getByText} = renderToggleLoginRegister();
    expect(getByText(signUpFormMC.signUpText1));
  });

  it('when button pressed should render different message', () => {
    const {getByText} = renderToggleLoginRegister();
    fireEvent.click(getByText(signUpFormMC.signUpText1));
    expect(getByText('Already a member?'));
  });

  it('when button pressed login form is displayed', () => {
    const {getByText, getByPlaceholderText, queryAllByPlaceholderText} = renderToggleLoginRegister();
    expect(queryAllByPlaceholderText('Password'));
    fireEvent.click(getByText(signUpFormMC.signUpText1));
    expect(getByPlaceholderText('Create new password'));
  });
});
