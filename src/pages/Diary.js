import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams(); //react custom hook
  console.log(id);
  return (
    <div>
      <h1>Diary</h1>
      <p>여기는 다이어리 입니다.</p>
    </div>
  );
};

export default Diary;
