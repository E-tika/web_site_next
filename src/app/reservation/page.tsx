'use client';

import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchReservations } from '../../libs/gas_api';

type Reservation = {
  room: string;
  date: string;
  startTime: string;
  endTime: string;
};

const Home = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getReservations = async () => {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (err) {
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    getReservations();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const getRoomReservations = (room: string, date: Date) => {
    const selectedDate = date.toLocaleDateString('sv-SE');
    const roomReservations = reservations.filter(res => {
      const roomArray = res.room.split(',').map(r => r.trim());
      return roomArray.includes(room) && formatDate(res.date) === selectedDate;
    });
    return roomReservations;
  };


  const timeToMinutes = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let i = 5; i < 21; i++) {
      for (let j = 0; j < 60; j += 15) {
        timeSlots.push(`${String(i).padStart(2, '0')}:${String(j).padStart(2, '0')}`);
      }
    }
    const rooms = ['購読室 1', '購読室 2', '購読室 3'];

    return timeSlots.map((timeSlot) => (
      <div key={timeSlot} className="flex">
        <div className="w-24 border p-2">{timeSlot}</div>
        {rooms.map((room) => {
          const roomReservations = getRoomReservations(room, date);
          const isReserved = roomReservations.some(
            res => { return timeToMinutes(timeSlot) >= timeToMinutes(res.startTime) && timeToMinutes(timeSlot) < timeToMinutes(res.endTime) }
          );

          return (
            <div key={room} className={`flex-1 border p-2 ${isReserved ? 'text-white bg-red-500' : 'text-green-500'}`}>
              {isReserved ? '予約済み' : '空き'}
            </div>
          );
        })}
      </div>
    ));
  };

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className='mb-8'>
        <p>
          購読室の予約は必ず予約状況を確認し、重複して予約されないようにお願いします。<br />
          重複予約については、先の予約を優先させていただきます。
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-start gap-4">
        <div className="flex-shrink-0 mt-0 sm:mt-4 min-w-[260px]">
          <h1 className="text-2xl font-bold mb-4">購読室の予約状況</h1>
          <p className="mb-4">選択した日付: {date.toLocaleDateString('ja-JP')}</p>
          <Calendar value={date} onChange={handleDateChange} locale="ja-JP" />
        </div>
        <div className="flex-grow pl-0 sm:pl-4 mt-4 sm:mt-0">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex">
              <div className="w-24 border p-2">時間</div>
              {['購読室 1', '購読室 2', '購読室 3'].map(room => (
                <div key={room} className="flex-1 border p-2 text-center">{room}</div>
              ))}
            </div>
            <div className='scrollable-block'>
              {renderTimeSlots()}
            </div>
          </div>
          {loading && <p>データを読み込み中...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>


      <div className='flex justify-center mt-4'>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfQHRnymDvVVwQe63wrCdeZ_RVEamptZhAgVOz3y5O86MPGAQ/viewform?embedded=true" width="640" height="1000">読み込んでいます…</iframe>
      </div>
    </div>
  );
};

export default Home;
