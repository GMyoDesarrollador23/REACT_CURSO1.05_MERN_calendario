import "@testing-library/jest-dom";
const { types } = require("../../types/types");

describe("Pruebas en los types", () => {
   const typesTest = {
      uiOpenModal: "[ui] Open modal",
      uiCleseModal: "[ui] Close modal",

      eventLogout: "[event] Event logout",
      eventStartAddNew: "[event] Stat add New",
      eventSetActive: "[event] Set Active",
      eventAddNew: "[event] Add New",
      eventClearActiveEvent: "[event] Clear Active event",
      eventUpdated: "[event] Event Update",
      eventDeleted: "[event] Event delete",
      eventLoaded: "[event] Event loaded",

      authCheckingFinish:
         "[Auth] Finish Checking login state",
      authStartLogin: "[Auth] Start Login",
      authLogin: "[Auth] Login",
      authStartRegister: "[Auth] Start Register",
      authStartTokenRenew: "[Auth] Start Token Renew",
      authLogout: "[Auth] Start Logout",
   };

   test("debe de tener los tipos correctos", async () => {
      expect(types).toEqual(typesTest);
   });
});
