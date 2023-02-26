import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  return (
    <div>
      <h1>Edit</h1>
      <p>여기는 일기 수정 페이지 입니다.</p>
      <button onClick={() => setSearchParams({ who: "ajh" })}>바꾸기</button>
      <button
        onClick={() => {
          navigate("/home"); //로그인 하는 사용자가 로그인이 안될때 다시 로그인 페이지로 보낼때 사용
        }}
      >
        home으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default Edit;
