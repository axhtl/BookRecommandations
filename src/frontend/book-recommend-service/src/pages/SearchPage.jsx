import React, { useContext } from "react";
import { NavBar } from "../components/navBar";
import { SearchInput } from "../components/inputComponents";
import { SearchContext } from "../contexts/SearchContext";

const SearchPage = () => {
  const reuslt = [
    {
      book_id: 0,
      isbn: "9791189327156",
      title: "물고기는 존재하지 않는다",
      author: "룰루 밀러",
      description:
        "‘방송계의 퓰리처상’으로 불리는 피버디상(Peabody Awards)을 수상한 과학 전문기자 룰루 밀러의 경이로운 논픽션 《물고기는 존재하지 않는다》는 여러 언론 매체에서 ‘2020년 최고의 책’으로 선정할 만큼 수많은 찬사를 받은 화제의 베스트셀러다. 집착에 가까울 만큼 자연계에 질서를 부여하려 했던 19세기 어느 과학자의 삶을 흥미롭게 좇아가는 이 책은 어느 순간 독자들을 혼돈의 한복판으로 데려가서 우리가 믿고 있던 삶의 질서에 관해 한 가지 의문을 제기한다. “물고기가 존재하지 않는다는 것은 엄연한 하나의 사실이다. 그렇다면 우리는 또 무엇을 잘못 알고 있을까?” 하고 말이다. 누군가에게는 이 질문이 살아가는 데 아무런 영향을 미치지 않을 수도 있다. 하지만 세상을 바라보는 “진실한 관계들”에 한층 가까이 다가가기 위해 노력하는 사람들에게는 분명 이 책이 놀라운 영감과 어느 한쪽으로도 치우치지 않는 폭넓은 시야를 제공해줄 것이다.",
      cover_image:
        "https://image.aladin.co.kr/product/28465/73/cover500/k092835920_2.jpg",
    },
    {
      book_id: 1,
      isbn: "9791189327156",
      title: "물고기는 존재하지 않는다",
      author: "룰루 밀러",
      description:
        "‘방송계의 퓰리처상’으로 불리는 피버디상(Peabody Awards)을 수상한 과학 전문기자 룰루 밀러의 경이로운 논픽션 《물고기는 존재하지 않는다》는 여러 언론 매체에서 ‘2020년 최고의 책’으로 선정할 만큼 수많은 찬사를 받은 화제의 베스트셀러다. 집착에 가까울 만큼 자연계에 질서를 부여하려 했던 19세기 어느 과학자의 삶을 흥미롭게 좇아가는 이 책은 어느 순간 독자들을 혼돈의 한복판으로 데려가서 우리가 믿고 있던 삶의 질서에 관해 한 가지 의문을 제기한다. “물고기가 존재하지 않는다는 것은 엄연한 하나의 사실이다. 그렇다면 우리는 또 무엇을 잘못 알고 있을까?” 하고 말이다. 누군가에게는 이 질문이 살아가는 데 아무런 영향을 미치지 않을 수도 있다. 하지만 세상을 바라보는 “진실한 관계들”에 한층 가까이 다가가기 위해 노력하는 사람들에게는 분명 이 책이 놀라운 영감과 어느 한쪽으로도 치우치지 않는 폭넓은 시야를 제공해줄 것이다.",
      cover_image:
        "https://image.aladin.co.kr/product/28465/73/cover500/k092835920_2.jpg",
    },
    {
      book_id: 2,
      isbn: "9791189327156",
      title: "물고기는 존재하지 않는다",
      author: "룰루 밀러",
      description:
        "‘방송계의 퓰리처상’으로 불리는 피버디상(Peabody Awards)을 수상한 과학 전문기자 룰루 밀러의 경이로운 논픽션 《물고기는 존재하지 않는다》는 여러 언론 매체에서 ‘2020년 최고의 책’으로 선정할 만큼 수많은 찬사를 받은 화제의 베스트셀러다. 집착에 가까울 만큼 자연계에 질서를 부여하려 했던 19세기 어느 과학자의 삶을 흥미롭게 좇아가는 이 책은 어느 순간 독자들을 혼돈의 한복판으로 데려가서 우리가 믿고 있던 삶의 질서에 관해 한 가지 의문을 제기한다. “물고기가 존재하지 않는다는 것은 엄연한 하나의 사실이다. 그렇다면 우리는 또 무엇을 잘못 알고 있을까?” 하고 말이다. 누군가에게는 이 질문이 살아가는 데 아무런 영향을 미치지 않을 수도 있다. 하지만 세상을 바라보는 “진실한 관계들”에 한층 가까이 다가가기 위해 노력하는 사람들에게는 분명 이 책이 놀라운 영감과 어느 한쪽으로도 치우치지 않는 폭넓은 시야를 제공해줄 것이다.",
      cover_image:
        "https://image.aladin.co.kr/product/28465/73/cover500/k092835920_2.jpg",
    },
    {
      book_id: 3,
      isbn: "9791189327156",
      title: "물고기는 존재하지 않는다",
      author: "룰루 밀러",
      description:
        "‘방송계의 퓰리처상’으로 불리는 피버디상(Peabody Awards)을 수상한 과학 전문기자 룰루 밀러의 경이로운 논픽션 《물고기는 존재하지 않는다》는 여러 언론 매체에서 ‘2020년 최고의 책’으로 선정할 만큼 수많은 찬사를 받은 화제의 베스트셀러다. 집착에 가까울 만큼 자연계에 질서를 부여하려 했던 19세기 어느 과학자의 삶을 흥미롭게 좇아가는 이 책은 어느 순간 독자들을 혼돈의 한복판으로 데려가서 우리가 믿고 있던 삶의 질서에 관해 한 가지 의문을 제기한다. “물고기가 존재하지 않는다는 것은 엄연한 하나의 사실이다. 그렇다면 우리는 또 무엇을 잘못 알고 있을까?” 하고 말이다. 누군가에게는 이 질문이 살아가는 데 아무런 영향을 미치지 않을 수도 있다. 하지만 세상을 바라보는 “진실한 관계들”에 한층 가까이 다가가기 위해 노력하는 사람들에게는 분명 이 책이 놀라운 영감과 어느 한쪽으로도 치우치지 않는 폭넓은 시야를 제공해줄 것이다.",
      cover_image:
        "https://image.aladin.co.kr/product/28465/73/cover500/k092835920_2.jpg",
    },
  ];
  const { keyword } = useContext(SearchContext);

  return (
    <div className="searchPageWrapper">
      <div className="homeTitle">
        <h1>책PICK</h1>
      </div>
      <NavBar />
      <SearchInput />
      <div className="resultWrapper">
        {keyword &&
          reuslt.map((item) => {
            return (
              <div key={item.book_id} className="resultContainer">
                <img
                  src={item.cover_image}
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
      </div>
    </div>
  );
};

export default SearchPage;
