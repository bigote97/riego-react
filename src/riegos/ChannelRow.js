import React, { useState } from "react";

import { putRiego } from './Services'
import "./Riegos.css";

import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Status switch" } };

export const ChannelRow = ({ channelID, channel, ultRiego, status }) => {
  const [irrigationStatus, setIrrigationStatus] = useState(status);

  const handleChange = () => {

    putRiego(channelID, !irrigationStatus)
      .then(response => {
        setIrrigationStatus(response)
      });
  };
  return (
    <div className="channel-card">
      <div className="channel-card-info">
        <p>{channel}</p>
        <p>{ultRiego}</p>
      </div>
      <div className="channel-card-actions">
				<Switch
					{...label}
					color="success"
					checked={irrigationStatus}
					onChange={handleChange}
				/>
				<p>{irrigationStatus ? 'Regando' : 'Apagado'}</p>
			</div>
    </div>
  );
};
