import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [originData, setOriginData] = useState();
  const diaryList = useContext(DiaryStateContext);

  useEffect(()=>{
    const titEle = document.getElementsByTagName('title')[0];
    titEle.innerHTML = `토이프로젝트 - ${id}번 일기 수정`;
  },[]);

  useEffect(() => {
    if (diaryList.length > 1) {
      const targetList = diaryList.find(
        (ele) => parseInt(ele.id) === parseInt(id)
      );
      if (targetList) {
        setOriginData(targetList);
      } else {
        navigate("/ErrorPage", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
