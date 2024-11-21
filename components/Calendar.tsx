'use client'

import React, { useState } from 'react'

const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

const MyCalendar = () => {
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState([
    { date: new Date(2024, 6, 28), event: 'Réunion de projet' },
    { date: new Date(2024, 6, 30), event: 'Présentation produit' },
  ])

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      const isSelected = currentDate.toDateString() === date.toDateString()
      const hasEvent = events.some(event => event.date.toDateString() === currentDate.toDateString())

      days.push(
        <button
          key={i}
          onClick={() => setDate(currentDate)}
          className={`p-2 m-1 rounded-full ${
            isSelected
              ? 'bg-blue-500 text-white'
              : hasEvent
              ? 'bg-green-200'
              : 'hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      )
    }

    return days
  }

  const renderEvents = (date: Date) => {
    return events
      .filter(event => event.date.toDateString() === date.toDateString())
      .map((event, index) => <li key={index} className="mb-1">{event.event}</li>)
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))} className="text-gray-600 hover:text-gray-800">
            &lt;
          </button>
          <h2 className="text-lg font-semibold">
            {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
          </h2>
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))} className="text-gray-600 hover:text-gray-800">
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 p-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-semibold">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Événements pour le {date.toDateString()} :</h2>
        <ul className="list-disc pl-5">
          {renderEvents(date)}
        </ul>
      </div>
    </div>
  )
}

export default MyCalendar

