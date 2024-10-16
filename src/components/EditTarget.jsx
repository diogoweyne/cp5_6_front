import React, { useState } from 'react';
import { updateTarget } from '../api';
import useApi from '../hooks/useApi';

const EditTarget = ({ target, setEditingTarget }) => {
  const [title, setTitle] = useState(target.title);
  const [description, setDescription] = useState(target.description); 

  const {currentTarget} = useApi()

  // const handleSubmit = (e) => {
  //   e.preventDefault();
   
  //   setEditingTarget(false);
  // };

  const handleEditTarget = async (e) => {
    e.preventDefault();
    const updatedTarget = {
      ...target,
      title: title,
      description: description,
    };
    await updateTarget(target.id, updatedTarget);
    setEditingTarget(false);
    refreshTargets();
  };

  return (
    <form onSubmit={handleEditTarget}>
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
        required
      />
      <button type="submit">Alterar Target</button>
    </form>
  );
};

export default EditTarget;
