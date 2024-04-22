import { useState } from "react";
import "./topbar.css";

function Topbar({ setReminders }) {
  const [name, setName] = useState(localStorage.getItem("name") || "Guest");
  const [accountMenuActive, setAccountMenuActive] = useState(false);

  const toggleAccountMenu = () => {
    setAccountMenuActive(!accountMenuActive);
  };

  const handleName = ({ target }) => {
    setName(target.value);
    localStorage.setItem("name", target.value);
  };

  const handleReset = () => {
    setReminders([]);
    localStorage.removeItem("reminders");
    localStorage.removeItem("name");
    setAccountMenuActive(false);
  };

  return (
    <div className="topbar">
      <div className="left" onClick={() => window.location.replace("/")}>
        <img src="/assets/logo.png" alt="User Profile" />
        <div className="logo-text">
          <span>Simple</span>
          <span>Reminders</span>
        </div>
      </div>
      <div className="right">
        <img
          src={
            accountMenuActive
              ? "/assets/profile-user-active.png"
              : "/assets/profile-user.png"
          }
          alt="Simple Reminders logo"
          onClick={toggleAccountMenu}
        />
        {accountMenuActive && (
          <div className="account-menu">
            <input
              type="text"
              name="name"
              placeholder="Guest"
              value={name}
              onChange={handleName}
            />
            <div className="menu-list">
              <div className="menu-item">
                <img src="/assets/right-up.png" alt="remove" />
                <span onClick={handleReset}>Clear All Data</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
