import React, { useEffect, useState } from "react";
import "./style.css";
import { FcEmptyTrash } from "react-icons/fc";
import { FcExternal } from "react-icons/fc";
import { FcInternal } from "react-icons/fc";

function TodoList() {
  // # get data from localStorage
  const getDataFromLocalState = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  );
  console.log("Data in LocalStorage: ", getDataFromLocalState);

  // TODO: Default state
  const [tasks, setTasks] = useState(getDataFromLocalState);
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState("new");

  // TODO: Handle event
  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      if (newTask.trim() !== "") {
        setTasks([...tasks, newTask]);
        setNewTask("");
      } else {
        alert("Please enter a task!");
      }
    }
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status =
      updatedTasks[index].status === "complete" ? "new" : "complete";
    setTasks(updatedTasks);
  };

  // TODO: Save data to local state and update data when task changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to local storage
    console.log("Data when task changes: ", tasks);
  }, [tasks]);

  // # addTask
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { task: newTask, status: "new" }]);
      setNewTask("");
    } else {
      alert("Please enter a task!");
    }
  };

  // # deleteTask
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // # moveUpTask
  const moveUpTask = (index) => {
    // const index = tasks.findIndex((tasks) => tasks.id === id);
    if (index > 0) {
      const updatedTasks = [...tasks];
      // Destructuring to swap tasks
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  // # moveDownTask
  const moveDownTask = (index) => {
    // const index = tasks.findIndex((task) => task.id === id);
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      // Destructuring to swap tasks
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  // TODO: Render data
  return (
    <div className="todo">
      <h1>Todo List</h1>
      <div className="todo__wrapper">
        <input
          type="text"
          className="todo__input"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInput}
          onKeyDown={handleOnKeyDown}
        />
        <button className="todo__btn btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="todo__list">
        {tasks.map((task, index) => (
          <div key={index} className="wrap__item">
            <li className={task.status === "completed" ? "completed" : "new"}>
              <span className="task">{task}</span>
              <div className="control">
                <button
                  className="delete__btn btn"
                  onClick={() => deleteTask(index)}
                >
                  <FcEmptyTrash />
                </button>
                <button
                  className="moveOn__btn btn"
                  onClick={() => moveUpTask(index)}
                >
                  <FcExternal />
                </button>
                <button
                  className="moveDown__btn btn"
                  onClick={() => moveDownTask(index)}
                >
                  <FcInternal />
                </button>
                <button
                  className="complete__btn btn"
                  onClick={() => toggleTaskStatus(index)}
                >
                  {task.status === "complete" ? "Undo" : "Complete"}
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
