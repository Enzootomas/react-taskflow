
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Users,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">
          <Sparkles size={23} />
        </span>

        <span>
          task<span className="brand-accent">flow.</span>
        </span>
      </div>

      <div className="nav-label">MENU PRINCIPAL</div>

      <nav>
        <NavLink to="/" end>
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>

        <NavLink to="/tarefas">
          <ListTodo size={19} />
          Minhas tarefas
        </NavLink>

        <NavLink to="/usuarios">
          <Users size={19} />
          Usuários da API
        </NavLink>
      </nav>

      <div className="sidebar-note">
        <span>✦</span>
        <b>Seu espaço produtivo</b>
        <p>
          Organize suas ideias e conquiste seus objetivos,
          um passo de cada vez.
        </p>
      </div>

      <div className="sidebar-footer">
        Feito com React + Vite
      </div>
    </aside>
  );
}
