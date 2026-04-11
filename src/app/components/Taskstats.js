export default function TaskStats({
  total,
  active,
  completed,
  onClear,
}) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div>
        Total: {total} | Active: {active} | Done: {completed}
      </div>

      <button
        onClick={onClear}
        className="text-red-400"
      >
        Clear Completed
      </button>
    </div>
  );
}
