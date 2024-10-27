import React from "react";

const PersonalPage = () => {
  return (
    <div className="personalPageWrapper">
      <div className="userProfile">
        <div className="userInfo">
          <p>userName</p>
          <p>userId</p>
          <p>지금까지 ?권의 책을 기록했어요!</p>
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
          <button>로그아웃</button>
          <button>회원탈퇴</button>
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
  );
};

export default PersonalPage;
