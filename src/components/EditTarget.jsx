import React, { useState } from 'react';

const EditTarget = ({ target, setEditingTarget }) => {
  const [title, setTitle] = useState(target.title);
  const [description, setDescription] = useState(target.description); 

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setEditingTarget(false);
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
        placeholder="Descrição do Target"
      />
      <button type="submit">Alterar Target</button>
    </form>
  );
};

export default EditTarget;
