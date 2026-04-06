'use client';

import TaskList from './TaskList';

export default function TaskBoard() {
  const tasks = [{ id: 't1', title: 'Buy milk', done: false }];

  function handleToggle(id) {
    console.log('Toggle task', id);  // wired to state in Section 4
  }

  return <TaskList tasks={tasks} onToggle={handleToggle} />;
}

'use client';

import { useState } from 'react';
import TaskList from './TaskList';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Buy milk',    done: false },
    { id: 't2', title: 'Write tests', done: false },
  ]);

  // WRONG — mutates state directly, no re-render
  // tasks[0].done = true;  ← never do this

  // RIGHT — return a brand new array
  function handleToggle(id) {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="max-w-lg mx-auto p-6">
      <p className="text-sm text-gray-500 mb-4">
        {completedCount} of {tasks.length} complete
      </p>
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
