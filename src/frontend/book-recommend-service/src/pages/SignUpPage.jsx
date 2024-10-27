import React, { useState } from "react";
import { AuthInput } from "../components/inputComponents";
import { BasicButton } from "../components/basicButton";
import { useNavigate } from "react-router-dom";
import { useAtuh } from "../contexts/AuthContext";

const SignUpPage = () => {
  const navigation = useNavigate();
  const { signUp } = useAtuh();

  const onClickSignUP = () => {
    if (password !== checkPw) {
      console.log(password, checkPw);
      alert("비밀번호를 다시 한번 확인해주세요.");
    } else {
      handleSignUp();
    }
  };

  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [checkPw, setCheckPw] = useState("");

  const handleSignUp = async () => {
    const data = {
      membername: membername,
      password: password,
      nickname: nickname,
    };

    try {
      const response = await fetch("http://localhost:8080/book/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.json();
      console.log("signup successful:", responseData);
      if (responseData.statusCode === 200) {
        signUp(responseData.id);
        navigation("/survey");
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  };

  return (
    <div className="signUpPageWrapper">
      <div className="signUpTitle">
        <p>먼저, 회원 정보를 입력해주세요</p>
      </div>
      <div className="signUpInfos">
        <AuthInput
          placeholder={"닉네임을 입력하세요."}
          isPassword={false}
          onChange={(e) => setNickname(e.target.value)}
        />
        <AuthInput
          placeholder={"아이디를 입력하세요."}
          isPassword={false}
          onChange={(e) => setMembername(e.target.value)}
        />
        <AuthInput
          placeholder={"비밀번호를 입력하세요."}
          isPassword={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput
          placeholder={"비밀번호를 확인해주세요."}
          isPassword={true}
          onChange={(e) => setCheckPw(e.target.value)}
        />
      </div>
      <BasicButton text={"회원가입"} onClick={onClickSignUP} />
    </div>
  );
};

export default SignUpPage;
