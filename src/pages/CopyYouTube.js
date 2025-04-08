import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CopyYouTube.css";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}
const viedoList = [
  { src: "/assets/city.mp4", poster: "/assets/image1.png", duration: 32 },
  { src: "/assets/free.mp4", poster: "/assets/image2.png", duration: 24 },
  { src: "/assets/bridge.mp4", poster: "/assets/image3.png", duration: 16 },
];

function createHtmlVideo(idx) {
  const videoElement = document.createElement("video");

  videoElement.src = viedoList[idx].src;
  videoElement.muted = true;

  videoElement.style.position = "absolute";
  videoElement.style.inset = "0";
  videoElement.style.width = "100%";
  videoElement.style.height = "100%";
  videoElement.style.objectFit = "cover";
  videoElement.style.opacity = "1";
  videoElement.style.transition = "opacity 0.3s ease";

  return videoElement;
}

const CopyYouTube = () => {
  const navigate = useNavigate();
  // duration 나타낼 wrapRef
  const videoWrap = useRef([]);
  // 비디오 객체 담을 ref
  const parentRef = useRef([]);

  const onMouseEnter = (parentEle, idx) => {
    const existingVideo = parentEle.querySelector("video");
    if (existingVideo) return;

    const handleTimeUpdate = (newVideo, idx) => {
      //console.log();
      document.getElementsByClassName("duration")[idx].innerText = formatTime(
        newVideo.duration - newVideo.currentTime
      );
    };

    const newVideo = createHtmlVideo(idx);
    newVideo.addEventListener("timeupdate", () =>
      handleTimeUpdate(newVideo, idx)
    );
    const img = parentEle.querySelector("img");
    parentEle.appendChild(newVideo);
    newVideo.play();
    img.style.opacity = 0;
  };

  const onMouseout = (parentEle, idx) => {
    const existingVideo = parentEle.querySelector("video");
    if (!existingVideo) return;

    document.getElementsByClassName("duration")[idx].innerText = formatTime(
      existingVideo.duration
    );
    parentEle.removeChild(parentEle.querySelector("video"));
    const img = parentEle.querySelector("img");
    img.style.opacity = 1;
  };

  useEffect(() => {
    const handleMouseover = (parentEle, idx) => () =>
      onMouseEnter(parentEle, idx);
    const handleMouseout = (parentEle, idx) => () => onMouseout(parentEle, idx);

    parentRef.current.forEach((parentEle, idx) => {
      parentEle.addEventListener("mouseenter", handleMouseover(parentEle, idx));
      parentEle.addEventListener("mouseleave", handleMouseout(parentEle, idx));
    });

    return () => {
      const spareVideoEle = parentRef.current.filter(
        (htmlEle) => htmlEle !== null
      );
      if (spareVideoEle.length > 0) {
        parentRef.current.forEach((videoElement, idx) => {
          videoElement.removeEventListener("mouseenter", handleMouseover);
          videoElement.removeEventListener(
            "mouseleave",
            handleMouseout(videoElement, idx)
          );
        });
      }
    };
  }, []);

  return (
    <>
      <div ref={videoWrap} className="video-container">
        {viedoList.map((obj, idx) => (
          <div key={idx} className="video-wrapper">
            {obj.src !== "" ? (
              <div
                className="innerDiv"
                ref={function (el) {
                  parentRef.current[idx] = el;
                }}
              >
                <span className="innerSpan" tabIndex={0}>
                  <img className="innerImg" src={obj.poster}></img>
                </span>
              </div>
            ) : (
              <div>비디오 객체가 없는 영역</div>
            )}
            <div className="duration">{formatTime(obj.duration)}</div>
          </div>
        ))}
        <button disabled onClick={(e) => test(e)}>
          페이지 이동
        </button>
      </div>
    </>
  );
};
export default CopyYouTube;
