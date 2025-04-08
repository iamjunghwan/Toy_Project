import React, { useContext, useEffect, useRef, useState , useMemo, useCallback } from "react";
import TestThird from "./TestThird";

const TestChild = ({sum,objArr}) => {

    console.log("TestChild 컴포넌트");

      const calculration =  (val) =>{
        console.log("calculration start ing...")
        let num = 0;
        for(let i=0 ; i < 1000 ; i++){
            num += 1;
            console.log(num)
        }
        num += val;
        console.log("calculration End ")
        return num;
      }

    const sumVal = useMemo(()=>calculration(sum),[sum]);



  return (
    <div style={{margin:'20px', border : '8px solid yellow', width:'300px',height:'300px'}}>
        {sumVal}
        <br/>
        {objArr[0].age}
        <br/>
        {objArr[0].name}
        <TestThird></TestThird>
    </div>
  );
};

export default React.memo(TestChild);
