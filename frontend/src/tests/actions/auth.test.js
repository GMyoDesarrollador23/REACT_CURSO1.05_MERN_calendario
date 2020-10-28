import Swal from "sweetalert2";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import { types } from "../../types/types";
import {
   startLogin,
   startRegister,
   startChecking,
} from "../../actions/auth";
import * as fetchModule from "../../helpers/fetch";

// *************************************************

jest.mock("sweetalert2", () => ({
   fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

let store = mockStore(initialState);

let token = "";

// *************************************************

describe("pruebas en el auth", () => {
   // ----------------------------------

   beforeEach(() => {
      store = mockStore(initialState);
      jest.clearAllMocks();
   });
   // ----------------------------------

   test("startLogin correcto", async () => {
      Storage.prototype.setItem = jest.fn();

      // dispara la accion
      await store.dispatch(
         startLogin("Pruaba@algo.com", "123456")
      );
      //   recuperando las acciones llamadas
      const actions = store.getActions();

      //   verificando que las acciones se hayan llamado correctamente
      expect(actions[0]).toEqual({
         type: types.authLogin,
         payload: {
            uid: expect.any(String),
            name: expect.any(String),
         },
      });
      expect(localStorage.setItem).toHaveBeenCalledWith(
         "token",
         expect.any(String)
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
         "token-init-date",
         expect.any(Number)
      );

      //   console.log(localStorage.setItem.mock.calls[0][1]);
      token = localStorage.setItem.mock.calls[0][1];
   });
   // ----------------------------------

   test("startLogin incorrecto", async () => {
      await store.dispatch(
         startLogin("Pruaba@algo.com", "1234561")
      );
      const actions = store.getActions();

      expect(actions).toEqual([]);
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalledWith(
         "Error",
         "Password Incorrecto",
         "error"
      );
      // console.log(actions);
   });
   // ----------------------------------

   test("startRegister cerrecto", async () => {
      fetchModule.fetchSinToken = jest.fn(() => ({
         json() {
            return {
               ok: true,
               uid: "123",
               name: "Test",
               token: "1234567890",
            };
         },
      }));

      await store.dispatch(
         startRegister("test@test.com", "123456", "test")
      );
      const actions = store.getActions();
      // console.log(actions);

      expect(actions[0]).toEqual({
         type: types.authLogin,
         payload: { uid: "123", name: "Test" },
      });
      expect(localStorage.setItem).toHaveBeenCalledWith(
         "token",
         "1234567890"
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
         "token-init-date",
         expect.any(Number)
      );
   });
   // ----------------------------------

   test("startChecking correcto ", async () => {
      fetchModule.fetchConToken = jest.fn(() => ({
         json() {
            return {
               ok: true,
               uid: "123",
               name: "Test",
               token: "1234567890",
            };
         },
      }));
      await store.dispatch(startChecking());
      const actions = store.getActions();

      localStorage.setItem("token", token);
      // console.log(actions);

      expect(actions[0]).toEqual({
         type: types.authLogin,
         payload: { uid: "123", name: "Test" },
      });
      expect(localStorage.setItem).toHaveBeenCalledWith(
         "token",
         "1234567890"
      );
   });
});
