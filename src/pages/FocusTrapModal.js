import React, { useEffect, useRef } from "react";
import "./BubblingModal.css"; // CSS 스타일을 외부 파일로 작성할 예정입니다.

const FocusTrapModal = ({ isOpen, onClose }) => {
  const focusTrapArea = useRef(null);
  const focusPossibleEles = useRef([]);
  const currFocusIdx = useRef(0);

  const handleTab = () => {
    const currHtml = focusPossibleEles.current[currFocusIdx.current + 1];
    if (currHtml !== undefined) {
      currHtml.focus();
      currFocusIdx.current++;
      return;
    }
    focusPossibleEles.current[0].focus();
    currFocusIdx.current = 0;
  };

  const wrapHandleTab = (e) => {
    e.preventDefault();
    if (!e.shiftKey && e.key === "Tab") {
      handleTab();
    }
  };

  const handleShiftTab = () => {
    const currenthtml = focusPossibleEles.current[currFocusIdx.current - 1];
    if (currenthtml !== undefined) {
      currenthtml.focus();
      currFocusIdx.current--;
      return;
    }
    focusPossibleEles.current.at(-1).focus();
    currFocusIdx.current = focusPossibleEles.current.length - 1;
  };

  const wrapHandleShiftTab = (e) => {
    e.preventDefault();
    if (e.shiftKey && e.key === "Tab") {
      handleShiftTab();
    }
  };

  const preventKeyDown = (e) => {
    // 한글 제어
    if (e.isComposing) {
      return;
    }

    wrapHandleTab(e);
    wrapHandleShiftTab(e);
  }; // end preventKeyDown();

  const handleBeforeUnload = (event) => {
    const message = "변경사항이 저장되지 않았습니다. 정말 떠나시겠습니까?";
    event.returnValue = message; // 일부 브라우저에서 메시지를 표시할 수 있도록 함.
    return message; // 다른 브라우저에서도 메시지를 표시하기 위해 필요.
  };
  // 키보드 키인 관련 예외처리
  useEffect(() => {
    if (isOpen) {
      // focusTrapArea.current.children 은 HTMLCollection 형태로 반환
      // 배열 메서드가 필요하기 때문에 Array.from() 로 배열로 변환 하여 사용
      // tabindex가 -1보다 크고 disabled 안되어있는 요소들만 필터링 해서 가져옴.
      // 이 요소들을 focusPossibleEles 변수에 넣어준다.
      focusPossibleEles.current = Array.from(
        focusTrapArea.current.children
      ).filter((val) => val.tabIndex >= 0 && val.disabled !== true);
      console.log(focusTrapArea.current.children);
      focusPossibleEles.current[0].focus();
      focusTrapArea.current.addEventListener("keydown", preventKeyDown);

      // beforeunload 이벤트 리스너 등록
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      if (focusTrapArea.current) {
        focusTrapArea.current.removeEventListener("keydown", preventKeyDown);
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOpen]);

  const handleOnClick = (e) => {
    e.preventDefault();
    currFocusIdx.current = e.target.tabIndex;
    focusPossibleEles.current[e.target.tabIndex].focus();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={focusTrapArea}>
        <button className="close-btn" onClick={onClose} tabIndex={-1}>
          X
        </button>
        <h2>모달 창</h2>

        <input
          type="text"
          placeholder="여기에 입력"
          onClick={handleOnClick}
          tabIndex={0}
        />
        <textarea
          placeholder="여기에 텍스트 입력"
          onClick={handleOnClick}
          tabIndex={1}
        />
        <input
          type="text"
          placeholder="여기에 입력"
          onClick={handleOnClick}
          tabIndex={2}
        />
        <input
          type="text"
          placeholder="여기에 입력"
          onClick={handleOnClick}
          tabIndex={3}
        />

        <button onClick={onClose} tabIndex={-1}>
          {" "}
          저장{" "}
        </button>
        <button onClick={onClose} tabIndex={-1}>
          취소
        </button>
        <button disabled onClick={onClose} tabIndex={-1}>
          임시저장
        </button>
      </div>
    </div>
  );
};
export default FocusTrapModal;
