import "@testing-library/jest-dom";
const {
   fetchSinToken,
   fetchConToken,
} = require("../../helpers/fetch");

// ********************************************************
describe("Pruebas en el fetch", () => {
   let token = "";
   // ----------------------------------------------
   test("Fetch sin token debe funcionar", async () => {
      const resp = await fetchSinToken(
         "auth",
         {
            email: "Pruaba@algo.com",
            password: "123456",
         },
         "POST"
      );

      const body = await resp.json();
      token = body.token;

      expect(resp instanceof Response).toBe(true);
      expect(body.ok).toBe(true);
   });

   // ----------------------------------------------
   test("Fetch con token debe funcionar", async () => {
      localStorage.setItem("token", token);
      const resp = await fetchConToken(
         "events/5f25db5e09673d0a98202cce",
         {},
         "DELETE"
      );
      const body = await resp.json();

      expect(body.msg).toBe(
         "el evento no exite con ese id"
      );
   });
   // -----------------------------------------------
});
