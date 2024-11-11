import React, { useEffect, useState } from "react";
import { ReactComponent as Right } from "../assets/chevron_right.svg";
import { ReactComponent as Left } from "../assets/chevron_left.svg";
import { useNavigate } from "react-router-dom";

// ProgressBar 컴포넌트
const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: "100%", backgroundColor: "#e0e0e0" }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "#4A00AA",
          height: "10px",
        }}
      ></div>
    </div>
  );
};

// GenderPage 컴포넌트
const GenderPage = ({ gender, setGender, nextStep }) => {
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="genderpageWrapper">
      <p className="title">사용자님의 성별을 알려주세요.</p>
      <div className="genderOptionsWrapper">
        <label className="buttonLabel">
          <input
            type="radio"
            value="M"
            name="custom-radio"
            checked={gender === "M"}
            onChange={handleGenderChange}
          />
          <span className="custom-radio">A</span>
          남성
        </label>
        <label className="buttonLabel">
          <input
            type="radio"
            value="F"
            name="custom-radio"
            checked={gender === "F"}
            onChange={handleGenderChange}
          />
          <span className="custom-radio">B</span>
          여성
        </label>
      </div>
      <div className="rightButtonWrapper">
        <button onClick={nextStep}>
          <Right />
        </button>
      </div>
    </div>
  );
};

// AgePage 컴포넌트
const AgePage = ({ age, setAge, nextStep, prevStep }) => {
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  return (
    <div className="agePageWrapper">
      <p className="title">사용자님의 나이를 알려주세요.</p>
      <div className="ageInputWrapper">
        <input
          className="ageInput"
          value={age}
          onChange={handleAgeChange}
          placeholder="(예) 24"
        />
      </div>
      <div className="leftButtonWrapper">
        <button onClick={prevStep}>
          <Left />
        </button>
      </div>
      <div className="rightButtonWrapper">
        <button onClick={nextStep}>
          <Right />
        </button>
      </div>
    </div>
  );
};

// GenrePage 컴포넌트
const GenrePage = ({ genres, setGenres, genreOptions, submit, prevStep }) => {
  const handleGenreChange = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  useEffect(() => {
    console.log(genres);
  }, [genres]);

  return (
    <div className="genrepageWrapper">
      <p className="title">좋아하는 장르가 있나요?</p>
      <p>하나 이상 선택해주세요. 🙂‍↕️</p>
      <div className="genreOptionsWrapper">
        {genreOptions.map((genre) => (
          <label
            className="buttonLabel"
            key={genre.value}
            htmlFor={genre.value}
          >
            <input
              type="checkbox"
              id={genre.value} // id 추가
              value={genre.value}
              checked={genres.includes(genre.value)}
              onChange={() => handleGenreChange(genre.value)}
            />
            <span className="custom-checkbox">{genre.number}</span>
            {genre.value}
          </label>
        ))}
      </div>
      <div className="leftButtonWrapper">
        <button onClick={prevStep}>
          <Left />
        </button>
      </div>
      <div className="rightButtonWrapper">
        <button onClick={submit}>DONE</button>
      </div>
    </div>
  );
};

// SurveyPage 컴포넌트
const SurveyPage = () => {
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState("");
  const [genres, setGenres] = useState([]);
  const [step, setStep] = useState(1);
  const memberId = localStorage.getItem("memberId");
  const navigation = useNavigate();

  const genreOptions = [
    { value: "소설", number: "A" },
    { value: "시", number: "B" },
    { value: "만화", number: "C" },
    { value: "역사", number: "D" },
    { value: "문학", number: "E" },
    { value: "고전", number: "F" },
    { value: "요리/살림", number: "G" },
    { value: "에세이", number: "H" },
    { value: "여행", number: "I" },
    { value: "과학", number: "J" },
  ];

  const nextStep = () => {
    if (step === 1 && !gender) {
      alert("성별을 선택해주세요.");
      return;
    }
    if (step === 2 && !age) {
      alert("나이를 입력해주세요.");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submit = async () => {
    const data = {
      gender: gender,
      age: age,
      preferredGenres: genres,
    };

    if (genres.length === 0) {
      alert("선호 장르를 하나 이상 선택해주세요.");
      return;
    } else {
      try {
        const response = await fetch(`/book/survey/${memberId}`, {
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
          alert("회원가입이 완료되었습니다! 로그인을 진행해 주세요.");
          navigation("/intro");
        }
      } catch (error) {
        console.error("fetch error:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <ProgressBar progress={(step / 3) * 100} />
      {step === 1 && (
        <GenderPage gender={gender} setGender={setGender} nextStep={nextStep} />
      )}
      {step === 2 && (
        <AgePage
          age={age}
          setAge={setAge}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <GenrePage
          genres={genres}
          setGenres={setGenres}
          genreOptions={genreOptions}
          submit={submit}
          prevStep={prevStep}
        />
      )}
    </div>
  );
};

export default SurveyPage;
