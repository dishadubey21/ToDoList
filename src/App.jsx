import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  const markDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const markUndone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const todoTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">To-Do List</h2>

      <div className="input-group mb-3">
        <input type="text" className="form-control form-control-lg" placeholder="Enter a task" value={input}onChange={(e) => setInput(e.target.value)} style={{ width: '50px'}}/>
        <button className="btn btn-dark" onClick={addTask}>Add Task</button>
      </div>

      <div className="row">
        <div className="col-md-6 mx-auto bg-light p-3 rounded shadow mb-4" >
          <h4>To-Do Tasks</h4>
          <ul className="list-group">
            {todoTasks.map((task) => (
              <li key={task.id}className="list-group-item d-flex justify-content-between align-items-center">
                <span>{task.text}</span>
                <div>
                  <button className="btn btn-success btn-sm me-2" onClick={() => markDone(task.id)}>Mark Done</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
            {todoTasks.length === 0 && (
              <li className="list-group-item text-muted">No pending tasks</li>
            )}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto bg-light p-3 rounded shadow">
          <h4>Completed Tasks</h4>
          <ul className="list-group">
            {completedTasks.map((task) => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center text-muted text-decoration-line-through">
                <span>{task.text}</span>
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"onClick={() => markUndone(task.id)}>Mark Undone</button>
                    <button className="btn btn-danger btn-sm"onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
            {completedTasks.length === 0 && (
              <li className="list-group-item text-muted">No completed tasks</li>
            )}
          </ul>
        </div>
      </div>
      </div>
  );
}

export default App;
