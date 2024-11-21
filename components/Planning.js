// components/RoomPlanning.js
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import style from './Planning.module.css';
import { formatDate } from '@fullcalendar/core';

const RoomPlanning = (props) => {


  const eventTemplate = (value) => {
    console.log(props);
    return (
      <div className={style.evenement_container}>
        <span>{value.event.title}</span>
        <div className={style.evenement_duree}>
          <span><i className='pi pi-sun' /> {value.event.extendedProps.jour} jour</span>
          <span>-</span>
          <span><i className='pi pi-moon' /> {value.event.extendedProps.nuit} nuit</span>
          <span>-</span>
          <span><i className='pi pi-moon' /> {value.event.extendedProps.nbRoom} chambre</span>
        </div>
      </div>
    )
  }

  return (
    <div className={style.calendarContainer}>
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineMonth"
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        resources={props.rooms}
        events={props.events}
        eventContent={eventTemplate}
        views={{
          resourceTimelineMonth: {
            titleFormat: { year: 'numeric', month: 'long' },
            dayHeaderFormat: { weekday: 'short', day: 'numeric', omitCommas: true }
          }
        }}
        slotDuration="24:00" // Durée de 24 heures pour chaque slot
        slotLabelInterval={{ days: 1 }} // Intervalle de 1 jour pour les slots
        slotLabelFormat={{ weekday: 'short', day: 'numeric', omitCommas: true }} // Format de la date
        height="auto"
        contentHeight="auto"
        slotMinWidth={100}
        resourceAreaWidth="150px"
        className="fc"
      />
    </div>
  );
};

export default RoomPlanning;
