import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const FncOrderMemu = React.memo(({ onChange }) => {
  console.log("FncOrderMemu");
  return (
    <select className="FncMemu" onChange={(e) => onChange(e.target.value)}>
      <option key={0} value="lastest">
        최신순
      </option>
      <option key={1} value="popular">
        인기순
      </option>
    </select>
  );
});

const FncEmotionMemu = React.memo(({ diaryList, onChange }) => {
  //console.log("FncEmotionMemu");
  return (
    <select className="FncMemu" onChange={(e) => onChange(e.target.value)}>
      <option key={0} value="all">
        {"전부다"}
      </option>
      <option key={1}>{"good"}</option>
      <option key={2}>{"bad"}</option>
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigator = useNavigate();
  //const diaryList = useContext(DiaryStateContext);

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
          <DiaryItem key={obj.id} {...obj} />
        ))}
      </div>
    </>
  );
};

export default DiaryList;
