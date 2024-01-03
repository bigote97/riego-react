import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Use useNavigate instead of useHistory
import './Layout.css';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudIcon from '@mui/icons-material/Cloud';
import PersonIcon from '@mui/icons-material/Person';

export const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  const navigateTo = (to) => {
    navigate(to);
  };

  return (
    <div className='container'>
        <div onClick={() => { navigateTo('/inicio'); }} className='section-button'>
            <HomeIcon className={`section-icons ${location.pathname === '/inicio' ? 'section-icons-selected' : ''}`} />
            <p className={`section-texts ${location.pathname === '/inicio' ? 'section-texts-selected' : ''}`} >Inicio</p>
        </div>
        <div onClick={() => { navigateTo('/configuraciones'); }} className='section-button'>
            <SettingsIcon className={`section-icons ${location.pathname === '/configuraciones' ? 'section-icons-selected' : ''}`} />
            <p className={`section-texts ${location.pathname === '/configuraciones' ? 'section-texts-selected' : ''}`} >Configs</p>
        </div>
        <div onClick={() => { navigateTo('/riegos'); }} className='section-button'>
            <WaterDropIcon className={`section-icons ${location.pathname === '/riegos' ? 'section-icons-selected' : ''}`} />
            <p className={`section-texts ${location.pathname === '/riegos' ? 'section-texts-selected' : ''}`}>Riegos</p>
        </div>
        <div onClick={() => { navigateTo('/clima'); }} className='section-button'>
            <CloudIcon className={`section-icons ${location.pathname === '/clima' ? 'section-icons-selected' : ''}`} />
            <p className={`section-texts ${location.pathname === '/clima' ? 'section-texts-selected' : ''}`} >Clima</p>
        </div>
        <div onClick={() => { navigateTo('/usuarios'); }} className='section-button'>
            <PersonIcon className={`section-icons ${location.pathname === '/usuarios' ? 'section-icons-selected' : ''}`} />
            <p className={`section-texts ${location.pathname === '/usuarios' ? 'section-texts-selected' : ''}`} >Usuario</p>
        </div>
    </div>
  );
};
