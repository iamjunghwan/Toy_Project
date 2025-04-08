import React, { useState, useEffect, useRef } from "react";
import "./Intersection.css";

const data = [
  { id: "1", src: "../assets/image1.png" },
  { id: "2", src: "../assets/image2.png" },
  { id: "3", src: "../assets/image3.png" },
  { id: "4", src: "../assets/image4.png" },
  { id: "5", src: "../assets/image5.png" },
  { id: "6", src: "../assets/image6.png" },
  { id: "7", src: "../assets/image7.png" },
  { id: "8", src: "../assets/image8.png" },
];

const InfiniteScroll = () => {
  const [visibleImages, setVisibleImages] = useState([]); // 처음 3개의 이미지를 보여줌
  const observer = useRef(null);
  const targetRef = useRef(null); // 감지할 요소에 대한 ref
  const visibleImagesRef = useRef(visibleImages); // 최신 visibleImages 값을 저장

  useEffect(() => {
    visibleImagesRef.current = visibleImages;
  }, [visibleImages]);

  console.log(visibleImages, visibleImages.length);
  // IntersectionObserver 콜백 함수
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("현재 데이터 : ", visibleImagesRef.current);
        const nextImages = data.slice(
          visibleImagesRef.current.length,
          visibleImagesRef.current.length + 3
        ); // 3개의 새로운 이미지

        setVisibleImages((prevImages) => [...prevImages, ...nextImages]);
      }
    });
  };

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.5, // 80% 이상 보일 때 트리거
    };

    observer.current = new IntersectionObserver(handleIntersection, options);

    // 감지할 대상 요소
    if (targetRef.current) {
      //onsole.log("감지할 대상 요소");
      observer.current.observe(targetRef.current);
    }

    // Clean up observer
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []); // 빈 배열로 의존성 설정하여 컴포넌트 마운트와 언마운트 시에만 실행

  return (
    <div className="IApp">
      <div className="Iheader">
        <div className="Ititle">이미지 무한 스크롤</div>
      </div>

      {/* 감지용 div */}
      {/* <div style={{ height: "50vh" }}>위는 빈 화면입니다.</div> */}
      <div
        style={{
          border: "4px solid red",
          height: "50vh",
          minHeight: "800px",
          position: "relative",
        }}
        ref={targetRef}
        className="trigger"
        id="interObser"
      >
        뷰포트
        <div
          class="line"
          style={{
            width: "2px",
            height: "100px",
            backgroundColor: "red",
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            top: "100%",
          }}
        ></div>
      </div>
      <div className="image-container">
        {visibleImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.src} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
