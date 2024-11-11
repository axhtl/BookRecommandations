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

      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.json();
      console.log("signup successful:", responseData);
      if (responseData.statusCode === 200) {
        navigation("/survey");
        localStorage.setItem("memberId", responseData.id);
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  };

  return (
    <div className="signUpPageWrapper">
      <div className="signUpTitle">
        <p>회원 정보를 입력해 주세요. 😆</p>
      </div>
      <div className="signUpInfos">
        <AuthInput
          placeholder={"닉네임"}
          isPassword={false}
          onChange={(e) => setNickname(e.target.value)}
          Icon={<Face />}
        />
        <AuthInput
          placeholder={"아이디"}
          isPassword={false}
          onChange={(e) => setMembername(e.target.value)}
          Icon={<Person />}
        />
        <AuthInput
          placeholder={"비밀번호"}
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
