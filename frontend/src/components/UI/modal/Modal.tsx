import { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ onClose, text, closeButton, actions }: IModal) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
        onClose();
    }, 400)
  }

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal__wrapper">
        {closeButton && (
          <button className="modal__close" onClick={closeModal}>
            &times;
          </button>
        )}
        <div className="modal__main">
            <h2 className="modal__main-title">{text}</h2>
        </div>
      </div>
      <div className="modal__actions">{actions}</div>
    </div>
    
  );
}

export default Modal;
