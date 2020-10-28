import { types } from "../types/types";

// {
//    id: ,
//    title: "Cumple del jefe",
//    start: moment().toDate(),
//    end: moment().add(2, "hour").toDate(),
//    notes: "",
//    user: {
//       _id: "",
//       name: "",
//    },
// },

// evento de preuba
const incitialState = {
   events: [],
   activeEvent: null,
};

export const calendarReducer = (
   state = incitialState,
   action
) => {
   switch (action.type) {
      case types.eventSetActive:
         return { ...state, activeEvent: action.payload };

      case types.eventAddNew:
         return {
            ...state,
            events: [...state.events, action.payload],
         };

      case types.eventClearActiveEvent:
         return {
            ...state,
            activeEvent: null,
         };
      case types.eventUpdated:
         return {
            ...state,
            events: state.events.map((e) =>
               e.id === action.payload.id
                  ? action.payload
                  : e
            ),
         };

      case types.eventDeleted:
         return {
            ...state,
            events: state.events.filter(
               (e) => e.id !== state.activeEvent.id
            ),
            activeEvent: null,
         };

      case types.eventLoaded:
         return {
            ...state,
            events: [...action.payload],
         };

      case types.authLogout:
         return {
           ...incitialState
         };
      default:
         return state;
   }
};
