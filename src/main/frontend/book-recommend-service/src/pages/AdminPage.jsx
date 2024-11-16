import React, { useCallback, useEffect, useState } from "react";
import {
  RecordListManage,
  SurveyManage,
  UserManage,
} from "../components/adminTabs";
import { ReactComponent as Member } from "../assets/manage_accounts.svg";
import { ReactComponent as Survey } from "../assets/fact_check.svg";
import { ReactComponent as Record } from "../assets/analytics.svg";

const AdminPage = () => {
  const [tabName, setTabName] = useState("userManage");
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("accessToken");
  const [adminName, setAdminName] = useState();

  const handlePressTab = (tabName) => {
    setTabName(tabName);
  };

  const getAdminInfo = useCallback(async () => {
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
      setAdminName(responseData.nickname);
    } catch (error) {
      console.error("fetch error:", error);
    }
  }, [memberId, token]);

  useEffect(() => {
    getAdminInfo();
  }, [getAdminInfo]);

  return (
    <div className="adminWrapper">
      <div className="adminNavBarWrapper">
        <div className="adminProfile">
          <p>
            <span style={{ fontWeight: "400", color: "#4A00AA" }}>
              {adminName}
            </span>{" "}
            관리자님,
          </p>
          <p>안녕하세요! ☺️</p>
        </div>
        <div className="adminTabsWrapper">
          <div
            className={
              tabName === "userManage" ? "selectedAdminTab" : "adminTab"
            }
            onClick={() => handlePressTab("userManage")}
          >
            <Member />
            <p>회원 관리</p>
          </div>
          <div
            className={
              tabName === "surveyManage" ? "selectedAdminTab" : "adminTab"
            }
            onClick={() => handlePressTab("surveyManage")}
          >
            <Survey />
            <p>설문기록 조회</p>
          </div>
          <div
            className={
              tabName === "recordListManage" ? "selectedAdminTab" : "adminTab"
            }
            onClick={() => handlePressTab("recordListManage")}
          >
            <Record />
            <p>도서기록 조회</p>
          </div>
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
