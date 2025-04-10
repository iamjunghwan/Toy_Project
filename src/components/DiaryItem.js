import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={env.PUBLIC_URL + `../assets/emotion${emotion}.png`}
          alt="이미지 불러오는 중..."
        />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"}></MyButton>
      </div>
    </div>
  );
};

export default DiaryItem;
