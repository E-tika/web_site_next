'use client'

import { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

// Modal.setAppElement('#__next'); // For accessibility, binds the modal to your app root

const SeminarPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1 flex justify-center items-center">
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl mb-4 font-bold">ゼミ紹介</h1>
        <p className='leading-loose'>
          京都大学経済学部では3年生よりゼミに入ることが可能となっており、2年の11月に選考が始まります。<br />
          経済学部同好会では10月末-11月始めに経済学部ゼミ合同説明会を開催しております。<br />
          ゼミへの参加は必須ではありませんが、卒業論文を執筆する場合は必要となります。

        </p>
        <h2 className="text-xl mt-4 mb-2 font-semibold">過去のゼミ紹介資料</h2>
        <p>説明</p>
        <ul className="list-disc pl-5">
          <li><a href="https://drive.google.com/drive/folders/1jOsREXJm3o4yoEWUWsrSqLdouFu0ddtJ?usp=drive_link" className="text-blue-500 underline" target='_blank' rel='noopener noreferrer'>2022年度ゼミ紹介 (2021年10月28日開催)</a></li>
          <li><a href="https://drive.google.com/drive/folders/1KkXWGqlsTGjYPO7wBUF8t9Z3sP7wRCum?usp=drive_link" className="text-blue-500 underline" target='_blank' rel='noopener noreferrer'>2021年度ゼミ紹介 (2020年11月01日開催)</a></li>
          <li><a href="https://drive.google.com/drive/folders/1hFrTsBb_hoOhht17ROZKiZ7FcpWxFNVw?usp=drive_link" className="text-blue-500 underline" target='_blank' rel='noopener noreferrer'>2020年度ゼミ紹介 (2019年11月06日開催)</a></li>
          <li><a href="https://drive.google.com/drive/folders/19DLi4SUp_Om9wMLOEzZBgwFJy2FJJ5lg?usp=drive_link" className="text-blue-500 underline" target='_blank' rel='noopener noreferrer'>2019年度ゼミ紹介 (2018年10月31日開催)</a></li>
        </ul>
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
            src="/images/seminar_image.png"
            alt="Seminar"
            width={800}
            height={800}
            className="block"
          />
        </div>
      </Modal>
    </div>
  );
};

export default SeminarPage;
