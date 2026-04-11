"use client";

/*
Component: TaskBoard
Purpose: Central controller of the app — owns all task state and business logic
Type: Client Component (uses hooks)
Props: None

This component manages:
- Task state
- Filtering logic
- localStorage persistence
- All actions (add, toggle, delete, clear)
*/

import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";
import FilterBar from "./FilterBar";

export default function TaskBoard() {
  /*
  State: tasks
  WHY: This is the source of truth for all tasks. Multiple components depend on it,
  so it must live in a shared parent (lifting state up).
  */
  const [tasks, setTasks] = useState(() => {
    /*
    WHY typeof window check:
    Next.js renders on the server first. localStorage only exists in the browser.
    This prevents a crash during server-side rendering.
    */
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  /*
  State: filter
  WHY: UI state that determines which subset of tasks is shown
  */
  const [filter, setFilter] = useState("all");

  /*
  Effect: Persist tasks to localStorage
  WHY: Syncs React state with browser storage so data survives refresh
  Dependency: runs whenever tasks change
  */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task (immutable update)
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      done: false,
    };

    /*
    WHY spread operator:
    React detects changes by reference. Mutating the existing array would not trigger a re-render.
    */
    setTasks((prev) => [...prev, newTask]);
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, done: !task.done } // immutable update
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // Remove all completed tasks
  const clearCompleted = () => {
    setTasks((prev) =>
      prev.filter((task) => !task.done)
    );
  };

  /*
  Derived values (NOT stored in state)
  WHY: These can be calculated from tasks. Storing them separately risks inconsistency bugs.
  */
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const active = total - completed;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <AddTaskForm onAdd={addTask} />

      <FilterBar filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      <TaskStats
        total={total}
        active={active}
        completed={completed}
        onClear={clearCompleted}
      />
    </div>
  );
}
