import { useEffect, useState } from "react";
import "./App.css";

// Component imports
import Topbar from "./components/topbar/Topbar";
import List from "./components/list/List";
import Form from "./components/form/Form";
import Filters from "./components/filters/Filters";

function App() {
  // Initialize reminders state with data from localStorage or empty array
  const [reminders, setReminders] = useState(
    localStorage.getItem("reminders")
      ? JSON.parse(localStorage.getItem("reminders"))
      : []
  );

  // Initialize filteredReminders state with reminders
  const [filteredReminders, setFilteredReminders] = useState([...reminders]);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredReminders(reminders);
    } else {
      setFilteredReminders(
        reminders.filter((reminder) => activeFilters.includes(reminder.status))
      );
    }
  }, [reminders, activeFilters]);

  // Initialize addAction and activeReminderId states
  const [addAction, setAddAction] = useState(false);
  const [activeReminderId, setActiveReminderId] = useState(null);

  // Save reminders to localStorage when reminders state changes
  const saveToLS = (reminders) => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  };

  // Check if form is active
  const isFormActive = () => {
    return addAction || activeReminderId;
  };

  // Close the reminder form
  const closeForm = () => {
    setAddAction(false);
    setActiveReminderId(null);
  };

  // Close the reminder form and call saveToLS when reminders state changes
  useEffect(() => {
    closeForm();
    saveToLS(reminders);
  }, [reminders]);

  // Handle add reminder action
  const handleAddAction = () => {
    setActiveReminderId(null);
    setAddAction(!addAction);
  };

  // Get active reminder if activeReminderId is set or return empty object
  const getActiveReminder = () => {
    return reminders.find((reminder) => reminder.id === activeReminderId) || {};
  };

  return (
    <div className="App">
      <Topbar setReminders={setReminders} />
      <div className="content">
        <div className="top">
          <h3>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </h3>
          <Filters filters={activeFilters} onFiltersChange={setActiveFilters} />
        </div>
        <List
          reminders={filteredReminders}
          onUpdateAction={setActiveReminderId}
        />
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
