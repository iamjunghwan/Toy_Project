import React, { useEffect, useRef, useState } from "react";
import FocusTrapModal from "./FocusTrapModal";

const FocusTrap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const audioArea = useRef(null);
  const [currentState, setCurrentState] = useState(false);

  useEffect(() => {
    console.log(audioArea);
  }, []);

  function audioPlay() {
    console.log(audioArea.current.audio);

    if (currentState) {
      audioArea.current.play();
    } else {
      audioArea.current.pause();
    }
    setCurrentState((prev) => !prev);
  }

  return (
    <>
      <input></input>
      <input></input>
      <input></input>
      {/* <h2>React Audio Player</h2>
      <audio ref={audioArea} controls>
        <source src={"/assets/one.mp3"} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={() => audioPlay()}>재생||정지</button> */}

      <button onClick={() => openModal()}>모달 열기</button>
      {isModalOpen && (
        <FocusTrapModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};
export default FocusTrap;
