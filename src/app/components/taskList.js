import TaskCard from './TaskCard';

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p className="text-gray-400 p-4">No tasks yet!</p>;
  }
  return (
    <ul className="divide-y">
      {tasks.map((task) => (          // key on the outermost element
        <li key={task.id}>
          <TaskCard title={task.title} done={task.done} />
        </li>
      ))}
    </ul>
  );
}
