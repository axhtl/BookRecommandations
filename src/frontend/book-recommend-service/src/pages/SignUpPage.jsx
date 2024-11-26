import React, { useState } from "react";
import { AuthInput } from "../components/inputComponents";
import { BasicButton } from "../components/basicButton";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Face } from "../assets/face.svg";
import { ReactComponent as Person } from "../assets/person.svg";
import { ReactComponent as Lock } from "../assets/lock.svg";
import { ReactComponent as Check } from "../assets/check_circle_outline.svg";

const SignUpPage = () => {
  const navigation = useNavigate();

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

      const responseData = await response.json();
      if (!response.ok) {
        // HTTP 응답이 2xx가 아닌 경우 에러를 던짐
        throw new Error(responseData.message || "Unknown error occurred");
      }

      console.log("signup successful:", responseData);
      if (responseData.statusCode === 200) {
        navigation("/survey");
        localStorage.setItem("memberId", responseData.id);
      } else if (responseData.statusCode === 400) {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("fetch error:", error);
      alert(error.message || "알 수 없는 에러 발생.");
    }
  };

  return (
    <div className="signUpPageWrapper">
      <div className="signUpTitle">
        <p>회원 정보를 입력해 주세요. 😆</p>
      </div>
      <div className="signUpInfos">
        <AuthInput
          placeholder={"닉네임 (2자 이상)"}
          isPassword={false}
          onChange={(e) => setNickname(e.target.value)}
          Icon={<Face />}
        />
        <AuthInput
          placeholder={"아이디 (4자 이상)"}
          isPassword={false}
          onChange={(e) => setMembername(e.target.value)}
          Icon={<Person />}
        />
        <AuthInput
          placeholder={"비밀번호 (8자 이상)"}
          isPassword={true}
          onChange={(e) => setPassword(e.target.value)}
          Icon={<Lock />}
        />
        <AuthInput
          placeholder={"비밀번호를 확인해주세요!"}
          isPassword={true}
          onChange={(e) => setCheckPw(e.target.value)}
          Icon={<Check />}
        />
      </div>
      <BasicButton text={"회원가입"} onClick={onClickSignUP} />
    </div>
  );
};

export default SignUpPage;
