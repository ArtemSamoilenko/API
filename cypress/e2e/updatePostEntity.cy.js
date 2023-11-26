///<reference types = "cypress"/>
import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker";
user.email = faker.internet.email();
user.password = faker.internet.password();

describe("Create/Update post entity", () => {

  it("Create post entity and update the created entity", () => {
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
          id: 107,
          title: 'Test'
        },
      }).then((postResponse) => {
        expect(postResponse.status).to.equal(201);

        const updateEntityData = {
          title: "Title",
        };

        cy.request({
          method: "PUT",
          url: `/posts/107`,
          body: updateEntityData,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.title).to.equal(updateEntityData.title);
        });
      });
    });
  });
});
