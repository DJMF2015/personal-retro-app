import { signUpFormMC } from '../../../mc/';

const user = {
  id: '0',
  name: 'Jonny Davidson',
  email: 'jonny1234@g.com',
};

describe('Register User component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains(signUpFormMC.signUpText1).click();
  });

  //Enters in Details that pass validation and attempts to register
  //Test Requires addition of a before statement that clears the user DB
  //Passes if details are new
  it('should post JSON to the retros API when sign up and redirects to /retros route ', () => {
    cy.get('input[name=name]').type('George Jungle');
    cy.get('input[name=email]').type('George.Jungle@and.digital');
    cy.get('input[name=password]').type('Saturn123!');
    cy.get('input[name=confirmPassword]').type('Saturn123!');
    cy.intercept('POST', '/api/users/register', {
      body: user,
    });
    cy.get('button[name=signUpButton]').contains('Sign up').click();

    cy.url().should('include', '/retros');
  });

  it('should display error message if email is duplicate', () => {
    cy.get('input[name=name]').type('George Jungle');
    cy.get('input[name=email]').type('George.Jungle@and.digital');
    cy.get('input[name=password]').type('Saturn123!');
    cy.get('input[name=confirmPassword]').type('Saturn123!');
    cy.get('button[name=signUpButton]').contains('Sign up').click();
    cy.contains('An account with this email has already been created');
  });
});
