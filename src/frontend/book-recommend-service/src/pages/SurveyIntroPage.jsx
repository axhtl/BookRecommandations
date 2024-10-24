import React, { useState } from "react";
import { Pc, Mobile } from "../components/reponsiveCheck";
import { useNavigate } from "react-router-dom";
import { AuthModal } from "../components/authModal";
import { ReactComponent as SignUpImage } from "../images/survey/flyingBook.svg";

const SurveyIntroPage = () => {
  const navigation = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  const controlModal = () => {
    setIsClicked(!isClicked);
  };

  const onClickStart = () => {
    navigation("/signup");
  };

  return (
    <>
      <Pc>
        <div className="SurveyIntroWrapper">
          <header className="header">
            <div className="signInButton">
              <button onClick={controlModal}>SIGN IN</button>
            </div>
          </header>
          <div className="surveyIntroContents">
            <div className="surveyTitleText">
              <p>아직 계정이 없으신가요?</p>
            </div>
            <div className="surveyContentText">
              <p>간단한 설문조사를 진행하고, title을 시작해 보세요.</p>
              <p>사용자님만을 위한 책을 추천해 드릴게요.</p>
            </div>
          </div>
          <div className="buttonWrapper">
            <div className="signUpStartButtonWrapper">
              <button onClick={onClickStart}>
                설문조사로 회원가입 시작하기
              </button>
            </div>
          </div>
          {isClicked && (
            <AuthModal
              authType={"signIn"}
              isClosed={(e) => setIsClicked(!isClicked)}
            />
          )}
        </div>
      </Pc>
      <Mobile>
        <div className="SurveyIntroWrapper">
          <div className="surveyIntroContentsMobile">
            <div className="surveyTitleTextMobile">
              <p>아직 계정이 없으신가요?</p>
            </div>
            <div className="imageWrapper">
              <SignUpImage />
            </div>
            <div className="buttonWrapperMobile">
              <div className="signUpStartButtonWrapper">
                <button onClick={onClickStart}>
                  설문조사로 회원가입 시작하기
                </button>
              </div>
            </div>
          </div>

          {isClicked && (
            <AuthModal
              authType={"signIn"}
              isClosed={(e) => setIsClicked(!isClicked)}
            />
          )}
        </div>
      </Mobile>
    </>
  );
};

export default SurveyIntroPage;
