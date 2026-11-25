# ⚡ TaskFlow — Projeto React (Aulas 08 e 09)

Gerenciador de tarefas responsivo construído com **React 19, Vite 7 e React Router 7**, reunindo de forma prática todos os conceitos estudados nas **Aulas 08 (Projeto React)** e **09 (Projeto React 02)** da disciplina de **Frameworks Front-end** (SENAI).

---

## 🚀 Como Executar

Pré-requisitos: **Node.js 20.19+** (ou **22.12+**) e **NPM**.

```bash
# Instalar dependências
npm install

# Executar em ambiente de desenvolvimento
npm run dev

# Gerar build otimizado de produção
npm run build
```

Abra o endereço exibido pelo Vite (geralmente `http://localhost:5173`).

---

## 📚 Conceitos Aplicados (Aulas 08 e 09)

| # | Aula | Conceito | Onde está implementado no projeto |
|---|---|---|---|
| 01 | Aula 08 | **JSX** | Sintaxe declarativa e expressões `{}` em `App.jsx`, `Sidebar.jsx`, `TaskCard.jsx` e `TaskForm.jsx` |
| 02 | Aula 08 | **Componentes** | Divisão modular em `Sidebar`, `StatCard`, `TaskCard`, `TaskForm`, `Dashboard`, `TasksPage`, `TaskDetailPage` e `UsersPage` |
| 03 | Aula 08 | **Props** | Passagem de dados e callbacks pai → filho (`task`, `onToggle`, `onEdit`, `onDelete`, `initial`, `onSave`) |
| 04 | Aula 08 | **Virtual DOM** | Atualização declarativa da interface pelo React quando `tasks`, `query`, `filter` ou `users` mudam, sem manipulação direta do DOM |
| 05 | Aula 08 | **Listas e Keys** | Renderização com `map()` e `filter()` utilizando `key={task.id}` e `key={user.id}` estáveis |
| 06 | Aula 08 | **Renderização Condicional** | Exibição condicional de estados vazios, carregamento (`loading`), erro (`error`), modal (`showForm`) e validação |
| 07 | Aula 09 | **State e `useState`** | Gerenciamento de tarefas, busca, filtros, modal de edição e estados de requisição HTTP |
| 08 | Aula 09 | **Formulários Controlados** | `TaskForm.jsx` com campos controlados (`value` + `onChange`), `onSubmit`, `event.preventDefault()` e validação obrigatória |
| 09 | Aula 09 | **`useEffect` e Limpeza** | Sincronização com `localStorage`, atualização dinâmica de `document.title` e limpeza com `AbortController` na busca da API |
| 10 | Aula 09 | **Consumo de APIs (`fetch`)** | Requisição HTTP em `UsersPage` consumindo `https://jsonplaceholder.typicode.com/users` com verificação de `response.ok` |
| 11 | Aula 09 | **React Router e `useParams`** | `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link` e rota dinâmica `/tarefas/:id` lendo parâmetros com `useParams()` |

---

## ✨ Funcionalidades

- Criar, editar, concluir/reabrir e excluir tarefas;
- Visualizar detalhes individuais de uma tarefa em rota dinâmica (`/tarefas/:id`);
- Filtrar tarefas por status (*Todas*, *Pendentes*, *Concluídas*) e pesquisar por texto em tempo real;
- Acompanhar estatísticas e barra de progresso percentual no Dashboard;
- Persistir tarefas automaticamente no navegador via `localStorage`;
- Consultar usuários externos da API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) com tratamento de carregamento, falha e nova tentativa;
- Navegar como SPA sem recarregamento de página, com suporte a rotas na Vercel (`vercel.json`).

---

## 📁 Estrutura do Projeto

```text
react-taskflow/
├── index.html
├── package.json
├── vercel.json
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskForm.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── README.md
```

---

## 🔗 Repositório Oficial

- **GitHub:** [https://github.com/Enzootomas/react-taskflow](https://github.com/Enzootomas/react-taskflow)
- **Central de Estudos:** [https://github.com/Enzootomas/frontend-learning-hub](https://github.com/Enzootomas/frontend-learning-hub)
