import React, { useContext, useEffect, useRef, useState , useMemo, useCallback } from "react";

const Bubbling = () => {


  const handleChildClick = (e) => {
    
    alert('세번째 자식 컴포넌트가 클릭되었습니다!');
     //e.stopPropagation(); // 버블링을 막으려면 이 줄을 주석 해제
  };

  return (
    <div onClick={handleChildClick} style={{ padding: '50px', backgroundColor: '#f0f0f0' }}>
      {'세번째 자식'}
    </div>
  );
};

export default Bubbling;

