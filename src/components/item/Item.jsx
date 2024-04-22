import "./item.css";

function Item({
  reminder: { id, text, date, color, status },
  onSetReminderUpdate,
}) {
  return (
    <div className="item">
      <div className="item-text">
        <span>{text}</span>
      </div>
      <div className="item-meta">
        <span>{date}</span>
        <span>{color}</span>
        <span>{status}</span>
      </div>

      <div className="item-actions">
        <img
          src="/assets/info.png"
          alt="actions"
          onClick={() => onSetReminderUpdate(id)}
        />
      </div>
    </div>
  );
}

export default Item;
