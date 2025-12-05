import React from "react";

const TaskList = ({ tasks, onToggleCompletion, onUpdateText }) => {
  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      onUpdateText(id, e.target.value);
    }
  };

  const handleBlur = (e, id) => {
    onUpdateText(id, e.target.value);
  };

  return (
    <ul id="lista">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "task-completed" : ""}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
            disabled={task.isEditing}
          />

          {task.isEditing ? (
            <input
              type="text"
              placeholder="Digite sua tarefa"
              autoFocus
              defaultValue={task.text}
              onBlur={(e) => handleBlur(e, task.id)}
              onKeyDown={(e) => handleKeyDown(e, task.id)}
            />
          ) : (
            <span
              onDoubleClick={() => onUpdateText(task.id, task.text)}
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
