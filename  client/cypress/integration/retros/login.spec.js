//Tests for logging in a user
describe('Login component ', () => {
  before(() => {
    cy.visit('/');
  });
  beforeEach(() => {
    cy.get('input[name=email]').click().clear();
    cy.get('input[name=password]').click().clear();
    cy.reload();
  });

  it('should be able to see sign-in button', () => {
    cy.get('button[name=loginFormBtn]').contains('Login').click();
  });

  it('should throw error message if email does not exist', () => {
    const username = 'doesnot.exist@and.digital';
    const password = Cypress.env('PASSWORD');
    cy.get('input[name=email]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('button[name=loginFormBtn]').contains('Login').click();
    cy.contains(
      'Your username or password is not recognised, please try again'
    );
  });

  it('should throw error message if password is incorrect', () => {
    const username = Cypress.env('EMAIL');
    const password = 'Jungle345!';
    cy.get('input[name=email]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('button[name=loginFormBtn]').contains('Login').click();
    cy.contains(
      'Your username or password is not recognised, please try again'
    );
  });

  it('should Login with Credentials', () => {
    const username = Cypress.env('EMAIL');
    const password = Cypress.env('PASSWORD');
    cy.get('input[name=email]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('button[name=loginFormBtn]').contains('Login').click();
    cy.url().should('include', '/retros');
  });
});
