import React, { useState } from "react";
// import { Pc, Mobile } from "../components/reponsiveCheck";
import { NavBar } from "../components/navBar";
import { useNavigate } from "react-router-dom";
import { Pc } from "../components/reponsiveCheck";
// import { ReactComponent as MenuIcon } from "../assets/menu.svg";
// import { ReactComponent as Logo } from "../assets/logo.svg";

const SearchPage = () => {
  const [keyword, setKeyword] = useState();
  const [result, setResult] = useState([]);
  // const [isClosed, setIsClosed] = useState(false);
  // const inputRef = useRef(null);

  // const [selectedBook, setSelectedBook] = useState(null);
  const navigation = useNavigate();

  // useEffect(() => {
  //   setKeyword(keyword);
  // }, [keyword]);

  const searchHandler = async () => {
    if (!keyword) {
      alert("검색어를 입력하세요.");
      return;
    }
    try {
      const response = await fetch(`/api/search?query=${keyword}`);

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
    navigation("/bookDetail", { state: { item } });
  };

  return (
    <>
      <Pc>
        <div className="searchPageWrapper">
          <div className="homeTitle">
            <p
              style={{
                fontFamily: "RiaSans-ExtraBold",
                fontSize: 36,
                color: "#4A00AA",
              }}
            >
              READING PLANNER
            </p>
            {/* <Logo style={{ height: 200 }} /> */}
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
      </Pc>
    </>
  );
};

export default SearchPage;
