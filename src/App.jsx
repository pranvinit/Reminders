import { useState } from "react";
import "./App.css";

// Component imports
import Topbar from "./components/topbar/Topbar";
import List from "./components/list/List";
import Form from "./components/form/Form";

function App() {
  const [reminders, setReminders] = useState(
    localStorage.getItem("reminders")
      ? JSON.parse(localStorage.getItem("reminders"))
      : [
          {
            id: 1,
            text: "Example reminder",
            date: "2021-12-31",
            color: "blue",
            status: "Pending",
          },
          {
            id: 2,
            text: "Example reminder 2",
            date: "2021-12-31",
            color: "green",
            status: "Pending",
          },
          {
            id: 3,
            text: "Example reminder 3",
            date: "2021-12-31",
            color: "red",
            status: "Pending",
          },
        ]
  );

  const [addAction, setAddAction] = useState(false);
  const [activeReminderId, setActiveReminderId] = useState(null);

  const handleAddAction = () => {
    setActiveReminderId(null);
    setAddAction(!addAction);
  };

  const getFormInfo = () => {
    return reminders.find((reminder) => reminder.id === activeReminderId) || {};
  };

  console.log(reminders);

  return (
    <div className="App">
      <Topbar />
      <div className="content">
        <h3>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </h3>
        <List reminders={reminders} onUpdateAction={setActiveReminderId} />
        {(addAction || activeReminderId) && (
          <Form
            id={activeReminderId}
            reminder={getFormInfo()}
            onSave={setReminders}
          />
        )}
        <div className="add-button" onClick={handleAddAction}>
          <img src="/assets/add.png" alt="add" />
          <span>New Reminder</span>
        </div>
      </div>
    </div>
  );
}

export default App;
