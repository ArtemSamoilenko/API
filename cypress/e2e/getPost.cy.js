///<reference types = "cypress"/>
import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker";
user.email = faker.internet.email();
user.password = faker.internet.password();

describe("Get all posts", () => {
  it("Get all posts", () => {
    cy.request({
      method: "GET",
      url: "/posts",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
    });
  });

  it("Get only first 10 posts", () => {
    cy.request({
      method: "GET",
      url: "/posts",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.lengthOf.at.least(10);
      const first10Items = response.body.slice(0, 10);
      expect(first10Items).to.have.lengthOf(10);
    });
  });

  it("Get posts with id = 55 and id = 60", () => {
    cy.request({
      method: "GET",
      url: "/posts",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.be.an("array");
      const itemsWithId55And60 = response.body.filter(
        (item) => item.id === 55 || item.id === 60
      );
      expect(itemsWithId55And60).to.have.lengthOf(2);
      itemsWithId55And60.forEach((item) => {
        expect(item.title).to.not.be.empty;
      });
    });
  });

  it("Create a post", () => {
    cy.request({
      method: "POST",
      url: "/664/posts",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
