import "./filter.css";

function Filters({ filters, onFiltersChange }) {
  const handleFilterChange = ({ target }) => {
    // Update filters state based on the clicked filter
    onFiltersChange((prev) =>
      prev.includes(target.dataset.filter)
        ? prev.filter((filter) => filter !== target.dataset.filter)
        : [...prev, target.dataset.filter]
    );
  };

  return (
    <div className="filters">
      {["ongoing", "completed", "overdue"].map((filter) => (
        <button
          onClick={handleFilterChange}
          key={filter}
          data-filter={filter}
          className={
            filters.includes(filter) ? "filter-button active" : "filter-button"
          }
        >
          {filters.includes(filter) ? "✔" : ""} {filter}
        </button>
      ))}
    </div>
  );
}

export default Filters;
