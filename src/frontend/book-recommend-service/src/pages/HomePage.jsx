import React, { useState } from "react";
import SearchPage from "./SearchPage";
import PersonalPage from "./PersonalPage";
import { Route, Routes } from "react-router-dom";
import { MobileNavBar, NavBar } from "../components/navBar";
import RecommendPage from "./RecommendPage";
import { Mobile, Pc } from "../components/reponsiveCheck";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
// import LogoPath from "../assets/logo.png";

const HomePage = () => {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      <Pc>
        <div className="HomeWrapper">
          <div className="homeTitle">
            <Logo style={{ height: 200 }} />
            {/* <h1>READING PLANNER</h1> */}
          </div>
          <NavBar />
          <RecommendPage />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/search" element={<SearchPage />} />
            <Route path="/home/personal" element={<PersonalPage />} />
          </Routes>
        </div>
      </Pc>
      <Mobile>
        <div className="HomeWrapper-mobile">
          <div className="navWrapper-mobile">
            <div onClick={(e) => setIsClosed(!isClosed)}>
              <MenuIcon />
            </div>
            <div>
              <p className="logoText">READING PLANNER</p>
            </div>
            <div style={{ width: 36, height: 36 }} />
          </div>
          {isClosed && (
            <div className="mobileNav-overlay">
              <MobileNavBar isClosed={() => setIsClosed(!isClosed)} />
            </div>
          )}
        </div>
        <RecommendPage />
      </Mobile>
    </>
  );
};

export default HomePage;
