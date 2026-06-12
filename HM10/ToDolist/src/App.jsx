import { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [todosList, setTodosList] = useState(() => {
    const saved = localStorage.getItem("todosList");
    return saved ? JSON.parse(saved) : [];
  });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todosList", JSON.stringify(todosList));
  }, [todosList]);

  const addTodo = () => {
    if (!item.trim()) return;
    setTodosList([
      ...todosList,
      { id: crypto.randomUUID(), name: item.trim(), isFinished: false },
    ]);
    setItem("");
    inputRef.current?.focus();
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setItem(task.name);
    inputRef.current?.focus();
  };

  const updateTodo = () => {
    if (!item.trim()) return;
    setTodosList(
      todosList.map((todo) =>
        todo.id === editId ? { ...todo, name: item.trim() } : todo
      )
    );
    setEditId(null);
    setItem("");
    inputRef.current?.focus();
  };

  const deleteTask = (id) => {
    setTodosList(todosList.filter((todo) => todo.id !== id));
    if (editId === id) {
      setEditId(null);
      setItem("");
    }
  };

  const toggleTodo = (id) => {
    setTodosList(
      todosList.map((todo) =>
        todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodosList((prev) => prev.filter((t) => !t.isFinished));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      editId ? updateTodo() : addTodo();
    }
  };

  const total = todosList.length;
  const done = todosList.filter((t) => t.isFinished).length;
  const active = total - done;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const filtered = useMemo(
    () =>
      todosList.filter((t) => {
        if (filter === "active") return !t.isFinished;
        if (filter === "done") return t.isFinished;
        return true;
      }),
    [todosList, filter]
  );

  const tabs = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "done", label: "Completed" },
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 todo-card">
          <div className="text-center mb-4">
            <h1 className="fw-bold mb-1" style={{ color: "#e6edf3" }}>
              Tasks
            </h1>
            <p className="mb-0" style={{ color: "#8b949e" }}>
              <span className="fw-semibold" style={{ color: "#e6edf3" }}>
                {active}
              </span>{" "}
              active &middot;{" "}
              <span className="fw-semibold" style={{ color: "#e6edf3" }}>
                {done}
              </span>{" "}
              completed
            </p>
            {total > 0 && (
              <div
                className="progress progress-thin mt-2 mx-auto"
                style={{ maxWidth: 200, background: "#21262d" }}
              >
                <div
                  className="progress-bar"
                  style={{ width: `${pct}%` }}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            )}
          </div>

          <div className="card shadow border-0">
            <div className="card-body p-4">
              <div className="input-group mb-4">
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  placeholder={
                    editId ? "Update your task..." : "What needs to be done?"
                  }
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={200}
                />
                {editId ? (
                  <>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setEditId(null);
                        setItem("");
                      }}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={updateTodo}>
                      Update
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary px-4" onClick={addTodo}>
                    Add
                  </button>
                )}
              </div>

              {total > 0 && (
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <ul className="nav nav-pills nav-sm gap-1">
                    {tabs.map((t) => (
                      <li className="nav-item" key={t.key}>
                        <button
                          className={`nav-link py-1 px-3 small ${
                            filter === t.key ? "active" : ""
                          }`}
                          onClick={() => setFilter(t.key)}
                        >
                          {t.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={clearCompleted}
                    disabled={done === 0}
                  >
                    Clear done
                  </button>
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="text-center empty-state" style={{ color: "#8b949e" }}>
                  <p className="fs-5 mb-1" style={{ color: "#e6edf3" }}>
                    {total === 0 ? "No tasks yet" : "No matching tasks"}
                  </p>
                  <small>
                    {total === 0
                      ? "Add a task above to get started"
                      : "Try a different filter"}
                  </small>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {filtered.map((task) => (
                    <li
                      key={task.id}
                      className="list-group-item d-flex align-items-center gap-3 px-0 task-enter"
                    >
                      <input
                        className="todo-checkbox form-check-input mt-0"
                        type="checkbox"
                        checked={task.isFinished}
                        onChange={() => toggleTodo(task.id)}
                      />
                      <span
                        className={`todo-text ${task.isFinished ? "done" : ""}`}
                      >
                        {task.name}
                      </span>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => startEdit(task)}
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteTask(task.id)}
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
