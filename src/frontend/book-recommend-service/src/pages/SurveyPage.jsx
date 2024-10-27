import React, { useEffect, useState } from "react";
import { Pc, Mobile } from "../components/reponsiveCheck";
import { ReactComponent as LeftArrow } from "../assets/chevron_left.svg";
import { ReactComponent as RightArrow } from "../assets/chevron_right.svg";
import { useNavigate } from "react-router-dom";

const SurveyPage = () => {
  const questions = [
    {
      index: 0,
      question: "당신의 성별은 무엇인가요?",
      option: [
        { index: 0, number: "A", data: "여자" },
        { index: 1, number: "B", data: "남자" },
      ],
    },
    {
      index: 1,
      question: "당신의 연령대는 어떻게 되나요?",
      option: [
        { index: 0, number: "A", data: "10대" },
        { index: 1, number: "B", data: "20대" },
        { index: 2, number: "C", data: "30대" },
        { index: 3, number: "D", data: "40대 이상" },
      ],
    },
    {
      index: 2,
      question: "어떤 종류의 책을 선호하시나요?",
      option: [
        { index: 0, number: "A", data: "픽션" },
        { index: 1, number: "B", data: "논픽션" },
      ],
    },
    {
      index: 3,
      question: "어떤 장르의 픽션 책을 선호하시나요?",
      option: [
        { index: 0, number: "A", data: "로맨스" },
        { index: 1, number: "B", data: "SF" },
        { index: 2, number: "C", data: "추리/스릴러/공포" },
        { index: 3, number: "D", data: "과학" },
        { index: 4, number: "E", data: "없음" },
      ],
    },
    {
      index: 4,
      question: "어떤 분야의 논픽션 책을 선호하시나요?",
      option: [
        { index: 0, number: "A", data: "에세이" },
        { index: 1, number: "B", data: "자서전" },
        { index: 2, number: "C", data: "자기계발서" },
        { index: 3, number: "D", data: "기록물" },
        { index: 4, number: "E", data: "없음" },
      ],
    },
    {
      index: 5,
      question: "좋아하는 책이 있다면 골라주세요!",
      option: [
        {
          index: 0,
          number: "A",
          data: "물고기는 존재하지 않는다",
          isChecked: false,
        },
        { index: 1, number: "B", data: "소년이 온다" },
        { index: 2, number: "C", data: "용의자 X의 헌신" },
        {
          index: 3,
          number: "D",
          data: "나미야 잡화점의 기적",
          isChecked: false,
        },
        { index: 4, number: "E", data: "오만과 편견" },
        { index: 5, number: "F", data: "위대한 개츠비" },
        { index: 6, number: "G", data: "없음" },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userSelection, setUserSelection] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  const navigation = useNavigate();

  useEffect(() => {
    requestAnimationFrame(() => {
      setProgressWidth(progress);
    });
  }, [progress]);

  const ProgressBar = () => {
    return (
      <div className="progressBarWrapper">
        <div className="progressBar">
          <div
            className="progressBar-fill"
            style={{
              width: `${progressWidth}%`,
            }}
          >
            {" "}
          </div>
        </div>
      </div>
    );
  };

  const handleOptionClick = (optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(optionIndex)) {
        return prevSelectedOptions.filter((index) => index !== optionIndex);
      } else {
        return [...prevSelectedOptions, optionIndex];
      }
    });
  };

  const handleSignUpDone = () => {
    alert("회원가입이 완료되었습니다! 로그인을 진행해주세요.");
    navigation("/intro");
  };

  const nextQuestion = () => {
    const selectedData = selectedOptions.map(
      (optionIndex) =>
        questions[currentQuestionIndex].option.find(
          (option) => option.index === optionIndex
        ).data
    );
    setUserSelection([...userSelection, selectedData]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
      setProgress(progress + 17);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setProgress(100);
      handleSignUpDone();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptions([]);
      setProgress(progress - 17);
    }
  };

  return (
    <>
      <Pc>
        <div className="surveyWrapper">
          <div>
            <div className="surveyContentsWrapper">
              <ProgressBar />
              <div className="surveyContents-wrapped">
                <div className="question">
                  <h2>{questions[currentQuestionIndex].question}</h2>
                </div>
                <div className="surveyOptionsWrapper">
                  {questions[currentQuestionIndex].option.map(
                    (option, index) => (
                      <div
                        key={index}
                        className={
                          selectedOptions.includes(option.index)
                            ? "surveyOptionSelected"
                            : "surveyOption"
                        }
                      >
                        <button
                          key={option.index}
                          onClick={() => handleOptionClick(option.index)}
                        >
                          {option.number}
                        </button>
                        <p>{option.data}</p>
                      </div>
                    )
                  )}
                </div>
                <div className="buttonsWrapper">
                  <div className="prevButton">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      <LeftArrow />
                    </button>
                  </div>
                  <div className="nextButton">
                    <button onClick={nextQuestion}>
                      <RightArrow />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Pc>
      <Mobile>
        <div className="surveyContentsWrapper">
          <ProgressBar />
          <div className="surveyContents-wrapped">
            <div className="question">
              <h2>{questions[currentQuestionIndex].question}</h2>
            </div>
            <div className="surveyOptionsWrapper">
              {questions[currentQuestionIndex].option.map((option, index) => (
                <div
                  key={index}
                  className={
                    selectedOptions.includes(option.index)
                      ? "surveyOptionSelected"
                      : "surveyOption"
                  }
                >
                  <button
                    key={option.index}
                    onClick={() => handleOptionClick(option.index)}
                  >
                    {option.number}
                  </button>
                  <p>{option.data}</p>
                </div>
              ))}
            </div>
            <div className="buttonsWrapper">
              <div className="prevButton">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <LeftArrow />
                </button>
              </div>
              <div className="nextButton">
                <button onClick={nextQuestion}>
                  <RightArrow />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Mobile>
    </>
  );
};

export default SurveyPage;
