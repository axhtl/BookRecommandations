import React, { useState } from "react";
import { BasicButton } from "./basicButton";
import { useNavigate } from "react-router-dom";
import { Mobile, Pc } from "./reponsiveCheck";
import { AuthInput } from "./inputComponents";

export const AuthModal = ({ isClosed }) => {
  const navigation = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const data = {
      membername: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/book/login", {
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
      console.log("login successful:", responseData);
      if (responseData.statusCode === 200) {
        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("refreshToken", responseData.refreshToken);
        navigation("/home");
      }
    } catch (error) {
      console.error("fetch error:", error);
    }
  };

  const onClickSignUp = () => {
    navigation("/surveyintro");
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Pc>
        <div className="modalOpen">
          <div className="modalWrapper">
            <div className="modalBox">
              <div className="modalCloseButton">
                <button onClick={isClosed}>닫기</button>
              </div>
              <div className="signInInfos">
                <AuthInput
                  placeholder={"아이디를 입력하세요."}
                  isPassword={false}
                  onChange={onChangeUsername}
                />
                <AuthInput
                  placeholder={"비밀번호를 입력하세요."}
                  isPassword={true}
                  onChange={onChangePassword}
                />
              </div>
              <BasicButton text={"로그인"} onClick={handleSignIn} />
              <div className="goSignUpWrapper">
                <p>아직 회원이 아니신가요?</p>
                <button onClick={onClickSignUp}>회원가입</button>
              </div>
            </div>
          </div>
        </div>
      </Pc>
      <Mobile>
        <div className="modalOpen">
          <div className="modalWrapperMobile">
            <div className="modalBox">
              <div className="modalCloseButton">
                <button onClick={isClosed}>닫기</button>
              </div>
              <div className="signInInfos">
                <AuthInput
                  placeholder={"아이디를 입력하세요."}
                  isPassword={false}
                />
                <AuthInput
                  placeholder={"비밀번호를 입력하세요."}
                  isPassword={true}
                />
              </div>
              <BasicButton text={"로그인"} onClick={handleSignIn} />
              <div className="goSignUpWrapper">
                <p>아직 회원이 아니신가요?</p>
                <button onClick={onClickSignUp}>회원가입</button>
              </div>
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
};
