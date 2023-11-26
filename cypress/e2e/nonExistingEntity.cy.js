///<reference types = "cypress"/>
import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker";
user.email = faker.internet.email();
user.password = faker.internet.password();

describe("Non-existing entity", () => {
  it("Update non-existing entity", () => {
    cy.request({
      method: "PUT",
      url: "/posts",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("Delete non-existing post entity", () => {
    cy.request({
      method: "DELETE",
      url: "/posts",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
