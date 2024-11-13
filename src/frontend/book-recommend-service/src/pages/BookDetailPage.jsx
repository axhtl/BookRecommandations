import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookSaveModal } from "../components/bookSaveModal";
import { Pc, Mobile } from "../components/reponsiveCheck";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { MobileNavBar } from "../components/navBar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PulseLoader from "react-spinners/PulseLoader";
import BounceLoader from "react-spinners/BounceLoader";

const BookDetailPage = () => {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [userReview, setUserReview] = useState();
  const [wordclouds, setWordclouds] = useState();
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState();
  const [recommendByBooks, setRecommendByBooks] = useState([]);
  const [loadingRecommendByBook, setLoadingRecommendByBook] = useState(false);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [loadingRecommendByKeyword, setLoadingRecommendByKeyword] =
    useState(false);
  const loadingColor = "#4A00AA";
  const keywordRef = useRef(null);
  const generateRef = useRef(null);
  const keywordResRef = useRef(null);

  const navigation = useNavigate();

  const { item } = location.state || {};
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("accessToken");

  const controlModal = () => {
    setIsClicked(!isClicked);
  };

  if (!item) {
    alert("잘못된 접근입니다.");
    navigation("/home/search");
  }

  useEffect(() => {
    if (wordclouds && wordclouds.length > 0) {
      keywordRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [wordclouds]); // wordclouds 배열이 변경될 때마다 실행

  useEffect(() => {
    if (selectedKeywords && selectedKeywords.length > 1) {
      generateRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedKeywords]); // wordclouds 배열이 변경될 때마다 실행

  useEffect(() => {
    if (loadingRecommendByKeyword) {
      keywordResRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loadingRecommendByKeyword]); // wordclouds 배열이 변경될 때마다 실행

  const hanldeDeleteReview = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/book/review/${userReview.reviewId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain;charset=UTF-8",
          },
        });

        if (!response.ok) {
          throw new Error("Error:" + response.statusText);
        }

        window.location.reload();
      } catch (error) {
        console.error("fetch error:", error.message);
      }
    }
  };

  useEffect(() => {
    console.log(location.state.item);
  });

  useEffect(() => {
    const fetchUserReview = async () => {
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
        if (responseData.reviews) {
          for (let i = 0; i < responseData.reviews.length; i++) {
            if (responseData.reviews[i].isbn13 === item.isbn13) {
              setUserReview(responseData.reviews[i]);
            }
          }
        }
      } catch (error) {
        console.error("fetch error:", error.message);
      }
    };

    fetchUserReview();
  }, [memberId, token, item.isbn13]);

  useEffect(() => {
    if (userReview !== undefined) {
      const fetchGetKeyword = async () => {
        setLoadingKeywords(true);
        try {
          const response = await fetch(
            `/book/wordcloud/words/${userReview.reviewId}`,
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

          const responseData = await response.json();
          setWordclouds(responseData);
        } catch (error) {
          console.error("fetch error:", error);
        } finally {
          setLoadingKeywords(false);
        }
      };
      fetchGetKeyword();
    }
  }, [userReview, token]);

  const fetchKeywordSend = async () => {
    const data = {
      preferredKeywords: selectedKeywords,
    };

    if (selectedKeywords.length < 2) {
      alert("키워드를 2개 이상 선택해주세요.");
    } else {
      try {
        setLoadingRecommendByKeyword(true);
        const response = await fetch(
          `/book/recommandation/keywords/${userReview.reviewId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Error:" + response.statusText);
        }

        const responseData = await response.json();
        console.log(responseData.message);
        getRecommendByKeyword();
      } catch (error) {
        console.error("fetch error:", error);
      }
    }
  };

  const getRecommendByKeyword = async () => {
    try {
      const response = await fetch(
        `/book/recommandation/recommend-by-keyword/${memberId}/${userReview.reviewId}`,
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

      const responseData = await response.json();
      const recommendationsArray = JSON.parse(
        responseData[0].recommendations.replace(/'/g, '"')
      );
      setRecommendedBooks(recommendationsArray);
      console.log(recommendedBooks);
    } catch (error) {
      console.error("fetch error:", error);
    } finally {
      setLoadingRecommendByKeyword(false);
    }
  };

  const getRecommendListByBook = useCallback(async () => {
    setLoadingRecommendByBook(true);
    try {
      const response = await fetch(
        `/book/recommandation/recommend-by-book/${userReview.reviewId}`,
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
      getRecommendByBook(isbnArray);
    } catch (error) {
      console.error("fetch error:", error);
    }
  }, [userReview, token]);

  const getRecommendByBook = useCallback(
    async (isbnList) => {
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
      setRecommendByBooks(newIsbnList);
      setLoadingRecommendByBook(false);
    },
    [setRecommendByBooks]
  );

  useEffect(() => {
    if (userReview) {
      getRecommendListByBook();
    }
    console.log(recommendByBooks);
  }, [userReview, getRecommendListByBook]);

  return (
    <>
      <Pc>
        <div className="detailPageWrapper">
          <div className="detailInfoContainer">
            <div>
              <img
                className="bookCoverImage"
                src={item.cover.replace("coversum", "cover500")}
                alt="coverImage"
              />
            </div>
            <div className="rightWrapper">
              <div className="detailTextsWrapper">
                <div className="detailTexts">
                  <div className="textWrapper">
                    <p className="title">{item.title}</p>
                    <p className="author">{item.author}</p>
                    <p className="isbn">
                      <span style={{ fontWeight: "500" }}>ISBN</span>
                      {item.isbn13}
                    </p>
                  </div>
                </div>
                <div className="addButton">
                  <button onClick={controlModal}>추가하기</button>
                </div>
                <div className="descriptionContainer">
                  <p>{item.description}</p>
                </div>
                {userReview !== undefined && (
                  <div className="recommendByBookWrapper">
                    <div className="recommendByBookTitleWrapper">
                      <p className="recommendByBookTitle">
                        📚 이런 책은 어떠세요?
                      </p>
                      <p className="recommendByBookSubTitle">
                        리딩플래너 AI가 사용자님의 후기를 기반으로 추천해 드려요
                      </p>
                    </div>
                    <div className="recommendByBookBottomWrapper">
                      <div className="recommendByBookContainer">
                        {recommendByBooks !== undefined &&
                          recommendByBooks.map((item, index) => {
                            return (
                              <div
                                className="recommendByBookElement"
                                key={index}
                              >
                                <img
                                  src={item.cover.replace(
                                    "coversum",
                                    "cover500"
                                  )}
                                  style={{
                                    width: 140,
                                    height: 180,
                                    border: "1px solid #DDD",
                                    borderRadius: 4,
                                  }}
                                  alt="cover"
                                />
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 14,
                                    color: "#666",
                                  }}
                                >
                                  {item.title}
                                </p>
                              </div>
                            );
                          })}
                        {loadingRecommendByBook && (
                          <div className="loadingRecommendByBook">
                            <PulseLoader loading={true} color={loadingColor} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="myReviewsWrapper">
            <p className="title">나의 후기</p>
            <div className="myReview">
              {userReview !== undefined ? (
                <div className="reviewWrapper">
                  <div className="upperWrapper">
                    <p className="reviewText">{userReview.content}</p>
                    <div className="starWrapper">
                      <p>★</p>
                      <p>{userReview.star}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#DDD",
                    }}
                  />
                  <div className="belowWrapper">
                    <p>{userReview.createdAt.split("T")[0]}</p>
                    <button onClick={hanldeDeleteReview}>삭제하기</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="no-title">아직 리뷰가 없어요. 😓</p>
                </div>
              )}
            </div>
            <div className="keywordsWrapper">
              <div className="keywordsWrapperTitles">
                <p className="title">추출 키워드</p>
                <div className="createKeywordsRecommendButton">
                  <AutoFixHighIcon />
                  <p>내 후기에서 추출된 키워드 선택하고 AI 추천받기</p>
                </div>
              </div>
              <div className="wordcloudsWrapper">
                <Stack direction="row" spacing={1}>
                  <div className="wordcloudsContainer" ref={keywordRef}>
                    {wordclouds !== undefined ? (
                      wordclouds.map((item, index) => {
                        return (
                          <Chip
                            key={index}
                            label={item.keyword}
                            onClick={() =>
                              setSelectedKeywords([
                                ...selectedKeywords,
                                item.keyword,
                              ])
                            }
                            color="secondary"
                            variant={
                              selectedKeywords.includes(item.keyword)
                                ? "filled"
                                : "outlined"
                            }
                          />
                        );
                      })
                    ) : (
                      <div className="noKeywordWrapper">
                        <p className="no-title">아직 추출된 키워드가 없어요.</p>
                        <p className="subTitle">
                          후기를 등록하면 키워드가 추출돼요.
                        </p>
                      </div>
                    )}
                  </div>
                </Stack>
                {selectedKeywords.length > 1 &&
                  recommendedBooks === undefined && (
                    <div
                      ref={generateRef}
                      className="generateRecommendByKeywordsButton"
                    >
                      <button onClick={fetchKeywordSend}>
                        선택한 키워드로 추천받기
                      </button>
                    </div>
                  )}
              </div>
            </div>
            <div ref={keywordResRef}>
              {recommendedBooks !== undefined ? (
                <div className="recommendedBookByKeywordsWrapper">
                  <p className="title">
                    🔑 <span style={{ fontWeight: "600" }}>취향저격!</span>{" "}
                    리딩플래너 AI가 선택하신 키워드와{" "}
                    <span style={{ color: "#4A00AA", fontWeight: "600" }}>
                      90%이상
                    </span>{" "}
                    일치하는 책들만 모아봤어요.
                  </p>
                  <div className="bottomWrapper">
                    {recommendedBooks.map((item, index) => {
                      return (
                        <div key={index} className="keywordRecommendElement">
                          {item.image ? (
                            <img
                              src={item.image}
                              style={{
                                width: 140,
                                height: 180,
                                border: "1px solid #DDD",
                                borderRadius: 8,
                              }}
                              alt={"cover"}
                            />
                          ) : (
                            <div style={{ width: 140, height: 180 }} />
                          )}

                          <p>{item.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {loadingRecommendByKeyword && (
                <div className="recommendedBookByKeywordsLoading">
                  <PulseLoader
                    loading={loadingRecommendByKeyword}
                    color={loadingColor}
                  />
                  <p>결과를 가져오는 중...</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {loadingKeywords && (
          <div className="modalOpen">
            <div className="loadingModalWrapper">
              <BounceLoader loading={loadingKeywords} color={loadingColor} />
              <p>사용자님의 후기를 분석해 키워드를 추출하는 중이에요. 🔑</p>
              <p className="subTitle">잠시만 기다려 주세요!</p>
            </div>
          </div>
        )}
      </Pc>
      <Mobile>
        <div className="detailPageWrapper-mobile">
          <div className="navWrapper-mobile">
            <div onClick={(e) => setIsClosed(!isClosed)}>
              <MenuIcon />
            </div>
            <div>
              <p className="logoText">READING PLANNER</p>
            </div>
            <div style={{ width: 36, height: 36 }} />
          </div>
          {isClosed && (
            <div className="mobileNav-overlay">
              <MobileNavBar isClosed={() => setIsClosed(!isClosed)} />
            </div>
          )}
          <div className="detailInfoContainer-mobile">
            <img
              className="bookCoverImage-mobile"
              src={item.cover.replace("coversum", "cover500")}
              alt="coverImage"
            />
            <div className="detailTextsWrapper-mobile">
              <div className="detailTexts-mobile">
                <div className="textWrapper-mobile">
                  <p id="title-mobile">{item.title}</p>
                  <p id="author-mobile">{item.author}</p>
                  <p id="isbn-mobile">
                    <span style={{ fontWeight: "500" }}>ISBN</span>
                    {item.isbn13}
                  </p>
                </div>
                <div className="addButton-mobile">
                  <button onClick={controlModal}>추가하기</button>
                </div>
              </div>
              <div className="descriptionContainer-mobile">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
          <div
            className="line"
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#DDD",
              margin: "30px 0px",
            }}
          />
          <div className="myReviewsWrapper-mobile">
            <p id="title-mobile">나의 후기</p>
            <div className="myReview-mobile">
              {userReview !== undefined ? (
                <div className="reviewWrapper-mobile">
                  <div className="upperWrapper-mobile">
                    <p className="reviewText-mobile">{userReview.content}</p>
                    <div className="starWrapper-mobile">
                      <p>★</p>
                      <p>{userReview.star}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#DDD",
                    }}
                  />
                  <div className="belowWrapper-mobile">
                    <p>2024-10-08</p>
                    <button>삭제하기</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>아직 리뷰가 없어요. 😓</p>
                </div>
              )}
            </div>
            <div className="keywordsWrapper-mobile">
              <p id="title-mobile">추출 키워드</p>
              <p id="subTitle-mobile">선호하는 키워드를 선택해 보세요!</p>
            </div>
          </div>
        </div>
      </Mobile>
      {isClicked && (
        <BookSaveModal
          isClosed={(e) => setIsClicked(!isClicked)}
          bookInfo={item}
        />
      )}
    </>
  );
};

export default BookDetailPage;
