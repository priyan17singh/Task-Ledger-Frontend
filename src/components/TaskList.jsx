import TaskItem from './TaskItem.jsx';

function TaskList({ tasks, loading, onEdit, onDelete, onStatusChange, hasFilters }) {
  if (loading) {
    return (
      <div className="state-block">
        <p>Pulling entries from the ledger…</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="state-block">
        <p className="state-title">
          {hasFilters ? 'No entries match this filter.' : 'The ledger is empty.'}
        </p>
        <p className="state-sub">
          {hasFilters
            ? 'Try clearing a filter to see more entries.'
            : 'File your first entry to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
