// First test
describe('Test Login Authentication workflow', () => {
  it('Tries to login with dummy details', () => {
    cy.visit("http://localhost:3000");

    cy.contains("Log In").click();

    cy.get("#email-address").type("example@gmail.com");
    cy.get("#password").type("12345678");

    cy.contains("Sign In").click();

    cy.url().should("include", "/notes");
  })
})