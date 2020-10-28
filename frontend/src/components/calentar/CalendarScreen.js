import React, { useState, useEffect } from "react";
import "moment/locale/es";
import moment from "moment";
import {
   Calendar,
   momentLocalizer,
} from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { NavBar } from "../ui/NavBar";
import { AddNewFab } from "../ui/AddNewFab";
import { CalendarModa } from "./CalendarModa";
import { uiOpenModal } from "../../actions/ui";
import { CalendarEvevt } from "./CalendarEvevt";
import {
   eventSetActive,
   eventClearActiveNote,
   eventStartLoading,
} from "../../actions/event";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { messages } from "../../helpers/calendar-messages-es";

moment.locale("es");

const localizer = momentLocalizer(moment);

// **********************************************************
export const CalendarScreen = () => {
   // ------------------------------------------------------
   const { uid } = useSelector((state) => state.auth);
   const { events, activeEvent } = useSelector(
      (state) => state.calendar
   );
   const dispatch = useDispatch();
   const [lastView, setlastView] = useState(
      localStorage.getItem("lastView")
   );
   
   useEffect(() => {
      // llamando los evento cuando estos cambien
      dispatch(eventStartLoading());
   }, [dispatch]);

   // ------------------------------------------------------
   const onDobleClick = () => {
      // abrir el moodal
      dispatch(uiOpenModal());
   };

   const onSelectevent = (e) => {
      // activar el evento seccionado
      dispatch(eventSetActive(e));
   };

   const onViewChange = (e) => {
      // guardar en el localStorge la ultima vista
      setlastView(e);
      localStorage.setItem("lastView", e);
   };

   // estilos de los eventos
   const eventStyleGetter = (
      event,
      start,
      end,
      isSelcted
   ) => {
      // console.log(event, start, end, isSelcted);

      const style = {
         backgroundColor:
            uid === event.user._id ? "#367cf7" : "#465660",
         borderRadius: "0px",
         opacity: 0.8,
         display: "block",
         color: "white",
      };
      return { style };
   };

   const onSelectSlot = () => {
      dispatch(eventClearActiveNote());
   };
   // --------------------------------------------------------
   return (
      <div className="calendar-scren">
         <NavBar />

         <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDobleClick}
            onSelectEvent={onSelectevent}
            onView={onViewChange}
            onSelectSlot={onSelectSlot}
            selectable={true}
            view={lastView || "month"}
            components={{ event: CalendarEvevt }}
         />

         <AddNewFab />

         {activeEvent && <DeleteEventFab />}

         <CalendarModa />
      </div>
   );
};
