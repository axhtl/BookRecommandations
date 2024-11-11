import React, { useEffect, useState } from "react";
import {
  RecordListManage,
  SurveyManage,
  UserManage,
} from "../components/adminTabs";

const AdminPage = () => {
  const adminInfo = {
    memberNickname: "superAdmin",
    memberId: "admin_id",
    role: "admin",
  };

  const [tabName, setTabName] = useState("userManage");

  const handlePressTab = (tabName) => {
    setTabName(tabName);
  };

  useEffect(() => {
    console.log(tabName);
  }, [tabName]);

  return (
    <div className="adminWrapper">
      <div className="adminNavBarWrapper">
        <div className="adminProfile">
          <p>
            <span style={{ fontWeight: "400", color: "#4A00AA" }}>
              {adminInfo.memberNickname}
            </span>{" "}
            관리자님,
          </p>
          <p>안녕하세요! ☺️</p>
        </div>
        <div className="adminTabsWrapper">
          <p onClick={() => handlePressTab("userManage")}>회원 관리</p>
          <p onClick={() => handlePressTab("surveyManage")}>설문기록 조회</p>
          <p onClick={() => handlePressTab("recordListManage")}>
            도서기록 조회
          </p>
        </div>
      </div>
      <div className="adminPagesWrapper">
        {tabName === "userManage" && <UserManage />}
        {tabName === "surveyManage" && <SurveyManage />}
        {tabName === "recordListManage" && <RecordListManage />}
      </div>
    </div>
  );
};

export default AdminPage;
