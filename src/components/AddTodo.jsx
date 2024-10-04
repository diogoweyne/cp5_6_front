import React, { useState } from 'react';

const AddTodo = ({ targetId, addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title, description); 
    setTitle('');
    setDescription(''); }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Novo TODO"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição do TODO"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Adicionar TODO</button>
    </form>
  );
};

export default AddTodo;

