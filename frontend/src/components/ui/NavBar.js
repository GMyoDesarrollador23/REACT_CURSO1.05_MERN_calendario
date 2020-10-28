import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import { eventLogout } from "../../actions/event";

export const NavBar = () => {
   const { name } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   
   const handleLogout = () => {
      dispatch(startLogout());
      dispatch(eventLogout())
   };
   return (
      <div className="navbar navbar-dark bg-dark mb-4">
         <span className="navbar-brand">{name}</span>

         <button
            className="btn btn-outline-danger"
            onClick={handleLogout}
         >
            <i className="fas fa-sign-out-alt"></i>
            <span> Salir</span>
         </button>
      </div>
   );
};
