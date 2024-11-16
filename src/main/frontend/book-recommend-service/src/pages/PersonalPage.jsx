import React, { useEffect, useState, useCallback } from "react";
import { Mobile, Pc } from "../components/reponsiveCheck";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { MobileNavBar } from "../components/navBar";
// import LogoPath from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { EditProfileModal } from "../components/editProfileModal";
import BeatLoader from "react-spinners/BeatLoader";
import { AddGenreModal } from "../components/editGenreModal";
import { ReactComponent as Delete } from "../assets/delete.svg";
// import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const PersonalPage = () => {
  const [isClosed, setIsClosed] = useState(false);
  const navigation = useNavigate();

  const token = localStorage.getItem("accessToken");
  const memberId = localStorage.getItem("memberId");

  const [nickname, setNickname] = useState();
  const [membername, setMembername] = useState();
  const [preferredGenres, setPreferredGenres] = useState();
  const [reviews, setReviews] = useState();
  const [library, setLibrary] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [addGenreClicked, setAddGenreClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingColor = "#4A00AA";

  const handleLogOut = async () => {
    try {
      const response = await fetch("/book/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain;charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.text();
      alert(responseData);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("memberId");
      navigation("/intro");
    } catch (error) {
      console.error("fetch error:", error.message);
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await fetch(`/book/withdraw/${memberId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain;charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.text();
      alert(responseData);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("memberId");
      navigation("/intro");
    } catch (error) {
      console.error("fetch error:", error.message);
    }
  };

  const handleEditProfile = () => {
    setIsClicked(!isClicked);
  };

  const handleAddGenre = () => {
    setAddGenreClicked(!addGenreClicked);
  };

  const handleClickBook = (item) => {
    navigation("/bookDetail", { state: { item } });
  };

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
      setMembername(responseData.membername);
      setPreferredGenres(responseData.preferredGenres);
      setReviews(responseData.reviews || []);
    } catch (error) {
      console.error("fetch error:", error.message);
    }
  }, [memberId, token]);

  const handleProfileUpdated = () => {
    fetchMemberInfo();
  };

  useEffect(() => {
    fetchMemberInfo();
  }, [fetchMemberInfo]);

  useEffect(() => {
    const fetchLibrary = async () => {
      setLoading(true);
      if (reviews !== undefined) {
        const newLibrary = [];
        for (let review of reviews) {
          try {
            const response = await fetch(`/api/search?query=${review.isbn13}`);

            if (!response.ok) {
              throw new Error(`Error:${response.status}`);
            }

            const data = await response.json();
            if (data && data.item) {
              newLibrary.push(data.item);
            }
          } catch (error) {
            console.log(error.message);
          }
        }
        setLibrary(newLibrary);
      }
      setLoading(false);
    };
    fetchLibrary();
  }, [reviews]);

  const fetchDeletGenre = async (item) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `/book/preferred-genres/${item.preferredGenreId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error:" + response.statusText);
        }

        const responseData = await response.text();
        console.log(responseData);
      } catch (error) {
        console.error("fetch error:", error.message);
      }
      handleProfileUpdated();
    }
  };

  return (
    <>
      <Pc>
        <div className="personalPageWrapper">
          <div className="leftWrapper">
            <p
              style={{
                fontFamily: "RiaSans-ExtraBold",
                fontSize: 24,
                color: "#4A00AA",
                marginTop: 36,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => navigation("/home")}
            >
              READING
              <br />
              PLANNER
            </p>
            <div className="userProfile">
              <div className="userInfo">
                <p>
                  {nickname}
                  <span style={{ marginLeft: 1, fontWeight: "300" }}>님</span>
                </p>
                <p id="membername">{membername}</p>
                <p>
                  지금까지 {reviews !== undefined ? reviews.length : 0}권의 책을
                  기록했어요! 😆
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#DDD",
                  margin: "16px 0px 16px 0px",
                }}
              />
              <div className="userButtons">
                <button onClick={handleEditProfile}>회원정보 수정</button>
                <button onClick={handleLogOut}>로그아웃</button>
                <button onClick={handleWithdraw}>회원탈퇴</button>
              </div>
            </div>
            <div className="userStatistics">
              {/* <div className="statisticsForMonth">
                <p>기록 통계</p>
              </div> */}
              <div className="favoriteGenre">
                <div className="favoriteGenre-upper">
                  <p>선호 장르</p>
                  <div className="buttons">
                    <button onClick={handleAddGenre}>추가</button>
                  </div>
                </div>
                <div className="favoriteGenre-below">
                  {preferredGenres !== undefined &&
                    preferredGenres.map((item, index) => {
                      return (
                        <div className="genreElement" key={index}>
                          <p>{item.preferredGenre}</p>
                          <div onClick={() => fetchDeletGenre(item)}>
                            <Delete />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="library">
            <div className="savedBooks">
              <div className="savedBooksTitle">
                <p className="title">나의 기록</p>
              </div>

              {loading && (
                <div className="loadingContainer">
                  <BeatLoader loading={loading} color={loadingColor} />
                </div>
              )}
              <div className="savedBooksBottom">
                {library.length > 0 ? (
                  library.map((item, index) => {
                    return (
                      <div key={index} className="savedBookElement">
                        <img
                          onClick={() => handleClickBook(item)}
                          className="bookCover"
                          alt="bookCover"
                          src={item.cover.replace("coversum", "cover500")}
                        />
                        <div className="savedbookTextsWrapper">
                          <p>{item.title}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>아직 저장한 책이 없어요. 🧐</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Pc>
      <Mobile>
        <div className="personalPageWrapper-mobile">
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
          <div className="leftWrapper-mobile">
            <div className="userProfile-mobile">
              <div className="userInfo-mobile">
                <p>
                  {nickname}
                  <span>님</span>
                </p>
                <p id="membername-mobile">{membername}</p>
                <p>
                  지금까지 {reviews !== undefined ? reviews.length : 0}권의 책을
                  기록했어요!
                </p>
              </div>

              <div className="userButtons-mobile">
                <button>회원정보 수정</button>
                <button onClick={handleLogOut}>로그아웃</button>
                <button onClick={handleWithdraw}>회원탈퇴</button>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#DDD",
              margin: "36px 0px 50px",
            }}
          />
          <div className="library-mobile">
            <div className="userStatistics-mobile">
              <div className="statisticsForMonth-mobile">이달의 기록</div>
              <div className="favoriteGenre-mobile">많이읽은장르</div>
            </div>
            <div
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#DDD",
                margin: "16px 0px",
              }}
            />
            <div className="savedBooks-mobile">여기에 기록한 책</div>
          </div>
        </div>
      </Mobile>
      {isClicked && (
        <EditProfileModal
          isClicked={(e) => setIsClicked(!isClicked)}
          nickname={nickname}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
      {addGenreClicked && (
        <AddGenreModal
          isClicked={(e) => setAddGenreClicked(!addGenreClicked)}
          onProfileUpdated={handleProfileUpdated}
          currentGenres={preferredGenres}
        />
      )}
    </>
  );
};

export default PersonalPage;
