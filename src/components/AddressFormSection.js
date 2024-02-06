import React from 'react';
import AddressForm from './AddressForm';

const AddressFormSection = ({ formData, handleCepBlur }) => {
  return (
    <AddressForm onBlurCep={handleCepBlur} />
  );
};

export default AddressFormSection;