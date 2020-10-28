import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { prepereevents } from "../helpers/prepereEvents";

// resiveir el evento activo
export const eventSetActive = (event) => ({
   type: types.eventSetActive,
   payload: event,
});

// limpiar nota activa
export const eventClearActiveNote = () => ({
   type: types.eventClearActiveEvent,
});

// purgar la nota activa cuado el usuario cierra cesion
export const eventLogout = () => ({
   type: eventLogout,
});


// POST -> CREATE
export const eventStartAddNew = (event) => {
   return async (dispatch, getState) => {
      const { uid, name } = getState().auth;

      try {
         // enviar el evento al backend
         const resp = await fetchConToken(
            "events",
            event,
            "POST"
         );
         const body = await resp.json();

         if (body.ok) {
            // aniadir el id y el usuario
            event.id = body.evento.id;
            event.user = {
               _id: uid,
               name,
            };

            // dispara el evento
            dispatch(eventAddNew(event));
         }
      } catch (error) {
         console.error(error);
      }
   };
};

// GET -> READ
export const eventStartLoading = () => {
   return async (dipatch) => {
      try {
         // recuperando los eventos de la base de datos
         const resp = await fetchConToken("events");
         const body = await resp.json();
         const events = prepereevents(body.eventos);

         // console.log(events);

         dipatch(eventLoaded(events));
      } catch (error) {
         console.error(error);
      }
   };
};

// PUT -> UPDATE
export const eventsStartUpdate = (event) => {
   return async (dispatch) => {
      try {
         // console.log(event);
         const resp = await fetchConToken(
            `events/${event.id}`,
            event,
            "PUT"
         );
         const body = await resp.json();
         if (body.ok) {
            dispatch(eventUpdate(event));
         } else {
            Swal.fire("Error", body.msg, "error");
         }
      } catch (error) {
         console.error(error);
      }
   };
};

// DELETE
export const eventsStartDelete = () => {
   return async (dispatch, getState) => {
      const { activeEvent } = getState().calendar;
      try {
         const resp = await fetchConToken(
            `events/${activeEvent.id}`,
            {},
            "DELETE"
         );
         const body = await resp.json();
         if (body.ok) {
            dispatch(eventDeleted());
         } else {
            Swal.fire("Error", body.msg, "error");
         }
      } catch (error) {
         console.error(error);
      }
   };
};
// ---------------------------------------------------------

// aniadir nuevo evento
const eventAddNew = (event) => ({
   type: types.eventAddNew,
   payload: event,
});

// cargar Eventos
const eventLoaded = (events) => ({
   type: types.eventLoaded,
   payload: events,
});

// actualizar nota activa
const eventUpdate = (event) => ({
   type: types.eventUpdated,
   payload: event,
});

// eliminar nota activa
const eventDeleted = () => ({
   type: types.eventDeleted,
});
