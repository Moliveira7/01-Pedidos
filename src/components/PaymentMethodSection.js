import React from 'react';

const PaymentMethodSection = ({ formData, handleChange }) => {
  return (
    <div className="form-payment-container">
      <label htmlFor="paymentMethod" className="form-payment-label">
        Forma de Pagamento:
      </label>
      <select
        id="paymentMethod"
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
      >
        <option value="">Selecione...</option>
        <option value="pix">Pix</option>
        <option value="creditCard">Cartão de Crédito</option>
        <option value="debitCard">Cartão de Débito</option>
      </select>
    </div>
  );
};

export default PaymentMethodSection;