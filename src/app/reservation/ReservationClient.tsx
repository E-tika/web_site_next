// src/app/reservation/ReservationClient.tsx
'use client';

import { useState } from 'react';
import { Reservation } from '../../libs/types';

type ReservationClientProps = {
    initialReservations: Reservation[];
    weekDates: string[];
};

const ReservationClient = ({ initialReservations, weekDates }: ReservationClientProps) => {
    const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

    const renderCalendar = () => {
        return weekDates.map((date) => (
            <div key={date} className="flex flex-col items-center border p-2">
                <h3>{date}</h3>
                {['購読室 1', '購読室 2', '購読室 3'].map((room) => {
                    const isBooked = reservations.some(
                        (reservation) => reservation.room === room && reservation.date === date
                    );
                    return (
                        <div
                            key={room}
                            className={`w-32 h-16 flex items-center justify-center border ${isBooked ? 'bg-red-500' : 'bg-green-500'
                                }`}
                        >
                            {room}
                        </div>
                    );
                })}
            </div>
        ));
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">購読室予約状況</h2>
            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
        </div>
    );
};

export default ReservationClient;
