import cypress from "cypress";

describe("Users Management", () => {
  // BeforeEach is executed before each test
  beforeEach(() => {
    cy.task("deleteAllUsers");
    cy.visit("http://localhost:5173");
  });

  describe("Getting a list of users", () => {
    it("should open the listing without users", () => {
      cy.contains("No Users yet.");
    });

    it("should list the users", () => {
      cy.task("createUser", {
        name: "João",
        email: "joao@gmail.com",
        password: "123456",
      });

      cy.get(".MuiTable-root tbody").contains("João");
      cy.get(".MuiTable-root tbody").contains("joao@gmail.com");
      cy.get(".MuiTable-root tbody").contains("123456");
    });
  });

  describe("Creating a user", () => {
    it("should create a user", () => {
      cy.get(".RaCreateButton-root").click();

      cy.get("input[name='name']").type("João");
      cy.get("input[name='email']").type("joao@gmail.com");
      cy.get("input[name='password']").type("123456");

      cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();
    });

    it("should create a user when pressing enter", () => {
      cy.get(".RaCreateButton-root").click();

      cy.get("input[name='name']").type("João");
      cy.get("input[name='email']").type("joao@gmail.com");
      cy.get("input[name='password']").type(`123456{enter}`);
    });
  });

  describe("Editing a user", () => {
    it("should edit a user", () => {
      cy.task("createUser", {
        name: "João",
        email: "joao@gmail.com",
        password: "123456",
      });

      cy.get(".MuiTableBody-root > .MuiTableRow-root:first").click();

      cy.get("input[name='name']").clear().type("Maria");
      cy.get("input[name='email']").clear().type("maria@gmail.com");
      cy.get("input[name='password']").clear().type("654321");

      cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

      cy.get(".MuiTable-root tbody").contains("Maria");
      cy.get(".MuiTable-root tbody").contains("maria@gmail.com");
      cy.get(".MuiTable-root tbody").contains("654321");
    });

    it("should not save changes if user cancels after clicking Save", () => {
      cy.task("createUser", {
        name: "João",
        email: "joao@gmail.com",
        password: "123456",
      });

      cy.get(".MuiTableBody-root > .MuiTableRow-root:first").click();

      cy.get("input[name='name']").clear().type("Maria");
      cy.get("input[name='email']").clear().type("maria@gmail.com");
      cy.get("input[name='password']").clear().type("654321");

      cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

      cy.get(".MuiSnackbarContent-action > .MuiButtonBase-root").click();

      cy.get(".MuiTable-root tbody").contains("João");
      cy.get(".MuiTable-root tbody").contains("joao@gmail.com");
      cy.get(".MuiTable-root tbody").contains("123456");
    });
  });

  describe("Deleting a user", () => {
    it("should delete a user", () => {
      cy.task("createUser", {
        name: "João",
        email: "joao@gmail.com",
        password: "123456",
      });

      cy.get(".MuiTableBody-root > .MuiTableRow-root:first").click();

      cy.get(".MuiButton-text").click();

      cy.contains("No Users yet.");
    });

    it('should not delete the user if deletion is canceled', () => {
      cy.task("createUser", {
        name: "João",
        email: "joao@gmail.com",
        password: "123456",
      });

      cy.get(".MuiTableBody-root > .MuiTableRow-root:first").click();

      cy.get(".MuiButton-text").click();

      cy.get(".MuiSnackbarContent-action > .MuiButtonBase-root").click();

      cy.get(".MuiTable-root tbody").contains("João");
      cy.get(".MuiTable-root tbody").contains("joao@gmail.com");
      cy.get(".MuiTable-root tbody").contains("123456");
    });
  });
});