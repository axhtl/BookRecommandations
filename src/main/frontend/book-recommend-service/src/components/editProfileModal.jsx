import React, { useState } from "react";

export const EditProfileModal = ({ isClicked, nickname, onProfileUpdated }) => {
  const token = localStorage.getItem("accessToken");
  const memberId = localStorage.getItem("memberId");
  const [newNickname, setNewNickname] = useState();
  const [newPassword, setNewPassword] = useState();

  const fetchNewNickname = async () => {
    const nicknameData = {
      nickname: newNickname,
    };

    try {
      const response = await fetch(`/book/members/${memberId}/nickname`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nicknameData),
      });

      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.text();
      console.log(responseData);
    } catch (error) {
      console.error("fetch error:", error.message);
    }
  };

  const fetchNewPassword = async () => {
    const passwordData = {
      password: newPassword,
    };

    try {
      const response = await fetch(`/book/members/${memberId}/password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        throw new Error("Error:" + response.statusText);
      }

      const responseData = await response.text();
      console.log(responseData);
    } catch (error) {
      console.error("fetch error:", error.message);
    }
  };

  const handleEditProfile = async () => {
    if (newNickname !== undefined) await fetchNewNickname();
    if (newPassword !== undefined) await fetchNewPassword();
    alert("회원정보 수정이 완료되었습니다.");
    isClicked();
    onProfileUpdated();
  };

  return (
    <div className="modalOpen">
      <div className="editProfileWrapper">
        <div className="editProfileContainer">
          <div className="closeButton" onClick={isClicked}>
            취소
          </div>
          <p>회원정보 수정</p>
          <div className="editInputs">
            <div className="editInputWrapper">
              <input
                className="editInput"
                placeholder={nickname}
                onChange={(e) => setNewNickname(e.target.value)}
              />
            </div>
            <div className="editInputWrapper">
              <input
                className="editInput"
                placeholder="새 비밀번호를 입력하세요."
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleEditProfile}>제출하기</button>
        </div>
      </div>
    </div>
  );
};
