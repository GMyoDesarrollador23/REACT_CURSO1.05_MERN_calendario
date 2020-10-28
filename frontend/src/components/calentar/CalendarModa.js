import React, { useState, useEffect } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import { useSelector, useDispatch } from "react-redux";

import { uiCleseModal } from "../../actions/ui";
import {
   eventClearActiveNote,
   eventStartAddNew,
   eventsStartUpdate,
} from "../../actions/event";

// ***********************************************************

// estilos la ventana delmodal
const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
   },
};

// enlace al root
if (process.env.NODE_ENV !== "test") {
   Modal.setAppElement("#root");
}

// hora de inicio y de fin
const nowStart = moment()
   .minutes(0)
   .second(0)
   .add(1, "hours");
const nowEnd = nowStart.clone().add(1, "hours");

// evento nuevo basio
const initEvent = {
   title: "",
   notes: "",
   start: nowStart.toDate(),
   end: nowEnd.toDate(),
};

// ***********************************************************
export const CalendarModa = () => {
   // ------------------------------------------------------

   const dispatch = useDispatch();
   const { modalOpen } = useSelector((state) => state.ui);
   const { activeEvent } = useSelector(
      (state) => state.calendar
   );

   const [formValues, setformValues] = useState(initEvent);
   // hora de inicio
   const [dateStart, setdateStart] = useState(
      nowStart.toDate()
   );
   const [dateEnd, setdateEnd] = useState(nowEnd.toDate());
   const [titleValid, settitleValid] = useState(true);

   const { title, notes, start, end } = formValues;

   useEffect(() => {
      if (activeEvent) {
         setformValues(activeEvent);
      } else {
         setformValues(initEvent);
      }
   }, [activeEvent, setformValues]);

   const handleInputchange = ({ target }) => {
      setformValues({
         ...formValues,
         [target.name]: target.value,
      });
   };

   // cerrar modal
   const closeModal = () => {
      setformValues(initEvent);
      dispatch(uiCleseModal());
      dispatch(eventClearActiveNote());
   };

   const handleStartDateChange = (e) => {
      // ingresar hora de inicio
      setdateStart(e);
      setformValues({ ...formValues, start: e });
   };

   const handleEndDateChange = (e) => {
      // ingresar hora de fin
      setdateEnd(e);
      setformValues({ ...formValues, end: e });
   };

   // *********** ENVIO DEL EVENTO ***********
   const handleSubmitFom = (e) => {
      e.preventDefault();

      // montar las fechas de inicio y final a formato de moment
      const momentStart = moment(start);
      const momentEnd = moment(end);

      // validar que la fecha de fin sea mayor a la de inicio
      if (momentStart.isSameOrAfter(momentEnd)) {
         return Swal.fire(
            "Error",
            "La fecha final debe de ser mayor a la fecha de inicio",
            "error"
         );
      } else if (title.trim().length < 2) {
         // verificar que el titulo del evento sea valido
         return settitleValid(false);
      }

      //aniadir o actualizar un evento
      if (activeEvent) {
         dispatch(eventsStartUpdate(formValues));
      } else {
         dispatch(eventStartAddNew(formValues));
      }

      settitleValid(true);
      closeModal();
   };
   // ------------------------------------------------------
   return (
      <Modal
         isOpen={modalOpen}
         onRequestClose={closeModal}
         style={customStyles}
         closeTimeoutMS={200}
         ariaHideApp={!process.env.NODE_ENV === "test"}
         className="modal"
         overlayClassName="modal-fondo"
      >
         <h1>
            {activeEvent ? "Editar evento" : "Nuevo Evento"}
         </h1>
         <hr />
         <form
            className="container"
            onSubmit={handleSubmitFom}
         >
            <div className="form-group">
               <label>Fecha y hora inicio</label>
               <DateTimePicker
                  onChange={handleStartDateChange}
                  value={dateStart}
                  className="form-control"
               />
            </div>

            <div className="form-group">
               <label>Fecha y hora fin</label>
               <DateTimePicker
                  onChange={handleEndDateChange}
                  value={dateEnd}
                  minDate={dateStart}
                  className="form-control"
               />
            </div>

            <hr />
            <div className="form-group">
               <label>Titulo y notas</label>
               <input
                  type="text"
                  className={`form-control ${
                     !titleValid && "is-invalid"
                  }`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={handleInputchange}
               />
               <small
                  id="emailHelp"
                  className="form-text text-muted"
               >
                  Una descripción corta
               </small>
            </div>

            <div className="form-group">
               <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={notes}
                  onChange={handleInputchange}
               ></textarea>
               <small
                  id="emailHelp"
                  className="form-text text-muted"
               >
                  Información adicional
               </small>
            </div>

            <button
               type="submit"
               className="btn btn-outline-primary btn-block"
            >
               <i className="far fa-save"></i>
               <span> Guardar</span>
            </button>
         </form>
      </Modal>
   );
};
