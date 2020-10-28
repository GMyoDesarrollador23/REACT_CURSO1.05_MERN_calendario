import React, { useEffect } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startChecking } from "../actions/auth";
import { CalendarScreen } from "../components/calentar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
// ********************************************************

export const AppRouter = () => {
   const dispatch = useDispatch();
   const { checking, uid } = useSelector(
      (state) => state.auth
   );

   useEffect(() => {
      dispatch(startChecking()); 
   }, [dispatch]);

   if (checking) {
      return <h1>Espere...</h1>;
   }

   return (
      <Router>
         <div>
            <Switch>
               <PublicRoute
                  exact
                  path="/login"
                  isAuthenticated={!!uid}
                  component={LoginScreen}
               />
               <PrivateRoute
                  exact
                  isAuthenticated={!!uid}
                  path="/"
                  component={CalendarScreen}
               />
               <Redirect to="/" />
            </Switch>
         </div>
      </Router>
   );
};
