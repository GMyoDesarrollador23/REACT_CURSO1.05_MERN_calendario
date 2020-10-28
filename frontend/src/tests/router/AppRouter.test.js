import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { AppRouter } from "../../router/AppRouter";

// *******************************************************

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();

// ******************************************************
describe("Pruebas en <AppRouter/>", () => {
   // --------------------------------------------

   // --------------------------------------------
   test("debe de mostrar el mensaje de espere", () => {
      const initialState = {
         auth: {
            checking: true,
         },
      };
      const store = mockStore(initialState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );
      //   expect(wrapper).toMatchSnapshot();
      expect(wrapper.find("h1").exists()).toBe(true);
   });
   // --------------------------------------------
   
   test("debe de mostrar ruta publica", () => {
      const initialState = {
         auth: {
            checking: false,
            uid: null,
         },
      };
      const store = mockStore(initialState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );
      expect(wrapper).toMatchSnapshot();
      expect(
         wrapper.find(".login-container").exists()
      ).toBe(true);
   });
   // --------------------------------------------
   
   test("debe de mostrar ruta publica", () => {
      const initialState = {
         auth: {
            checking: false,
            uid: "123",
            name: "hola",
         },
         calendar: {
            events: [],
         },
         ui: {
            modalOpen: false,
         },
      };
      const store = mockStore(initialState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(".calendar-scren").exists()).toBe(
         true
      );
   });
   // --------------------------------------------
});
