import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";

import MyHeader from "../components/MyHeader";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년   ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((ele) => firstDay <= ele.date && ele.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  const onLeftClick = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const onRigthClick = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton
            text={"<"}
            onClick={() => {
              onLeftClick();
            }}
          />
        }
        rightChild={
          <MyButton
            text={">"}
            onClick={() => {
              onRigthClick();
            }}
          />
        }
      ></MyHeader>
      <DiaryList diaryList={data}></DiaryList>
    </div>
  );
};

export default Home;
