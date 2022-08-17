import './App.css';
import React, { useState } from 'react';

export default function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [newTask, setNewTask] = useState({});

  const handleChange = ({target}) => {
    const { name, value } = target;
    setNewTask((prev) => {
      return ({ ...prev, id: Date.now(), [name]: value });
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.taskName) return;  
    setAllTasks((prev) => {
      return ([newTask, ...prev]);
    })
    setNewTask({});
  }

  const handleRemove = (idToRemove) => {
    setAllTasks((prev) => {
      return prev.filter((i) => i.id !== idToRemove)
    });
  }

  return (
    <div className="App">
      <h2 id="siteTitle">Todo App</h2>
      <form className="inputSection" id="inputForm" onSubmit={handleSubmit}>
        <div className="inputs">
          <input id="inputTaskName" name="taskName" onChange={handleChange} value={newTask.taskName || ""} ></input>
          <textarea id="inputTaskDescription" name="taskDescription" onChange={handleChange} value={newTask.taskDescription || ""} ></textarea>
        </div>
        <button className="submitButton" type="submit" form="inputForm" >Submit</button>
      </form>
      <div className="taskList">
        {allTasks.map((task) => (
          <div id={task.id} className="task" key={task.id}>
            <h2 className="taskTitle"><button className="removeTask" onClick={() => handleRemove(task.id)}>X</button>{task.taskName}</h2>
            <hr></hr>
            <h2 className="taskDesc">{task.taskDescription}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
