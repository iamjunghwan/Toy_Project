import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //react custom hook
  const [originData, setOriginData] = useState();
  const diaryList = useContext(DiaryStateContext);
  useEffect(() => {
    if (diaryList.length >= 1) {
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

  if (!originData) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const selectData = emotionList.find(
      (ele) => parseInt(ele.emotion_id) === parseInt(originData.id)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(originData.date))} 기록`}
          leftChild={
            <MyButton
              text={"< 뒤로가기"}
              onClick={() => navigate(-1)}
            ></MyButton>
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${originData.id}`)}
            ></MyButton>
          }
        ></MyHeader>
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${selectData.emotion_id}`,
              ].join(" ")}
            >
              <img src={selectData.emotion_img} alt={"이미지 불러오는 중..."} />
              <div className="emotion_descript">
                {selectData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{originData.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
