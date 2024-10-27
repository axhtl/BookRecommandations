import React, { useEffect, useState } from "react";
import { useAtuh } from "../contexts/AuthContext";

export const BookSaveModal = ({ isClosed, bookInfo }) => {
  const [starRate, setStarRate] = useState();
  const [content, setContent] = useState("");
  const isbn = bookInfo.isbn13;
  const { authId } = useAtuh();

  const starHandler = (e) => {
    setStarRate(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    console.log(starRate);
  }, [starRate]);

  const handleSubmit = async () => {
    const data = {
      isbn13: isbn,
      content: content,
      star: starRate,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/book/review/${authId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.json();
      console.log("submitted successful:", responseData);
    } catch (error) {
      console.error("fetch error:", error);
    }
  };

  return (
    <div className="modalOpen">
      <div className="bookSaveModalWrapper">
        <div className="topWrapper">
          <div className="textsWrapper">
            <p id="title">{bookInfo.title}</p>
            <p id="author">{bookInfo.author}</p>
            <p id="isbn">
              <span style={{ fontWeight: 500, marginRight: 4 }}>ISBN</span>
              {bookInfo.isbn13}
            </p>
          </div>
          <div className="starsWrapper">
            <input
              type="radio"
              className="star"
              value="1"
              onClick={starHandler}
            />
            <input
              type="radio"
              className="star"
              value="2"
              onClick={starHandler}
            />
            <input
              type="radio"
              className="star"
              value="3"
              onClick={starHandler}
            />
            <input
              type="radio"
              className="star"
              value="4"
              onClick={starHandler}
            />
            <input
              type="radio"
              className="star"
              value="5"
              onClick={starHandler}
            />
          </div>
        </div>
        <div className="modalLine" />
        <div className="midWrapper">
          <div className="reviewInputWrapper">
            <textarea
              className="reviewInput"
              placeholder="재밌게 읽으셨나요? 후기를 남겨보세요."
              required={true}
              onChange={contentHandler}
            />
          </div>
        </div>
        <div className="bottomWrapper">
          <div className="cancelButton">
            <button onClick={isClosed}>CANCEL</button>
          </div>
          <div className="saveButton">
            <button onClick={handleSubmit}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
};
