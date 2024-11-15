import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BlockIcon from "@mui/icons-material/Block";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const UserManage = () => {
  const [memberList, setMemberList] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchMemberList = useCallback(async () => {
    try {
      const response = await fetch("/admin/members", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        // HTTP 응답이 2xx가 아닌 경우 에러를 던짐
        throw new Error(responseData.message || "Unknown error occurred");
      }

      if (responseData) {
        const data = responseData;
        setMemberList(data);
      }
    } catch (error) {
      console.log("fetch error:", error);
      alert(error.message || "알 수 없는 에러 발생.");
    }
  }, [token, setMemberList]);

  useEffect(() => {
    fetchMemberList();
  }, [fetchMemberList]);

  const suspendMember = async (memberId) => {
    try {
      const response = await fetch(`admin/members/${memberId}/suspend`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.text();

      if (!response.ok) {
        // HTTP 응답이 2xx가 아닌 경우 에러를 던짐
        throw new Error(responseData.message || "Unknown error occurred");
      }

      if (responseData) {
        alert(responseData);
      }
    } catch (error) {
      console.log("fetch error:", error);
      alert(error.message || "알 수 없는 에러 발생.");
    }
  };

  const onClickMemberStatus = (memberId) => {
    if (window.confirm("정말 이 회원을 정지시키시겠습니까?")) {
      suspendMember(memberId);
      window.location.reload();
    }
  };

  const columns = [
    { field: "memberId", headerName: "ID", width: 50 },
    { field: "membername", headerName: "Member Name", width: 120 },
    { field: "nickname", headerName: "Nickname", width: 120 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "memberStatus", headerName: "Member Status", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 120 },
    {
      field: "Action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => onClickMemberStatus(params.row.memberId)}>
          <BlockIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="userManagePageWrapper">
      <h1>회원 관리</h1>
      <div className="userListSection">
        <DataGrid
          rows={memberList}
          columns={columns}
          getRowId={(memberList) => memberList.memberId}
          checkboxSelection={true}
          onCellClick={(e) => console.log(e)}
        />
      </div>
    </div>
  );
};

export const SurveyManage = () => {
  const [surveyList, setSurveyList] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchSurveyList = useCallback(async () => {
    try {
      const response = await fetch("/admin/members/survey-with-genres", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        // HTTP 응답이 2xx가 아닌 경우 에러를 던짐
        throw new Error(responseData.message || "Unknown error occurred");
      }

      if (responseData) {
        const data = responseData;
        setSurveyList(data);
      }
    } catch (error) {
      console.log("fetch error:", error);
      alert(error.message || "알 수 없는 에러 발생.");
    }
  }, [token, setSurveyList]);

  useEffect(() => {
    console.log("fetch memberlist call");
    fetchSurveyList();
  }, [fetchSurveyList]);

  const columns = [
    { field: "memberId", headerName: "ID", width: 50 },
    { field: "membername", headerName: "Member Name", width: 120 },
    { field: "age", headerName: "Age", width: 120 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "preferredGenres", headerName: "PreferredGenres", width: 300 },
    // {
    //   field: "Action",
    //   headerName: "Action",
    //   width: 80,
    //   renderCell: (params) => (
    //     <IconButton onClick={() => onClickMemberStatus(params.row.memberId)}>
    //       <BlockIcon />
    //     </IconButton>
    //   ),
    // },
  ];

  return (
    <div className="surveyManagePageWrapper">
      <h1>설문기록 조회</h1>
      <div className="surveyListSection">
        <DataGrid
          rows={surveyList}
          columns={columns}
          getRowId={(surveyList) => surveyList.memberId}
          checkboxSelection={true}
        />
      </div>
    </div>
  );
};

export const RecordListManage = () => {
  const [recordList, setRecordList] = useState();
  const token = localStorage.getItem("accessToken");

  const fetchRecordList = useCallback(async () => {
    try {
      const response = await fetch("/admin/members/reviews-with-keywords", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        // HTTP 응답이 2xx가 아닌 경우 에러를 던짐
        throw new Error(responseData.message || "Unknown error occurred");
      }

      if (responseData) {
        const data = responseData;
        const transformedData = transformData(data);
        setRecordList(transformedData);
      }
    } catch (error) {
      console.log("fetch error:", error);
      alert(error.message || "알 수 없는 에러 발생.");
    }
  }, [token, setRecordList]);

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/admin/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.text();

      if (!response.ok) {
        // HTTP 응답이 2xx가 아닌 경우 에러를 던짐
        throw new Error(responseData.message || "Unknown error occurred");
      }

      if (responseData) {
        alert(responseData);
      }
    } catch (error) {
      console.log("fetch error:", error);
      alert(error.message || "알 수 없는 에러 발생.");
    }
  };

  const onClickDeleteReview = (reviewId) => {
    if (window.confirm("정말 이 후기를 삭제하시겠습니까?")) {
      deleteReview(reviewId);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "memberId", headerName: "Member Id", width: 100 },
    { field: "membername", headerName: "Member Name", width: 120 },
    { field: "content", headerName: "Content", width: 400 },
    { field: "star", headerName: "Star", width: 120 },
    {
      field: "Action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => onClickDeleteReview(params.row.id)}>
          <DeleteForeverIcon />
        </IconButton>
      ),
    },
  ];

  const transformData = (data) => {
    const transformed = [];
    data.forEach((item) => {
      item.reviews.forEach((review) => {
        transformed.push({
          id: review.reviewId,
          memberId: item.memberId,
          membername: item.membername,
          content: review.content,
          star: review.star,
        });
      });
    });
    return transformed;
  };

  useEffect(() => {
    fetchRecordList();
  }, [fetchRecordList]);

  return (
    <div className="recordManageWrapper">
      <h1>도서기록 조회</h1>
      <div className="recordListSection">
        <DataGrid
          rows={recordList}
          columns={columns}
          checkboxSelection={true}
        />
      </div>
    </div>
  );
};
