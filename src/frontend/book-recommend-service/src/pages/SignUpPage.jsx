import React, { useState } from "react";
import { AuthInput } from "../components/inputComponents";
import { BasicButton } from "../components/basicButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUpPage = () => {
  const navigation = useNavigate();
  const { signUp } = useAuth();

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
      const response = await fetch("/book/signup", {
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
        signUp(responseData.id, nickname, membername);
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
          placeholder={"nickname"}
          isPassword={false}
          onChange={(e) => setNickname(e.target.value)}
        />
        <AuthInput
          placeholder={"example@example.com"}
          isPassword={false}
          onChange={(e) => setMembername(e.target.value)}
        />
        <AuthInput
          placeholder={"password"}
          isPassword={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput
          placeholder={"check your password"}
          isPassword={true}
          onChange={(e) => setCheckPw(e.target.value)}
        />
      </div>
      <BasicButton text={"회원가입"} onClick={onClickSignUP} />
    </div>
  );
};

export default SignUpPage;
