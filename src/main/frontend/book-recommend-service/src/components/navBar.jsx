import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as BackIcon } from "../assets/arrow_back.svg";

export const NavBar = () => {
  return (
    <nav className="navBarWrapper">
      <div className="navBarTabs">
        <div className="navTab">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    textDecoration: "none",
                    color: "#4A00AA",
                    fontWeight: 300,
                    fontSize: 16,
                    padding: "6px",
                  }
                : {
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 300,
                    fontSize: 16,
                    padding: "6px",
                  }
            }
            to="/home/recommend"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </div>
        <div className="navTab">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    textDecoration: "none",
                    color: "#4A00AA",
                    fontWeight: 300,
                    fontSize: 16,
                    padding: "6px",
                  }
                : {
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 300,
                    fontSize: 16,
                    padding: "6px",
                  }
            }
            to="/home/search"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Search
          </NavLink>
        </div>
        <div className="navTab">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    textDecoration: "none",
                    color: "#4A00AA",
                    fontWeight: 300,
                    fontSize: 16,
                    padding: "6px",
                  }
                : {
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 300,
                    fontSize: 16,
                    padding: "6px",
                  }
            }
            to="/home/personal"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Library
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export const MobileNavBar = ({ isClosed }) => {
  return (
    <nav className="navBarWrapper-mobile">
      <div className="backIcon" onClick={isClosed}>
        <BackIcon style={{ width: 36 }} />
      </div>
      <div className="navBarTabs-mobile">
        <div className="navTab-mobile">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    textDecoration: "none",
                    color: "#4A00AA",
                    fontWeight: 300,
                    fontSize: 20,
                    padding: "6px",
                  }
                : {
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 300,
                    fontSize: 20,
                    padding: "6px",
                  }
            }
            to="/home/recommend"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </div>
        <div className="navTab-mobile">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    textDecoration: "none",
                    color: "#4A00AA",
                    fontWeight: 300,
                    fontSize: 20,
                    padding: "6px",
                  }
                : {
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 300,
                    fontSize: 20,
                    padding: "6px",
                  }
            }
            to="/home/search"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Search
          </NavLink>
        </div>
        <div className="navTab-mobile">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    textDecoration: "none",
                    color: "#4A00AA",
                    fontWeight: 300,
                    fontSize: 20,
                    padding: "6px",
                  }
                : {
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 300,
                    fontSize: 20,
                    padding: "6px",
                  }
            }
            to="/home/personal"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Library
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
