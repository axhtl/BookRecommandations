import React, { useState } from "react";
import { BasicButton } from "./basicButton";
import { useNavigate } from "react-router-dom";
import { Mobile, Pc } from "./reponsiveCheck";
import { AuthInput } from "./inputComponents";
import { ReactComponent as Person } from "../assets/person.svg";
import { ReactComponent as Lock } from "../assets/lock.svg";

export const AuthModal = ({ isClosed }) => {
  const navigation = useNavigate();
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignUp = () => {
    navigation("/surveyintro");
  };

  const onChangeUsername = (e) => {
    setMembername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const data = {
      membername: membername,
      password: password,
    };

    try {
      const response = await fetch("/book/login", {
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

      console.log("login successful:", responseData);
      alert("로그인 성공! 메인 화면으로 이동합니다.");
      if (responseData.statusCode === 200 && responseData.role !== "ADMIN") {
        localStorage.setItem("memberId", responseData.memberId);
        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("refreshToken", responseData.refreshToken);
        navigation("/home");
      } else {
        localStorage.setItem("role", responseData.role);
        localStorage.setItem("memberId", responseData.memberId);
        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("refreshToken", responseData.refreshToken);
        navigation("/admin");
      }
    } catch (error) {
      console.log("fetch error:", error);
      alert(error.message || "알 수 없는 에러 발생.");
    }
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
                  placeholder={"아이디"}
                  isPassword={false}
                  onChange={onChangeUsername}
                  Icon={<Person />}
                />
                <AuthInput
                  placeholder={"비밀번호"}
                  isPassword={true}
                  onChange={onChangePassword}
                  Icon={<Lock />}
                />
              </div>
              <BasicButton text={"로그인"} onClick={handleLogin} />
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
                  onChange={onChangeUsername}
                />
                <AuthInput
                  placeholder={"비밀번호를 입력하세요."}
                  isPassword={true}
                  onChange={onChangePassword}
                />
              </div>
              <BasicButton text={"로그인"} onClick={handleLogin} />
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
