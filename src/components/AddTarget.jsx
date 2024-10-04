import React, { useState } from 'react';
import { createTarget } from '../api';

const AddTarget = ({ refreshTargets }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTarget({ title });
    setTitle('');
    refreshTargets(); // Atualiza a lista de targets após a inclusão
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título do Target"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Adicionar Target</button>
    </form>
  );
};

export default AddTarget;
