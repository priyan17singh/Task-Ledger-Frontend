import { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FilterBar from './components/FilterBar.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [filters, setFilters] = useState({ status: '', priority: '', sortBy: 'createdAt' });
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const hasFilters = Boolean(filters.status || filters.priority);

  const loadTasks = async (activeFilters) => {
    setLoading(true);
    try {
      const params = {};
      if (activeFilters.status) params.status = activeFilters.status;
      if (activeFilters.priority) params.priority = activeFilters.priority;
      if (activeFilters.sortBy) params.sortBy = activeFilters.sortBy;
      const data = await fetchTasks(params);
      setTasks(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.priority, filters.sortBy]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const openNewTaskForm = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    if (isSaving) return;
    setFormOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = async (payload) => {
    setIsSaving(true);
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask._id, payload);
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
        toast.success('Entry updated.');
      } else {
        const created = await createTask(payload);
        setTasks((prev) => sortLocally([created, ...prev], filters.sortBy));
        toast.success('Entry filed.');
      }
      setFormOpen(false);
      setEditingTask(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (task) => {
    const confirmed = window.confirm(`Delete "${task.title}"? This can't be undone.`);
    if (!confirmed) return;
    try {
      await deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      toast.success('Entry deleted.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStatusChange = async (task, status) => {
    const previous = tasks;
    setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, status } : t)));
    try {
      const updated = await updateTask(task._id, { status });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (error) {
      setTasks(previous);
      toast.error(error.message);
    }
  };

  const taskCount = useMemo(() => tasks.length, [tasks]);

  return (
    <div className="app-shell">
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onNewTask={openNewTaskForm}
        taskCount={taskCount}
      />

      <main className="main-panel">
        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          hasFilters={hasFilters}
        />
      </main>

      <TaskForm
        open={formOpen}
        editingTask={editingTask}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        isSaving={isSaving}
      />

      <ToastContainer position="bottom-right" autoClose={2800} newestOnTop />
    </div>
  );
}

function sortLocally(list, sortBy) {
  if (sortBy === 'createdAt') return list;
  const sorted = [...list].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'dueDate') return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
    if (sortBy === 'priority') {
      const order = { low: 0, medium: 1, high: 2 };
      return order[a.priority] - order[b.priority];
    }
    return 0;
  });
  return sorted;
}

export default App;
