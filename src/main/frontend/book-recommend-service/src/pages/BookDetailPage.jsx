import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookSaveModal } from "../components/bookSaveModal";
import { Pc, Mobile } from "../components/reponsiveCheck";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { MobileNavBar } from "../components/navBar";

const BookDetailPage = () => {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const navigation = useNavigate();

  const { item } = location.state || {};
  const controlModal = () => {
    setIsClicked(!isClicked);
  };

  if (!item) {
    alert("잘못된 접근입니다.");
    navigation("/home/search");
  }

  const userReview = {
    isbn13: "9791189327156",
    content: "재밌었다.",
    star: 5,
  };

  // const userReview = null;

  return (
    <>
      <Pc>
        <div className="detailPageWrapper">
          <div className="detailInfoContainer">
            <img
              className="bookCoverImage"
              src={item.cover.replace("coversum", "cover500")}
              alt="coverImage"
            />
            <div className="detailTextsWrapper">
              <div className="detailTexts">
                <div className="textWrapper">
                  <p id="title">{item.title}</p>
                  <p id="author">{item.author}</p>
                  <p id="isbn">
                    <span style={{ fontWeight: "500" }}>ISBN</span>
                    {item.isbn13}
                  </p>
                </div>
                <div className="addButton">
                  <button onClick={controlModal}>추가하기</button>
                </div>
              </div>
              <div className="descriptionContainer">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
          <div
            className="line"
            style={{ width: "100%", height: 1, backgroundColor: "#DDD" }}
          />
          <div className="myReviewsWrapper">
            <p id="title">나의 후기</p>
            <div className="myReview">
              {userReview !== null ? (
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
                    <p>2024-10-08</p>
                    <button>삭제하기</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>아직 리뷰를 작성하지 않았습니다.</p>
                </div>
              )}
            </div>
            <div className="keywordsWrapper">
              <p id="title">추출 키워드</p>
              <p id="subTitle">선호하는 키워드를 선택해 보세요!</p>
            </div>
          </div>
        </div>
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
              {userReview !== null ? (
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
                  <p>아직 리뷰를 작성하지 않았습니다.</p>
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
