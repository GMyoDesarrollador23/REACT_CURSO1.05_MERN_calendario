import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventsStartDelete } from "../../../actions/event";

// *******************************************************
jest.mock("../../../actions/event", () => ({
   eventsStartDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
   <Provider store={store}>
      <DeleteEventFab />
   </Provider>
);

// ******************************************************
describe("pruebas en el <DeleteEventFab/>", () => {
   // --------------------------------------------
   test("debe de mostrarse correctamente", () => {
      expect(wrapper).toMatchSnapshot();
   });
   // --------------------------------------------

   test("debe de hecer la llamada", () => {
      wrapper.find("button").prop("onClick")();
      expect(eventsStartDelete).toHaveBeenCalled();
   });
   // --------------------------------------------
});
