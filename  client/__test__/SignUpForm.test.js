// import react-testing methods
import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import SignUpForm from '../components/SignUpForm';

const renderComponent = () =>
  render(
    <ThemeProvider theme={{ colour: { black: 'black', red: 'red' } }}>
      <SignUpForm />
    </ThemeProvider>
  );

/**
 * Test suite for validation on sign up  form component
 */
describe('Password fields', () => {
  it('Should display correct error message when invalid password is entered', async () => {
    const { getByText, getByPlaceholderText, findByText } = renderComponent();
    const passwordField = getByPlaceholderText('Create new password');
    const submitButton = getByText('Sign up', { selector: 'button' });

    userEvent.type(passwordField, '123ABC');
    userEvent.click(submitButton);
    await waitFor(async () => {
      const error = await findByText(
        'Password must contain a minimum of 8 characters, at 1 number, 1 special character, 1 upper case and 1 lower case.'
      );
      expect(error).toBeInTheDocument();
    });
  });

  it('Should display correct error message when both passwords dont match', async () => {
    const { getByText, getByPlaceholderText, findByText } = renderComponent();

    const passwordField = getByPlaceholderText('Create new password');
    const confirmPasswordField = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Sign up', { selector: 'button' });
    userEvent.type(passwordField, 'Password1*');
    userEvent.type(confirmPasswordField, 'Password1!');
    submitButton.click(submitButton);

    await waitFor(async () => {
      const error = await findByText('Both password need to be the same');
      expect(error).toBeInTheDocument();
    });
  });
});

describe('Email field', () => {
  it('Should display correct error if user does not enter @and.digital email', async () => {
    const { getByText, getByPlaceholderText, findByText } = renderComponent();

    const emailField = getByPlaceholderText('Email address');
    const submitButton = getByText('Sign up', { selector: 'button' });

    userEvent.type(emailField, 'testemail@gmail.com');
    submitButton.click(submitButton);

    await waitFor(async () => {
      const error = await findByText(
        'Please use your @and.digital email to sign up'
      );
      expect(error).toBeInTheDocument();
    });
  });

  it('Should ensure user must enter a valid email', async () => {
    const { getByText, getByPlaceholderText, findByText } = renderComponent();

    const emailField = getByPlaceholderText('Email address');
    const submitButton = getByText('Sign up', { selector: 'button' });

    userEvent.type(emailField, 'invalidemail');
    submitButton.click(submitButton);

    await waitFor(async () => {
      const error = await findByText(
        'Please use your @and.digital email to sign up'
      );
      expect(error).toBeInTheDocument();
    });
  });
});

describe('Required fields', () => {
  it('Should return "Required" error when required fields are empty', async () => {
    const { getByText, findAllByText } = renderComponent();

    const submitButton = getByText('Sign up', { selector: 'button' });

    submitButton.click(submitButton);

    await waitFor(async () => {
      const error = await findAllByText('Required');
      expect(error).toHaveLength(4);
    });
  });
});
