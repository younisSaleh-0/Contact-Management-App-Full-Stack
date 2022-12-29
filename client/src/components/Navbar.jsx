import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

import GridViewIcon from "@mui/icons-material/GridView";
import MessageIcon from "@mui/icons-material/Message";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonIcon from "@mui/icons-material/Person";

import EmailIcon from "@mui/icons-material/Email";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleColor, setToggleColor] = useState("darkMode");

  return (
    <div className={`navbar__container ${isOpen ? "open" : "close"}`}>
      <nav className="navbar">
        <div className="navbar__brand">
          <div></div>
        </div>
        <ul className="navbar__menu">
          <h2 className="navbar__menu-title">Menu</h2>
          <li className="navbar__menu-item active">
            <GridViewIcon className="navbar__menu-icon" />
            <Link>Overview</Link>
          </li>
          <li className="navbar__menu-item">
            <MessageIcon className="navbar__menu-icon" />
            <Link>Message</Link>
          </li>
          <li className="navbar__menu-item">
            <StarBorderIcon className="navbar__menu-icon" />
            <Link>Favorite</Link>
          </li>
          <li className="navbar__menu-item">
            <PersonIcon className="navbar__menu-icon" />
            <Link>Contacts</Link>
          </li>
        </ul>
        <ul className="navbar__tools">
          <h2 className="navbar__tools-title">Tools</h2>
          <li className="navbar__tools-item">
            <EmailIcon className="navbar__menu-icon" />
            <Link>Mail</Link>
          </li>
          <li className="navbar__tools-item">
            <AutoFixHighIcon className="navbar__menu-icon" />
            <Link>Automation</Link>
          </li>
          <li className="navbar__tools-item">
            <SettingsIcon className="navbar__menu-icon" />
            <Link>Settings</Link>
          </li>
        </ul>
        <div className="navbar__actions">
          <button>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
