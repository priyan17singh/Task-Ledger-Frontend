function FilterBar({ filters, onFilterChange, onNewTask, taskCount }) {
  const { status, priority, sortBy } = filters;

  return (
    <aside className="rail">
      <div className="rail-top">
        <h1 className="brand">
          Task<span>Ledger</span>
        </h1>
        <p className="brand-sub">{taskCount} entr{taskCount === 1 ? 'y' : 'ies'} on file</p>
      </div>

      <button className="btn btn-primary btn-new" onClick={onNewTask}>
        + New entry
      </button>

      <div className="rail-group">
        <label className="rail-label" htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="rail-group">
        <label className="rail-label" htmlFor="priority-filter">Priority</label>
        <select
          id="priority-filter"
          value={priority}
          onChange={(e) => onFilterChange('priority', e.target.value)}
        >
          <option value="">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="rail-group">
        <label className="rail-label" htmlFor="sort-by">Sort by</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
        >
          <option value="createdAt">Date added</option>
          <option value="title">Title</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </aside>
  );
}

export default FilterBar;
