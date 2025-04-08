import './BubblingModal.css'; // CSS 스타일을 외부 파일로 작성할 예정입니다.


const BubblingModal = ({ isOpen, onClose }) => {
    console.log("모달")
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <h2>모달 창</h2>
          <input type="text" placeholder="여기에 입력" />
          <textarea placeholder="여기에 텍스트 입력"></textarea>
        </div>
      </div>
    );
  };
  export default BubblingModal;
  