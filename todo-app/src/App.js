import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001');
        setTasks(response.data);
      } catch (error) {
        alert(error.response?.data?.error || 'Error loading tasks');
      }
    };
    fetchTasks();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  }

  const addTask = async () => {
    if (task.trim()) {
      try {
        const response = await axios.post('http://localhost:3001/new', {
          description: task
        });
        setTasks([...tasks, response.data]);
        setTask('');
      } catch (error) {
        alert(error.response?.data?.error || 'Error adding task');
      }
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      alert(error.response?.data?.error || 'Error deleting task');
    }
  }

  return (
    <div className="container">
      <div className="app-wrapper">
        <header>
          <h1>Todo List</h1>
          <p className="subtitle">Manage your tasks effectively</p>
        </header>

        <div className="input-wrapper">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>

        <div className="tasks-container">
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet! Add one above.</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className="task-item">
                  <span className="task-text">{task.description}</span>
                  <button 
                    onClick={() => deleteTask(task.id)} 
                    className="delete-button"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;