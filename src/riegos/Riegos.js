import React, { useEffect, useState } from 'react'
import './Riegos.css'
import { getRiegos} from './Services'
import { ChannelRow } from './ChannelRow'

export const Riegos = () => {
  const [riegos, setRiegos]= useState(null)

  useEffect(() => {

    getRiegos()
      .then(riegos => {
        setRiegos(riegos)
      });
    
  }, []);

  return (
    <div>
    <h2>Riegos</h2>
      {riegos && riegos.map((riego)=>(
        <ChannelRow channel={riego.name} ultRiego={riego.ultRiego} status={riego.status} channelID={riego.channelID} key={riego.channelID}/>
      ))}
    </div>
  )
}
