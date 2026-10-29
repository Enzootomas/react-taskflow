# TaskFlow — Projeto React com 11 conceitos

Gerenciador de tarefas responsivo construído com **React, Vite e React Router**. Preparado para estudar e demonstrar os conceitos básicos de React em uma apresentação.

## Como executar

Requisitos: Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite (geralmente `http://localhost:5173`). Para gerar a versão de produção: `npm run build`.

## Conceitos aplicados

| # | Conceito | Onde está no projeto |
|---|---|---|
| 1 | JSX | Retorno visual dos componentes em `src/App.jsx` |
| 2 | Componentes | `Sidebar`, `StatCard`, `TaskCard`, `TaskForm`, páginas |
| 3 | Props | `TaskCard` recebe `task`, `onToggle`, `onEdit`, `onDelete` |
| 4 | Virtual DOM | React reconcilia a interface quando `tasks` muda; não há manipulação manual do DOM |
| 5 | Listas e keys | `tasks.map(...)` com `key={task.id}` |
| 6 | Renderização condicional | Mensagens vazias, carregamento, erros, tarefas concluídas |
| 7 | State e useState | Tarefas, formulário, pesquisa, filtros e estado da API |
| 8 | Formulários | `TaskForm` com `onSubmit`, campos controlados e validação |
| 9 | useEffect | Persistência em `localStorage` e busca de usuários |
| 10 | Consumo de APIs | `fetch` em `UsersPage` usando JSONPlaceholder |
| 11 | React Router | `BrowserRouter`, `Routes`, `Route`, `NavLink` |

## Funcionalidades

- Criar, editar, concluir e excluir tarefas.
- Filtrar tarefas por status e pesquisar por texto.
- Ver estatísticas e percentual de conclusão no dashboard.
- Persistir tarefas no navegador via `localStorage`.
- Buscar usuários de uma API pública com estados de carregamento e erro.
- Navegar entre três páginas sem recarregar a aplicação.

## Estrutura

```text
react-taskflow/
├── index.html
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── styles.css
└── README.md
```

## Abrir no Antigravity

Extraia o projeto, abra a pasta `react-taskflow` no Antigravity, execute `npm install` e depois `npm run dev` no terminal integrado.

## Publicar no GitHub

Após criar um repositório vazio chamado `react-taskflow` na sua conta:

```bash
git remote add origin https://github.com/SEU_USUARIO/react-taskflow.git
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu usuário. O repositório remoto ainda não foi criado automaticamente.

API utilizada: [JSONPlaceholder](https://jsonplaceholder.typicode.com/users). Os dados são fictícios e públicos.
