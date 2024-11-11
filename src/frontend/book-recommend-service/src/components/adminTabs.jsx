import React from "react";

const dummyUserList = [
  {
    member_id: 1,
    nickname: "도넛먹는어피치도넛먹는어피치도넛먹는어피치",
    membername: "exampleIdexampleIdexampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 2,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 3,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 4,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 5,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 6,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 7,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 8,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 9,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
  {
    member_id: 10,
    nickname: "도넛먹는어피치",
    membername: "exampleId",
    created_at: new Date().toLocaleDateString(),
    member_staus: "ACTIVE",
  },
];

export const UserManage = () => {
  return (
    <div className="userManagePageWrapper">
      <h1>회원 관리</h1>
      <div className="userListSection">
        {dummyUserList.map((item) => {
          return (
            <div className="userContainer" key={item.member_id}>
              <div className="elementContainer">
                <p>{item.nickname}</p>
              </div>
              <div className="elementContainer">
                <p>{item.membername}</p>
              </div>
              <div className="elementContainer">
                <p>{item.created_at}</p>
              </div>
              <div className="elementButton">{item.member_staus}</div>
              <div className="elementButton">survey</div>
              <div className="elementButton">library</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SurveyManage = (member_id) => {
  return (
    <div>
      <p>survey manage</p>
    </div>
  );
};

export const RecordListManage = () => {
  return (
    <div>
      <p>record list manage</p>
    </div>
  );
};
