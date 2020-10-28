import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import { fire } from "sweetalert2";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import {
   startLogin,
   startRegister,
} from "../../../actions/auth";
import { LoginScreen } from "../../../components/auth/LoginScreen";
// *******************************************************

jest.mock("../../../actions/auth", () => ({
   startLogin: jest.fn(),
   startRegister: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
   fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
   <Provider store={store}>
      <LoginScreen />
   </Provider>
);

// ******************************************************
describe("Pruebas en el <loginScreen/>", () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });
   // -------------------------------------------
   test("debe mostrarse correctmente", () => {
      expect(wrapper).toMatchSnapshot();
   });
   // -------------------------------------------
   test("debe de llamar el dispatch del login", () => {
      wrapper
         .find('input[name="lEmail"]')
         .simulate("change", {
            target: {
               name: "lEmail",
               value: "Test@test.com",
            },
         });
      wrapper
         .find('input[name="lPassword"]')
         .simulate("change", {
            target: {
               name: "lPassword",
               value: "123456",
            },
         });

      wrapper.find("form").at(0).prop("onSubmit")({
         preventDefault() {},
      });

      expect(startLogin).toHaveBeenCalledWith(
         "Test@test.com",
         "123456"
      );
   });
   // -------------------------------------------

   test("no hay registro si las contrasenias son diferentes", () => {
      wrapper
         .find('input[name="rPassword"]')
         .simulate("change", {
            target: {
               name: "rPassword",
               value: "12345er62",
            },
         });
      wrapper.find("form").at(1).prop("onSubmit")({
         preventDefault() {},
      });

      expect(startRegister).not.toHaveBeenCalled();
      expect(fire).toHaveBeenCalledWith(
         "Error",
         "Las Contrasenias deben de ser iguales",
         "error"
      );
   });
   // -------------------------------------------

   test("debe de dipararse el registro con password iguales", () => {
      wrapper
         .find('input[name="rPassword"]')
         .simulate("change", {
            target: {
               name: "rPassword",
               value: "12345er62",
            },
         });
      wrapper
         .find('input[name="rPassword2"]')
         .simulate("change", {
            target: {
               name: "rPassword2",
               value: "12345er62",
            },
         });

      wrapper.find("form").at(1).prop("onSubmit")({
         preventDefault() {},
      });

      expect(startRegister).toHaveBeenCalledWith(
         "Pruaba@algoAlgo1.com",
         "12345er62",
         "alvert"
      );
      expect(fire).not.toHaveBeenCalled();
   });
   // -------------------------------------------
});
