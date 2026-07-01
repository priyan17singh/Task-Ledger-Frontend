const STATUS_LABEL = {
  pending: 'Pending',
  'in-progress': 'In progress',
  completed: 'Completed'
};

function formatDueDate(dueDate) {
  if (!dueDate) return null;
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const dueLabel = formatDueDate(task.dueDate);
  const isOverdue =
    task.dueDate && task.status !== 'completed' && new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);

  return (
    <article className={`card priority-${task.priority}`}>
      <div className="card-tab">{STATUS_LABEL[task.status] || task.status}</div>
      <span className={`stamp stamp-${task.priority}`} title={`${task.priority} priority`}>
        {task.priority.charAt(0).toUpperCase()}
      </span>

      <h3 className="card-title">{task.title}</h3>
      {task.description && <p className="card-desc">{task.description}</p>}

      <div className="card-meta">
        {dueLabel && (
          <span className={`due ${isOverdue ? 'due-overdue' : ''}`}>
            {isOverdue ? 'Overdue · ' : 'Due '}
            {dueLabel}
          </span>
        )}
      </div>

      <div className="card-controls">
        <select
          className="status-select"
          value={task.status}
          onChange={(e) => onStatusChange(task, e.target.value)}
          aria-label="Change status"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="card-actions">
          <button className="icon-btn" onClick={() => onEdit(task)} aria-label="Edit entry">
            Edit
          </button>
          <button className="icon-btn icon-btn-danger" onClick={() => onDelete(task)} aria-label="Delete entry">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskItem;
