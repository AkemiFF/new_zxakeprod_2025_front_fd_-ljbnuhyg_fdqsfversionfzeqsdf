// components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([
        { date: new Date(2024, 6, 28), event: 'Réunion de projet' },
        { date: new Date(2024, 6, 30), event: 'Présentation produit' },
    ]);

    const onChange = (date) => {
        setDate(date);
    };

    const renderEvents = (date) => {
        return events
        .filter(event => event.date.toDateString() === date.toDateString())
        .map((event, index) => <li key={index}>{event.event}</li>);
    };

    return (
        <div>
        <Calendar onChange={onChange} value={date} />
        <div>
            <h2>Événements pour le {date.toDateString()} :</h2>
            <ul>
            {renderEvents(date)}
            </ul>
        </div>
        </div>
    );
};

export default MyCalendar;
