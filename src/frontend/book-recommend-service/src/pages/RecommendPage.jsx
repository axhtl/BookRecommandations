import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Pic1 from "../images/recommend/recommendIll.png";

const RecommendPage = () => {
  const token = localStorage.getItem("accessToken");
  const memberId = localStorage.getItem("memberId");

  const navigation = useNavigate();

  const [nickname, setNickname] = useState();
  const [recommend, setRecommend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isbnList, setIsbnList] = useState();

  // 회원 정보 불러오기
  const fetchMemberInfo = useCallback(async () => {
    try {
      const response = await fetch(`/book/member/${memberId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.json();
      setNickname(responseData.nickname);
    } catch (error) {
      console.error("fetch error:", error.message);
    }
  }, [memberId, token]);

  // 추천 도서 리스트 가져오기 (isbnList 기반)
  const getRecommendBySurvey = useCallback(async () => {
    // console.log(isbnList);
    const newIsbnList = [];
    for (let isbn of isbnList) {
      try {
        const response = await fetch(`/api/search?query=${isbn}`);
        if (!response.ok) {
          throw new Error(`Error:${response.status}`);
        }

        const data = await response.json();
        if (data && data.item) {
          newIsbnList.push(data.item);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    setRecommend(newIsbnList);
    setLoading(false);
  }, [isbnList]); // isbnList가 변경되면 호출

  // 추천 키워드에 맞는 isbnList 가져오기
  const handleGetListBySurvey = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `book/recommandation/recommend-by-survey/${memberId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.text();
      console.log("responsdata", responseData);
      const correctedData = responseData.replace(/'/g, '"');
      const isbnArray = JSON.parse(correctedData);
      setIsbnList(isbnArray);
      console.log(isbnList);
    } catch (error) {
      console.error("fetch error:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchMemberInfo();
  }, [fetchMemberInfo]);

  useEffect(() => {
    // 처음 컴포넌트가 마운트될 때만 호출되도록 처리
    handleGetListBySurvey();
  }, [handleGetListBySurvey]); // 의존성 배열에 handleGetListBySurvey 추가하여 새로고침 시 한 번만 호출

  useEffect(() => {
    if (isbnList !== undefined) {
      getRecommendBySurvey(); // isbnList가 설정되면 추천 도서를 가져옴
    }
  }, [isbnList, getRecommendBySurvey]); // isbnList가 변경되면 추천 도서 API를 호출

  const handleClickBook = (item) => {
    navigation("/bookDetail", { state: { item } });
  };

  return (
    <div className="RecommendPageWrapper">
      <div className="recommendSectionContainer">
        <div className="recommend-leftWrapper">
          <p className="todaysRecommendationTitle">오늘의 추천 도서</p>
          <p className="nicknameSubtitle">
            {nickname}님만을 위한 오늘의 추천 도서예요.
          </p>
          <div className="textsWrapper">
            <p>회원가입 시 진행한 설문조사 결과를 알고리즘에 적용해</p>
            <p>예상 별점이 4.5점 이상인 도서만 추천해 드려요.</p>
          </div>
          <div className="bottomTextsWrapper">
            <img src={Pic1} width={250} alt="illust" />
            <div className="texts">
              <p>오늘의 추천 도서가 마음에 들지 않는다면?</p>
              <p
                className="goSearchText"
                onClick={() => navigation("/home/search")}
              >
                도서 기록하고 더 많은 추천 받으러 가기
              </p>
            </div>
          </div>
        </div>
        <div className="recommend-bookCoverWrapper">
          {recommend.length > 0 ? (
            <img
              className="bookCover"
              alt="bookcover"
              onClick={() => handleClickBook(recommend[0])}
              src={recommend[0].cover.replace("coversum", "cover500")}
              width={300}
            />
          ) : (
            loading && (
              <div className="loadingContainer">
                <BeatLoader loading={loading} color={"#4A00AA"} />
              </div>
            )
          )}
        </div>
      </div>
      <div style={{ width: "100%", height: 1, backgroundColor: "#DDD" }} />
      <div className="recommendPageBottomWrapper">
        <div className="moreRecommendedContainer">
          <p className="title">📝 이런 책은 어떠세요?</p>
          <div className="booksArea">
            {recommend.length > 0 &&
              recommend.map((item, index) => {
                return (
                  <div className="bookElement" key={index}>
                    <img
                      className="bookCover"
                      alt="bookCover"
                      src={item.cover.replace("coversum", "cover500")}
                      onClick={() => handleClickBook(item)}
                    />
                    <div className="bookTitle">
                      <p>{item.title}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
