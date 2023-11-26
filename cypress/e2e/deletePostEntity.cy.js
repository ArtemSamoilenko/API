///<reference types = "cypress"/>
import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker";
user.email = faker.internet.email();
user.password = faker.internet.password();

describe("Delete post entity", () => {
    it("Create post entity, update the created entity, and delete the entity", () => {
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
                id: 108,
                title: 'Test'
              },
          }).then((postResponse) => {
            expect(postResponse.status).to.equal(201);
    
            const updateEntityData = {
              title: "Title 222",
            };
    
            cy.request({
              method: "PUT",
              url: `/posts/108`,
              body: updateEntityData,
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              expect(response.status).to.equal(200);
              expect(response.body.title).to.equal(updateEntityData.title);
    
              cy.request({
                method: "DELETE",
                url: `/posts/108`,
              }).then((deleteResponse) => {
                expect(deleteResponse.status).to.equal(200);
              });
            });
          });
        });
      });
});
