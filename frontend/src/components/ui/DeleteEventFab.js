import React from "react";
import { useDispatch } from "react-redux";
import { eventsStartDelete } from "../../actions/event";

export const DeleteEventFab = () => {
   const dispatch = useDispatch();

   const handleDelete = () => {
      dispatch(eventsStartDelete());
   };

   return (
      <button
         className="btn btn-outline-danger fab-danger"
         onClick={handleDelete}
      >
         <i className="fas fa-trash"></i>
         <span> Eliminar Evento</span>
      </button>
   );
};
