import { useEffect, useState } from "react";
import "./list.css";

import Item from "../item/Item";

function List({ reminders, onUpdateAction }) {
  // Initialize sortedReminders state with reminders
  const [sortedReminders, setSortedReminders] = useState(reminders);

  // Sort reminders by priority (red, yellow, green)
  useEffect(() => {
    // Maps color to priority
    const colorMap = {
      red: 1,
      yellow: 2,
      green: 3,
    };

    // Sort reminders by color priority
    const sorted = reminders.sort((a, b) => {
      return colorMap[a.color] - colorMap[b.color];
    });

    // Update sortedReminders state
    setSortedReminders(sorted);
  }, [reminders]);

  return (
    <div className="list">
      {sortedReminders.map((reminder) => (
        <Item
          key={reminder.id}
          reminder={reminder}
          onSetReminderUpdate={onUpdateAction}
        />
      ))}
      {reminders.length === 0 && (
        <div className="empty-list">
          <span>There are no reminders to display.</span>
        </div>
      )}
    </div>
  );
}

export default List;
