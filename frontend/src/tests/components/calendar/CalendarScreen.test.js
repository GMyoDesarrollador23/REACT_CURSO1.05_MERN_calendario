import React from "react";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { messages } from "../../../helpers/calendar-messages-es";
import { CalendarScreen } from "../../../components/calentar/CalendarScreen";
import { types } from "../../../types/types";
import { eventSetActive } from "../../../actions/event";
import { act } from "@testing-library/react";
// *******************************************************
jest.mock("../../../actions/event", () => ({
   eventSetActive: jest.fn(),
   eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
   auth: {
      uid: "123",
      name: "Gerardo",
   },
   calendar: {
      events: [],
      activeEvent: null,
   },
   ui: {
      modalOpen: false,
   },
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
   <Provider store={store}>
      <CalendarScreen />
   </Provider>
);

// ******************************************************
describe("Prebas en el <CalendarModa/>", () => {
   // -------------------------------------------
   test("debe mostrarse correctamente ", () => {
      expect(wrapper).toMatchSnapshot();
   });
   // -------------------------------------------
   test("pruebas con las interacciones ", () => {
      const calendar = wrapper.find("Calendar");

      const calendarMessages = calendar.prop("messages");
      expect(calendarMessages).toEqual(messages);

      calendar.prop("onDoubleClickEvent")();
      expect(store.dispatch).toHaveBeenCalledWith({
         type: types.uiOpenModal,
      });

      calendar.prop("onSelectEvent")({ start: "hola" });
      expect(eventSetActive).toHaveBeenCalledWith({
         start: "hola",
      });
      act(() => {
         calendar.prop("onView")("week");
         expect(localStorage.setItem).toHaveBeenCalledWith(
            "lastView",
            "week"
         );
      });
   });
});
