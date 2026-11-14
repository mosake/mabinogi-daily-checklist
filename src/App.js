import { useState } from 'react';
import './App.css';
import dailyTasks from './dailyTasks.json';

function App() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const completedCount = completedTasks.length;
  const progress = Math.round((completedCount / dailyTasks.length) * 100);

  function toggleTask(taskId) {
    setCompletedTasks((currentTasks) =>
      currentTasks.includes(taskId)
        ? currentTasks.filter((id) => id !== taskId)
        : [...currentTasks, taskId]
    );
  }

  function resetTasks() {
    setCompletedTasks([]);
  }

  return (
    <>
      <section className="progress-section" aria-label="Daily checklist progress">
        <div className="progress-copy">
          <span className="progress-label">TODAY’S PROGRESS</span>
          <span className="progress-count">
            {completedCount}
            <span> / {dailyTasks.length}</span>
          </span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Tasks completed"
          aria-valuemin="0"
          aria-valuemax={dailyTasks.length}
          aria-valuenow={completedCount}
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        {completedCount === dailyTasks.length && (
          <p className="progress-message">Done for today!</p>
        )}
      </section>

      <ul className="task-list">
        {dailyTasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);

          return (
            <li
              className={`task-item${isCompleted ? ' is-completed' : ''}`}
              key={task.id}
            >
              <label className="task-label">
                <input
                  className="task-checkbox"
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-copy">
                  <span className="task-title">{task.title}</span>
                  <span className="task-detail">{task.detail}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="reset-container">
        <button
          className="reset-button"
          type="button"
          onClick={resetTasks}
          disabled={completedCount === 0}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
