export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    // Conditional render when no tasks match filter
    return <p className="text-gray-400">No tasks found</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
