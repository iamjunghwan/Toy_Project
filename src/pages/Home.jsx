import { useContext, useEffect, useRef, useState , useMemo } from "react";
import { DiaryStateContext } from "../App.js";
import MyButton from "../components/MyButton.js";

import MyHeader from "../components/MyHeader.js";
import DiaryList from "../components/DiaryList.js";
import arr from "../data.js"
import ShowState from "./ShowState.js";
import ShowNum from "./ShowNum.js";

const Home = () => {
  //console.log(arr);
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);

  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년1   ${curDate.getMonth() + 1}월`;
  const [objData,setObjData] = useState([...arr]);
 

  useEffect(()=>{
    const titEle = document.getElementsByTagName('title')[0];
    titEle.innerHTML = `토이프로젝트`;
  },[]);
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const calculration =  (val) =>{
    console.log("calculration start ing...")
    let num = 0;
    for(let i=0 ; i < 10000000000 ; i++){
        num += 1;
    }
    num += val;
    console.log("calculration End ")
    return num;
  }

  const num = useMemo(()=>calculration(number),[number])
  //onst num = calculration(number);
  console.log( "num : ",num);

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

      if(inputRef.current){
        inputRef.current.focus();
        //inputRef.current.scrollIntoView({behavior : 'smooth'})
      }
 
      //document.getElementById('inp').focus()
      // if(objData.length !== 10){
      //   setTimeout(() => {a
      //     const dup= [{"name" : "ajh"}];
      //     setObjData([...objData , ...dup]);
      //   }, 2000);
      // }else{
      //       setObjData([... objData.filter((obj) => obj.userName == 'Tom' || obj.userName == 'Rose') ] );
      // }
    }
  }, [diaryList, curDate, objData]);


  

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



  //

  const increaseNumber = () => {
    setNumber((prevState) => prevState + 1);
  };

  const decreaseNumber = () => {
    setNumber((prevState) => prevState - 1);
  };

  const onChangeTextHandler=(e)=>{
    //inputRef.current = text;
    //console.log(inputRef.current)
   // console.log(text,e.target.value)
    setText(e.target.value);
  }

  const search = () =>{
    if(inputRef.current !== text){
      inputRef.current = text;
      console.log("이전과 값이 다르므로 api 호출")
    }else{
      console.log("이전과 동일한 검색어 입니다." ,inputRef.current )
    }
  }

  const goTop = () =>{
    inputRef.current.scrollIntoView({behavior : 'smooth'})
  }

  const transVal = useMemo(()=> [...arr] , [arr]);

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
      {/* <DiaryList diaryList={data}></DiaryList> */}
      <div>
        <button onClick={increaseNumber}>+</button>
        <button onClick={decreaseNumber}>-</button>
        <input
          id="inp"
          ref={inputRef}
          value={text}
          type="text"
          placeholder="Last Name"
          onChange={onChangeTextHandler}
        />
        <button onClick={()=>search()}>검색</button>
        {JSON.stringify([...objData] )}
        <button onClick={()=> goTop()}>위로가자</button>
        {num}
      </div>
      <ShowState number={number} text={text} />
      <ShowNum num1={transVal}></ShowNum>
    </div>
  );
};

export default Home;
