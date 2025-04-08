import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import BubblingChild from "./BubblingChild";

const Bubbling = () => {
  // input 요소에 대한 참조
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  // 마지막으로 포커스를 잃은 요소를 추적하기 위한 상태
  const [lastBlurred, setLastBlurred] = useState();
  const [inptValue, setInptValue] = useState("");
  //   const controll = useCallback(() =>{
  //     setTimeout(() => {

  //         console.log(lastBlurred,inputRef1.current , inputRef2.current)
  //         if (lastBlurred === 'input1' && inputRef1.current) {
  //            inputRef1.current.focus(); // 첫 번째 input에 포커스
  //         } else if (lastBlurred === 'input2' && inputRef2.current) {
  //           inputRef2.current.focus(); // 두 번째 input에 포커스
  //         }
  //     }, 3000); // 3초 후에 포커스를 다시 준다
  //   },[lastBlurred])

  //   useEffect(()=>{
  //     controll()
  //   },[lastBlurred])

  //////////////////////////////////////////// 버블링
  // 부모 컴포넌트의 클릭 핸들러
  const handleParentClick = () => {
    alert("부모 컴포넌트가 클릭되었습니다!");
  };

  // 자식 컴포넌트의 클릭 핸들러
  const handleChildClick = (e) => {
    // e.stopPropagation()을 호출하면 이벤트 버블링을 막을 수 있음
    alert("자식 컴포넌트가 클릭되었습니다!");
    // e.stopPropagation(); // 버블링을 막으려면 이 줄을 주석 해제
  };

  /////////////////////////////////////////////  캡처링
  const handleChapterParentClick = () => {
    alert("부모 컴포넌트에서 이벤트가 캡처링되었습니다!");
  };

  // 자식 컴포넌트의 클릭 핸들러 (캡처링)
  const handleChapterChildClick = () => {
    alert("자식 컴포넌트에서 클릭되었습니다!");
  };

  const handleChange = () => {
    console.log("handleChange?");
  };

  //   const onChange = (e) =>{
  //     console.log("onChange",e.target.value)
  //   }

  const onKeyDown = (e) => {
    // mac command+c , command+v 막기
    if (e.metaKey && (e.key === "c" || e.key === "v")) {
      //alert("막기")
      // console.log("복사 붙여넣기 : ",e.metaKey , e.key)
      // e.stopPropagation();  // 이벤트 버블링을 중지시킴
      // alert(`${e.key.toUpperCase()}는 제한되어 있습니다!`);
    }
    // console.log('Key pressed:', e,e.key);
  };

  // onPaste 핸들러 (붙여넣기 제한)
  const handlePaste = (e) => {
    setInptValue("엑스!!");
    // console.log("엑스!!");
    // e.preventDefault(); //
  };

  // onCopy 핸들러 (복사 제한)
  const handleCopy = (e) => {
    e.preventDefault(); //
    alert("복사는 제한되어 있습니다!");
  };

  return (
    <>
      <br />

      <div onCopy={handleCopy}>
        {`이들은 이 연구에서 장에서 생성되는 가장 흔한 두 가지 짧은사슬지방산인 프로피오네이트(propionate)와 부티레이트(butyrate)가 건강한 인간 세포와 인간 대장암 세포, 쥐의 장에서 유전자 발현을 어떻게 변화시키는지 추적했다.

그 결과 프로피오네이트와 부티레이트가 세포 사멸(apoptosis)은 물론 세포의 증식과 분화를 조절하는 특정 유전자에 직접 작용해 후성유전학적(epigenetic) 변화를 일으키는 것으로 밝혀졌다.

연구팀은 세포의 증식과 분화, 세포 사멸 조절은 암의 근원이 되는 무분별한 세포 성장을 방해하거나 제어하는 데 중요하다며 이 연구 결과는 섬유질 섭취가 항암 효과가 있는 유전자 기능 조절에 직접 관여할 가능성을 시사한다고 밝혔다.

이어 섬유질이 소화될 때 생성되는 짧은사슬지방산은 몸 전체로 이동할 수 있기 때문에 섬유질이 특정 유전자의 발현에 후성유전학적 영향을 미쳐 항암 작용을 하는 것이 보편적인 메커니즘일 가능성이 크다고 설명했다.

스나이더 교수는 이 연구 결과는 식이섬유가 유전자에 어떻게 작용해 유익한 효과를 발휘하고 암 발생 시 무엇이 잘못되는지 알려준다며 이를 토대로 식단과 암 치료의 시너지 효과에 대한 연구에 박차를 가할 수 있을 것이라고 말했다.

이어 "일반적으로 사람들의 식단에는 섬유질이 매우 부족하고, 이는 장내 미생물에 섬유질이 제대로 공급되지 않아 짧은사슬지방산이 충분히 만들어지지 못한다는 것을 의미한다"며 "이는 건강에 전혀 도움이 되지 않는다"고 덧붙였다.`}
      </div>

      <div>
        <h1>포커스 다시 주기</h1>
        <input
          ref={inputRef1}
          type="text"
          placeholder="Input 1"
          value={inptValue}
          // onBlur={(e) =>{
          //     console.log(e);
          //     setLastBlurred('input1')
          // } }
          // onChange={(e) =>onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
          onPaste={handlePaste} // 붙여넣기 제한
          onCopy={handleCopy} // 복사 제한
        />
        <br />
        <input
          ref={inputRef2}
          type="text"
          placeholder="Input 2"
          onBlur={() => setLastBlurred("input2")}
          onChange={() => handleChange()}
        />
      </div>
      <br />
      <br />

      <hr></hr>

      {"버블링"}
      <div
        onClick={handleParentClick}
        style={{ padding: "50px", backgroundColor: "#f0f0f0" }}
      >
        <h1>React 이벤트 버블링 예시</h1>
        <div
          onClick={handleChildClick}
          style={{
            padding: "50px",
            backgroundColor: "#d0d0d0",
            marginTop: "20px",
          }}
        >
          자식 컴포넌트 (클릭 시 부모까지 전파됨)
          <BubblingChild></BubblingChild>
        </div>
      </div>

      <br />
      <hr></hr>
      <br />

      {"캡처링"}
      <div
        onClickCapture={handleChapterParentClick} // 캡처링 방식으로 처리
        style={{
          padding: "50px",
          backgroundColor: "#f0f0f0",
          marginBottom: "20px",
        }}
      >
        <h1>React 이벤트 캡처링 예시</h1>
        <div
          onClick={handleChapterChildClick} // 버블링 방식으로 처리
          style={{
            padding: "50px",
            backgroundColor: "#d0d0d0",
          }}
        >
          자식 컴포넌트 (클릭 시 부모까지 전파됨)
        </div>
      </div>
    </>
  );
};

export default Bubbling;
