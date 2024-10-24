import React from "react";
import { AuthInput } from "../components/inputComponents";
import { BasicButton } from "../components/basicButton";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const naivgation = useNavigate();

  const onClickSignUP = () => {
    naivgation("/survey");
  };

  return (
    <div className="signUpPageWrapper">
      <div className="signUpTitle">
        <p>먼저, 회원 정보를 입력해주세요</p>
      </div>
      <div className="signUpInfos">
        <AuthInput placeholder={"닉네임을 입력하세요."} isPassword={false} />
        <AuthInput placeholder={"아이디를 입력하세요."} isPassword={false} />
        <AuthInput placeholder={"비밀번호를 입력하세요."} isPassword={true} />
        <AuthInput placeholder={"비밀번호를 확인해주세요."} isPassword={true} />
      </div>
      <BasicButton text={"회원가입"} onClick={onClickSignUP} />
      <div className="goKakaoWrapper">
        <p>OR</p>
        <div>
          <button>카카오로그인</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
