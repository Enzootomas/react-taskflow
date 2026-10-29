
import React from "react";
import {
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
} from "lucide-react";

export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <article className={`task-card ${task.done ? "completed" : ""}`}>
      <button
        className="check-button"
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? "Marcar pendente" : "Concluir tarefa"}
      >
        {task.done ? (
          <CheckCircle2 size={23} />
        ) : (
          <Circle size={23} />
        )}
      </button>

      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description || "Sem descrição"}</p>

        <div className="task-meta">
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className="category">{task.category}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          title="Editar tarefa"
          aria-label={`Editar ${task.title}`}
        >
          <Pencil size={17} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          title="Excluir tarefa"
          aria-label={`Excluir ${task.title}`}
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}
