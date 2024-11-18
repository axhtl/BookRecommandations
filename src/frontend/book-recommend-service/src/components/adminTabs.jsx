import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import BlockIcon from "@mui/icons-material/Block";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { PieChart } from "@mui/x-charts/PieChart";

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

export const StatisticsPage = () => {
  const [genreCounts, setGenreCounts] = useState({});
  const [genderStats, setGenderStats] = useState({ male: 0, female: 0 });
  const [genderGenreStats, setGenderGenreStats] = useState({
    male: {},
    female: {},
  });
  const [ageGroupGenreStats, setAgeGroupGenreStats] = useState({
    teens: {},
    twenties: {},
    thirties: {},
    fortiesPlus: {},
  });
  const [userData, setUserData] = useState();
  const token = localStorage.getItem("accessToken");

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch("/admin/total", {
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
        console.log(responseData);
        setUserData(responseData);
        console.log(userData);
      }
    } catch (error) {
      console.log("fetch error:", error);
      alert(error.message || "알 수 없는 에러 발생.");
    }
  }, [token, setUserData]);

  useEffect(() => {
    const genreCounter = {};
    const genderCounter = { male: 0, female: 0 };
    const genderGenreCounter = { male: {}, female: {} };
    const ageGroupGenreCounter = {
      teens: {},
      twenties: {},
      thirties: {},
      fortiesPlus: {},
    };

    userData !== undefined &&
      userData.forEach((user) => {
        if (user.survey) {
          const { gender, age } = user.survey;
          const ageGroup = getAgeGroup(age);

          // 성별 통계
          if (gender === "M") {
            genderCounter.male += 1;
          } else if (gender === "F") {
            genderCounter.female += 1;
          }

          // 장르별 통계
          user.preferredGenres.forEach((genreObj) => {
            const genre = genreObj.genre;

            // 전체 장르 통계
            genreCounter[genre] = (genreCounter[genre] || 0) + 1;

            // 성별 장르 통계
            if (gender === "M") {
              genderGenreCounter.male[genre] =
                (genderGenreCounter.male[genre] || 0) + 1;
            } else if (gender === "F") {
              genderGenreCounter.female[genre] =
                (genderGenreCounter.female[genre] || 0) + 1;
            }

            // 나잇대별 장르 통계
            ageGroupGenreCounter[ageGroup][genre] =
              (ageGroupGenreCounter[ageGroup][genre] || 0) + 1;
          });
        }
      });

    setGenreCounts(genreCounter);
    setGenderStats(genderCounter);
    setGenderGenreStats(genderGenreCounter);
    setAgeGroupGenreStats(ageGroupGenreCounter);
  }, [userData]);

  const PreferGenreChart = Object.entries(genreCounts).map(
    ([genre, count]) => ({
      label: genre,
      value: count,
    })
  );

  const GenderChart = Object.entries(genderStats).map(([genre, count]) => ({
    label: genre,
    value: count,
  }));

  const GenreMaleChart = Object.entries(genderGenreStats.male).map(
    ([genre, count]) => ({
      label: genre,
      value: count,
    })
  );

  const GenreFemaleChart = Object.entries(genderGenreStats.female).map(
    ([genre, count]) => ({
      label: genre,
      value: count,
    })
  );

  const Teens = Object.entries(ageGroupGenreStats.teens).map(
    ([genre, count]) => ({
      label: genre,
      value: count,
    })
  );

  const Twenties = Object.entries(ageGroupGenreStats.twenties).map(
    ([genre, count]) => ({
      label: genre,
      value: count,
    })
  );

  const Thirties = Object.entries(ageGroupGenreStats.thirties).map(
    ([genre, count]) => ({
      label: genre,
      value: count,
    })
  );

  const OverFourties = Object.entries(ageGroupGenreStats.fortiesPlus).map(
    ([genre, count]) => ({
      label: genre,
      value: count,
    })
  );

  const getAgeGroup = (age) => {
    if (age < 20) return "teens";
    if (age < 30) return "twenties";
    if (age < 40) return "thirties";
    return "fortiesPlus";
  };

  useEffect(() => {
    fetchUserData();
  }, fetchUserData);

  return (
    <div className="statisticsWrapper">
      <h1>서비스 통계 조회</h1>
      <div className="chartsWrapper">
        <div style={{ display: "flex", gap: 8 }}>
          <div className="chartContainer">
            <p className="chartTitle">사용자 선호 장르 통계</p>
            <PieChart
              series={[
                {
                  data: PreferGenreChart,
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className="chartContainer">
            <p className="chartTitle">성별 통계</p>
            <PieChart
              series={[
                {
                  data: GenderChart,
                },
              ]}
              width={400}
              height={200}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="chartContainer">
            <p className="chartTitle">성별 선호 장르 통계</p>
            <div className="chartContainer-wrap">
              <div className="leftSide">
                <p>남성</p>
                <PieChart
                  series={[
                    {
                      data: GenreMaleChart,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>

              <div className="rightSide">
                <p>여성</p>
                <PieChart
                  series={[
                    {
                      data: GenreFemaleChart,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </div>
          </div>
          <div className="chartContainer">
            <p className="chartTitle">연령별 선호 장르 통계</p>
            <div className="chartContainer-wrap">
              <div>
                <p>10대</p>
                <PieChart
                  series={[
                    {
                      data: Teens,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
              <div>
                <p>20대</p>
                <PieChart
                  series={[
                    {
                      data: Twenties,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
              <div>
                <p>30대</p>
                <PieChart
                  series={[
                    {
                      data: Thirties,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
              <div>
                <p>40대 이상</p>
                <PieChart
                  series={[
                    {
                      data: OverFourties,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
