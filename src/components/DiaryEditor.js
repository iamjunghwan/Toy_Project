import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

import MyHeader from "../components/MyHeader";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext ,DiaryStateContext } from "../App";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const diaryList = useContext(DiaryStateContext);

  const handleClick = (emotion_id) => {
    setEmotion(emotion_id);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    // const chkDate = diaryList.filter((ele) => new Date(ele.date).getFullYear()+'-'+0+( new Date(ele.date).getMonth()+1)+'-'+'0'+new Date(ele.date).getDate() === date);

    // if(chkDate.length > 0) {
    //   window.confirm(
    //     '동일한 날짜에 이미 등록 된 일기가 존재 합니다.'
    //   )
    //   return false;
    // }

    if (
      window.confirm(
        isEdit
          ? "일기를 수정 하시겠습니까?"
          : "새로운 일기를 등록 하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setContent(originData.content);
      setEmotion(originData.emotion);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton onClick={() => navigate(-1)} text={"< 뒤로가기"} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제 인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            ></input>
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((obj) => (
              <EmotionItem
                key={obj.emotion_id}
                {...obj}
                onClick={handleClick}
                isSelected={obj.emotion_id === emotion}
              ></EmotionItem>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section className="control_box">
          <MyButton text={"취소하기"} onClick={() => navigate(-1)}></MyButton>
          <MyButton
            text={"작성완료"}
            type={"positive"}
            onClick={handleSubmit}
          ></MyButton>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
