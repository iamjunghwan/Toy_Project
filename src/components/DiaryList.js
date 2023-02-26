import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "./MyButton";

const FncOrderMemu = ({ onChange }) => {
  return (
    <select className="FncMemu" onChange={(e) => onChange(e.target.value)}>
      <option key={0} value="lastest">
        최신순s
      </option>
      <option key={1} value="popular">
        인기순
      </option>
    </select>
  );
};

const FncEmotionMemu = ({ diaryList, onChange }) => {
  return (
    <select className="FncMemu" onChange={(e) => onChange(e.target.value)}>
      <option key={0} value="all">
        {"전부다"}
      </option>
      <option key={1}>{"good"}</option>
      <option key={2}>{"bad"}</option>
    </select>
  );
};

const DiaryList = () => {
  const navigator = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  const [sortType, setSortType] = useState("lastest");

  const [emotionType, setEmotionType] = useState("all");

  const sortList = () => {
    const filterCallBack = (item) => {
      if (emotionType === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const filterList =
      emotionType === "all"
        ? diaryList
        : diaryList.filter((ele) => filterCallBack(ele));

    filterList.sort((a, b) => {
      if (sortType === "lastest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    });
    return filterList;
  };

  return (
    <>
      <div className="DiaryList">
        <div className="menu_wrapper">
          <div className="left_col">
            <FncOrderMemu onChange={setSortType} />
            <FncEmotionMemu onChange={setEmotionType} />
          </div>

          <div className="right_col">
            <MyButton
              type={"positive"}
              text={"새 일기 쓰기"}
              onClick={() => navigator("/new")}
            ></MyButton>
          </div>
        </div>

        {sortList().map((obj) => (
          <div key={obj.id}>
            {obj.content}
            <img
              src={
                process.env.PUBLIC_URL + `../assets/emotion${obj.emotion}.png`
              }
              alt="이미지 불러오는 중..."
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DiaryList;
