///<reference types = "cypress"/>
import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker";
user.email = faker.internet.email();
user.password = faker.internet.password();

describe("Create post entity", () => {
  it("Create post entity and verify that the entity is created", () => {
    const registrationUrl = "/register";
    const postUrl = "/posts";
    cy.request({
      method: "POST",
      url: registrationUrl,
      body: user,
    }).then((registrationResponse) => {
      expect(registrationResponse.status).to.equal(201);
      const accessToken = registrationResponse.body.accessToken;

      cy.request({
        method: "POST",
        url: postUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: {
          id: 106,
          title: 'Test'
        },
      }).then((postResponse) => {
        expect(postResponse.status).to.equal(201);
      });
    });
  });
});
