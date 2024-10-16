import { useEffect, useState } from "react";
import {
  fetchTargets,
  createTarget,
  deleteTarget,
  fetchTodosByTarget,
  createTodo,
  deleteTodo,
  updateTodo,
  fetchAllTodos,
} from "../api";
import AddTodo from "./AddTodo";
import EditTarget from "./EditTarget";
import EditTodo from "./EditTodo";
import useApi from "../hooks/useApi";

const TargetList = () => {
  const [targets, setTargets] = useState([]);
  //const [currentTarget, setCurrentTarget] = useState(null);
  const [editingTarget, setEditingTarget] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editingTodo, setEditingTodo] = useState(false);
  const [newTargetTitle, setNewTargetTitle] = useState("");
  const [newTargetDescription, setNewTargetDescription] = useState("");

  const { currentTarget, setCurrentTarget } = useApi();

  useEffect(() => {
    refreshTargets();
    refreshTodos();
  }, []);

  const refreshTargets = async () => {
    const response = await fetchTargets();
    setTargets(response.data);
  };

  const refreshTodos = async () => {
    const response = await fetchAllTodos();
    setTodos(response.data);
  };

  const handleTargetClick = async (targetId) => {
    const response = await fetchTodosByTarget(targetId);
    setCurrentTarget(targetId);
    setTodos(response.data);
  };

  const handleAddTarget = async (e) => {
    e.preventDefault();
    const newTarget = {
      title: newTargetTitle,
      isComplete: false,
      description: newTargetDescription,
      todo: [],
    };
    await createTarget(newTarget);
    setNewTargetTitle("");
    setNewTargetDescription("");
    refreshTargets();
  };

  const handleDeleteTarget = async (targetId) => {
    await deleteTarget(targetId);
    refreshTargets();
    setTodos([]);
    setCurrentTarget(null);
  };

  const handleAddTodo = async (todoTitle) => {
    const newTodo = {
      title: todoTitle,
      isComplete: false,
      description: "",
      targetId: currentTarget,
    };
    await createTodo(newTodo);
    handleTargetClick(currentTarget);
  };

  const handleDeleteTodo = async (todoId) => {
    console.log(todoId)
    await deleteTodo(todoId);
    handleTargetClick(currentTarget);
  };

  const handleEditTodo = async (todo) => {
    const updatedTodo = {
      ...todo,
      title: todo.title,
    };
    await updateTodo(todo.id, updatedTodo);
    handleTargetClick(currentTarget);
  };

  return (
    <div className="target-list">
      <h1>Targets</h1>
      <form onSubmit={handleAddTarget}>
        <input
          type="text"
          value={newTargetTitle}
          onChange={(e) => setNewTargetTitle(e.target.value)}
          placeholder="Novo Target"
          required
          minLength={3}
        />
        <input
          type="text"
          value={newTargetDescription}
          onChange={(e) => setNewTargetDescription(e.target.value)}
          placeholder="Descrição do Target"
          required
          minLength={3}
        />
        <button type="submit">Adicionar Target</button>
      </form>

      <ul>
        {targets.map((target) => (
          <li key={target.id} onClick={() => handleTargetClick(target.id)}>
            {target.title}
            <button
              onClick={() => {
                setCurrentTarget(target);
                setEditingTarget(true);
              }}
            >
              Editar
            </button>
            <button onClick={() => handleDeleteTarget(target.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>

      {editingTarget && currentTarget && (
        <EditTarget
          target={currentTarget}
          setEditingTarget={setEditingTarget}
        />
      )}

      <h2>TODOs</h2>
      {currentTarget && (
        <>
          <AddTodo targetId={currentTarget} addTodo={handleAddTodo} />

          {editingTodo && currentTodo && (
            <EditTodo
              todo={currentTodo}
              setEditingTodo={setEditingTodo}
              editTodo={handleEditTodo}
            />
          )}
        </>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button
              onClick={() => {
                setCurrentTodo(todo);
                setEditingTodo(true);
              }}
            >
              Editar
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TargetList;
