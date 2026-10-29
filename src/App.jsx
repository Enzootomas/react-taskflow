
import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  ListTodo,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Search,
  Pencil,
  X,
} from "lucide-react";

import Sidebar from "./components/Sidebar.jsx";

// Chave utilizada para salvar tarefas no navegador
const STORAGE_KEY = "taskflow-tasks-v1";

// Tarefas iniciais
const seeds = [
  {
    id: "1",
    title: "Planejar a semana",
    description: "Definir as prioridades da semana",
    priority: "Alta",
    done: true,
    category: "Pessoal",
  },
  {
    id: "2",
    title: "Estudar React Router",
    description: "Criar rotas entre as páginas",
    priority: "Média",
    done: false,
    category: "Estudos",
  },
  {
    id: "3",
    title: "Consumir uma API",
    description: "Buscar dados de usuários externos",
    priority: "Alta",
    done: false,
    category: "Estudos",
  },
];

// Busca tarefas salvas no LocalStorage
function readTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seeds;
  } catch {
    return seeds;
  }
}

// Componente de estatísticas
function StatCard({ label, value, icon, tone }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

// Componente de tarefa
function TaskCard({ task, onToggle, onEdit, onDelete }) {
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
        >
          <Pencil size={17} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          title="Excluir tarefa"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}

// Formulário de criação e edição
function TaskForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || {
      title: "",
      description: "",
      priority: "Média",
      category: "Pessoal",
    }
  );

  const update = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  function submit(event) {
    event.preventDefault();

    if (!form.title.trim()) return;

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
          <h2>{initial ? "Editar tarefa" : "Nova tarefa"}</h2>

          <button onClick={onClose} aria-label="Fechar">
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
              placeholder="Ex.: Finalizar projeto React"
            />
          </label>

          <label>
            Descrição
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) =>
                update("description", event.target.value)
              }
              placeholder="Adicione detalhes..."
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

// Página Dashboard
function Dashboard({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onNew,
}) {
  const completed = tasks.filter((task) => task.done).length;
  const pending = tasks.length - completed;

  const percent = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">VISÃO GERAL</div>

          <h1>
            Seu painel de produtividade <span>✦</span>
          </h1>

          <p>
            Acompanhe seu progresso e mantenha o foco no que importa.
          </p>
        </div>

        <button className="primary" onClick={onNew}>
          <Plus size={18} />
          Nova tarefa
        </button>
      </div>

      <div className="stats">
        <StatCard
          label="Total de tarefas"
          value={tasks.length}
          tone="purple"
          icon={<ListTodo size={22} />}
        />

        <StatCard
          label="Concluídas"
          value={completed}
          tone="green"
          icon={<CheckCircle2 size={22} />}
        />

        <StatCard
          label="Pendentes"
          value={pending}
          tone="orange"
          icon={<Circle size={22} />}
        />
      </div>

      <section className="progress-panel">
        <div>
          <span className="eyebrow">SEU PROGRESSO</span>

          <h2>Continue nesse ritmo! 🚀</h2>

          <p>
            Você concluiu {completed} de {tasks.length} tarefas.
          </p>
        </div>

        <div className="progress-number">{percent}%</div>

        <div className="progress-track">
          <div style={{ width: `${percent}%` }} />
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Tarefas recentes</h2>
          <span>{tasks.length} no total</span>
        </div>

        <div className="task-list">
          {tasks.slice(0, 4).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          {tasks.length === 0 && (
            <p className="empty">
              Nenhuma tarefa ainda. Crie a primeira!
            </p>
          )}
        </div>
      </section>
    </>
  );
}

// Página de tarefas
function TasksPage({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onNew,
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todas");

  const visible = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        filter === "Todas" ||
        (filter === "Concluídas" ? task.done : !task.done);

      const matchesSearch =
        `${task.title} ${task.description}`
          .toLowerCase()
          .includes(query.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [tasks, query, filter]);

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">ORGANIZAÇÃO</div>
          <h1>Minhas tarefas</h1>
          <p>Crie, edite e acompanhe tudo em um só lugar.</p>
        </div>

        <button className="primary" onClick={onNew}>
          <Plus size={18} />
          Nova tarefa
        </button>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search size={18} />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar tarefas..."
          />
        </div>

        <div className="filters">
          {["Todas", "Pendentes", "Concluídas"].map((item) => (
            <button
              key={item}
              className={filter === item ? "selected" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="task-list">
        {visible.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        {visible.length === 0 && (
          <p className="empty">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </>
  );
}

// Página de usuários da API
function UsersPage() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setStatus("loading");

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao buscar usuários");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setStatus("success");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setStatus("error");
        }
      });

    return () => controller.abort();
  }, [reload]);

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">INTEGRAÇÃO EXTERNA</div>
          <h1>Usuários da API</h1>
          <p>Dados carregados em tempo real da JSONPlaceholder.</p>
        </div>
      </div>

      {status === "loading" && (
        <p className="empty">Carregando usuários...</p>
      )}

      {status === "error" && (
        <div className="empty">
          Não foi possível carregar os usuários.

          <button
            className="primary"
            onClick={() => setReload((n) => n + 1)}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {status === "success" && (
        <div className="user-grid">
          {users.map((user) => (
            <article className="user-card" key={user.id}>
              <div className="avatar">
                {user.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>

              <h3>{user.name}</h3>
              <p>@{user.username}</p>

              <a href={`mailto:${user.email}`}>
                {user.email}
              </a>

              <span>{user.company.name}</span>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

// Componente principal
export default function App() {
  const [tasks, setTasks] = useState(readTasks);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Salva as tarefas sempre que forem alteradas
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Concluir ou reabrir tarefa
  const toggle = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  // Excluir tarefa
  const remove = (id) => {
    if (window.confirm("Deseja excluir esta tarefa?")) {
      setTasks((current) =>
        current.filter((task) => task.id !== id)
      );
    }
  };

  // Editar tarefa
  const edit = (task) => {
    setEditing(task);
    setShowForm(true);
  };

  // Abrir formulário de nova tarefa
  const openNew = () => {
    setEditing(null);
    setShowForm(true);
  };

  // Salvar tarefa
  const save = (form) => {
    if (editing) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editing.id
            ? { ...task, ...form }
            : task
        )
      );
    } else {
      setTasks((current) => [
        {
          ...form,
          id: crypto.randomUUID(),
          done: false,
        },
        ...current,
      ]);
    }

    setShowForm(false);
    setEditing(null);
  };

  const common = {
    tasks,
    onToggle: toggle,
    onEdit: edit,
    onDelete: remove,
    onNew: openNew,
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <header className="topbar">
          <span>
            Workspace / <b>TaskFlow</b>
          </span>

          <div className="profile">
            <span className="online" />
            Meu espaço
            <div className="profile-avatar">TF</div>
          </div>
        </header>

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard {...common} />}
            />

            <Route
              path="/tarefas"
              element={<TasksPage {...common} />}
            />

            <Route
              path="/usuarios"
              element={<UsersPage />}
            />

            <Route
              path="*"
              element={
                <div className="empty">
                  Página não encontrada.
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      {showForm && (
        <TaskForm
          key={editing?.id || "new"}
          initial={editing}
          onSave={save}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
