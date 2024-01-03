import React from "react";
import {BrowserRouter as Router, Route, Navigate , Routes } from "react-router-dom";
import { ProtectedRoutes } from "../tools/ProtectedRoutes";
import { Layout } from "./Layout";
import './App.css'
// Rutas publicas
import { SignIn } from "../users/SignIn";
import { SignUp } from "../users/SignUp";
// Rutas privadas
import { Riegos } from "../riegos/Riegos";
import { Inicio } from "../inicio/Inicio";
import { Configuraciones } from "../configuraciones/Configuraciones";
import { Usuarios } from "../usuario/Usuarios";
import { Clima } from "../clima/Clima";

function App() {
  
  const user = {
    nombre: 'carlito',
    id: 12312312
  }; // Reemplazar con el estado de autenticación real
   
  return (
    <Router>
      <div className='app-container'>
        <Layout/>
        <Routes>
          {/* Rutas publicas */}
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          {/* Rutas privadas */}
          <Route element={<ProtectedRoutes user={user} />}>
            
            <Route exact path="/" element={<Inicio />} />
            <Route exact path="/inicio" element={<Inicio />} />
            <Route exact path="/configuraciones" element={<Configuraciones />} />
            <Route exact path="/riegos" element={<Riegos />} />
            <Route exact path="/clima" element={<Clima />} />
            <Route exact path="/usuarios" element={<Usuarios />} />
          </Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
