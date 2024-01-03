import React, { useState, useEffect } from 'react'
import { postCiudad, getCiudad, deleteCiudad } from './Service'

import KeyIcon from "@mui/icons-material/Key";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from '@mui/icons-material/Save';
import { TextField } from "@mui/material";

export const Usuarios = () => {
  const [ciudad, setCiudad] = useState('');

  const saveCiudad = (value) => {
    setCiudad(value)
  }

  const handleSaveCiudad = () => {
    postCiudad(ciudad)
      .then(ciudad => {
        setCiudad(ciudad)
      });
  }

  const handleDeleteCiudad = () => {
    deleteCiudad().then(response=>{
      console.log(response);
      setCiudad('')
    })
  }

  useEffect(() => {
    getCiudad().then((ciudad) => {
      if (ciudad && ciudad !== "") {
        setCiudad(ciudad);
      }
    });
  }, []);

  return (
    <div>
      <div className="configs-apiKey-card">
        <div>
          <span>Ciudad</span>
          <KeyIcon />
          <TextField value={ciudad} onChange={(e)=>{saveCiudad(e.target.value)}} placeholder="Escribe tu Ciudad" />
          <SaveIcon onClick={handleSaveCiudad}/>
        </div>
        <div>
          <DeleteForeverIcon color='warning' onClick={handleDeleteCiudad}/>
          <p>Elimina tu ciudad</p>
        </div>
      </div>
    </div>
  )
}
