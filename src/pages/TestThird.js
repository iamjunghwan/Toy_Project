import React, { useContext, useEffect, useRef, useState , useMemo, useCallback } from "react";

const TestThird = ({sum}) => {

    console.log("TestThird 컴포넌트");

    //   const calculration =  (val) =>{
    //     console.log("calculration start ing...")
    //     let num = 0;
    //     for(let i=0 ; i < 10 ; i++){
    //         num += 1;
    //         console.log(num)
    //     }
    //     num += val;
    //     console.log("calculration End ")
    //     return num;
    //   }

    // const sumVal = useMemo(()=>calculration(sum),[sum]);



  return (
    <div style={{margin:'20px', border : '8px solid yellow', width:'150px',height:'150px'}}>
        {}
    </div>
  );
};

export default React.memo(TestThird);

