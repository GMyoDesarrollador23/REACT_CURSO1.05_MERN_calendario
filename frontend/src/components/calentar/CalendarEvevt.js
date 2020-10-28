import React from "react";

export const CalendarEvevt = ({ event }) => {
   const { title, user } = event;
   return (
      <div>
         <strong>{title}</strong>
         <strong>-{user.name}</strong>
      </div>
   );
};
