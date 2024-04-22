import { useEffect, useState, useRef } from "react";
import "./form.css";

const setFormData = (reminder) => ({
  text: reminder.text || "",
  date: reminder.date || new Date().toISOString().split("T")[0],
  color: reminder.color || "green",
  status: reminder.status || "ongoing",
});

function Form({ id, reminder, onSave }) {
  const textInputRef = useRef(null);
  const [info, setInfo] = useState(setFormData(reminder));

  useEffect(() => {
    textInputRef.current.focus();
    setInfo(setFormData(reminder));
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

    setInfo(setFormData({}));
  };

  const handleRemove = () => {
    onSave((prev) => prev.filter((reminder) => reminder.id !== id));
    setInfo(setFormData({}));
  };

  return (
    <form
      className="reminder-form"
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSave}
    >
      <h2>{id ? "Edit" : "Add"} Reminder</h2>
      <input
        ref={textInputRef}
        type="text"
        placeholder="Reminder text"
        value={info.text}
        name="text"
        required
        onChange={handleInfo}
      />
      <input type="date" value={info.date} name="date" onChange={handleInfo} />
      <select value={info.color} name="color" onChange={handleInfo}>
        <option value="green">Low</option>
        <option value="yellow">Medium</option>
        <option value="red">High</option>
      </select>
      <select value={info.status} name="status" onChange={handleInfo}>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>
      <div className="form-actions">
        <button onClick={handleRemove}>Remove</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default Form;
