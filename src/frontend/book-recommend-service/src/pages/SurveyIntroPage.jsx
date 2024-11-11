import React from "react";
import { Pc, Mobile } from "../components/reponsiveCheck";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SignUpImage } from "../images/survey/flyingBook.svg";
import { ReactComponent as SurveyIntroImage } from "../images/survey/surveyIntroIll.svg";

const SurveyIntroPage = () => {
  const navigation = useNavigate();

  const onClickStart = () => {
    navigation("/signup");
  };

  return (
    <>
      <Pc>
        <div className="SurveyIntroWrapper">
          <div className="surveyIntroTextWrapper">
            <div className="surveyIntroContents">
              <div className="surveyTitleText">
                <p>아직 계정이 없으신가요?</p>
              </div>
              <div className="surveyContentText">
                <p>간단한 설문조사를 진행하고, 리딩플래너를 시작해 보세요.</p>
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
          </div>
          <SurveyIntroImage className="surveyIntroImage" />
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
        </div>
      </Mobile>
    </>
  );
};

export default SurveyIntroPage;
