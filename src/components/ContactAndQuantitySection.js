import React from 'react';

const ContactAndQuantitySection = ({ formData, handleChange }) => {
  return (
    <>
      <label htmlFor="contact">Contato:</label>
      <input
        type="tel"
        id="contact"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
      />

      <label htmlFor="quantity">Quantidade de Etiquetas:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
      />
    </>
  );
};

export default ContactAndQuantitySection;