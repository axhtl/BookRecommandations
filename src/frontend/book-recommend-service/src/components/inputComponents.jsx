import { useContext, useState } from "react";
import { Mobile, Pc } from "./reponsiveCheck";
import { SearchContext } from "../contexts/SearchContext";

export const AuthInput = ({ placeholder, isPassword, onChange }) => {
  return (
    <>
      <Pc>
        {isPassword ? (
          <div className="inputWrapper">
            <input
              className="inputBox"
              type="password"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        ) : (
          <div className="inputWrapper">
            <input
              className="inputBox"
              type="text"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        )}
      </Pc>
      <Mobile>
        {isPassword ? (
          <div className="inputWrapperMobile">
            <input
              className="inputBox"
              type="password"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        ) : (
          <div className="inputWrapperMobile">
            <input
              className="inputBox"
              type="text"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        )}
      </Mobile>
    </>
  );
};

export const SearchInput = () => {
  const { keyword, setKeyword } = useContext(SearchContext);
  const [localKeyword, setLocalKeyword] = useState(keyword);

  const searchHandler = () => {
    setKeyword(localKeyword);
  };

  // const onSearchEnter = (e) => {
  //   if (e.key === "Enter") {
  //     console.log("enter");
  //   }
  // };

  return (
    <>
      <Pc>
        <div className="searchInput">
          <div className="searchInputWrapper">
            <input
              placeholder="제목이나 저자명으로 책을 검색하세요. 🔍"
              onChange={(e) => setLocalKeyword(e.target.value)}
            />
            <button onClick={searchHandler}>search</button>
          </div>
        </div>
      </Pc>
      <Mobile></Mobile>
    </>
  );
};
