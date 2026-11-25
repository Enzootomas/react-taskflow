
import React, { useState } from "react";
import { X } from "lucide-react";

export default function TaskForm({
  initial,
  onSave,
  onClose,
}) {
  const [form, setForm] = useState(
    initial || {
      title: "",
      description: "",
      priority: "Média",
      category: "Pessoal",
    }
  );

  const [error, setError] = useState("");

  function update(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (field === "title") {
      setError("");
    }
  }

  function submit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("O título da tarefa é obrigatório.");
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Formulário de tarefa"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <h2>
            {initial ? "Editar tarefa" : "Nova tarefa"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={submit}>
          <label>
            Título da tarefa

            <input
              autoFocus
              maxLength={90}
              required
              value={form.title}
              onChange={(event) =>
                update("title", event.target.value)
              }
              placeholder="Ex.: Estudar React"
              aria-invalid={Boolean(error)}
            />
          </label>

          {error && (
            <p role="alert" style={{ color: "#e05252", margin: 0 }}>
              {error}
            </p>
          )}

          <label>
            Descrição

            <textarea
              rows={3}
              value={form.description}
              onChange={(event) =>
                update("description", event.target.value)
              }
              placeholder="Descreva sua tarefa..."
            />
          </label>

          <div className="form-row">
            <label>
              Prioridade

              <select
                value={form.priority}
                onChange={(event) =>
                  update("priority", event.target.value)
                }
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </label>

            <label>
              Categoria

              <select
                value={form.category}
                onChange={(event) =>
                  update("category", event.target.value)
                }
              >
                <option>Pessoal</option>
                <option>Estudos</option>
                <option>Trabalho</option>
              </select>
            </label>
          </div>

          <button type="submit" className="primary full">
            {initial ? "Salvar alterações" : "Criar tarefa"}
          </button>
        </form>
      </div>
    </div>
  );
}
