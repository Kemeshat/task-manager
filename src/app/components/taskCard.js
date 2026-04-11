export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="flex justify-between bg-gray-800 p-3 rounded">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.done ? "line-through text-gray-400" : ""
        }`}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>
        ❌
      </button>
    </div>
  );
}

