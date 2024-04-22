import { useEffect, useState } from "react";
import "./form.css";

const getFormInfo = (reminder) => ({
  text: reminder.text || "",
  date: reminder.date || new Date().toISOString().split("T")[0],
  color: reminder.color || "yellow",
  status: reminder.status || "ongoing",
});

function Form({ id, reminder, onSave }) {
  const [info, setInfo] = useState(getFormInfo(reminder));

  useEffect(() => {
    setInfo(getFormInfo(reminder));
  }, [reminder]);

  const handleInfo = ({ target }) => {
    setInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { text, date, color, status } = info;

    if (id) {
      onSave((prev) => {
        return prev.map((reminder) =>
          reminder.id === id
            ? {
                id,
                text,
                date: date,
                color,
                status,
              }
            : reminder
        );
      });
    } else {
      onSave((prev) => {
        return [...prev, { id: Date.now(), text, date: date, color, status }];
      });
    }

    setInfo(getFormInfo({}));
  };

  return (
    <form className="reminder-form" onSubmit={handleSave}>
      <input
        type="text"
        placeholder="Reminder text"
        value={info.text}
        name="text"
        required
        onChange={handleInfo}
      />
      <input type="date" value={info.date} name="date" onChange={handleInfo} />
      <select value={info.color} name="color" onChange={handleInfo}>
        <option value="blue">Yellow</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
      </select>
      <select value={info.status} name="status" onChange={handleInfo}>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>
      <button>Save</button>
    </form>
  );
}

export default Form;
