import "./list.css";

import Item from "../item/Item";

function List({ reminders, onUpdateAction }) {
  return (
    <div className="list">
      {reminders.map((reminder) => (
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
