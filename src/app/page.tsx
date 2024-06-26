'use client'

import { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

// Modal.setAppElement('#__next'); // For accessibility, binds the modal to your app root

const HomePage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="flex-1 flex justify-center items-center">
        <Image
          src="/images/classroom_map.png"
          alt="Sample"
          width={500}
          height={500}
          className="cursor-pointer"
          onClick={openModal}
        />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl mb-4">説明文</h1>
        <p>
          ここに説明文が入ります。これはサンプルの説明文です。
          画像をクリックするとポップアップが表示され、画像が拡大されます。
        </p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white p-4">
          <button onClick={closeModal} className="absolute top-2 right-2 text-black">
            ✖
          </button>
          <Image
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
