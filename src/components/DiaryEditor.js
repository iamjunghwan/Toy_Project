import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

import MyHeader from "../components/MyHeader";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: env.PUBLIC_URL + `../assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: env.PUBLIC_URL + `../assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: env.PUBLIC_URL + `../assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: env.PUBLIC_URL + `../assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: env.PUBLIC_URL + `../assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

const getStringDate = (date) => {
  //return date.toISOString().slice(0, 10); //ISO 형식의 문자열 반환
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

const DiaryEditor = () => {
  const navigate = useNavigate();
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);

  const { onCreate } = useContext(DiaryDispatchContext);

  const handleClick = (emotion_id) => {
    setEmotion(emotion_id);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
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
