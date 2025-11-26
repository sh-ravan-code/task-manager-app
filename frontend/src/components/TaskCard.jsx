import { updateTask } from '../services/api';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleStatusToggle = async () => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await updateTask(task._id, { status: newStatus });
      onStatusChange();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-5 transition hover:shadow-lg ${
      task.status === 'completed' ? 'opacity-75' : ''
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-semibold ${
          task.status === 'completed' ? 'line-through text-gray-500' : ''
        }`}>
          {task.title}
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>📅 {formatDate(task.dueDate)}</span>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleStatusToggle}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            task.status === 'completed'
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {task.status === 'completed' ? '↩️ Reopen' : '✓ Complete'}
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;