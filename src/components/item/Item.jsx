import "./item.css";

function Item({
  reminder: { id, text, date, color, status },
  onSetReminderUpdate,
}) {
  return (
    <div className="item">
      <div className="item-text">
        <span>{text}</span>
        <img
          src="/assets/info.png"
          alt="actions"
          onClick={() => onSetReminderUpdate(id)}
        />
      </div>
      <div className="item-meta">
        <span className={color}></span>
        <span>{date}</span>
        <span className={status}>{status}</span>
      </div>
    </div>
  );
}

export default Item;
