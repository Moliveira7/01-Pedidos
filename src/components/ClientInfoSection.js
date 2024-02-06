import React from 'react';

const ClientInfoSection = ({ formData, handleChange }) => {
  return (
    <>
      <label htmlFor="clientName">Nome do Cliente:</label>
      <input
        type="text"
        id="clientName"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        className="wide-input"
      />
    </>
  );
};

export default ClientInfoSection;