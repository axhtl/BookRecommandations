import React from "react";
import { useNavigate } from "react-router-dom";

const NoAccessPage = () => {
  const navigation = useNavigate();

  const handleNavigateHome = () => {
    navigation("/intro");
  };

  return (
    <div className="noAccessWrapper">
      <p className="noAccessText">접근 권한이 없어요. 😓</p>
      <div className="goHomeWrapper">
        <p className="noAccessContent">로그인 또는 회원가입을 진행해 주세요.</p>
        <p className="noAccessNavigator" onClick={handleNavigateHome}>
          로그인 하러 가기
        </p>
      </div>
    </div>
  );
};

export default NoAccessPage;
