///<reference types = "cypress"/>
import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker";
user.email = faker.internet.email();
user.password = faker.internet.password();

describe("Create post", () => {
  it("Create post with adding access token in header", () => {
    const registrationUrl = "/register";
    const postUrl = "/664/posts";
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
        },
      }).then((postResponse) => {
        expect(postResponse.status).to.equal(201);
      });
    });
  });
});
