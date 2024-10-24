import React from "react";

export const BasicButton = ({ text, onClick }) => {
  return (
    <div className="basicButtonWrapper">
      <button onClick={onClick}>{text}</button>
    </div>
  );
};
