import { types } from "../types/types";
import {
   fetchSinToken,
   fetchConToken,
} from "../helpers/fetch";
import Swal from "sweetalert2";

// verifica la autentificacion
export const startLogin = (email, password) => {
   return async (dispatch) => {
      const resp = await fetchSinToken(
         "auth",
         { email, password },
         "POST"
      );

      const body = await resp.json();

      if (body.ok) {
         // gravear el token y la hora en el localStorage
         localStorage.setItem("token", body.token);
         localStorage.setItem(
            "token-init-date",
            new Date().getTime()
         );
         dispatch(
            login({
               uid: body.uid,
               name: body.name,
            })
         );
      } else {
         Swal.fire("Error", body.msg, "error");
      }
   };
};

// registrar nuevo usuario
export const startRegister = (email, password, name) => {
   return async (dispatch) => {
      const resp = await fetchSinToken(
         "auth/new",
         {
            email,
            password,
            name,
         },
         "POST"
      );
      const body = await resp.json();

      if (body.ok) {
         localStorage.setItem("token", body.token);
         localStorage.setItem(
            "token-init-date",
            new Date().getTime()
         );
         dispatch(
            login({
               uid: body.uid,
               name: body.name,
            })
         );
      } else {
         Swal.fire("Error", body.msg, "error");
      }
   };
};
// revalidar el token
export const startChecking = () => {
   return async (dispatch) => {
      const resp = await fetchConToken("auth/renew");
      const body = await resp.json();

      if (body.ok) {
         localStorage.setItem("token", body.token);
         localStorage.setItem(
            "token-init-date",
            new Date().getTime()
         );
         dispatch(
            login({
               uid: body.uid,
               name: body.name,
            })
         );
      } else {
         dispatch(checkingFinish());
      }
   };
};

export const startLogout = () => {
   return (dispatch) => {
      localStorage.clear();
      dispatch(Logout());
   };
};
// -------------------------------------------
const checkingFinish = () => ({
   type: types.authCheckingFinish,
});

const login = (user) => ({
   type: types.authLogin,
   payload: user,
});

const Logout = () => ({
   type: types.authLogout,
});
