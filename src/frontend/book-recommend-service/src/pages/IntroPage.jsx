import React, { useState } from "react";
import "../styles/App.css";
import Pic1 from "../images/intro/pic1.png";
import { Mobile, Pc } from "../components/reponsiveCheck";
import { AuthModal } from "../components/authModal";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const [isClicked, setIsClicked] = useState(false);

  const controlModal = () => {
    setIsClicked(!isClicked);
  };

  const navigate = useNavigate();

  const onClickSignUp = () => {
    navigate("/surveyintro");
  };

  return (
    <>
      <Pc>
        <div className="PageWrapper">
          <header className="header">
            <div className="signInButton">
              <button onClick={controlModal}>SIGN IN</button>
            </div>
          </header>
          <div className="introContainer">
            <div className="titleArea">
              <p className="title">책PICK, 책픽!</p>
              <div className="textsArea">
                <p className="subTitle">
                  당신을 위한 가장 정확한 독서 추천 플랫폼
                </p>
                <p className="subContents">
                  TITLE은 사용자의 도서 기록 데이터를 기반으로 하는 도서 추천 AI
                  웹 서비스예요.
                </p>
              </div>
            </div>
            <>
              <img className="introImage" src={Pic1} alt="" />
            </>
          </div>
          {isClicked && (
            <AuthModal
              authType={"signIn"}
              isClosed={(e) => setIsClicked(!isClicked)}
            />
          )}
          <div>
            <button onClick={onClickSignUp}>회원가입</button>
          </div>
        </div>
      </Pc>
      <Mobile>
        <div className="PageWrapper">
          <header className="header">
            <div className="signInButton">
              <button onClick={controlModal}>SIGN IN</button>
            </div>
          </header>
          <div className="titleArea">
            <>
              <p className="title">책PICK, 책픽!</p>
              <p className="subTitle">
                당신을 위한 가장 정확한 독서 추천 플랫폼
              </p>
            </>
            <>
              <img className="introImage" src={Pic1} alt="" />
            </>
          </div>
          {isClicked && (
            <AuthModal
              authType={"signIn"}
              isClosed={(e) => setIsClicked(!isClicked)}
            />
          )}
          <div>
            <button onClick={onClickSignUp}>회원가입</button>
          </div>
        </div>
      </Mobile>
    </>
  );
};

export default IntroPage;
