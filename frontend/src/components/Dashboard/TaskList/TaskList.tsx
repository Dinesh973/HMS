import React from 'react';
import './TaskList.scss';
import type { Task } from '../types';

const TaskList: React.FC<{ tasks: Task[]; onTaskUpdate: (id: string, completed: boolean) => void }> = ({ tasks, onTaskUpdate }) => (
  <div className="hms-tasks">
    <h3>Tasks</h3>
    <div className="tasks-list">
      {tasks.map(t => (
        <div key={t.id} className="task-item">
          <input type="checkbox" checked={t.completed} onChange={(e) => onTaskUpdate(t.id, e.target.checked)} />
          <div className={`task-desc ${t.completed ? 'done' : ''}`}>{t.description}</div>
          <div className={`task-priority ${t.priority}`}>{t.priority}</div>
        </div>
      ))}
    </div>
  </div>
);

export default TaskList;