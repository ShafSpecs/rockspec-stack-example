// import { mount } from "@cypress/react";
// import Notes from "../../app/routes/notes";

describe("Test the notes route in isolation (test)", () => {
  // it("Renders the note component", () => {
  //   mount(<Notes />);
  //   cy.get("h3").should("contain", "Notes");
  // })

  it("Contains the header, no matter the child route.", () => {
    cy.visit("http://localhost:3000/notes");

    cy.get("h3").should("contain", "Notes");

    // cy.get("div").should("have.class", "mobile").click();
    // cy.get("div").should("have.class", "mobile").contains("Dashboard").click();

    cy.url().should("include", "/notes");
  })
})