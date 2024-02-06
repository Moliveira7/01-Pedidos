import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = ({ onBlurCep }) => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');

  const handleCepChange = (event) => {
    const newCep = event.target.value;
    setCep(newCep);

    if (/^\d{5}-?\d{3}$/.test(newCep)) {
      onBlurCep(newCep);
    }
  };

  return (
    <div>
      <label htmlFor="cep">CEP:</label>
      <input
        type="text"
        id="cep"
        value={cep}
        onChange={handleCepChange}
      />

      <label htmlFor="address">Endereço:</label>
      <input
        type="text"
        id="address"
        value={address}
        readOnly
      />
    </div>
  );
};

export default AddressForm;