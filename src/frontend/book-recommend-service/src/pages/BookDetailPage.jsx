import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookSaveModal } from "../components/bookSaveModal";

const BookDetailPage = () => {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
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
                style={{ width: "100%", height: 1, backgroundColor: "#DDD" }}
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
      {isClicked && (
        <BookSaveModal
          isClosed={(e) => setIsClicked(!isClicked)}
          bookInfo={item}
        />
      )}
    </div>
  );
};

export default BookDetailPage;
