import { useEffect, useState } from 'react';

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: ''
};

function toDateInputValue(dueDate) {
  if (!dueDate) return '';
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

function TaskForm({ open, editingTask, onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'medium',
        status: editingTask.status || 'pending',
        dueDate: toDateInputValue(editingTask.dueDate)
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setTitleError('');
  }, [editingTask, open]);

  if (!open) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (field === 'title' && titleError) setTitleError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setTitleError('Give this entry a title before filing it.');
      return;
    }
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate || undefined
    });
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <form
        className="drawer"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="drawer-header">
          <h2>{editingTask ? 'Edit entry' : 'New entry'}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange('title')}
            placeholder="What needs doing?"
            maxLength={100}
            autoFocus
          />
          {titleError && <p className="field-error">{titleError}</p>}
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={form.description}
            onChange={handleChange('description')}
            placeholder="Add detail, optional"
            maxLength={500}
            rows={4}
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="priority">Priority</label>
            <select id="priority" value={form.priority} onChange={handleChange('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" value={form.status} onChange={handleChange('status')}>
              <option value="pending">Pending</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange('dueDate')}
          />
        </div>

        <div className="drawer-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving…' : editingTask ? 'Save changes' : 'File entry'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
