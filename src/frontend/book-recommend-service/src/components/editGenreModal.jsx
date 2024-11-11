import React, { useState } from "react";
import MultipleSelectChip from "./MultipleSelectChip"; // 경로를 실제 파일 경로로 수정하세요.

export const AddGenreModal = ({
  isClicked,
  onProfileUpdated,
  currentGenres,
}) => {
  const token = localStorage.getItem("accessToken");
  const memberId = localStorage.getItem("memberId");
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleDoneEdit = async () => {
    if (selectedGenres.length === 0) {
      isClicked();
    } else if (selectedGenres.length < 2) {
      try {
        const response = await fetch(
          `/book/members/${memberId}/preferred-genres`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: selectedGenres,
          }
        );

        if (!response.ok) {
          throw new Error("Error:" + response.statusText);
        }

        const responseData = await response.text();
        alert(responseData);
        isClicked();
        onProfileUpdated();
      } catch (error) {
        console.error("fetch error:", error);
      }
    } else {
      for (let genre of selectedGenres) {
        try {
          const response = await fetch(
            `/book/members/${memberId}/preferred-genres`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: genre,
            }
          );

          if (!response.ok) {
            throw new Error("Error:" + response.statusText);
          }

          const responseData = await response.text();
          alert(responseData);
          isClicked();
          onProfileUpdated();
        } catch (error) {
          console.error("fetch error:", error);
        }
      }
    }
  };

  return (
    <div className="modalOpen">
      <div className="editGenreWrapper">
        <div className="editGenreContainer">
          <div className="editGenreUpper">
            <div className="closeButton" onClick={isClicked}>
              취소
            </div>
            <div className="submitButton" onClick={handleDoneEdit}>
              완료
            </div>
          </div>
          <div className="editGenreBelow">
            <div className="editGenreBelowText">
              <p className="title">추가하고 싶은 장르를 선택해주세요.</p>
              <p className="subTitle">(중복 선택 가능)</p>
            </div>
            <MultipleSelectChip
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
