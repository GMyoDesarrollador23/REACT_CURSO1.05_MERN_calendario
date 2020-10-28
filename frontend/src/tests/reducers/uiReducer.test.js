import "@testing-library/jest-dom";
import { types } from "../../types/types";
import {
   uiOpenModal,
   uiCleseModal,
} from "../../actions/ui";

const { uiReducer } = require("../../reducers/uiReducer");

const initialState = {
   modalOpen: false,
};

describe("Pruebas en el uiReducer ", () => {
   // --------------------------------------------------
   test("debe de retornar el estado por defecto", () => {
      const state = uiReducer(initialState, {});
      expect(state).toEqual(initialState);
   });
   // --------------------------------------------------
   
   test("debe de abrir y cerrar el modal", () => {
      const modalOpen = uiOpenModal();
      const modalClose = uiCleseModal();

      const state = uiReducer(initialState, modalOpen);
      const stateClose = uiReducer(state, modalClose);

      expect(state).toEqual({ modalOpen: true });
      expect(stateClose).toEqual({ modalOpen: false });
   });
   // --------------------------------------------------
});
