import React, { useState } from "react";
import "../styles/App.css";
import { Pc } from "../components/reponsiveCheck";
import { AuthModal } from "../components/authModal";
import { useNavigate } from "react-router-dom";
import { isAdmin, isLogin } from "../utils/auth";
// import useIntersectionObserver from "../utils/useIntersectionObserver";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Keyword from "../images/intro/keyword.jpeg";
import Book from "../images/intro/book.jpeg";
import Survey from "../images/intro/survey.jpeg";

const IntroPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const isLoggedin = isLogin();
  const isAdminLogin = isAdmin();
  const navigation = useNavigate();
  // const { addRef, isInViewports } = useIntersectionObserver();

  const controlModal = () => {
    if (isLoggedin && !isAdminLogin) {
      navigation("/home");
    } else if (isLoggedin && isAdminLogin) {
      navigation("/admin");
    } else {
      setIsClicked(!isClicked);
    }
  };

  const onClickSignUp = () => {
    if (isLoggedin && !isAdminLogin) {
      navigation("/home");
    } else if (isLoggedin && isAdminLogin) {
      navigation("/admin");
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
                <h1>READING PLANNER</h1>
                <p className="title">
                  당신을 위한 가장 정확한 도서 추천 플랫폼 📚
                </p>
                <p className="content">
                  리딩플래너는 사용자의 도서 기록 데이터를 기반으로 하는 도서
                  추천 AI 웹 서비스예요.
                  <br />총{" "}
                  <span style={{ fontWeight: "500" }}>3가지 종류의 AI</span>를
                  이용해 사용자 맞춤형 도서를 추천해 드려요.
                </p>
              </div>
            </section>
            <section className="secondSection">
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={Keyword}
                  alt="keyword"
                />
                <CardContent>
                  <p className="cardTitle">키워드 기반 추천</p>

                  <p className="cardSubTitle">
                    사용자님의 후기를 분석하여 키워드를 추출해요. 추출된 키워드
                    중 마음에 드는 키워드를 선택하면, 해당 키워드와 유사한
                    키워드를 공유하는 도서를 추천해 드려요.
                  </p>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={Survey}
                  alt="keyword"
                />
                <CardContent>
                  <p className="cardTitle">설문조사 기반 추천</p>

                  <p className="cardSubTitle">
                    최초 회원가입 시 진행하는 설문조사를 통해 사용자님의 성별,
                    나이, 선호하는 장르를 기반으로 생성된 추천 도서 목록을
                    제공해요.
                  </p>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={Book}
                  alt="keyword"
                />
                <CardContent>
                  <p className="cardTitle">도서 기반 추천</p>

                  <p className="cardSubTitle">
                    사용자님이 기록한 도서 후기를 분석하여, 유사한 카테고리와
                    장르를 가지는 도서를 추천해 드려요.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
          <section className="lastSection">
            <button onClick={onClickSignUp}>회원가입 하러 가기</button>
          </section>
        </div>
      </Pc>
      {/* <Mobile>
        <div className="introWrapper">
          <header className="header">
            <div className="signInButton">
              <button onClick={controlModal}>SIGN IN</button>
            </div>
          </header>
          <div className="sections">
            <section className="firstSection-mobile">
              <div className="textArea-mobile">
                <h1>리딩플래너</h1>
                <p id="title-mobile">
                  당신을 위한 가장 정확한 도서 추천 플랫폼 📚
                </p>
                <p id="content-mobile">
                  사용자 도서 기록 데이터 기반 도서 추천 AI 웹 서비스
                </p>
              </div>
              <div
                ref={addRef}
                className={isInViewports[0] ? "imageWrapper-mobile-1" : ""}
              >
                <img src={Pic1} alt="first" className="image-mobile" />
              </div>
            </section>
            <section className="secondSection-mobile">
              <div className="textArea-mobile">
                <p
                  ref={addRef}
                  className={isInViewports[1] ? "title-2-mobile" : ""}
                >
                  개인화된 알고리즘을 이용한 추천 AI로 내 취향에
                  <br />딱 맞는 책을 발견하는 재미
                </p>
                <p
                  ref={addRef}
                  className={isInViewports[2] ? "content-2-mobile" : ""}
                >
                  최초 가입 시 진행하는 설문조사 답변,
                  <br />
                  내가 기록한 별점과 메모를 분석하여 디테일한 추천을 제공해요.
                  <br />
                  별도의 서비스 구독권을 구매하거나, 책을 구매할 필요가 없어요.
                </p>
              </div>
            </section>
            <div className="secondWrapper-mobile">
              <div
                ref={addRef}
                className={isInViewports[3] ? "imageWrapper-mobile-2" : ""}
              >
                <img src={Pic2} alt="first" className="image-mobile" />
              </div>
              <div className="textArea-mobile">
                <p
                  ref={addRef}
                  className={isInViewports[4] ? "title-3-mobile" : ""}
                >
                  추천 뿐만 아니라 기록도 체계적으로
                </p>
                <p
                  ref={addRef}
                  className={isInViewports[5] ? "title-3-content" : ""}
                >
                  기록한 내용을 바탕으로 내 독서 통계를 조회할 수 있어요.
                  <br />
                  내가 이번 달에는 몇 권이나 읽었는지,
                  <br />
                  내가 선호하는 장르는 무엇인지 확인할 수 있어요! 📈
                </p>
              </div>
            </div>
            <section className="lastSection-mobile">
              <button onClick={onClickSignUp}>지금 바로 시작하세요</button>
            </section>
          </div>
        </div>
      </Mobile> */}
      {isClicked && <AuthModal isClosed={(e) => setIsClicked(!isClicked)} />}
    </>
  );
};

export default IntroPage;
