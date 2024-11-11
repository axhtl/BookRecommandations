import React, { useEffect, useState } from "react";
import { Mobile, Pc } from "./reponsiveCheck";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#4A00AA",
  },
  "& .MuiRating-iconHover": {
    color: "#4A00AA",
  },
});

export const BookSaveModal = ({ isClosed, bookInfo }) => {
  const [starRate, setStarRate] = useState();
  const [content, setContent] = useState("");
  const isbn = bookInfo.isbn13;
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("accessToken");

  const starHandler = (e) => {
    setStarRate(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    console.log("memberId", memberId);
  }, [memberId]);

  const handleSubmit = async () => {
    const data = {
      isbn13: isbn,
      content: content,
      star: starRate,
    };

    if (content === "" || starRate === 0) {
      alert("별점과 후기를 등록해주세요.");
    } else {
      try {
        const response = await fetch(`/book/review/${memberId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Error:" + response.statusText);
        }

        const responseData = await response.json();
        alert(responseData.message);
        isClosed();
        window.location.reload();
      } catch (error) {
        console.error("fetch error:", error.message);
      }
    }
  };

  return (
    <div className="modalOpen">
      <Pc>
        <div className="bookSaveModalWrapper">
          <div className="topWrapper">
            <div className="textsWrapper">
              <p className="title">{bookInfo.title}</p>
              <p className="author">{bookInfo.author}</p>
              <p className="isbn">
                <span style={{ fontWeight: 500, marginRight: 4 }}>ISBN</span>
                {bookInfo.isbn13}
              </p>
            </div>
            <div className="starsWrapper">
              <Box sx={{ "& > legend": { mt: 2 } }}>
                <StyledRating
                  name="customized-color"
                  value={starRate || 0}
                  onChange={(event, newValue) => {
                    setStarRate(newValue);
                  }}
                  size="large"
                />
              </Box>
            </div>

            {/* <div className="starsWrapper">
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
            </div> */}
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
      </Pc>
      <Mobile>
        <div className="bookSaveModalWrapper-mobile">
          <div className="topWrapper-mobile">
            <div className="textsWrapper-mobile">
              <p id="title-mobile">{bookInfo.title}</p>
              <p id="author-mobile">{bookInfo.author}</p>
              <p id="isbn-mobile">
                <span style={{ fontWeight: 500, marginRight: 4 }}>ISBN</span>
                {bookInfo.isbn13}
              </p>
            </div>
            <div className="starsWrapper-mobile">
              <input
                type="radio"
                className="star-mobile"
                value="1"
                onClick={starHandler}
              />
              <input
                type="radio"
                className="star-mobile"
                value="2"
                onClick={starHandler}
              />
              <input
                type="radio"
                className="star-mobile"
                value="3"
                onClick={starHandler}
              />
              <input
                type="radio"
                className="star-mobile"
                value="4"
                onClick={starHandler}
              />
              <input
                type="radio"
                className="star-mobile"
                value="5"
                onClick={starHandler}
              />
            </div>
          </div>
          <div className="modalLine-mobile" />
          <div className="midWrapper-mobile">
            <div className="reviewInputWrapper-mobile">
              <textarea
                className="reviewInput-mobile"
                placeholder="재밌게 읽으셨나요? 후기를 남겨보세요."
                required={true}
                onChange={contentHandler}
              />
            </div>
          </div>
          <div className="bottomWrapper-mobile">
            <div className="cancelButton-mobile">
              <button onClick={isClosed}>CANCEL</button>
            </div>
            <div className="saveButton-mobile">
              <button onClick={handleSubmit}>SAVE</button>
            </div>
          </div>
        </div>
      </Mobile>
    </div>
  );
};
