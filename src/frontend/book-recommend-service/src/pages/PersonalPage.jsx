import React, { useState } from "react";
import { Mobile, Pc } from "../components/reponsiveCheck";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { MobileNavBar } from "../components/navBar";
import LogoPath from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const PersonalPage = () => {
  const [isClosed, setIsClosed] = useState(false);
  // const [isEditClosed, setIsEditClosed] = useState(false);
  const navigation = useNavigate();

  const token = localStorage.getItem("accessToken");
  const authId = localStorage.getItem("authId");
  const nickname = localStorage.getItem("nickname");
  const membername = localStorage.getItem("membername");

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
      localStorage.removeItem("authId");
      navigation("/intro");
    } catch (error) {
      console.error("fetch error:", error.message);
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await fetch(`/book/withdraw/${authId}`, {
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
      localStorage.removeItem("authId");
      navigation("/intro");
    } catch (error) {
      console.error("fetch error:", error.message);
    }
  };

  return (
    <>
      <Pc>
        <div className="personalPageWrapper">
          <div className="leftWrapper">
            <img
              onClick={() => navigation("/home")}
              src={LogoPath}
              className="logoImg"
              alt="logo"
            />
            <div className="userProfile">
              <div className="userInfo">
                <p>
                  {nickname}
                  <span style={{ marginLeft: 1, fontWeight: "300" }}>님</span>
                </p>
                <p id="membername">{membername}</p>
                <p>지금까지 10권의 책을 기록했어요! 😆</p>
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
                <button>회원정보 수정</button>
                <button onClick={handleLogOut}>로그아웃</button>
                <button onClick={handleWithdraw}>회원탈퇴</button>
              </div>
            </div>
          </div>
          <div className="library">
            <div className="savedBooks">여기에 기록한 책</div>
            <div className="userStatistics">
              <div className="statisticsForMonth">이달의 기록</div>
              <div className="favoriteGenre">많이읽은장르</div>
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
                  userName<span>님</span>
                </p>
                <p>userId</p>
                <p>지금까지 ?권의 책을 기록했어요!</p>
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
    </>
  );
};

export default PersonalPage;
