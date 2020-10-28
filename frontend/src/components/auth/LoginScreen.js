import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import "./login.css";

import {
   startLogin,
   startRegister,
} from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
// ********************************************

export const LoginScreen = () => {
   // Login-------------------------
   const dispatch = useDispatch();
   const [
      FormLoginValues,
      handleLoginInputChange,
   ] = useForm({
      lEmail: "",
      lPassword: "",
   });
   // lEmail: "Pruaba@algo.com",
   // lPassword: "123456",
   const { lEmail, lPassword } = FormLoginValues;

   // -----Register
   const [
      FormRegisterValues,
      handleRegisterInputChange,
   ] = useForm({
      rName: "alvert",
      rEmail: "Pruaba@algoAlgo1.com",
      rPassword: "123456",
      rPassword2: "123456",
   });
   const {
      rName,
      rEmail,
      rPassword,
      rPassword2,
   } = FormRegisterValues;

   // --------------------------------------
   const handleLogin = (e) => {
      e.preventDefault();

      dispatch(startLogin(lEmail, lPassword));
   };

   const handleregister = (e) => {
      e.preventDefault();

      if (rPassword !== rPassword2) {
         return Swal.fire(
            "Error",
            "Las Contrasenias deben de ser iguales",
            "error"
         );
      }
      dispatch(startRegister(rEmail, rPassword, rName));
   };

   // --------------------------------------
   return (
      <div className="container login-container">
         <div className="row">
            <div className="col-md-6 login-form-1">
               <h3>Ingreso</h3>
               <form onSubmit={handleLogin}>
                  <div className="form-group">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Correo"
                        name="lEmail"
                        value={lEmail}
                        onChange={handleLoginInputChange}
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="lPassword"
                        value={lPassword}
                        onChange={handleLoginInputChange}
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="submit"
                        className="btnSubmit"
                        value="Login"
                     />
                  </div>
               </form>
            </div>

            <div className="col-md-6 login-form-2">
               <h3>Registro</h3>
               <form onSubmit={handleregister}>
                  <div className="form-group">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="rName"
                        value={rName}
                        onChange={handleRegisterInputChange}
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name="rEmail"
                        value={rEmail}
                        onChange={handleRegisterInputChange}
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="rPassword"
                        value={rPassword}
                        onChange={handleRegisterInputChange}
                     />
                  </div>

                  <div className="form-group">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña"
                        name="rPassword2"
                        value={rPassword2}
                        onChange={handleRegisterInputChange}
                     />
                  </div>

                  <div className="form-group">
                     <input
                        type="submit"
                        className="btnSubmit"
                        value="Crear cuenta"
                     />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};
