import React, { useEffect, useState } from "react";
import "./Configuraciones.css";
import {
  getConfigurations,
  postApiKey,
  deleteApiKey,
  postChannel,
} from "./Service";

import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const Configuraciones = () => {
  const [apiKey, setApiKey] = useState("");
  const [channels, setChannels] = useState(null);
  // New channel vars
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDuration, setNewChannelDuration] = useState("");
  const [newChannelInit, setNewChannelInit] = useState("");

  const [open, setOpen] = useState(false);
  const [irrigationDays, setIrrigationDays] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setIrrigationDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChannels = () => {
    if (channels) {
      channels.push({
        channelID: uid(),
        name: newChannelName,
        duration: newChannelDuration,
        init: newChannelInit,
        days: irrigationDays,
        status: false,
        ultRiego: "Nunca",
      });
      postChannel(channels).then((response) => {
        setChannels(channels);
      });
    } else {
      let newChannels = [
        {
          channelID: uid(),
          name: newChannelName,
          duration: newChannelDuration,
          init: newChannelInit,
          days: irrigationDays,
          status: false,
          ultRiego: "Nunca",
        },
      ];
      postChannel(newChannels).then((response) => {
        setChannels(channels);
      });
    }
    handleClose();
  };

  const saveApiKey = (value) => {
    setApiKey(value);
  };

  const handleSaveApiKey = () => {
    postApiKey(apiKey).then((apiKey) => {
      setApiKey(apiKey);
    });
  };

  const handleDeleteApiKey = () => {
    deleteApiKey().then((response) => {
      console.log(response);
      setApiKey("");
    });
  };

  const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  useEffect(() => {
    getConfigurations().then((configs) => {
      if (configs.api_key && configs.api_key !== "") {
        setApiKey(configs.api_key);
      }
      if (configs.channels && configs.channels !== "") {
        setChannels(configs.channels);
      }
    });
  }, []);

  return (
    <div>
      <div className="configs-apiKey-card">
        <div className="configs-apiKey-card-col1">
          <div className="configs-apiKey-card-col1-title">
            <a href="https://home.openweathermap.org/api_keys" target="blank">
              API_KEY de OpenWeather
            </a>
            <KeyIcon />
          </div>
          <TextField
            value={apiKey}
            onChange={(e) => {
              saveApiKey(e.target.value);
            }}
            placeholder="Escribe tu API_KEY"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SaveIcon onClick={handleSaveApiKey} />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="configs-apiKey-card-col2">
          <DeleteForeverIcon color="warning" onClick={handleDeleteApiKey} />
          <p onClick={handleDeleteApiKey} >Elimina tu API_KEY</p>
        </div>
      </div>
      <div className="configs-addChannel-card">
        <p>Agregar canal</p>
        <AddCircleIcon onClick={handleClickOpen} style={{width: '40px', height: '40px'}}/>
      </div>
      {channels &&
        channels.map((channel) => (
          <div className="configs-channel-card" key={channel.name}>
            <div>
              <Typography variant="h6">{channel.name}</Typography>
              <Stack direction="row" spacing={1}>
                {channel.days &&
                  channel.days.map((day) => (
                    <Chip
                      label={
                        channel.days.length >= 4
                          ? day.substring(0, 2)
                          : day.substring(0, 3)
                      }
                      key={day}
                      color="success"
                    />
                  ))}
              </Stack>
            </div>
            <div className="configs-channel-card-col2">
              <p>{channel.init}hs</p>
              <div className="configs-channel-card-col2-duration">
                <AccessTimeIcon />
                <Typography variant="subtitle">{channel.duration}min</Typography>
              </div>
            </div>
          </div>
        ))}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Agregar canal de riego
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>Nombre</Typography>
          <TextField
            placeholder="Nombre"
            value={newChannelName}
            onChange={(e) => {
              setNewChannelName(e.target.value);
            }}
          />
          <Typography gutterBottom>Duracion</Typography>
          <TextField
            placeholder="Duracion del riego"
            value={newChannelDuration}
            onChange={(e) => {
              setNewChannelDuration(e.target.value);
            }}
          />
          <Typography gutterBottom>Inicios</Typography>
          <TextField
            placeholder="Hora de inicio"
            value={newChannelInit}
            onChange={(e) => {
              setNewChannelInit(e.target.value);
            }}
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={irrigationDays}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  <Checkbox checked={irrigationDays.indexOf(day) > -1} />
                  <ListItemText primary={day} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveChannels}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
