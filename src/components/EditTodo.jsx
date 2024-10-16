import { useState } from 'react';

const EditTodo = ({ todo, setEditingTodo, editTodo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description); 

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo({ ...todo, title, description }); 
    setEditingTodo(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição do TODO"
        required
      />
      <button type="submit">Alterar TODO</button>
    </form>
  );
};

export default EditTodo;
