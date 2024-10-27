import React from "react";
import SearchPage from "./SearchPage";
import PersonalPage from "./PersonalPage";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "../components/navBar";
import RecommendPage from "./RecommendPage";

const HomePage = () => {
  return (
    <div className="HomeWrapper">
      <div className="homeTitle">
        <h1>READING PLANNER</h1>
      </div>
      <NavBar />
      <RecommendPage />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/search" element={<SearchPage />} />
        <Route path="/home/personal" element={<PersonalPage />} />
      </Routes>
    </div>
  );
};

export default HomePage;
