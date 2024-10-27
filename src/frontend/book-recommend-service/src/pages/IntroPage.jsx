import React, { useState } from "react";
import "../styles/App.css";
import { ReactComponent as FirstIll } from "../images/intro/firstIll.svg";
import { ReactComponent as SecondIll } from "../images/intro/secondIll.svg";
import { Mobile, Pc } from "../components/reponsiveCheck";
import { AuthModal } from "../components/authModal";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../utils/auth";
import Pic1 from "../images/intro/pic1.png";
import Pic2 from "../images/intro/pic2.png";

const IntroPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const isLoggedin = isLogin();
  const navigation = useNavigate();

  const controlModal = () => {
    if (isLoggedin) {
      navigation("/home");
    } else {
      setIsClicked(!isClicked);
    }
  };

  const onClickSignUp = () => {
    if (isLoggedin) {
      navigation("/home");
    } else {
      navigation("/surveyintro");
    }
  };

  return (
    <>
      <Pc>
        <div className="introWrapper">
          <header className="header">
            <div className="signInButton">
              <button onClick={controlModal}>SIGN IN</button>
            </div>
          </header>
          <div className="sections">
            <section className="firstSection">
              <div className="textArea">
                <h1>리딩플래너</h1>
                <p id="title">당신을 위한 가장 정확한 도서 추천 플랫폼 📚</p>
                <p id="content">
                  리딩플래너는 사용자의 도서 기록 데이터를 기반으로 하는 도서
                  추천 AI 웹 서비스예요.
                  <br />
                  기기에 구애받지 않고 PC와 모바일 환경에서 모두 사용할 수
                  있어요.
                </p>
              </div>
              <div className="firstImage">
                <img
                  src={Pic1}
                  alt="first"
                  style={{ width: 300, height: "auto" }}
                />
              </div>
            </section>
            <div className="firstIll">
              <div className="svgWrapper">
                <FirstIll />
              </div>

              <div className="textArea">
                <p id="title-2">
                  개인화된 알고리즘을 이용한 추천 AI로 내 취향에
                  <br />딱 맞는 책을 발견하는 재미
                </p>
                <p id="content-2">
                  최초 가입 시 진행하는 설문조사 답변,
                  <br />
                  내가 기록한 별점과 메모를 분석하여 디테일한 추천을 제공해요.
                  <br />
                  별도의 서비스 구독권을 구매하거나, 책을 구매할 필요가 없어요.
                </p>
              </div>
            </div>
            <div className="secondWrapper">
              <div className="imageWrapper">
                <img
                  src={Pic2}
                  alt="first"
                  style={{ width: 300, height: "auto" }}
                />
                <div>
                  <p id="title">추천 뿐만 아니라 기록도 체계적으로</p>
                  <p id="content">
                    기록한 내용을 바탕으로 내 독서 통계를 조회할 수 있어요.
                    <br />
                    내가 이번 달에는 몇 권이나 읽었는지,
                    <br />
                    내가 선호하는 장르는 무엇인지 확인할 수 있어요! 📈
                  </p>
                </div>
              </div>

              <div className="secondImage">
                <SecondIll />
              </div>
            </div>
            <section className="secondSection"></section>
            <section className="lastSection">
              <button onClick={onClickSignUp}>지금 바로 시작하세요</button>
            </section>
          </div>
        </div>
      </Pc>
      <Mobile>
        <div>mobile view</div>
      </Mobile>
      {isClicked && <AuthModal isClosed={(e) => setIsClicked(!isClicked)} />}
    </>
  );
};

export default IntroPage;
