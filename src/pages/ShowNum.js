import React  from "react";

  const ShowNum = ({ num1}) => {
  console.log("ShowNum : ", num1)
    return (
      <div className="info-wrapper">
        {JSON.stringify(num1) } <br />
      </div>
    );
  };
  
  export default React.memo(ShowNum);