import {  useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {

  useEffect(()=>{
    const titEle = document.getElementsByTagName('title')[0];
    titEle.innerHTML = `토이프로젝트 - 새 일기 작성`;
  },[]);

  return (
    <div>
      <DiaryEditor></DiaryEditor>
    </div>
  );
};

export default New;
