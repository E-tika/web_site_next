'use client'

import { useState } from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#__next'); // For accessibility, binds the modal to your app root

const HomePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="flex-1 flex justify-center items-center">
        <img
          src="/images/classroom_map.png"
          alt="Sample"
          width={500}
          height={500}
          className="cursor-pointer"
          onClick={openModal}
        />
      </div>
      <div className="flex-1 p-4">
        <p>
          ここは経済学部同好会のホームページです。メニューから、以下の機能にアクセスすることができます。
        </p>
        <ul className="list-disc list-inside">
          <li>購読室の利用予約</li>
          <li>専門科目の過去問閲覧</li>
          <li>輪転機の利用申請</li>
          <li>過去のゼミ紹介資料閲覧</li>
        </ul>
        <p>
          各ページに詳しい案内が書かれていますので、ご参考ください。ホームページ内の画像は、クリック/タップによって拡大表示されます。
        </p>
        <h2 className="text-xl mt-4 mb-2 font-extrabold text-red-500">！人員募集中！</h2>
        <p>
          経済学部同好会常任委員会は後継者不足に悩んでいます。回生を問わずに人員を募集していますので、ご興味がありましたら地下の同好会事務室までお越しいただくか、お問い合わせからご連絡ください。
        </p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white p-4 relative">
          <button onClick={closeModal} className="absolute top-2 right-2 text-black">
            ✖
          </button>
          <img
            src="/images/classroom_map.png"
            alt="Sample"
            width={800}
            height={800}
            className="block"
          />
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
