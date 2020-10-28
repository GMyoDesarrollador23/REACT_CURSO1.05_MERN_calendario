import React from "react";
import moment from "moment";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import { fire } from "sweetalert2";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { act } from "@testing-library/react";
import configureStore from "redux-mock-store";

import {
   eventsStartUpdate,
   eventClearActiveNote,
   eventStartAddNew,
} from "../../../actions/event";
import { CalendarModa } from "../../../components/calentar/CalendarModa";
// *******************************************************

jest.mock("../../../actions/event", () => ({
   eventsStartUpdate: jest.fn(),
   eventClearActiveNote: jest.fn(),
   eventStartAddNew: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
   fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// hora de inicio y de fin
const nowStart = moment()
   .minutes(0)
   .second(0)
   .add(1, "hours");
const nowEnd = nowStart.clone().add(1, "hours");

const initialState = {
   auth: {
      uid: "123",
      name: "Gerardo",
   },
   calendar: {
      events: [],
      activeEvent: {
         title: "hola Mundo",
         notes: "algunas cosas",
         start: nowStart.toDate(),
         end: nowEnd.toDate(),
      },
   },
   ui: {
      modalOpen: true,
   },
};

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
   <Provider store={store}>
      <CalendarModa />
   </Provider>
);

// ******************************************************

describe("preubas en <CalendarModa/>", () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });
   // ----------------------------------------------
   test("debe mostrar el modal ", () => {
      //   expect(wrapper.find(".modal").exists()).toBe(true);
      expect(wrapper.find("Modal").prop("isOpen")).toBe(
         true
      );
   });
   // ----------------------------------------------
   test("debe de llamar la accion de actualizar ", () => {
      wrapper.find("form").simulate("submit", {
         preventDefault() {},
      });
      expect(eventsStartUpdate).toHaveBeenCalledWith(
         initialState.calendar.activeEvent
      );
      expect(eventClearActiveNote).toHaveBeenCalled();
   });
   // ----------------------------------------------

   test("debe de mostrar el error si el titulo esta vacio", () => {
      wrapper.find("form").simulate("submit", {
         preventDefault() {},
      });

      expect(
         wrapper
            .find('input[name="title"]')
            .hasClass("is-invalid")
      ).toBe(true);
   });

   test("debe de crear un nuevo evento", () => {
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
            modalOpen: true,
         },
      };

      const store = mockStore(initialState);
      store.dispatch = jest.fn();

      const wrapper = mount(
         <Provider store={store}>
            <CalendarModa />
         </Provider>
      );
      wrapper
         .find('input[name="title"]')
         .simulate("change", {
            target: {
               name: "title",
               value: "otro dia para morir",
            },
         });
      wrapper.find("form").simulate("submit", {
         preventDefault() {},
      });

      expect(eventStartAddNew).toHaveBeenCalledWith({
         end: expect.anything(),
         notes: "",
         start: expect.anything(),
         title: "otro dia para morir",
      });
      expect(eventClearActiveNote).toHaveBeenCalled();
   });
   // -----------------------------------------------------
   test("debe de baidar las fechas", () => {
      wrapper
         .find('input[name="title"]')
         .simulate("change", {
            target: {
               name: "title",
               value: "otro dia para morir",
            },
         });

      const hoy = new Date();
      act(() => {
         wrapper
            .find("DateTimePicker")
            .at(1)
            .prop("onChange")(hoy);
      });
      wrapper.find("form").simulate("submit", {
         preventDefault() {},
      });

      expect(fire).toHaveBeenCalledWith(
         "Error",
         "La fecha final debe de ser mayor a la fecha de inicio",
         "error"
      );
   });
});
