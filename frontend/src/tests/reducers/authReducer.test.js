import "@testing-library/jest-dom";
import { types } from "../../types/types";
const {
   authReducer,
} = require("../../reducers/authReducer");

describe("Pruebas en el auhReducer", () => {
   const initialState = {
      checking: true,
   };
   // -----------------------------------------------
   test("debe de retornar el estado por defecto", () => {
      const state = authReducer(initialState, {});
      expect(state).toEqual(initialState);
   });

   // -----------------------------------------------
   test("debe de autenficar el usuario", () => {
      const action = {
         type: types.authLogin,
         payload: {
            uid: "123",
            name: "gerardo",
         },
      };
      const state = authReducer(initialState, action);
      //   console.log(state);

      expect(state).toEqual({
         checking: false,
         uid: "123",
         name: "gerardo",
      });
   });
   // -----------------------------------------------
   test("debe de verificar el checking", () => {
      const action = {
         type: types.authCheckingFinish,
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
         checking: false,
      });
   });
   // -----------------------------------------------

   test("verificando el logout", () => {
      const action = {
         type: types.authLogout,
      };
      const state = authReducer(initialState, action);

      expect(state).toEqual({
         checking: false,
      });
   });
   // -----------------------------------------------
});
