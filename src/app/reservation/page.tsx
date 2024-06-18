'use client';

import { useEffect, useState } from 'react';
import { fetchReservations } from '../../libs/gas_api';

// type Reservation = {
//   room: string;
//   date: string;
//   startTime: string;
//   endTime: string;
// };

// const Home = () => {
//   const [reservations, setReservations] = useState<Reservation[]>([]);

//   useEffect(() => {
//     const getReservations = async () => {
//       const data = await fetchReservations();
//       setReservations(data);
//     };

//     getReservations();
//   }, []);

//   const getRoomStatus = (room: string) => {
//     const today = new Date().toISOString().split('T')[0];
//     return reservations.some(res => res.room.includes(room) && res.date === today);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">購読室の予約状況</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {['購読室1', '購読室2', '購読室3'].map(room => (
//           <div key={room} className="border rounded-lg p-4 text-center">
//             <h2 className="text-xl font-semibold mb-2">{room}</h2>
//             <p className={getRoomStatus(room) ? 'text-red-500' : 'text-green-500'}>
//               {getRoomStatus(room) ? '予約済み' : '空き'}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

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

  const getRoomStatus = (room: string) => {
    const today = new Date().toISOString().split('T')[0];
    return reservations.some(res => res.room.includes(room) && res.date === today);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">購読室の予約状況</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['購読室1', '購読室2', '購読室3'].map(room => (
          <div key={room} className="border rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold mb-2">{room}</h2>
            <p className={getRoomStatus(room) ? 'text-red-500' : 'text-green-500'}>
              {getRoomStatus(room) ? '予約済み' : '空き'}
            </p>
          </div>
        ))}
      </div>

      {/* デバッグ情報の表示 */}
      {loading && <p>データを読み込み中...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <h2 className="text-xl font-bold">デバッグ情報</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(reservations, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Home;