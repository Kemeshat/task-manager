export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex gap-2">
      {["all", "active", "done"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded ${
            filter === f ? "bg-blue-500" : "bg-gray-700"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
