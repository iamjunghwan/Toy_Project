import { useContext, useEffect, useRef, useState , useMemo, useCallback } from "react";
import TestChild from "./TestChild";


const useIntersection = (onIntersect, options) => {
  const ref = useRef(null);

  const callback = useCallback(
    (entries, observer) =>
      entries.forEach((entry) => entry.isIntersecting && onIntersect(entry, observer)),
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

const LazyImage = ({ src, alt }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef(null);

  const option = {
   // root :  document.querySelector("#viewport"),
    rootMargin: "0px",
    threshold: 0.9, // 10% 이상 보일 때 로드
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        //isIntersection 현재 뷰포트 보여질 준비가 됬다는 말?
        if (entry.isIntersecting) {
          setIsIntersecting(true); // 이미지가 화면에 보이면 true
        }else{
            //setIsIntersecting(false);
        }
      },option
      
    );

    const currentImgRef = imgRef.current;
    console.log("currentImgRef : ",currentImgRef)
    // dom 영역 observe 저장
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, []);


  return (
    <>
    <div
      ref={imgRef}
      style={{
        height: "300px",
        marginBottom: "20px",
        backgroundColor: "#ddd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border : '1px solid red'
        
      }}
    >
      {isIntersecting ? (
    
            <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
     
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
  };
  

  
const Test = () => {
    console.log("New 컴포넌트");

    const [number, setNumber] = useState(0);

    const handleClick = () =>{
        setNumber((prev) => prev+1);
    }

    const test = useCallback(() =>{
        console.log("테스트 힝" , number)
    },[])

    useEffect(()=>{
        test()
    },[test])
  const handleClick2 = () =>{
        console.log("handleClick2");
    }
    useEffect(()=>{
        handleClick2()
    },[handleClick2])

    const objArr = [{age:10 , name : 'test'}];

    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY <= 100; // 스크롤을 위로 올렸을 때 화면 상단에 가까워지면
            if (top) {
            console.log("top : ",top)
            //loadMoreImages();
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  
    const data = [
                 

                  {id : '1',src: '../assets/kia3.png'},
                  {id : '1',src: '../assets/kia3.png'},
                  {id : '1',src: '../assets/kia3.png'},

                  {id : '1',src: '../assets/kia1.png'},
                  {id : '1',src: '../assets/kia1.png'},
                  {id : '1',src: '../assets/kia1.png'},

                  {id : '1',src: '../assets/kia2.png'},
               
                ];


    const [images, setImages] = useState([
                  {id : '1',src: '../assets/kia2.png'},
                  {id : '1',src: '../assets/kia2.png'},
                  {id : '1',src: '../assets/kia2.png'},
        ]);
                
    const loadMoreImages = () => {
        const newImages = [
            { src: "https://via.placeholder.com/600x400?text=Image+4", alt: "Image 4" },
            { src: "https://via.placeholder.com/600x400?text=Image+5", alt: "Image 5" },
            { src: "https://via.placeholder.com/600x400?text=Image+6", alt: "Image 6" },
        ];
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const chunkedImages = [];

    for (let i = 0; i < data.length; i += 3) {
        chunkedImages.push(data.slice(i, i + 3));
    }

  

  return (
  
    // <div id="IO" style={{border : '8px solid yellow', width:'400px',height:'500px'}}>
    //     {number}
    //     <input ></input>
    //     {/* <button onClick={()=>calculration()}>100까지 숫자</button> */}
    //     <br/>
    //     <button onClick={()=>handleClick2()}>test</button>
    //     <button onClick={()=>handleClick()}>숫자 늘리기</button>
       
    //     <div style={{ padding: "20px" }}>
    //         {data.map(({ id,imageUrl }) => (
    //         <div key={id}>
    //             <LazyImage src={imageUrl} alt="product" />
    //         </div>
    //         ))}
    //         {/* <TestChild  sum={10} objArr = {objArr}/> */}
    //     </div>
    // </div>
    <>
    <div id="viewport" style={{ border : '5px solid black', overflowY: "auto", height: "50vh" }}>
    </div>
    <div>
        {chunkedImages.map((arr, index) => (
            <div style={{ padding: "20px", height: "100vh", overflowY: "auto" }}>
                {arr.map((obj,idx)=>(
                    <LazyImage key={idx} src={obj.src} alt={'이미지'} />
                ))}
            </div>
        ))} 
    </div>
    </>
  );
};

export default Test;
