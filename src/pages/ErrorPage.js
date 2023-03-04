import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    const titEle = document.getElementsByTagName('title')[0];
    titEle.innerHTML = `토이프로젝트 - 에러 페이지`;
  },[]);

  const goHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <header>
        <h2>정보가 없는 페이지 입니다.</h2>
        <button onClick={goHome}>홈으로 가기</button>
      </header>
    </div>
  );
};

export default ErrorPage;
