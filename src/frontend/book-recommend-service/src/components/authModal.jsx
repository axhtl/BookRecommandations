import React, { useContext, useState } from "react";
import { BasicButton } from "./basicButton";
import { useNavigate } from "react-router-dom";
import { Mobile, Pc } from "./reponsiveCheck";
import { AuthInput } from "./inputComponents";
import { AuthContext } from "../contexts/AuthContext";

export const AuthModal = ({ isClosed }) => {
  const navigation = useNavigate();
  const { authInfo, setAuthInfo } = useContext(AuthContext);
  const [localUsername, setLocalUsername] = useState(authInfo.username);
  const [localPassword, setLocalPassword] = useState(authInfo.password);

  const handleSignIn = () => {
    setAuthInfo({ username: localUsername, password: localPassword });
    navigation("/home");
  };

  const onClickSignUp = () => {
    navigation("/surveyintro");
  };

  const onChangeUsername = (e) => {
    setLocalUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setLocalPassword(e.target.value);
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
              <div className="goKakaoWrapper">
                <p>OR</p>
                <div>
                  <button>카카오로그인</button>
                </div>
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
              <div className="goKakaoWrapper">
                <p>OR</p>
                <div>
                  <button>카카오로그인</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
};
