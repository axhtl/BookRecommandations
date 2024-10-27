import React, { useEffect, useState } from "react";
// import { Pc, Mobile } from "../components/reponsiveCheck";
import { NavBar } from "../components/navBar";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [keyword, setKeyword] = useState();
  const [result, setResult] = useState([]);
  // const [selectedBook, setSelectedBook] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    console.log(result);
  }, [result]);

  const searchHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/search?query=${keyword}`
      );

      if (!response.ok) {
        throw new Error(`Error:${response.status}`);
      }

      const data = await response.json();
      setResult(data.item);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClickBook = (item) => {
    navigation(`/bookDetail/${item.itemId}`, { state: { item } });
  };

  return (
    <div className="searchPageWrapper">
      <div className="homeTitle">
        <h1>READING PLANNER</h1>
      </div>
      <NavBar />
      <div className="searchInput">
        <div className="searchInputWrapper">
          <input
            placeholder="제목이나 저자명으로 책을 검색하세요. 🔍"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={searchHandler}>search</button>
        </div>
      </div>
      <div className="resultWrapper">
        {keyword &&
          result &&
          result.map((item) => {
            return (
              <div
                key={item.itemId}
                className="resultContainer"
                onClick={() => onClickBook(item)}
              >
                <img
                  src={item.cover.replace("coversum", "cover500")}
                  className="resultCoverImage"
                  alt="coverimage"
                />
                <div className="resultInfos">
                  <div className="bookInfo">
                    <p className="bookTitle">{item.title}</p>
                    <p className="bookAuthor">{item.author}</p>
                    <div className="bookISBN">
                      <p style={{ fontWeight: "500" }}>ISBN</p>
                      <p>{item.isbn}</p>
                    </div>
                  </div>
                  <div className="bookDescription">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        {keyword && !result && (
          <div className="searchResultNone">
            <p>검색 결과가 없어요. 😓</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
