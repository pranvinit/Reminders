import { useEffect, useState } from "react";
import "./App.css";

// Component imports
import Topbar from "./components/topbar/Topbar";
import List from "./components/list/List";
import Form from "./components/form/Form";

function App() {
  const [reminders, setReminders] = useState(
    localStorage.getItem("reminders")
      ? JSON.parse(localStorage.getItem("reminders"))
      : []
  );

  const [addAction, setAddAction] = useState(false);
  const [activeReminderId, setActiveReminderId] = useState(null);

  const saveToLS = (reminders) => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  };

  const isFormActive = () => {
    return addAction || activeReminderId;
  };

  const closeForm = () => {
    setAddAction(false);
    setActiveReminderId(null);
  };

  useEffect(() => {
    closeForm();
    saveToLS(reminders);
  }, [reminders]);

  const handleAddAction = () => {
    setActiveReminderId(null);
    setAddAction(!addAction);
  };

  const getActiveReminder = () => {
    return reminders.find((reminder) => reminder.id === activeReminderId) || {};
  };

  return (
    <div className="App">
      <Topbar setReminders={setReminders} />
      <div className="content">
        <h3>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </h3>
        <List reminders={reminders} onUpdateAction={setActiveReminderId} />
        {isFormActive() && (
          <div className="reminder-form-modal" onClick={closeForm}>
            <Form
              id={activeReminderId}
              reminder={getActiveReminder()}
              onSave={setReminders}
            />
          </div>
        )}
        <div className="add-button" onClick={handleAddAction}>
          <img
            className={isFormActive() ? "active" : ""}
            src="/assets/add.png"
            alt="add"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
