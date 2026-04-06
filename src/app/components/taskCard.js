export default function TaskCard({ title, done }) {
  return (
    <div className="flex items-center gap-2 p-3 border-b">
      <span
        className={done ? 'line-through text-gray-400' : 'text-gray-900'}
      >
        {title}                       {/* {} escapes into JS */}
      </span>
      {done && <span className="text-green-600 text-xs font-bold">Done</span>}
    </div>
  );
}
