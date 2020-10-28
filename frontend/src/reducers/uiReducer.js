import { types } from "../types/types";

const initialState = {
   modalOpen: false,
};

// Reducer encargado de majejar si el modal se abre o se cierra
export const uiReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.uiOpenModal:
         return { ...state, modalOpen: true };

      case types.uiCleseModal:
         return { ...state, modalOpen: false };

      default:
         return state;
   }
};
