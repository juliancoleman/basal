/// <reference types="cypress" />

describe('Button', () => {
  it('renders', () => {
    cy.visit('http://localhost:8080/?path=/story/button--demo-button');
    cy.get('#root').find('button');
  });
});
